function reg(sport_name, sport_id, coach, gender, count, lower, upper) {
  document.getElementById('team-sport-lower-limit').innerHTML = lower;
  document.getElementById('team-sport-upper-limit').innerHTML = upper;
  document.getElementById('team-sport-name').innerHTML = sport_name;
  document.getElementById('team-sport-id').innerHTML = sport_id;
  document.getElementById('team-sport-gender').innerHTML = gender;
  if (parseInt(count) > 0) {
    Materialize.toast('You can only Register one team per College.', 4000);
  } else {
    if (sportsJSON == undefined) {
      Materialize.toast('Please Wait for the Sports Data to get Updated!', 2000);
    } else {
      openReg(coach);
    }
  }
}
var team_extra_participant_count = 0;
function openReg(coach) {
  team_extra_participant_count = 0;
  if (coach == true) {
    document.getElementById('sport-team-form').innerHTML = '<div class="row"> <div class="col s12 center"> <a class="waves-effect waves-light btn" onclick="addNewParticipant()"><i class="material-icons left">group_add</i>Add Participant</a> </div></div><div class="row"> <div class="col s12"> <div class="divider"></div></div></div><div class="row" id="submit-team-btn"> <div class="col s12 center"> <a class="waves-effect waves-light btn btn-large" onclick="team_submit()"><i class="material-icons right">send</i>Submit</a> </div></div>';
  } else {
    document.getElementById('sport-team-form').innerHTML = '<div class="row"> <div class="input-field col s12"> <i class="material-icons prefix">record_voice_over</i> <input type="text" name="Coach_Name" id="coach_name_field" class="validate"> <label for="coach_name_field" data-error="Enter Coach Name">Coach Name (Optional)</label> </div></div><div class="row"> <div class="input-field col s12"> <i class="material-icons prefix">email</i> <input type="email" name="Coach_Email" id="coach_email_field" class="validate" required="required"> <label for="coach_email_field" data-error="Enter a Valid Email">E-Mail of Coach (Optional)</label> </div></div><div class="row"> <div class="col s4"> Coach Gender (Optional) </div><div class="col s4"> <input type="radio" name="coach_gender" id="coach_male" value="male"> <label for="coach_male">Male</label> </div><div class="col s4"> <input type="radio" name="coach_gender" id="coach_female" value="female"> <label for="coach_female">Female</label> </div></div><div class="row"> <div class="col s12"> <div class="divider"></div></div></div><div class="row"> <div class="col s12 center"> <a class="waves-effect waves-light btn" onclick="addNewParticipant()"><i class="material-icons left">group_add</i>Add Participant</a> </div></div><div class="row"> <div class="col s12"> <div class="divider"></div></div></div><div class="row" id="submit-team-btn"> <div class="col s12 center"> <a class="waves-effect waves-light btn btn-large" onclick="team_submit()"><i class="material-icons right">send</i>Submit</a> </div></div>';
  }
  document.getElementById('reg').style.display="block";
  setTimeout(function() {
    document.getElementById('reg').style.width="100%";
  }, 10);
}
function closereg(){
  document.getElementById('reg').style.width="0";
  setTimeout(function() {
    document.getElementById('reg').style.display="none";
  }, 800);
}
function addNewParticipant() {
  var sport_id = parseInt(document.getElementById('team-sport-id').innerHTML);
  var gender = document.getElementById('team-sport-gender').innerHTML;
  team_extra_participant_count++;
  var newParticipant = document.createElement('div');
  newParticipant.setAttribute('class', 'row extra_team_participant');
  var template = '<div class="input-field col m6 s12"> <i class="material-icons prefix">person_add</i> <input type="text" name="Participant_Name_' + team_extra_participant_count + '" id="participant_name_field_' + team_extra_participant_count + '" class="validate" required="required"> <label for="participant_name_field_' + team_extra_participant_count + '" data-error="Enter Name of Team Member">Name of Team Member</label> </div><div class="input-field col m6 s12"> <i class="material-icons prefix">local_phone</i> <input type="text" name="Participant_Phone_' + team_extra_participant_count + '" id="participant_phone_field_' + team_extra_participant_count + '" class="validate" required="required" maxlength="10" data-length="10"> <label for="participant_phone_field_' + team_extra_participant_count + '" data-error="Enter Phone Number">Phone Number</label> </div><div class="input-field col m6 s12"> <i class="material-icons prefix">email</i> <input type="email" name="Participant_Email_' + team_extra_participant_count + '" id="participant_email_field_' + team_extra_participant_count + '" class="validate" required="required"> <label for="participant_email_field_' + team_extra_participant_count + '" data-error="Enter Email ID">Email ID</label> </div><div class="input-field col m6 s12"> <i class="material-icons prefix">directions_run</i> <select id="participant_add_sport_select_'+team_extra_participant_count+'" multiple="multiple" name="participant_add_sport_select_'+team_extra_participant_count+'"> <option value="" disabled="disabled" selected="selected"></option> </select> <label for="participant_add_sport_select_'+team_extra_participant_count+'">Add More Sports</label> </div>';
  newParticipant.innerHTML = template;
  document.getElementById('sport-team-form').insertBefore(newParticipant, document.getElementById('submit-team-btn'));
  var avail_sport =[];
  var avail_sport_id = [];
  var j = 0;
  for (var i = 0; i < sportsJSON.length; i++) {
    if (sportsJSON[i].fields.idno != sport_id) {
      if (gender == sportsJSON[i].fields.gender) {
        if (sportsJSON[i].fields.upper == sportsJSON[i].fields.lower == 1) {
          avail_sport[j] = sportsJSON[i].fields.sport;
          avail_sport_id[j++] = sportsJSON[i].fields.idno;
        }
      }
    }
  }
  document.getElementById('participant_add_sport_select_'+team_extra_participant_count+'').innerHTML = '<option value="" disabled="disabled" selected="selected"></option>';
  for (var i = 0; i < avail_sport.length; i++) {
    document.getElementById('participant_add_sport_select_'+team_extra_participant_count+'').innerHTML += '<option value="'+avail_sport_id[i]+'">'+avail_sport[i]+'</option>';
  }
  $('select').material_select();
  Materialize.updateTextFields();
  $("input#participant_phone_field_"+team_extra_participant_count+"").characterCounter();
}
$(document).ready(function() {
  $('.collapsible').collapsible();
  $('select').material_select();
  $('.tap-target').tapTarget('open');
  $('.modal').modal();
  getSports();
});
function team_submit() {
  // Extract All Details
  var sport_name = document.getElementById('team-sport-name').innerHTML;
  var sport_id = parseInt(document.getElementById('team-sport-id').innerHTML);
  var gender = document.getElementById('team-sport-gender').innerHTML;
  // Check if all reequired fields are filled
  var team_formData = serializeArray(document.getElementById('sport-team-form'));
  var team_coach_name = '';
  var team_coach_email = '';
  var team_coach_gender = '';
  var j = 0;
  if (team_formData[0].name == 'Coach_Name') {
    team_coach_name = team_formData[0].value;
    team_coach_email = team_formData[1].value;
    if (team_formData[2] != undefined && team_formData[2].name == 'coach_gender') {
      team_coach_gender = team_formData[2].value;
      j=3;
    } else {
      j=2;
    }
  }
  var k = j;
  var num_extra_participants = document.getElementsByClassName('extra_team_participant').length;
  if (team_formData.length > j) {
    while(team_formData[j].name != "participant_add_sport_select_"+team_extra_participant_count+"") {
      j++;
    }
    while(team_formData[j].name == "participant_add_sport_select_"+team_extra_participant_count+"") {
      j++;
      if (team_formData[j] == undefined) {
        break;
      }
    }
  }
  var extra_participants_details = [];
  console.log(team_formData);
  for (var i = 1; i < team_extra_participant_count+1; i++) {
    var extra_name = team_formData[k++].value;
    var extra_phone = team_formData[k++].value;
    var extra_email = team_formData[k++].value;
    var extra_sports = [];
    var l = 0;
    while((team_formData[k].name == "participant_add_sport_select_"+i+"")) {
      k++;
      if (l == 0) {
        extra_sports.push(sport_id);
        l++;
      } else {
        extra_sports.push(parseInt(team_formData[k-1].value));
      }
      if (team_formData[k] == undefined) {
        break;
      }
    }
    extra_participants_details.push({
      "name": extra_name,
      "phone": extra_phone,
      "email": extra_email,
      "sports": extra_sports
    });
  }
  var check_extra_details = true;
  var check_extra_participants_phone = true;
  var check_extra_participants_email = true;
  for (var i = 0; i < num_extra_participants; i++) {
    if (!validatePhoneNumber(extra_participants_details[i].phone)) {
      check_extra_participants_phone = false;
      break;
    }
    if (!validateEmail(extra_participants_details[i].email)) {
      check_extra_participants_email = false;
      break;
    }
    if (extra_participants_details[i].name=='' || extra_participants_details[i].phone=='' || extra_participants_details[i].email=='') {
      check_extra_details = false;
      break;
    }
  }
  if ((team_coach_name != '' || team_coach_email != '') && team_coach_gender == '') {
    Materialize.toast('Must fill all Coach Fields!', 4000);
  } else if((team_coach_name == '' || team_coach_email == '') && team_coach_gender != '') {
    Materialize.toast('Must fill all Coach Fields!', 4000);
  } else if (team_coach_name != '' && !validateEmail(team_coach_email)) {
    Materialize.toast('Coach Email is Wrong!',4000);
  } else if (!check_extra_participants_phone || !check_extra_participants_email) {
    Materialize.toast('One or more Email/Phone Number(s) are Wrong', 4000);
  } else if (check_extra_details) {
    // Proceed With Upper and Lower Limit Checks Further
    var lower_limit = parseInt(document.getElementById('team-sport-lower-limit').innerHTML) - 1;
    var upper_limit = parseInt(document.getElementById('team-sport-upper-limit').innerHTML) - 1;
    var total_participants = num_extra_participants;
    if (total_participants < lower_limit || total_participants > upper_limit) {
      Materialize.toast('Total Number of Additional Participants should be between '+lower_limit+' and '+upper_limit, 4000);
    } else {
      // Create User Model
      closereg();
      data = {
        "sport_name": sport_name,
        "sport_id": sport_id,
        "gender": gender,
        "coach_name": team_coach_name,
        "coach_email": team_coach_email,
        "coach_gender": team_coach_gender,
        "participants": extra_participants_details,
        "lower": lower_limit,
        "higher": upper_limit
      };
      createUserModel(data, num_extra_participants);
    }
  }
  else {
    // Display Error Toast that all fields are not filled.
    Materialize.toast('Please Fill All Required fields before proceeding!', 4000);
  }
}
// To get list of names of person in the registered section
function getlist(sport) {
  var sport_id= sport.parentElement.parentElement.children[0].children[1].innerHTML;
  if (sport.parentElement.children[3].getAttribute('id')=='list') {
    sport.parentElement.children[3].innerHTML="";
  } else {
    sport.parentElement.children[4].innerHTML="";
  }
  getSportParticipants(sport_id, sport);
}
function createUserModel(data, numPart) {
  var backend_data = {
    "users": [],
    "csrftoken": []
  };
  if (data.lower==data.higher==1) {
    backend_data["users"].push({
      "captain": 0,
      "coach": 0,
      "sport_id": data.sport_id,
      "name": data.captain_name,
      "email": data.captain_email,
      "phone": data.captain_phone,
      "gender": data.gender
    });
  } else {
    for (var i = 0; i < data.participants.length; i++) {
      backend_data["users"].push({
        "captain": 0,
        "coach": 0,
        "sport_id": data.participants[i].sports,
        "name": data.participants[i].name,
        "email": data.participants[i].email,
        "phone": data.participants[i].phone,
        "gender": data.gender
      });
    }
  }
  if (data.coach_name != '') {
    var sport_arr = [];
    sport_arr.push(data.sport_id);
    backend_data["users"].push({
      "captain": 0,
      "coach": data.sport_id,
      "sport_id": sport_arr,
      "name": data.coach_name,
      "email": data.coach_email,
      "phone": 0,
      "gender": data.coach_gender
    });
  }
  var csrf_token = getCookie('csrftoken');
  backend_data["csrftoken"].push({
    "csrfmiddlewaretoken": csrf_token
  });
  sendUsers(backend_data);
}
var add_team_participants_count = 0;
function addTeamParticipants(sport, gender) {
  if (sportsJSON == undefined) {
    Materialize.toast('Please Wait for the Sports Data to get Updated!', 3000);
  } else {
    var sport_id= sport.parentElement.parentElement.children[0].children[1].innerHTML;
    $('#add-team-participants-modal').modal('open');
    document.getElementById('add_team_participants_div').innerHTML = '<div class="row"> <form class="col s12" id="sport-extra-form"> <div class="row" id="submit-add-team-part-btn"> <div class="col s12 center"> <a class="waves-effect waves-light btn btn-large" onclick="addTeamPartSubmit(\'Male/Female\')" id="add_team_parts_btn"><i class="material-icons right">send</i>Submit</a> </div></div></form> </div>';
    document.getElementById('add_team_parts_btn').setAttribute('onclick', 'addTeamPartSubmit('+sport_id+',\''+gender+'\')');
    add_team_participants_count = 0
    addNewTeamParticipant(sport_id, '\''+gender+'\'');
  }
}
function addNewTeamParticipant(sport_id, gender) {
  add_team_participants_count++;
  var newParticipant = document.createElement('div');
  newParticipant.setAttribute('class', 'row team_extra_team_participant');
  var template = '<div class="input-field col m6 s12"> <i class="material-icons prefix">person_add</i> <input type="text" name="team_Participant_Name_' + add_team_participants_count + '" id="team_participant_name_field_' + add_team_participants_count + '" class="validate" required="required"> <label for="team_participant_name_field_' + add_team_participants_count + '" data-error="Enter Name of Team Member">Name of Team Member</label> </div><div class="input-field col m6 s12"> <i class="material-icons prefix">local_phone</i> <input type="text" name="team_Participant_Phone_' + add_team_participants_count + '" id="team_participant_phone_field_' + add_team_participants_count + '" class="validate" required="required" maxlength="10" data-length="10"> <label for="team_participant_phone_field_' + add_team_participants_count + '" data-error="Enter Phone Number">Phone Number</label> </div><div class="input-field col m6 s12"> <i class="material-icons prefix">email</i> <input type="email" name="team_Participant_Email_' + add_team_participants_count + '" id="team_participant_email_field_' + add_team_participants_count + '" class="validate" required="required"> <label for="team_participant_email_field_' + add_team_participants_count + '" data-error="Enter Email ID">Email ID</label> </div><div class="input-field col m6 s12"> <i class="material-icons prefix">directions_run</i> <select id="team_participant_add_sport_select_'+add_team_participants_count+'" multiple="multiple" name="team_participant_add_sport_select_'+add_team_participants_count+'"> <option value="" disabled="disabled" selected="selected"></option> </select> <label for="team_participant_add_sport_select_'+add_team_participants_count+'">Add More Sports</label> </div>';
  newParticipant.innerHTML = template;
  document.getElementById('sport-extra-form').insertBefore(newParticipant, document.getElementById('submit-add-team-part-btn'));
  var avail_sport =[];
  var avail_sport_id = [];
  var j = 0;
  for (var i = 0; i < sportsJSON.length; i++) {
    if (sportsJSON[i].fields.idno != sport_id) {
      if (gender == '\''+sportsJSON[i].fields.gender+'\'') {
        if (sportsJSON[i].fields.upper == sportsJSON[i].fields.lower == 1) {
          avail_sport[j] = sportsJSON[i].fields.sport;
          avail_sport_id[j++] = sportsJSON[i].fields.idno;
        }
      }
    }
  }
  document.getElementById('team_participant_add_sport_select_'+add_team_participants_count+'').innerHTML = '<option value="" disabled="disabled" selected="selected"></option>';
  for (var i = 0; i < avail_sport.length; i++) {
    document.getElementById('team_participant_add_sport_select_'+add_team_participants_count+'').innerHTML += '<option value="'+avail_sport_id[i]+'">'+avail_sport[i]+'</option>';
  }
  $('select').material_select();
  Materialize.updateTextFields();
  $("input#team_participant_phone_field_"+add_team_participants_count+"").characterCounter();
}
function addTeamPartSubmit(sport_id, gender) {
  var extraFormData = serializeArray(document.getElementById('sport-extra-form'));
  var name = extraFormData[0].value;
  var phone = extraFormData[1].value;
  var email = extraFormData[2].value;
  var extra_sports = [];
  var j = 3;
  while(extraFormData[j].name == "team_participant_add_sport_select_1") {
    if (j == 3) {
      extra_sports.push(sport_id);
    } else {
      extra_sports.push(parseInt(extraFormData[j].value));
    }
    j++;
    if (extraFormData[j] == undefined) {
      break;
    }
  }
  if (!validateEmail(email) || !validatePhoneNumber(phone)) {
    Materialize.toast('Entered Email/Phone Number is Wrong!', 4000);
  } else if (name == '') {
    Materialize.toast('Please Fill all the Fields!', 4000);
  } else {
    var data = {
      "name": name,
      "phone": phone,
      "email": email,
      "sport_id": extra_sports,
      "gender": gender
    }
    sendExtraParticipants(data);
    $('#add-team-participants-modal').modal('close');
  }
}
function editname(sport_id, participant) {
  $('#modal1').modal('open');
  document.getElementById("modal-names").innerHTML="";
  document.getElementById("modal-names").innerHTML="<li><input type='text' class='input-field' id='newName' placeholder=\""+participant+"\"></li>";
  Materialize.updateTextFields();
  oldName = participant;
}
var oldName;
// AJAX Functions
function sendEdit() {
  var newName = document.getElementById('newName').value;
  var csrf_token = getCookie('csrftoken');
  var data = {
    "oldName": oldName,
    "newName": newName,
    "csrfmiddlewaretoken": csrf_token
  }
  var data_send = JSON.stringify(data);
  Materialize.toast('Saving Participants!', 2000);
  var ajaxRequest = new XMLHttpRequest();
  var url = 'url';
  ajaxRequest.open("POST", url, true);
  ajaxRequest.setRequestHeader("Content-type", "application/json");
  ajaxRequest.setRequestHeader("X-CSRFToken", csrf_token);
  ajaxRequest.onreadystatechange = function() {
    if (ajaxRequest.readyState === 4 && ajaxRequest.status === 200) {
      var jsonResponse = JSON.parse(ajaxRequest.responseText);
      if (jsonResponse.error != null) {
        triggerError(jsonResponse.error);
      } else {
        Materialize.toast('Your Partipants have been Saved!', 2000);
        getSports();
      }
    } else if (ajaxRequest.readyState === 4 && ajaxRequest.status != 200) {
      Materialize.toast('Error While Saving!', 2000);
    }
  }
  ajaxRequest.send(data_send);
  console.log(data);
}
function sendUsers(data) {
  console.log(data);
  var csrf_token = getCookie('csrftoken');
  var send_data = JSON.stringify(data);
  Materialize.toast('Saving Participants!', 2000);
  var ajaxRequest = new XMLHttpRequest();
  var url = 'url';
  ajaxRequest.open("POST", url, true);
  ajaxRequest.setRequestHeader("Content-type", "application/json");
  ajaxRequest.setRequestHeader("X-CSRFToken", csrf_token);
  ajaxRequest.onreadystatechange = function() {
    if (ajaxRequest.readyState === 4 && ajaxRequest.status === 200) {
      var jsonResponse = JSON.parse(ajaxRequest.responseText);
      if (jsonResponse.error != null) {
        triggerError(jsonResponse.error);
      } else {
        Materialize.toast('Your Partipants have been Saved!', 2000);
        getSports();
      }
    } else if (ajaxRequest.readyState === 4 && ajaxRequest.status != 200) {
      Materialize.toast('Error While Saving!', 2000);
    }
  }
  ajaxRequest.send(send_data);
}
function sendExtraParticipants(data) {
  var csrf_token = getCookie('csrftoken');
  var send_data = JSON.stringify(data);
  Materialize.toast('Saving Participants!', 2000);
  var ajaxRequest = new XMLHttpRequest();
  var url = 'url';
  ajaxRequest.open("POST", url, true);
  ajaxRequest.setRequestHeader("Content-type", "application/json");
  ajaxRequest.setRequestHeader("X-CSRFToken", csrf_token);
  ajaxRequest.onreadystatechange = function() {
    if (ajaxRequest.readyState === 4 && ajaxRequest.status === 200) {
      var jsonResponse = JSON.parse(ajaxRequest.responseText);
      if (jsonResponse.error != null) {
        triggerError(jsonResponse.error);
      } else {
        Materialize.toast('Your Partipants have been Saved!', 2000);
        getSports();
      }
    } else if (ajaxRequest.readyState === 4 && ajaxRequest.status != 200) {
      Materialize.toast('Error While Saving!', 2000);
    }
  }
  ajaxRequest.send(send_data);
  console.log(data);
}
var sportsJSON;
function getSports() {
  Materialize.toast('Fetching Sports Data', 2000);
  var csrf_token = getCookie('csrftoken');
  var data = {
    "csrfmiddlewaretoken": csrf_token
  };
  var data_send = JSON.stringify(data);
  var ajaxRequest = new XMLHttpRequest();
  var url = 'https://api.myjson.com/bins/1bsp6z';
  ajaxRequest.open("GET", url, true);
  ajaxRequest.setRequestHeader("Content-type", "application/json");
  //ajaxRequest.setRequestHeader("X-CSRFToken", csrf_token);
  ajaxRequest.onreadystatechange = function() {
    if (ajaxRequest.readyState === 4 && ajaxRequest.status === 200) {
        var sportsData = JSON.parse(ajaxRequest.responseText);
        if (sportsData.error != null) {
          triggerError(sportsData.error);
        } else {
          sportsJSON = sportsData // Store for future use.
          Materialize.toast('Sports Data Updated!', 2000);
        }
    } else if (ajaxRequest.readyState === 4 && ajaxRequest.status != 200) {
      Materialize.toast('Error Fetching Data!', 2000);
    }
  }
  ajaxRequest.send(data_send);
}
// Call this function to fetch Sport Participants of a particular sport_id
function getSportParticipants(sport_id, sport) {
  Materialize.toast('Fetching Participants Details', 2000);
  var csrf_token = getCookie('csrftoken');
  var data = {
    "sport_id": sport_id,
    "csrfmiddlewaretoken": csrf_token
  };
  var data_send = JSON.stringify(data);
  var ajaxRequest = new XMLHttpRequest();
  var url = 'https://api.myjson.com/bins/1ggsw3';
  ajaxRequest.open("GET", url, true);
  ajaxRequest.setRequestHeader("Content-type", "application/json");
  //ajaxRequest.setRequestHeader("X-CSRFToken", csrf_token);
  ajaxRequest.onreadystatechange = function() {
    if (ajaxRequest.readyState === 4 && ajaxRequest.status === 200) {
        var participantsDetails = JSON.parse(ajaxRequest.responseText);
        if (participantsDetails.error != null) {
          triggerError(participantsDetails.error)
        } else {
          // Use the Participants Details fetched below.
          var people = participantsDetails;
          // A function to get the list of people who have been enrolled in the sport of sport_id and store in an array;
          for(var x in people) {
            if(sport_id!=people[x].captain) {
              if (sport.parentElement.children[3].getAttribute('id')=='list') {
                sport.parentElement.children[3].innerHTML+="<li class='people'>"+people[x].name+"<span class='edit-name-icon badge black-text' onclick='editname("+sport_id+",\""+people[x].name+"\")'><i class='material-icons'>edit</i></span></li>";
              } else {
                sport.parentElement.children[4].innerHTML+="<li class='people'>"+people[x].name+"<span class='edit-name-icon badge black-text' onclick='editname("+sport_id+",\""+people[x].name+"\")'><i class='material-icons'>edit</i></span></li>";
              }
            }
            else {
              if (sport.parentElement.children[3].getAttribute('id')=='list') {
                sport.parentElement.children[3].innerHTML+="<li class='people'>"+people[x].name+"</li>";
              } else {
                sport.parentElement.children[4].innerHTML+="<li class='people'>"+people[x].name+"</li>";
              }
            }
          }
          Materialize.toast('Updated!', 2000);
        }
    } else if (ajaxRequest.readyState === 4 && ajaxRequest.status != 200) {
      Materialize.toast('Error Fetching Details!', 2000);
    }
  }
  ajaxRequest.send(data_send);
}
// End AJAX Functions
function triggerError(msg) {
  $('#error-modal').modal('open');
  document.getElementById('error-msg').innerHTML = msg;
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
function validateEmail(mail)   
{
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {  
    return true;  
  }
  return false;
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
function getCookie(name) {
  var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return v ? v[2] : null;
}