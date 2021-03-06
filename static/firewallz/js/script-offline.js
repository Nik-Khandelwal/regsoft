$(document).ready(function() {
  fetchParticipants();
  $('.modal').modal();
});
function fetchParticipants() {
  Materialize.toast('Updating Participants List!', 4000, "toast-fetch");
  reset_sort_icons();
  reset_sort_col_color();
  var ourRequest = new XMLHttpRequest();
  var url = "https://api.myjson.com/bins/r555j";
  ourRequest.open("GET", url, true);
  ourRequest.setRequestHeader("Content-type", "application/json");
  // ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
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
  if (elem.innerHTML == "check_box") {
    elem.innerHTML = "check_box_outline_blank";
    elem.parentElement.parentElement.setAttribute('class', 'left-table-rows');
  } else {
    elem.innerHTML = "check_box";
    elem.parentElement.parentElement.setAttribute('class', 'left-table-rows selectedLeftRow');
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
      showGroupCode(groupCode);
      resetTables();
      fetchParticipants();
    } else if (ourRequest.readyState === 4 && ourRequest.status != 200) {
      Materialize.toast('There was some error connecting to the server!', 3000);
      showGroupCode('RANDOM');
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
function showGroupCode(code) {
  document.getElementById('confirm_text').innerHTML = 'GROUPCODE<br><br><b>'+code+'</b>';
  document.getElementById('group_confirm_btn1').style.display = 'none';
  document.getElementById('group_confirm_btn2').style.display = 'none';
  document.getElementById('group_confirm_btn3').style.display = 'inline-block';
  $('#confirm_dialog').modal('open');
}
function addParticipant() {
  resetAddForm();
  $('#add_participant_modal').modal('open');
}
function resetAddForm() {
  document.getElementById('add_participant_modal').innerHTML = '<div class="row"> <form class="col s12" id="add_participant_form"> <div class="row"> <div class="input-field col s12"> <i class="material-icons prefix">person</i> <input type="text" name="Indi_Captain_Name" id="indi_captain_name_field" class="validate" required="required"> <label for="indi_captain_name_field" data-error="Enter Name of Participant">Name of Participant</label> </div></div><div class="row"> <div class="input-field col s12"> <i class="material-icons prefix">business</i> <input type="text" name="Indi_College_Name" id="indi_college_name_field" class="validate" required="required"> <label for="indi_college_name_field" data-error="Enter College of Participant">College Name</label> </div></div><div class="row"> <div class="input-field col m6 s12"> <i class="material-icons prefix">location_city</i> <input type="text" name="City" id="city_field" class="validate" required="required"> <label for="city_field" data-error="Enter your City">City</label> </div><div class="input-field col m6 s12"> <i class="material-icons prefix">location_on</i> <input type="text" name="State" id="state_field" class="validate" required="required"> <label for="state_field" data-error="Enter your State">State</label> </div></div><div class="row"> <div class="input-field col s12"> <i class="material-icons prefix">email</i> <input type="email" name="Indi_Captain_Email" id="indi_captain_email_field" class="validate" required="required"> <label for="indi_captain_email_field" data-error="Enter a Valid Email">E-Mail of Participant</label> </div></div><div class="row"> <div class="input-field col s12"> <i class="material-icons prefix">local_phone</i> <input type="text" name="Indi_Captain_Phone" id="indi_captain_phone_field" class="validate" required="required" maxlength="10" data-length="10"> <label for="indi_captain_phone_field" data-error="Enter Phone Number">Participant Phone Number</label> </div></div><div class="row"> <div class="input-field col s12"> <i class="material-icons prefix">directions_run</i> <select id="participant_sport_select" multiple="multiple"> <option value="" disabled="disabled" selected="selected"></option> </select> <label for="indi_sport_field" data-error="Enter Sport of Participant">Sport</label> </div></div><div class="row"> <div class="col s4 center"> Gender </div><div class="col s4 center"> <input type="radio" name="indi_gender" id="indi_male" value="Male"> <label for="indi_male">Male</label> </div><div class="col s4 center"> <input type="radio" name="indi_gender" id="indi_female" value="Female"> <label for="indi_female">Female</label> </div></div><div class="row" id="submit-indi-btn"> <div class="col s12 center"> <a class="waves-effect waves-light btn btn-large" onclick="addParticipantSubmit()"><i class="material-icons right">send</i>Submit</a> </div></div></form> </div>';
  $('select').material_select();
  Materialize.updateTextFields();
  $("input#indi_captain_phone_field").characterCounter();
  fetchSportList();
}
function fetchSportList() {
  csrf_token = getCookie('csrftoken');
  var ourRequest = new XMLHttpRequest();
  var url = "/firewallz/sportlist/";
  ourRequest.open("POST", url, true);
  ourRequest.setRequestHeader("Content-type", "application/json");
  ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
  ourRequest.onreadystatechange = function() {
    if (ourRequest.readyState === 4 && ourRequest.status === 200) {
      var json = JSON.parse(ourRequest.responseText);
    } else if (ourRequest.readyState === 4 && ourRequest.status != 200) {
      Materialize.toast('There was some error connecting to the server!', 3000);
      var sport = [{"pk": 1, "sport": "Basketball"},{"pk": 2, "sport": "Badminton Boys"},{"pk": 3, "sport": "Cricket Girls"}];
      document.getElementById('participant_sport_select').innerHTML = '<option value="" disabled="disabled" selected="selected"></option>';
      for (var i = 0; i < sport.length; i++) {
        document.getElementById('participant_sport_select').innerHTML += '<option value="'+sport[i].pk+'">'+sport[i].sport+'</option>';
      }
      $('select').material_select();
      Materialize.updateTextFields();
    }
  };
  ourRequest.send('');
}
function addParticipantSubmit() {
  var formData = serializeArray(document.getElementById('add_participant_form'));
  var participant_name = formData[0].value;
  var participant_college = formData[1].value;
  var participant_city = formData[2].value;
  var participant_state = formData[3].value;
  var participant_email = formData[4].value;
  var participant_phone = formData[5].value;
  var participant_sport = $('#participant_sport_select').val();
  var participant_gender = '';
  if (formData.length > 6) {
    participant_gender = formData[6].value;
  }

  if (participant_gender == '') {
    Materialize.toast('Please Enter Participants Gender!', 3000);
  } else if (!validateEmail(participant_email) || !validatePhoneNumber(participant_phone)) {
    Materialize.toast('Email/Phone Number is Wrong', 3000);
  } else if (participant_name && participant_college && participant_city && participant_state && participant_email && participant_phone && participant_sport) {
    // Submit Form to Backend
    Materialize.toast('Adding Participant, Please Wait!', 4000);
    var newParticipant = {
      "data": [],
      "csrftoken": []
    };
    newParticipant["data"].push({
      "name": participant_name,
      "college": participant_college,
      "city": participant_city,
      "state": participant_state,
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
        // Obtain PK of the Participant just registered
        var details = [];
        var data = {
          "fields": {
            "name": participant_name,
            "college": participant_college,
            "sport": participant_sport,
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
    document.getElementsByClassName('sort-icon')[col].setAttribute('src', 'firewallz/icons/sort-desc.svg');
    for (var i = 0; i < 4; i++) {
      if (i != col) {
        document.getElementsByClassName('sort-icon')[i].setAttribute('class', 'sort-icon');
        document.getElementsByClassName('sort-icon')[i].setAttribute('src', 'firewallz/icons/sort.svg');
      }
    }
    chng_sort_col_color(col);
  } else {
    // Sort in Ascending Order
    sortData(0, col);

    document.getElementsByClassName('sort-icon')[col].setAttribute('class', 'sort-icon sort-asc');
    document.getElementsByClassName('sort-icon')[col].setAttribute('src', 'firewallz/icons/sort-asc.svg');
    for (var i = 0; i < 4; i++) {
      if (i != col) {
        document.getElementsByClassName('sort-icon')[i].setAttribute('class', 'sort-icon');
        document.getElementsByClassName('sort-icon')[i].setAttribute('src', 'firewallz/icons/sort.svg');
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
    document.getElementsByClassName('sort-icon')[i].setAttribute('src', 'firewallz/icons/sort.svg');
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