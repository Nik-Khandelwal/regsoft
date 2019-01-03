$(document).ready(function() {
  fetchParticipants();
  getGroups();
  $('.modal').modal({
    dismissible: false
  });
  $('.coll-1').sideNav({
      menuWidth: 200, // Default is 300
      edge: 'right', // Choose the horizontal origin
      closeOnClick: false, // Closes side-nav on <a> clicks, useful for Angular/Meteor
      draggable: true // Choose whether you can drag to open on touch screens
    }
  );
    $('.coll-0').sideNav({
      menuWidth: 300, // Default is 300
      edge: 'left', // Choose the horizontal origin
      closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
      draggable: true // Choose whether you can drag to open on touch screens
    }
  );
  // fetchPassedStats();
});

function fetchParticipants() {
  Materialize.toast('Updating Participants List!', 4000, "toast-fetch");
  var csrf_token = getCookie('csrftoken');
  reset_sort_icons();
  reset_sort_col_color();
  var ourRequest = new XMLHttpRequest();
  var url = "/firewallz/details/";
  ourRequest.open("POST", url, true);
  ourRequest.setRequestHeader("Content-type", "application/json");
  ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
  ourRequest.onload = function () {
    if (ourRequest.status >= 200 && ourRequest.status < 400) {
      ourData = JSON.parse(ourRequest.responseText);
      // clearRight();
      updateLeftTable(ourData);
    }
    else
      Materialize.toast('Server Error!', 4000, "toast-fetch_error");
  } // server sent an error after connection
  ourRequest.onerror = function () { // error connecting to URL
    Materialize.toast('Could not connect to server!', 4000, "toast-fetch_no_connect");
  }
  ourRequest.send(); // sending request
}
function updateLeftTable(data) {
  var lefttmp = document.getElementById('left-temp');
  for (var i = 0; i < data.length; i++) {
    document.getElementById("left-body").appendChild(lefttmp.content.cloneNode(true));
    document.getElementsByClassName('left-table-name')[i].innerHTML = data[i].fields.name;
    document.getElementsByClassName('left-table-college')[i].innerHTML = data[i].fields.college;
    document.getElementsByClassName('left-table-sport')[i].innerHTML = data[i].fields.sport;
    document.getElementsByClassName('left-table-gender')[i].innerHTML = data[i].fields.gender;
    document.getElementsByClassName('left-table-id')[i].innerHTML = data[i].pk;
  }
}
function toggleSelection(elem) {
  if(document.getElementsByClassName('selectedLeftRow').length==0) {
    if (elem.innerHTML == "check_box") {
      elem.innerHTML = "check_box_outline_blank";
      elem.parentElement.parentElement.setAttribute('class', 'left-table-rows');
    } else {
      elem.innerHTML = "check_box";
      elem.parentElement.parentElement.setAttribute('class', 'left-table-rows selectedLeftRow');
    }
  } else {
    var clgName = document.getElementsByClassName('selectedLeftRow')[0].getElementsByTagName('td')[2].innerHTML;
    if (elem.parentElement.parentElement.getElementsByTagName('td')[2].innerHTML!=clgName) {
      Materialize.toast('Participants from different colleges being added!', 3000);
    } else {
      if (elem.innerHTML == "check_box") {
        elem.innerHTML = "check_box_outline_blank";
        elem.parentElement.parentElement.setAttribute('class', 'left-table-rows');
      } else {
        elem.innerHTML = "check_box";
        elem.parentElement.parentElement.setAttribute('class', 'left-table-rows selectedLeftRow');
      }
    }
  }
}
function toggleRightSelection(elem) {
  if (elem.innerHTML == "check_box") {
    elem.innerHTML = "check_box_outline_blank";
    elem.parentElement.parentElement.setAttribute('class', 'right-table-rows');
  } else {
    elem.innerHTML = "check_box";
    elem.parentElement.parentElement.setAttribute('class', 'right-table-rows selectedRightRow');
  }
}

function getCookie(name) {
  var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return v ? v[2] : null;
}

function sort(col) {
  if (document.getElementsByClassName('sort-icon')[col].getAttribute('class') == 'sort-icon sort-asc') {
    // Sort in Descending Order
    sortData(1, col);
    document.getElementsByClassName('sort-icon')[col].setAttribute('class', 'sort-icon sort-desc');
    document.getElementsByClassName('sort-icon')[col].setAttribute('src', '/static/firewallz/icons/sort-desc.svg');
    for (var i = 0; i < 4; i++) {
      if (i != col) {
        document.getElementsByClassName('sort-icon')[i].setAttribute('class', 'sort-icon');
        document.getElementsByClassName('sort-icon')[i].setAttribute('src', '/static/firewallz/icons/sort.svg');
      }
    }
    chng_sort_col_color(col);
  } else {
    // Sort in Ascending Order
    sortData(0, col);
    document.getElementsByClassName('sort-icon')[col].setAttribute('class', 'sort-icon sort-asc');
    document.getElementsByClassName('sort-icon')[col].setAttribute('src', '/static/firewallz/icons/sort-asc.svg');
    for (var i = 0; i < 4; i++) {
      if (i != col) {
        document.getElementsByClassName('sort-icon')[i].setAttribute('class', 'sort-icon');
        document.getElementsByClassName('sort-icon')[i].setAttribute('src', '/static/firewallz/icons/sort.svg');
      }
    }
    chng_sort_col_color(col);
  }
}
function sortData(sortType, group) {
  var group_name = ["left-table-name", "left-table-college", "left-table-sport", "left-table-gender"];
  var table = document.getElementsByClassName('left-one')[0];
  Arr = [];
  //Starts with 2.. avoiding 0 and 1 for table headers 
  for (var i = 1, ln = table.rows.length; i < ln; i++) {
    var row = table.rows[i];
    var firstCell = row.getElementsByClassName(group_name[group])[0].innerHTML;
    if (row.style.display == "none") {
      Arr.push([firstCell, row, "none"]);
    } else Arr.push([firstCell, row, ""]);
    //temporary array
  }
  //sort by first column of inner arrays
  if (sortType == 0) {
    Arr = Arr.sort(function(a, b) {
      //return a[0] > b[0];
      return a[0].toLowerCase().localeCompare(b[0].toLowerCase());

    });
  } else if (sortType == 1) {
    Arr = Arr.sort(function(a, b) {
      //return a[0] <b[0];
      return b[0].toLowerCase().localeCompare(a[0].toLowerCase());

    });

  }
  //left empty
  document.getElementById("left-body").innerHTML = '<template id="left-temp"> <tr class="left-table-rows"> <td style="flex-basis: 8%;" class="left-table-checkbox"><i style="flex-basis: 8%;" class="material-icons indiv-icon-check tooltipped change_cursor" data-position="right" data-delay="50" data-tooltip="Select/Deselect this participant" onclick="toggleSelection(this);">check_box_outline_blank</i></td><td style="flex-basis: 23%;" class="left-table-name">Name</td><td style="flex-basis: 23%;" class="left-table-college">College Name</td><td style="flex-basis: 23%;" class="left-table-sport">Sport</td><td style="flex-basis: 23%;" class="left-table-gender">Gender</td><td style="display: none;" class="left-table-id">ID_No</td></tr></template>';
  // using template
  var tmp = document.getElementById("left-temp");
  for (var i = 0, ln = Arr.length; i < ln; i++) {
    document.getElementById("left-body").appendChild(tmp.content.cloneNode(true));
    document.getElementsByClassName("left-table-name")[i].innerHTML = Arr[i][1].getElementsByClassName("left-table-name")[0].innerHTML;
    document.getElementsByClassName("left-table-college")[i].innerHTML = Arr[i][1].getElementsByClassName("left-table-college")[0].innerHTML;
    document.getElementsByClassName("left-table-sport")[i].innerHTML = Arr[i][1].getElementsByClassName("left-table-sport")[0].innerHTML;
    document.getElementsByClassName("left-table-gender")[i].innerHTML = Arr[i][1].getElementsByClassName("left-table-gender")[0].innerHTML;
    document.getElementsByClassName("left-table-id")[i].innerHTML = Arr[i][1].getElementsByClassName("left-table-id")[0].innerHTML;

    if (Arr[i][2] == "none") {
      document.getElementById("left-body").lastChild.style.display = "none";
    }
  }
  Arr = null;
}
function reset_sort_icons() {
  // Call this function when Refreshing Left Table to reset sort icons
  for (var i = 0; i < 4; i++) {
    document.getElementsByClassName('sort-icon')[i].setAttribute('class', 'sort-icon');
    document.getElementsByClassName('sort-icon')[i].setAttribute('src', '/static/firewallz/icons/sort.svg');
  }
}
function chng_sort_col_color(col) {
  tr = document.getElementsByClassName('left-one')[0].getElementsByTagName("tr");
  for (i = 1; i < tr.length; i++) {
    if (i % 2) {
      tr[i].getElementsByTagName("td")[col+1].style.backgroundColor = '#fafafa';
    } else {
      tr[i].getElementsByTagName("td")[col+1].style.backgroundColor = '#eaeaea';
    }
  }
  for (var i = 1; i < tr.length; i++) {
    for (var j = 0; j < 4; j++) {
      if (i % 2 == 0 && j != col) {
        tr[i].getElementsByTagName("td")[j+1].style.backgroundColor = 'transparent';
      } else if (j != col) {
        tr[i].getElementsByTagName("td")[j+1].style.backgroundColor = 'transparent';
      }
    }
  }
}
function reset_sort_col_color() {
  tr = document.getElementsByClassName('left-one')[0].getElementsByTagName("tr");
  for (var i = 1; i < tr.length; i++) {
    for (var j = 0; j < 4; j++) {
      if (i % 2 == 0) {
        tr[i].getElementsByTagName("td")[j+1].style.backgroundColor = 'transparent';
      } else {
        tr[i].getElementsByTagName("td")[j+1].style.backgroundColor = 'transparent';
      }
    }
  }
}
//Multiple Column Search
function search() {
  var table, tr, i, td_name, td_college, td_sports;
  filter_name = document.getElementById("name-search").value.toUpperCase();
  filter_college = document.getElementById("college-search").value.toUpperCase();
  filter_sports = document.getElementById("sports-search").value.toUpperCase();
  table = document.getElementsByClassName('left-one')[0];
  tr = table.getElementsByTagName("tr");
  for (i = 1; i < tr.length; i++) {
    td_name = tr[i].getElementsByTagName("td")[1];
    td_college = tr[i].getElementsByTagName("td")[2];
    td_sports = tr[i].getElementsByTagName("td")[3];
    if ((td_name && td_name.innerHTML.toUpperCase().indexOf(filter_name) > -1) && (td_college && td_college.innerHTML.toUpperCase().indexOf(filter_college) > -1) && (td_sports && td_sports.innerHTML.toUpperCase().indexOf(filter_sports) > -1)) {
      tr[i].style.display = "";
    } else {
      tr[i].style.display = "none";
    }
  }
  for(let trow of tr) {
    if(trow.style.display == "none") {
    }
  }
}

// ADD / SWAP GROUP---------------------------------------------------------------------------------------

function getGroups() {
  Materialize.toast('Fetching Group Leaders!', 3000);
  var csrf_token = getCookie('csrftoken');
  var ourRequest = new XMLHttpRequest();
  var url = "/firewallz/unconfirm_details/";
  ourRequest.open("POST", url, true);
  ourRequest.setRequestHeader("Content-type", "application/json");
  ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
  // POST
  send_obj = {
    "csrftoken": {
      "csrfmiddlewaretoken": csrf_token
    }
  };
  var send_json = JSON.stringify(send_obj);
  // Obtain 
  ourRequest.onreadystatechange = function () {
    if (ourRequest.readyState === 4 && ourRequest.status === 200) {
      var recieve_json = JSON.parse(ourRequest.responseText);
      // console.log(recieve_json);
      updateRightTable(recieve_json);
    }

    else if (ourRequest.readyState === 4 && ourRequest.status != 200) {
      Materialize.toast('Error Fetching List!', 3000);
    }
  }
  ourRequest.send(send_json);
}


function updateRightTable(data) {
  var righttmp = document.getElementById('right-temp');
  for (var i = 0; i < data.length; i++) {
    document.getElementById("right-body").appendChild(righttmp.content.cloneNode(true));
    document.getElementsByClassName('right-table-no')[i].innerHTML = data[i].pk;
    document.getElementsByClassName('right-table-code')[i].innerHTML = data[i].groupid;
    document.getElementsByClassName('right-table-name')[i].innerHTML = data[i].college;
}
}

function searchGroup() {
  // console.log('searching');
  var table, tr, i, td_no, td_code, td_cname;
  filter_no = document.getElementById("no-search").value.toUpperCase();
  filter_code = document.getElementById("code-search").value.toUpperCase();
  filter_cname = document.getElementById("cname-search").value.toUpperCase();
  table = document.getElementsByClassName('right-one')[0];
  tr = table.getElementsByTagName("tr");
  // console.log(filter_no, filter_code, filter_cname);
  for (i = 1; i < tr.length; i++) {
    td_no = tr[i].getElementsByTagName("td")[0];
    td_code = tr[i].getElementsByTagName("td")[1];
    td_cname = tr[i].getElementsByTagName("td")[2];
    // console.log(`Group no is ${td_no.innerHTML} Group code is ${td_code.innerHTML} group cname is ${td_cname.innerHTML}`);
    if ((td_no && td_no.innerHTML.toUpperCase().indexOf(filter_no) > -1) && (td_code && td_code.innerHTML.toUpperCase().indexOf(filter_code) > -1) && (td_cname && td_cname.innerHTML.toUpperCase().indexOf(filter_cname) > -1)) {
      tr[i].style.display = "";
    } else {
      // console.log('not found');
      tr[i].style.display = "none";
    }
  }
}

//ADDING A NEW MEMBER ----------------------------------------------------------------------------------------------------

var groupDetails, swap_obj = [], add_status = false;
function addMember(data) {
  code = 1;
  add_status = !add_status;
  if(add_status) {
        data.lastChild.style.transform = 'rotate(-45deg) scale(1.5)';
        data.lastChild.style.transition = '0.1s ease-in-out';

        group_no = data.parentNode.children[0].innerHTML;
        group_id = data.parentNode.children[1].innerHTML;
        group_cname = data.parentNode.children[2].innerHTML;
        groupDetails = {
          pk: group_no,
          groupid: group_id,
          college: group_cname
        };
        // console.log(groupDetails);
        var checkboxes = document.getElementsByClassName('left-table-checkbox');
        for(let checkbox of checkboxes) {
            if(checkbox.parentNode.children[2].innerHTML.toUpperCase().indexOf(group_cname.toUpperCase()) > -1) {
              checkbox.style.display = 'block';
            }
            else {
              checkbox.parentNode.style.display = 'none';
            }
        }
        var flag = true;
        for(let checkbox of checkboxes) {
          if(checkbox.parentNode.style.display == 'none') {
            continue;
          } else {
            flag = false;
            break;
          }
        }
        if(flag) {
          Materialize.toast('No members left from this college in the participant list!', 3000);
          addMember(data);
        }
  }
    else {
          data.lastChild.style.transform = 'rotate(0deg) scale(1)';
          data.lastChild.style.transition = '0.1s ease-in-out';
          var checkboxes = document.getElementsByClassName('left-table-checkbox');
          for(let checkbox of checkboxes) {
            if(checkbox.parentNode.children[2].innerHTML.toUpperCase().indexOf(group_cname.toUpperCase()) > -1) {
              checkbox.style.display = 'none';
            }
            else {
              checkbox.parentNode.style.display = 'flex';
            }
          }
    }
}

var code;
function addMembersToGroup() {
  if(code == 1) {
    var details = [];
    selectedLeftRows = document.getElementsByClassName('selectedLeftRow');
    if (selectedLeftRows.length > 0) {
      for (var i = 0; i < selectedLeftRows.length; i++) {
          var data = {
            "fields": {
              "name": selectedLeftRows[i].children[1].innerHTML,
              "college": selectedLeftRows[i].children[2].innerHTML,
              "sport": selectedLeftRows[i].children[3].innerHTML,
              "gender": selectedLeftRows[i].children[4].innerHTML
            },
            "pk": parseInt(selectedLeftRows[i].children[5].innerHTML)
          }
          details.push(data);
      }
      details.push(groupDetails);
      // console.log(details);
      var csrf_token = getCookie('csrftoken');
      var ourRequest = new XMLHttpRequest();
      var url = "/firewallz/firewallz_swap_add/";
      ourRequest.open("POST", url, true);
      ourRequest.setRequestHeader("Content-type", "application/json");
      ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
      var data = JSON.stringify(details);
      Materialize.toast('Sending New Member Data Please Wait!', 3000);
      ourRequest.onreadystatechange = function() {
        if (ourRequest.readyState === 4 && ourRequest.status === 200) {
          for (var i = selectedLeftRows.length - 1; i >= 0; i--) {
            selectedLeftRows[i].parentNode.removeChild(selectedLeftRows[i]);
          }
          Materialize.toast('Group updated successfully', 3000);
          location.reload(true);
        } else if (ourRequest.readyState === 4 && ourRequest.status != 200) {
          Materialize.toast('There was some error connecting to the server!', 3000);
        }
      };
      ourRequest.send(data);
    } else {
      Materialize.toast("Please Select Some Participants", 3000);
    }
  }
  else if(code == 2) {
    // console.log('Swapping selected member');
    selectedLeftRows = document.getElementsByClassName('selectedLeftRow');
    if (selectedLeftRows.length == 1) {
          var data = {
            "fields": {
              "name": selectedLeftRows[0].children[1].innerHTML,
              "college": selectedLeftRows[0].children[2].innerHTML,
              "sport": selectedLeftRows[0].children[3].innerHTML,
              "gender": selectedLeftRows[0].children[4].innerHTML
            },
            "pk": parseInt(selectedLeftRows[0].children[5].innerHTML)
          }
          swap_obj.push(data);
          // console.log(swap_obj);
          var csrf_token = getCookie('csrftoken');
          var ourRequest = new XMLHttpRequest();
          var url = "/firewallz/firewallz_swap_swap/";
          ourRequest.open("POST", url, true);
          ourRequest.setRequestHeader("Content-type", "application/json");
          ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
          var send_data = JSON.stringify(swap_obj);
          Materialize.toast('Sending Swapping Data Please Wait!', 3000);
          ourRequest.onreadystatechange = function() {
            if (ourRequest.readyState === 4 && ourRequest.status === 200) {
              for (var i = selectedLeftRows.length - 1; i >= 0; i--) {
                selectedLeftRows[i].parentNode.removeChild(selectedLeftRows[i]);
              }
              Materialize.toast('Group updated successfully', 3000);
              location.reload(true);
            } else if (ourRequest.readyState === 4 && ourRequest.status != 200) {
              Materialize.toast('There was some error connecting to the server!', 3000);
            }
          };
          ourRequest.send(send_data);
    }
    else if(selectedLeftRows.length > 1) {
      Materialize.toast('You can not select more than 1 participant in swapping', 3000);
    }
    else if(selectedLeftRows.length == 0) {
      Materialize.toast('Please select one participant', 3000);
    }
    else if(selectedLeftRows === undefined) {
      Materialize.toast('Please click on add/swap button in the right table first', 3000);
    }
  }
  else if(code == undefined) {
    Materialize.toast('Please click on add/swap button in the right table first', 3000);
  }
}

// SWAP A MEMBER-----------------------------------------------------------------------------------------------------
function swapMember(data) {
  swap_obj = [];
  group_no = data.parentNode.children[0].innerHTML;
  group_id = data.parentNode.children[1].innerHTML;
  group_cname = data.parentNode.children[2].innerHTML;
  swap_obj.push({
    pk: group_no,
    groupid: group_id,
    college_name: group_cname
  });
  document.getElementById("det").style.height="100%";
  // console.log(group_id);
  document.getElementById("uncnfrm_grp").innerHTML='<div class="collapsible-body custom-collapsible-body blue lighten-5"> <span class="unconfirm-name center" style="flex-basis: 45 %;">Name</span> <span class="unconfirm-coll-name center" style="flex-basis: 45%;">College</span> <span class="unconfirm-id-col center">ID</span> <i style="flex-basis: 10%;" class="material-icons">account_circle</i> </div>';
  Materialize.toast('Loading, Please Wait', 4000);
  var csrf_token = getCookie('csrftoken');
  var ourRequest = new XMLHttpRequest();
  var url = "/firewallz/show_details_unconfirm/";
  ourRequest.open("POST", url, true);
  ourRequest.setRequestHeader("Content-type", "application/json");
  ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
  // POST
  send_obj = {
    "data": {
      "group_id": group_id
    },
    "csrftoken": {
      "csrfmiddlewaretoken": csrf_token
    }
  };
  var send_json = JSON.stringify(send_obj);
  // Obtain 
  ourRequest.onreadystatechange = function () {
    if (ourRequest.readyState === 4 && ourRequest.status === 200) {
      document.getElementById("uncnfrm_grp").innerHTML='<div class="collapsible-body custom-collapsible-body blue lighten-5"> <span class="unconfirm-name center" style="flex-basis: 45%;">Name</span> <span class="unconfirm-coll-name center" style="flex-basis: 45%;">College</span> <span class="unconfirm-id-col center">ID</span> <i style="flex-basis: 10%;" class="material-icons">account_circle</i> </div>';
      var recieve_json = JSON.parse(ourRequest.responseText);
      // console.log(recieve_json);
      for (var i = 0; i < recieve_json.length; i++) {
         document.getElementById("uncnfrm_grp").innerHTML+='<div class="collapsible-body custom-collapsible-body blue lighten-5"> <span class="unconfirm-name center" style="flex-basis: 45%;">'+recieve_json[i].name+'</span> <span class="unconfirm-coll-name center" style="flex-basis: 45%;">'+recieve_json[i].college+'</span> <span class="unconfirm-id-col center">'+recieve_json[i].id+'</span> <i style="flex-basis: 10%;" class="material-icons change_cursor" onclick="removeMember(this)"><img src="/static/firewallz/firewallz_unconfirm/icons/del.svg" class="unconfirm_icon"></i> </div>';
      }
      Materialize.toast('Updated List!', 3000);
    }
    else if (ourRequest.readyState === 4 && ourRequest.status != 200) {
      Materialize.toast('Error Fetching List!', 3000);
    }
  }
  ourRequest.send(send_json);
}

function removeMember(del_data) {
  code = 2;
  Materialize.toast('Member selected for swapping!', 3000);
  var member_name = del_data.parentElement.getElementsByTagName('span')[0].innerHTML;
  var college_name = del_data.parentElement.getElementsByTagName('span')[1].innerHTML;
  var id = parseInt(del_data.parentElement.getElementsByTagName('span')[2].innerHTML);
  var my_obj = {
    "data": {
      "name": member_name,
      "college_name": college_name,
      "participant_id": id
    }
  };
  swap_obj.push(my_obj);
  // console.log(swap_obj);
  showGroupMembers(my_obj);
  close_details();
}

function showGroupMembers(data) {
  var checkboxes = document.getElementsByClassName('left-table-checkbox');
  // console.log(data);
  for(let checkbox of checkboxes) {
      if(checkbox.parentNode.children[2].innerHTML.toUpperCase().indexOf(data.data.college_name.toUpperCase()) > -1) {
        checkbox.style.display = 'block';
      }
      else {
        checkbox.parentNode.style.display = 'none';
      }
  }
  var flag = true;
  for(let checkbox of checkboxes) {
    if(checkbox.parentNode.style.display == 'none') {
      continue;
    } else {
      flag = false;
      break;
    }
  }
  if(flag) {
    Materialize.toast('No members left from this college for swapping in the participant list!', 3000);
    showAllMembers(data);
  }
}

function close_details() {
  document.getElementById("det").style.height="0";
  document.getElementById("uncnfrm_grp").innerHTML="";
}

function showAllMembers(My_Object) {
  var checkboxes = document.getElementsByClassName('left-table-checkbox');
  for(let checkbox of checkboxes) {
      if(checkbox.parentNode.children[2].innerHTML.toUpperCase().indexOf(My_Object.data.college_name.toUpperCase()) > -1) {
        checkbox.style.display = 'none';
      }
      else {
        checkbox.parentNode.style.display = 'flex';
      }
  }
}

function participant_search() {
  var span_name;
  var filter_name = document.getElementById("participant-name-search").value.toUpperCase();
  var grplist = document.getElementById('uncnfrm_grp');
  for (var i = 1; i < grplist.getElementsByTagName('div').length; i++) {
    var div = grplist.getElementsByTagName('div');
    var span_name = grplist.getElementsByTagName('div')[i].getElementsByTagName('span')[0];
    if ((span_name && span_name.innerHTML.toUpperCase().indexOf(filter_name) > -1)) {
      div[i].style.display = "";
    } else {
      div[i].style.display = "none";
    }
  }
}
