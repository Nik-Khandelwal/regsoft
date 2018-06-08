$(document).ready(function() {
  $('.collapsible').collapsible();
  $('select').material_select();
  $('.tap-target').tapTarget('open');
  $('.modal').modal();
  getSports();
});
var add_team_participants_count = 0;
var participantsSaved = 1;
function addTeamParticipants(sport, gender) {
  if (participantsSaved != 1) {
    Materialize.toast('Please wait while particiapnts are saved and updated!', 3000);
  } else {
    var sport_id= sport.parentElement.parentElement.children[0].children[1].innerHTML;
    var count = parseInt(sport.parentElement.parentElement.children[1].children[0].children[1].children[0].innerHTML);
    var lower, upper;
    data = sportsJSON;
    for (var x in data){
      if(data[x].fields.idno==sport_id){
        lower = data[x].fields.lower;
        upper = data[x].fields.upper;
        break;
      }
    }
    if (count>=upper) {
      Materialize.toast('You have reached the maximum number of participants allowed for this Sport!', 3000);
    } else {
      add_team_participants_count = 0;
      $('#add-team-participants-modal').modal('open');
      document.getElementById('add_team_participants_div').innerHTML = '<div class="row"> <form class="col s12" id="sport-extra-form"> <div class="row" id="submit-add-team-part-btn"> <div class="col s12 center"> <a class="waves-effect waves-light btn btn-large" onclick="addTeamPartSubmit(\'Male/Female\')" id="add_team_parts_btn"><i class="material-icons right">send</i>Submit</a> </div></div></form> </div>';
      document.getElementById('add_team_parts_btn').setAttribute('onclick', 'addTeamPartSubmit('+sport_id+',\''+gender+'\')');
      document.getElementById('add_parts_btn').setAttribute('onclick', 'addNewTeamParticipant('+sport_id+',\''+gender+'\')');
    }
  }
}
function addNewTeamParticipant(sport_id, gender) {
  add_team_participants_count++;
  var newParticipant = document.createElement('div');
  newParticipant.setAttribute('class', 'row team_extra_team_participant');
  var template = '<div class="input-field col m6 s12"> <i class="material-icons prefix">person_add</i> <input type="text" maxlength="100" name="team_Participant_Name_' + add_team_participants_count + '" id="team_participant_name_field_' + add_team_participants_count + '" class="validate" required="required"> <label for="team_participant_name_field_' + add_team_participants_count + '" data-error="Enter Name of Team Member">Name of Team Member</label> </div><div class="input-field col m6 s12"> <i class="material-icons prefix">local_phone</i> <input type="text" name="team_Participant_Phone_' + add_team_participants_count + '" id="team_participant_phone_field_' + add_team_participants_count + '" class="validate" required="required" maxlength="10" data-length="10"> <label for="team_participant_phone_field_' + add_team_participants_count + '" data-error="Enter Phone Number">Phone Number</label> </div><div class="input-field col m6 s12"> <i class="material-icons prefix">email</i> <input type="email" maxlength="100" name="team_Participant_Email_' + add_team_participants_count + '" id="team_participant_email_field_' + add_team_participants_count + '" class="validate" required="required"> <label for="team_participant_email_field_' + add_team_participants_count + '" data-error="Enter Email ID">Email ID</label> </div><div class="input-field col m6 s12"> <i class="material-icons prefix">directions_run</i> <select id="team_participant_add_sport_select_'+add_team_participants_count+'" multiple="multiple" name="team_participant_add_sport_select_'+add_team_participants_count+'"> <option value="" disabled="disabled" selected="selected"></option> </select> <label for="team_participant_add_sport_select_'+add_team_participants_count+'">Add More Sports</label> </div><div class="row"> <div class="col s3 white-text"> Register As </div><div class="col s3"> <input type="radio" name="team_Participant_Register_As_' + add_team_participants_count + '" id="team_Participant_Register_As_Captain_' + add_team_participants_count + '" value="Captain"> <label for="team_Participant_Register_As_Captain_' + add_team_participants_count + '">Captain</label> </div><div class="col s3"> <input type="radio" name="team_Participant_Register_As_' + add_team_participants_count + '" id="team_Participant_Register_As_Participant_' + add_team_participants_count + '" value="Participant"> <label for="team_Participant_Register_As_Participant_' + add_team_participants_count + '">Participant</label> </div><div class="col s3"> <input type="radio" name="team_Participant_Register_As_' + add_team_participants_count + '" id="team_Participant_Register_As_Coach_' + add_team_participants_count + '" value="Coach"> <label for="team_Participant_Register_As_Coach_' + add_team_participants_count + '">Coach</label> </div></div>';
  newParticipant.innerHTML = template;
  document.getElementById('sport-extra-form').insertBefore(newParticipant, document.getElementById('submit-add-team-part-btn'));
  var avail_sport =[];
  var avail_sport_id = [];
  var j = 0;
  for (var i = 0; i < sportsJSON.length; i++) {
    if (sportsJSON[i].fields.idno != sport_id) {
      if (gender == sportsJSON[i].fields.gender) {
        avail_sport[j] = sportsJSON[i].fields.sport;
        avail_sport_id[j++] = sportsJSON[i].fields.idno;
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
function deleteTeamParticipants() {
  var parentNode = document.getElementById('sport-extra-form');
  var childNode = document.getElementsByClassName('team_extra_team_participant')[document.getElementsByClassName('team_extra_team_participant').length - 1];
  if (document.getElementsByClassName('team_extra_team_participant').length > 0) {
    add_team_participants_count--;
    parentNode.removeChild(childNode);
  }
}
// To get list of names of person in the registered section
function getlist(sport){
  var sport_id= sport.parentElement.parentElement.children[0].children[1].innerHTML;
  if (sport.parentElement.children[3].getAttribute('id')=='list') {
    sport.parentElement.children[3].innerHTML="";
  } else {
    sport.parentElement.children[4].innerHTML="";
  }
  getSportParticipants(sport_id, sport);
}
var backend_data = {
  "users": [],
  "csrftoken": []
};
var coachData = {};
function addTeamPartSubmit(sport_id, gender) {
  backend_data = {
    "users": [],
    "csrftoken": []
  };
  coachData = {};
  var extraFormData = serializeArray(document.getElementById('sport-extra-form'));
  var i = 1;
  var radioNotSelected = 0;
  while(i<=add_team_participants_count) {
    for (var j = 0; j < extraFormData.length; j++) {
      if(extraFormData[j].name == 'team_participant_add_sport_select_'+i+'') {
        while(extraFormData[j+1] != undefined && extraFormData[j+1].name == 'team_participant_add_sport_select_'+i+'') {
          j++;
        }
        j++;
        if (extraFormData[j] != undefined) {
        }
        
        if (extraFormData[j] != undefined && extraFormData[j].name == 'team_Participant_Register_As_'+i+'') {
          // Do Nothing
        } else {
          radioNotSelected = 1;
          break;
        }
      }
    }
    i++;
  }
  if (radioNotSelected == 1) {
    Materialize.toast('Please select Register As Type for all Participants!', 3000);
  } else {
    var readySend = 1;
    var errorPhone = 0;
    var errorEmail = 0;
    var l =0;
    var no_captains = 0;
    var no_coachs = 0;
    console.log(i);
    for (var k = 0; k < i; k++) {
      console.log('K1:' + k);
      while(extraFormData[l+1] != undefined) {
        k++;
        console.log('K2:' + k);
        var captain = 0;
        var coach = 0;
        console.log('Name: ' + extraFormData[l].value);
        var name = extraFormData[l++].value;
        if (name == "") {
          readySend = 0;
        }
        console.log('Phone: ' + extraFormData[l].value);
        var phone = extraFormData[l++].value;
        if (!validatePhoneNumber(phone)) {
          readySend = 0;
          errorPhone = 1;
        }
        console.log('Email: ' + extraFormData[l].value);
        var email = extraFormData[l++].value;
        if (!validateEmail(email)) {
          readySend = 0;
          errorEmail = 1;
        }
        var sportsArr = [];
        sportsArr.push(sport_id);
        console.log('Sports Blank: ' + extraFormData[l].value);
        if(extraFormData[l].name == 'team_participant_add_sport_select_'+k+'') {
          while(extraFormData[l+1] != undefined && extraFormData[l++].name == 'team_participant_add_sport_select_'+k+'') {
            if (extraFormData[l-1].value != "") {
              sportsArr.push(parseInt(extraFormData[l-1].value));
            }
            console.log('Sports: ' + extraFormData[l-1].value);
          }
          l--;
          if (k == (i-1)) {
            l++;
          }
          console.log('L:' + l);
          console.log('Register Type: ' + extraFormData[l].value);
          if (extraFormData[l].value == "Captain") {
            captain = sport_id;
            no_captains++;
          } else if (extraFormData[l].value == "Coach") {
            coach = sport_id;
            no_coachs++;
            coachData = {
              "captain": captain,
              "coach": coach,
              "name": name,
              "phone": phone,
              "email": email,
              "sport_id": sportsArr,
              "gender": gender
            }
          }
        }
        console.log('L2:' + l);
        l++;
        console.log('L3:' + l);
        if (coach == 0) {
          var data = {
            "captain": captain,
            "coach": coach,
            "name": name,
            "phone": phone,
            "email": email,
            "sport_id": sportsArr,
            "gender": gender
          }
          backend_data["users"].push(data);
        }
      }
      console.log('No of Captains: ' + no_captains);
      console.log('No of Coaches: ' + no_coachs);
    }
    if (readySend == 0) {
      // Handle Exception
      if (errorPhone == 1) {
        Materialize.toast('Incorrect Phone Fields!', 3000);
      } else if (errorEmail == 1) {
        Materialize.toast('Incorrect Email Fields!', 3000);
      } else {
        Materialize.toast('Please Fill All Fields!', 3000);
      }
    } else if (no_captains > 1 || no_coachs > 1) {
      Materialize.toast("You cannot have more than one captain/coach in a sport!", 3000);
    } else {
      console.log(backend_data);
      $('#add-team-participants-modal').modal('close');
      if (coachData.name != undefined) {
        resetCoachGenderForm();
        $('#coach-gender-modal').modal('open');
      } else {
        sendUsersData();
      }
    }
  }
}
function submitCoachData() {
  var coachFormData = serializeArray(document.getElementById('select_coach_gender_form'));
  if (coachFormData.length == 0) {
    Materialize.toast('Please select Coach Gender!', 3000);
  } else {
    coachData.gender = coachFormData[0].value;
    backend_data["users"].push(coachData);
    $('#coach-gender-modal').modal('close');
    sendUsersData();
  }
}
function resetCoachGenderForm() {
  document.getElementById('select_coach_gender_form').innerHTML='<div class="row"> <div class="col s4 white-text"> Coach Gender </div><div class="col s4"> <input type="radio" name="select_coach_gender" id="select_coach_male" value="male"> <label for="select_coach_male">Male</label> </div><div class="col s4"> <input type="radio" name="select_coach_gender" id="select_coach_female" value="female"> <label for="select_coach_female">Female</label> </div></div><div class="row" id="select_coach_gender_form_btn"> <div class="col s12 center"> <a class="waves-effect waves-light btn btn-large" onclick="submitCoachData()" id="add_team_parts_btn"><i class="material-icons right">send</i>Submit</a> </div></div>';
}
// Start AJAX Functions
var sportsReady = 0;
var sportsJSON;
function getSports() {
  Materialize.toast('Fetching Sports Data', 2000);
  var csrf_token = getCookie('csrftoken');
  var data = {
    "csrfmiddlewaretoken": csrf_token
  };
  var data_send = JSON.stringify(data);
  var ajaxRequest = new XMLHttpRequest();
  var url = 'sportlist/';
  ajaxRequest.open("POST", url, true);
  ajaxRequest.setRequestHeader("Content-type", "application/json");
  ajaxRequest.setRequestHeader("X-CSRFToken", csrf_token);
  ajaxRequest.onreadystatechange = function() {
    if (ajaxRequest.readyState === 4 && ajaxRequest.status === 200) {
        var sportsData = JSON.parse(ajaxRequest.responseText);
        if (sportsData.error != null) {
          triggerError(sportsData.error);
        } else {
          sportsJSON = sportsData // Store for future use.
          Materialize.toast('Sports Data Updated!', 2000);
          sportsReady = 1;
        }
    } else if (ajaxRequest.readyState === 4 && ajaxRequest.status != 200) {
      Materialize.toast('Error Fetching Data!', 2000);
      setTimeout(function() {
        getSports();
      }, 30000);
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
  var url = 'playerlist/';
  ajaxRequest.open("POST", url, true);
  ajaxRequest.setRequestHeader("Content-type", "application/json");
  ajaxRequest.setRequestHeader("X-CSRFToken", csrf_token);
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
            if (sport.parentElement.children[3].getAttribute('id')=='list') {
              sport.parentElement.children[3].innerHTML+="<li class='people'>"+people[x].name+"</li>";
            } else {
              sport.parentElement.children[4].innerHTML+="<li class='people'>"+people[x].name+"</li>";
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
function sendUsersData() {
  console.log(backend_data);
  var csrf_token = getCookie('csrftoken');
  var send_data = JSON.stringify(backend_data);
  Materialize.toast('Saving Participants!', 2000);
  participantsSaved = 0;
  var ajaxRequest = new XMLHttpRequest();
  var url = 'add/';
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
        document.getElementById('reg_no_count').innerHTML = parseInt(document.getElementById('reg_no_count').innerHTML) + add_team_participants_count;
      }
      participantsSaved = 1;
    } else if (ajaxRequest.readyState === 4 && ajaxRequest.status != 200) {
      Materialize.toast('Error While Saving!', 2000);
      participantsSaved = 1;
      window.location.href = window.location.href;
    }
  }
  ajaxRequest.send(send_data);
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