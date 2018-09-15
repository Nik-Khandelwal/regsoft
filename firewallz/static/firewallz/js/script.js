$(document).ready(function() {
  fetchParticipants();
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
  fetchPassedStats();
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
      clearRight();
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
function addSelected() {
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
    addToRight(details);
    for (var i = selectedLeftRows.length - 1; i >= 0; i--) {
      selectedLeftRows[i].parentNode.removeChild(selectedLeftRows[i]);
    }
  } else {
    Materialize.toast("Please Select Some Participants", 3000);
  }
}
function addToRight(details) {
  var numRight = document.getElementsByClassName('right-table-rows').length;
  var righttmp = document.getElementById('right-temp');
  for (var i = 0; i < details.length; i++) {
    document.getElementById("right-body").appendChild(righttmp.content.cloneNode(true));
    document.getElementsByClassName('right-table-name')[numRight + i].innerHTML = details[i].fields.name;
    document.getElementsByClassName('right-table-college')[numRight + i].innerHTML = details[i].fields.college;
    document.getElementsByClassName('right-table-sport')[numRight + i].innerHTML = details[i].fields.sport;
    document.getElementsByClassName('right-table-gender')[numRight + i].innerHTML = details[i].fields.gender;
    document.getElementsByClassName('right-table-id')[numRight + i].innerHTML = details[i].pk;
    document.getElementById('no_of_part_text').innerHTML = parseInt(document.getElementById('no_of_part_text').innerHTML)+1;
  }
}
function removeRight(elem) {
  var details = [];
  var data = {
    "fields": {
      "name": elem.children[0].innerHTML,
      "college": elem.children[1].innerHTML,
      "sport": elem.children[2].innerHTML,
      "gender": elem.children[3].innerHTML
    },
    "pk": parseInt(elem.children[4].innerHTML)
  }
  details.push(data);
  addToLeft(details);
  elem.parentNode.removeChild(elem);
  document.getElementById('no_of_part_text').innerHTML = parseInt(document.getElementById('no_of_part_text').innerHTML)-1;
}
function addToLeft(details) {
  var numLeft = document.getElementsByClassName('left-table-rows').length;
  var lefttmp = document.getElementById('left-temp');
  for (var i = 0; i < details.length; i++) {
    document.getElementById("left-body").appendChild(lefttmp.content.cloneNode(true));
    document.getElementsByClassName('left-table-name')[numLeft + i].innerHTML = details[i].fields.name;
    document.getElementsByClassName('left-table-college')[numLeft + i].innerHTML = details[i].fields.college;
    document.getElementsByClassName('left-table-sport')[numLeft + i].innerHTML = details[i].fields.sport;
    document.getElementsByClassName('left-table-gender')[numLeft + i].innerHTML = details[i].fields.gender;
    document.getElementsByClassName('left-table-id')[numLeft + i].innerHTML = details[i].pk;
  }
}
function openConfirm() {
  var numLeaders = document.getElementsByClassName('selectedRightRow').length;
  if (numLeaders == 1) {
    var numRight = document.getElementsByClassName('right-table-rows').length;
    document.getElementById('confirm_text').innerHTML = 'Do you want to confirm grouping of '+numRight+' people?';
    document.getElementById('group_confirm_btn1').style.display = 'inline-block';
    document.getElementById('group_confirm_btn2').style.display = 'inline-block';
    document.getElementById('group_confirm_btn3').style.display = 'none';
    $('#confirm_dialog').modal('open');
  } else if (numLeaders < 1) {
    Materialize.toast('Please Select a Group Leader!', 3000);
  } else {
    Materialize.toast('There can be only one Group Leader!', 3000);
  }
}
function confirmGroup() {
  // Send Data to Backend
  closeConfirm();
  var myObj = {
    "data": [],
    "csrftoken":[]
  };
  groupParticipants = document.getElementsByClassName('right-table-rows');
  for (var i = 0; i < groupParticipants.length; i++) {
    if (groupParticipants[i].getAttribute('class') == 'right-table-rows selectedRightRow') {
      myObj["data"].push({
        "name": groupParticipants[i].children[0].innerHTML,
        "gender": groupParticipants[i].children[3].innerHTML,
        "college": groupParticipants[i].children[1].innerHTML,
        "sport": groupParticipants[i].children[2].innerHTML,
        "pk": groupParticipants[i].children[4].innerHTML,
        "groupleader": 1
      });
    } else {
      myObj["data"].push({
        "name": groupParticipants[i].children[0].innerHTML,
        "gender": groupParticipants[i].children[3].innerHTML,
        "college": groupParticipants[i].children[1].innerHTML,
        "sport": groupParticipants[i].children[2].innerHTML,
        "pk": groupParticipants[i].children[4].innerHTML,
        "groupleader": 0
      });
    }
  }
  csrf_token = getCookie('csrftoken');
  myObj["csrftoken"].push({
    "csrfmiddlewaretoken": csrf_token
  });
  var ourRequest = new XMLHttpRequest();
  var url = "/firewallz/confirm_group/";
  ourRequest.open("POST", url, true);
  ourRequest.setRequestHeader("Content-type", "application/json");
  ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
  var data = JSON.stringify(myObj);
  Materialize.toast('Creating Group Please Wait!', 4000);
  ourRequest.onreadystatechange = function() {
    if (ourRequest.readyState === 4 && ourRequest.status === 200) {
      json = JSON.parse(ourRequest.responseText);
      var groupCode = json.groupcode;
      var grouppk = json.pk;
      showGroupCode(grouppk, groupCode);
      resetTables();
      fetchParticipants();
      sendPusherUpdate(JSON.stringify(myObj));
    } else if (ourRequest.readyState === 4 && ourRequest.status != 200) {
      Materialize.toast('There was some error connecting to the server!', 3000);
      showGroupCode(0,'ERROR');
      resetTables();
      fetchParticipants();
    }
  };
  ourRequest.send(data);
}
function closeConfirm() {
  $('#confirm_dialog').modal('close');
}
function resetTables() {
  document.getElementById('left-body').innerHTML = "";
  document.getElementById('right-body').innerHTML = "";
  document.getElementById('no_of_part_text').innerHTML = 0;
}
function clearRight() {
  document.getElementById('right-body').innerHTML = "";
}
function getCookie(name) {
  var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return v ? v[2] : null;
}
function showGroupCode(pk, code) {
  document.getElementById('confirm_text').innerHTML = 'GROUP NO.&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;GROUPCODE<br><br><b>'+pk+'&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;'+code+'</b><br><br><a class="waves-effect waves-light btn z-depth-3" href="/firewallz/id_card/'+code+'/" target="_blank"><span>Print ID Cards</span></a>';
  document.getElementById('group_confirm_btn1').style.display = 'none';
  document.getElementById('group_confirm_btn2').style.display = 'none';
  document.getElementById('group_confirm_btn3').style.display = 'inline-block';
  $('#confirm_dialog').modal('open');
}
function addParticipant() {
  resetAddForm();
  fetchSportList();
  fetchCollegeList();
  $('#add_participant_modal').modal('open');
}
function resetAddForm() {
  document.getElementById('add_participant_modal').innerHTML = '<div class="modal-content row"> <form class="col s12" id="add_participant_form"> <div class="row"> <div class="input-field col s12"> <i class="material-icons prefix">person</i> <input type="text" name="Indi_Captain_Name" id="indi_captain_name_field" class="validate" required="required"> <label for="indi_captain_name_field" data-error="Enter Name of Participant">Name of Participant</label> </div></div><div class="row"> <div class="input-field col s12"> <i class="material-icons prefix">business</i> <select id="college_field" name="College"> <option value="" disabled="disabled" selected="selected"></option> </select> <label for="college_field" data-error="Select College Name">College</label> </div></div><div class="row"> <div class="input-field col s12"> <i class="material-icons prefix">email</i> <input type="email" name="Indi_Captain_Email" id="indi_captain_email_field" class="validate" required="required"> <label for="indi_captain_email_field" data-error="Enter a Valid Email">E-Mail of Participant</label> </div></div><div class="row"> <div class="input-field col s12"> <i class="material-icons prefix">local_phone</i> <input type="text" name="Indi_Captain_Phone" id="indi_captain_phone_field" class="validate" required="required" maxlength="10" data-length="10"> <label for="indi_captain_phone_field" data-error="Enter Phone Number">Participant Phone Number</label> </div></div><div class="row"> <div class="input-field col s12"> <i class="material-icons prefix">directions_run</i> <select id="participant_sport_select" name="participant_sport_select" multiple="multiple"> <option value="" disabled="disabled" selected="selected"></option> </select> <label for="indi_sport_field" data-error="Enter Sport of Participant">Sport</label> </div></div><div class="row"> <div class="col s4 center"> Gender </div><div class="col s4 center"> <input type="radio" name="indi_gender" id="indi_male" value="Male"> <label for="indi_male">Male</label> </div><div class="col s4 center"> <input type="radio" name="indi_gender" id="indi_female" value="Female"> <label for="indi_female">Female</label> </div></div><div class="row" id="submit-indi-btn"> <div class="col s12 center"> <a class="waves-effect waves-light btn btn-large" onclick="addParticipantSubmit()"><i class="material-icons right">send</i>Submit</a> </div></div></form> </div><div class="modal-footer"> <a class="modal-action modal-close waves-effect waves-green btn-flat">Close</a> </div>';
  $('select').material_select();
  Materialize.updateTextFields();
  $("input#indi_captain_phone_field").characterCounter();
}
function fetchSportList() {
  Materialize.toast('Updating Sport List!', 3000);
  csrf_token = getCookie('csrftoken');
  var ourRequest = new XMLHttpRequest();
  var url = "/firewallz/sportlist/";
  ourRequest.open("POST", url, true);
  ourRequest.setRequestHeader("Content-type", "application/json");
  ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
  ourRequest.onreadystatechange = function() {
    if (ourRequest.readyState === 4 && ourRequest.status === 200) {
      var sport = JSON.parse(ourRequest.responseText);
      sportsList = sport;
      Materialize.toast('Updated Sport List!', 3000);
      document.getElementById('participant_sport_select').innerHTML = '<option value="" disabled="disabled" selected="selected"></option>';
      for (var i = 0; i < sport.length; i++) {
        document.getElementById('participant_sport_select').innerHTML += '<option value="'+sport[i].pk+'">'+sport[i].sport+'</option>';
      }
      $('select').material_select();
      Materialize.updateTextFields();
    } else if (ourRequest.readyState === 4 && ourRequest.status != 200) {
      Materialize.toast('There was some error connecting to the server!', 3000);
      // var sport = [{"pk": 1, "sport": "Basketball"},{"pk": 2, "sport": "Badminton Boys"},{"pk": 3, "sport": "Cricket Girls"}];
    }
  };
  ourRequest.send('');
}
var sportsList;
var collegeList;
function fetchCollegeList() {
  Materialize.toast('Updating College List!', 3000);
  csrf_token = getCookie('csrftoken');
  var ourRequest = new XMLHttpRequest();
  var url = "/firewallz/collegelist/";
  ourRequest.open("POST", url, true);
  ourRequest.setRequestHeader("Content-type", "application/json");
  ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
  ourRequest.onreadystatechange = function() {
    if (ourRequest.readyState === 4 && ourRequest.status === 200) {
      var college = JSON.parse(ourRequest.responseText);
      collegeList = college.data;
      Materialize.toast('Updated College List!', 3000);
      document.getElementById('college_field').innerHTML = '<option value="" disabled="disabled" selected="selected"></option>';
      for (var i = 0; i < collegeList.length; i++) {
        document.getElementById('college_field').innerHTML += '<option value="'+collegeList[i].pk+'">'+collegeList[i].college+'</option>';
      }
      $('select').material_select();
      Materialize.updateTextFields();
    } else if (ourRequest.readyState === 4 && ourRequest.status != 200) {
      Materialize.toast('There was some error connecting to the server!', 3000);
      // var sport = [{"pk": 1, "sport": "Basketball"},{"pk": 2, "sport": "Badminton Boys"},{"pk": 3, "sport": "Cricket Girls"}];
    }
  };
  ourRequest.send('');
}
function addParticipantSubmit() {
  var formData = serializeArray(document.getElementById('add_participant_form'));
  var participant_name = formData[0].value;
  var participant_college = parseInt(formData[1].value);
  var participant_email = formData[2].value;
  var participant_phone = formData[3].value;
  var sportSelected = false;
  var participant_sport = [];
  var i=4;
  while (formData[i] != undefined && formData[i].name=='participant_sport_select') {
    if (formData[i].name=='participant_sport_select' && i>4) {
      sportSelected=true;
      participant_sport.push(parseInt(formData[i].value));
    }
    i++;
  }
  var participant_gender = '';
  if (formData[i] != undefined) {
    participant_gender = formData[i].value;
  }
  if (participant_gender == '') {
    Materialize.toast('Please Enter Participants Gender!', 3000);
  } else if (!validateEmail(participant_email) || !validatePhoneNumber(participant_phone)) {
    Materialize.toast('Email/Phone Number is Wrong', 3000);
  } else if (participant_name && participant_college && participant_email && participant_phone && sportSelected) {
    // Submit Form to Backend
    Materialize.toast('Adding Participant, Please Wait!', 4000);
    var newParticipant = {
      "data": [],
      "csrftoken": []
    };
    newParticipant["data"].push({
      "name": participant_name,
      "college": participant_college,
      "email": participant_email,
      "phone": participant_phone,
      "sport": participant_sport,
      "gender": participant_gender
    });
    csrf_token = getCookie('csrftoken');
    newParticipant["csrftoken"].push({
      "csrfmiddlewaretoken": csrf_token
    });
    var ourRequest = new XMLHttpRequest();
    var url = "/firewallz/add_participant/";
    ourRequest.open("POST", url, true);
    ourRequest.setRequestHeader("Content-type", "application/json");
    ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
    var sendParticipant = JSON.stringify(newParticipant);
    closeAddParticipant();
    ourRequest.onreadystatechange = function() {
      if (ourRequest.readyState === 4 && ourRequest.status === 200) {
        var json = JSON.parse(ourRequest.responseText);
        var sportsNames = '';
        // Obtain PK of the Participant just registered
        for (var i = 0; i < participant_sport.length; i++) {
          for (var j = 0; j < sportsList.length; j++) {
            if (participant_sport[i] == sportsList[j].pk) {
              sportsNames+=sportsList[j].sport;
              if (i!=(participant_sport.length-1)) {
                sportsNames+=', ';
              }
            }
          }
        }
        var details = [];
        var data = {
          "fields": {
            "name": participant_name,
            "college": participant_college,
            "sport": sportsNames,
            "gender": participant_gender
          },
          "pk": json.pk
        }
        details.push(data);
        addToRight(details);
        Materialize.toast('Succesfully Added Participant!', 3000);
      } else if (ourRequest.readyState === 4 && ourRequest.status != 200) {
        Materialize.toast('There was some error connecting to the server!', 3000);
      }
    };
    ourRequest.send(sendParticipant);
  }
  else {
    // Display Error Toast that all fields are not filled.
    Materialize.toast('Please Fill All Required fields before proceeding!', 4000);
  }
}
function serializeArray(form) {
  var field, l, s = [];
  if (typeof form == 'object' && form.nodeName == "FORM") {
    var len = form.elements.length;
    for (var i = 0; i < len; i++) {
      field = form.elements[i];
      if (field.name && !field.disabled && field.type != 'file' && field.type != 'reset' && field.type != 'submit' && field.type != 'button') {
        if (field.type == 'select-multiple') {
          l = form.elements[i].options.length;
          for (j = 0; j < l; j++) {
            if (field.options[j].selected)
              s[s.length] = {
                name: field.name,
                value: field.options[j].value
              };
          }
        } else if ((field.type != 'checkbox' && field.type != 'radio') || field.checked) {
          s[s.length] = {
            name: field.name,
            value: field.value
          };
        }
      }
    }
  }
  return s;
}
function validatePhoneNumber(phone_num)  
{  
  var phoneno = /^\d{10}$/;  
  if(phone_num.match(phoneno)) {  
    return true;  
  } else { 
    return false;  
  }  
}
function validateEmail(mail)   
{
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {  
    return true;  
  }
  return false;
}
function closeAddParticipant() {
  $('#add_participant_modal').modal('close');
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
}
function stats(){
  $('.button-collapse').sideNav('hide');
  fetchStats();
  document.getElementById("stat").style.height="100vh";
  document.getElementById("close").style.display="block";
  document.getElementById("stat_data").style.display="block";
  document.getElementById("csv").style.display="inline-block";
  document.getElementById("excel").style.display="inline-block";
  document.getElementById("pdf").style.display="inline-block";
}
function close_stats(){ 
  document.getElementById("stat").style.height="0vh";
  document.getElementById("close").style.display="none";
  document.getElementById("stat_data").style.display="none";
  document.getElementById("csv").style.display="none";
  document.getElementById("excel").style.display="none";
  document.getElementById("pdf").style.display="none";
}
function fetchStats() {
  document.getElementById('stats_ul').innerHTML = '';
  Materialize.toast('Fetching Stats!', 3000);
  var csrf_token = getCookie('csrftoken');
  var ourRequest = new XMLHttpRequest();
  ourRequest.open("POST", "/firewallz/view_stats/", true);
  ourRequest.setRequestHeader("Content-type", "application/json");
  ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
  ourRequest.onload = function() {
    if (ourRequest.status >= 200 && ourRequest.status < 400) {
      ourData = JSON.parse(ourRequest.responseText);
      var data = ourData.data;
      for (var i = 0; i < data.length; i++) {
        var participants = '';
        for (var j = 0; j < data[i][1].length; j++) {
          participants += '<a class="collection-item">'+data[i][1][j][0]+'<span id="phn_no" class="right">'+data[i][1][j][1]+'</span></a>';
        }
        document.getElementById('stats_ul').innerHTML += '<li> <div class="collapsible-header"><i class="material-icons">account_balance</i>'+data[i][0]+'</div><div class="collapsible-body center white"> <div class="collection ">'+participants+'</div></div></li>';
      }
      Materialize.toast('Updated!', 3000);
    } else {
      Materialize.toast('Server Error!', 4000, "toast-fetch_error");  
    }
  }
  ourRequest.onerror = function() {
    Materialize.toast('Could not connect to server!', 4000, "toast-fetch_no_connect");
    // var data = [["BITS Pilani",[["Arpit", 9829775537],["Nikhil", 921379131],["Sri", 2349719891],["Satya", 9958295537]]],["BITS Hyderabad",[["Arpit", 9829775537],["Nikhil", 921379131],["Sri", 2349719891],["Satya", 9958295537],["Piyali", 4567890435]]],["IIT Delhi",[["Part1", 47656575537],["Part2", 7647676],["Part3", 2345678435678]]]];
  }
  ourRequest.send();
}
function fetchPassedStats() {
  document.getElementById('fire_conf').innerHTML = 'Loading';
  document.getElementById('cont_conf').innerHTML = 'Loading';
  document.getElementById('rec_conf').innerHTML = 'Loading';
  var csrf_token = getCookie('csrftoken');
  var ourRequest = new XMLHttpRequest();
  ourRequest.open("POST", "/firewallz/passed_stats/", true);
  ourRequest.setRequestHeader("Content-type", "application/json");
  ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
  ourRequest.onload = function() {
    if (ourRequest.status >= 200 && ourRequest.status < 400) {
      var ourData = JSON.parse(ourRequest.responseText);
      document.getElementById('fire_conf').innerHTML = ourData.fire_conf;
      document.getElementById('cont_conf').innerHTML = ourData.cont_conf;
      document.getElementById('rec_conf').innerHTML = ourData.rec_conf;
      document.getElementById('firewallz_passed_stats_text').innerHTML = ourData.fire_conf;
      document.getElementById('controls_passed_stats_text').innerHTML = ourData.cont_conf;
      document.getElementById('recnacc_passed_stats_text').innerHTML = ourData.rec_conf;
    } else {
      Materialize.toast('Couldn\'t update stats!', 3000, "toast-fetch_error");  
    }
  }
  ourRequest.onerror = function() {
    Materialize.toast('Could not connect to server!', 4000, "toast-fetch_no_connect");
  }
  ourRequest.send('');
}
Pusher.logToConsole = false;
var pusher = new Pusher('9b825df805e0b694cccc', {
  cluster: 'ap2',
  encrypted: true
});

var firewallz_unconfirm_channel = pusher.subscribe('firewallz_unconfirm_channel');
firewallz_unconfirm_channel.bind('firewallz_unconfirm_event', function(data) {
  pusher_updateLeftTable(data);
  fetchPassedStats();
  // Data Format - Same as Firewallz Details View
});
// Controls to RecnAcc Channel
var channel = pusher.subscribe('my-channel');
channel.bind('my-event', function(data) {
  fetchPassedStats();
});
// Below Channel for Data from Controls Unconfirm Socket
var controls_unconfirm_channel = pusher.subscribe('controls_unconfirm_channel');
controls_unconfirm_channel.bind('controls_unconfirm_event', function(data) {
  fetchPassedStats();
});
// Firewallz to Controls Channel
var channel2 = pusher.subscribe('my-channel2');
channel2.bind('my-event2', function(data) {
  fetchPassedStats();
});
// RecnReAcc Channel to RecnAcc Channel
var recnreacc_channel = pusher.subscribe('recnreacc_channel');
recnreacc_channel.bind('recnreacc_event', function(data) {
  fetchPassedStats();
});
// RecnAcc Channel to RecnReAcc Channel
var recnacc_channel = pusher.subscribe('recnacc_channel');
recnacc_channel.bind('recnacc_event', function(data) {
  fetchPassedStats();
});
// RecnDeAcc Channel to RecnDeallocated Channel
var recndeacc_channel = pusher.subscribe('recndeacc_channel');
recndeacc_channel.bind('recndeacc_event', function(data) {
  fetchPassedStats();
});

function sendPusherUpdate(stringObj) {
  var myObj = JSON.parse(stringObj);
  var pk_arr = [];
  var data = myObj.data;
  for (var i = 0; i < data.length; i++) {
    pk_arr.push(data[i].pk);
  }
  var send_obj = {"data": pk_arr};
  var string_obj = JSON.stringify(send_obj);
  var csrf_token = getCookie('csrftoken');
  var ourRequest = new XMLHttpRequest();
  ourRequest.open("POST", "/firewallz/confirm_group_pusher/", true);
  ourRequest.setRequestHeader("Content-type", "application/json");
  ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
  ourRequest.onload = function() {
    if (ourRequest.status >= 200 && ourRequest.status < 400) {
      var ourData = JSON.parse(ourRequest.responseText);
    } else {
      // Nothing
    }
  }
  ourRequest.onerror = function() {
    // Nothing
  }
  ourRequest.send(string_obj);
}
function pusher_updateLeftTable(data) {
  var lefttmp = document.getElementById('left-temp');
  for (var i = 0; i < data.length; i++) {
    document.getElementById("left-body").insertBefore(lefttmp.content.cloneNode(true), document.getElementById("left-body").childNodes[0]);
    document.getElementsByClassName('left-table-name')[0].innerHTML = data[i].fields.name;
    document.getElementsByClassName('left-table-college')[0].innerHTML = data[i].fields.college;
    document.getElementsByClassName('left-table-sport')[0].innerHTML = data[i].fields.sport;
    document.getElementsByClassName('left-table-gender')[0].innerHTML = data[i].fields.gender;
    document.getElementsByClassName('left-table-id')[0].innerHTML = data[i].pk;
  }
}