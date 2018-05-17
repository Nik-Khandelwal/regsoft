function closeadd(){
  document.getElementById('add_sport').style.height="0";
  setTimeout(function() {
    document.getElementById('add_sport').style.display='none';
  }, 800);
}
function openadd(){
  document.getElementById('add_sport').style.display='block';
  setTimeout(function() {
    document.getElementById('add_sport').style.height="100vh";
  }, 10);
}
$(document).ready(function(){
  $('.collapsible').collapsible();
  getSports();
});
$(document).ready(function() {
  $('select').material_select();
  $('.tap-target').tapTarget('open');
});
 $(document).ready(function(){
  // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
  $('.modal').modal();
});
function add_chip(chip){
  var data= chip.parentElement.children[0].innerHTML;
  var sport_no= chip.parentElement.children[1].innerHTML;
  document.getElementById("target").innerHTML+="<div class='chip'><span>"+data+"</span><span class='sport_id'>"+sport_no+"</span><i class='close material-icons'onclick='remove_chip(this)'>close</i></div>";
}
function remove_chip(chip){
  var data= chip.parentElement.children[0].innerHTML;
  var sport_no= chip.parentElement.children[1].innerHTML;
  document.getElementById("sport").innerHTML+="<div class='chip'><span>"+data+"</span><span class='sport_id'>"+sport_no+"</span><i class='close material-icons'onclick='add_chip(this)'>add</i></div>";
}
function addsports(){
  var no_of_sports= document.getElementById("target").childElementCount;
  var id_arr = [];
  for(var i=0; i<no_of_sports;i++){
    var sport_name=document.getElementById("target").children[i].children[0].innerHTML;
    var sport_id=document.getElementById("target").children[i].children[1].innerHTML;
      // comment down below lines after writing code for sending data to backend and refreshing the data on home
    document.getElementById("sports").innerHTML+="<li><div class='collapsible-header'><i class='material-icons'>whatshot</i>"+sport_name+"<span class='sport_id'>"+sport_id+"</span>&nbsp;<span class='badge reg' onclick='reg(this)'>Register</span></div><div class='collapsible-body blue-grey white-text'><span><h5>No. of registered students: </h5><span id='reg_no'><h5>0</h5></span></span><br/><button class='btn truncate regbtn' onclick='getlist(this)'>Refresh registered</button><ol id= 'list'></ol></div></li>"
    id_arr[i] = sport_id;
  }
  document.getElementById("target").innerHTML="";
  closeadd();
}
function closereg(){
  document.getElementById('reg').style.width="0";
  setTimeout(function() {
    document.getElementById('reg').style.display="none";
  }, 800);
}
function reg(sport){
  var x = sport.parentElement.children[1].innerHTML;
  var data= sportsJSON;
  for(y in data){
    if(data[y].fields.idno==x){
      determineFormDiv(data[y].fields.sport, data[y].fields.idno, data[y].fields.gender, data[y].fields.lower, data[y].fields.upper, data[y].fields.count);
    }
  }
}
function close_reg_right(){
  document.getElementById('right_reg').style.width="0";
  setTimeout(function() {
    document.getElementById('right_reg').style.display="none";
  }, 800);
}
function reg_right(){
  document.getElementById('right_reg').style.display='block';
  setTimeout(function() {
    document.getElementById('right_reg').style.width="100%";
  }, 10);
}
function reg_top() {
  document.getElementById('top_add').style.display="block";
  setTimeout(function() {
    document.getElementById('top_add').style.height="100%";
    document.getElementById('top_add').style.overflowY='auto';
  }, 10);
}
function close_reg_top() {
  document.getElementById('top_add').style.height="0%";
  document.getElementById('top_add').style.overflowY='hidden';
  setTimeout(function() {
    document.getElementById('top_add').style.display="none";
  }, 800);
}

// Code For Forms

$(document).ready(function() {
  $('input#captain_phone_field').characterCounter();
});

function determineFormDiv(sport_name, sport_id, gender, lower, upper, count) {
  if (lower==upper==1) {
    closereg();
    reg_right();
    reset_indi_form_fields();
    addNewSportParticipant(sport_name, sport_id, gender);
  } else if (count==0) {
    reset_team_form_fields();
    addNewTeam(sport_name, sport_id, gender, lower, upper);
    document.getElementById('reg').style.display="block";
    setTimeout(function() {
      document.getElementById('reg').style.width="100%";
    }, 10);
  } else {
    Materialize.toast('You can only register one team per college!',3000);
  }
}

function addNewTeam(sport_name, sport_id, gender, lower, upper) {
  document.getElementById('team-sport-lower-limit').innerHTML = lower;
  document.getElementById('team-sport-upper-limit').innerHTML = upper;
  document.getElementById('team-sport-name').innerHTML = sport_name;
  document.getElementById('team-sport-id').innerHTML = sport_id;
  document.getElementById('team-sport-gender').innerHTML = gender;
}

function addNewSportParticipant(sport_name, sport_id, gender) {
  document.getElementById('individual-sport-name').innerHTML = sport_name;
  document.getElementById('individual-sport-id').innerHTML = sport_id;
  document.getElementById('individual-sport-gender').innerHTML = gender;
}

var team_extra_participant_count = 0;

function addNewParticipant() {
  team_extra_participant_count++;
  var newParticipant = document.createElement('div');
  newParticipant.setAttribute('class', 'row extra_team_participant');
  var template = '<div class="input-field col m6 s12"> <i class="material-icons prefix">person_add</i> <input type="text" name="Participant_Name_' + team_extra_participant_count + '" id="participant_name_field_' + team_extra_participant_count + '" class="validate" required="required"> <label for="participant_name_field_' + team_extra_participant_count + '" data-error="Enter Name of Team Member">Name of Team Member</label> </div><div class="input-field col m6 s12"> <i class="material-icons prefix">local_phone</i> <input type="text" name="Participant_Phone_' + team_extra_participant_count + '" id="participant_phone_field_' + team_extra_participant_count + '" class="validate" required="required" maxlength="10" data-length="10"> <label for="participant_phone_field_' + team_extra_participant_count + '" data-error="Enter Phone Number">Phone Number</label> </div> <div class="input-field col m6 s12 offset-m6"> <i class="material-icons prefix">email</i> <input type="email" name="Participant_Email_' + team_extra_participant_count + '" id="participant_email_field_' + team_extra_participant_count + '" class="validate" required="required"> <label for="participant_email_field_' + team_extra_participant_count + '" data-error="Enter Email ID">Email ID</label> </div>'
  newParticipant.innerHTML = template;
  document.getElementById('sport-team-form').insertBefore(newParticipant, document.getElementById('submit-team-btn'));
  Materialize.updateTextFields();
  $("input#participant_phone_field_"+team_extra_participant_count+"").characterCounter();
}

function team_addMoreSports() {
  // Extract All Details

  var sport_name = document.getElementById('team-sport-name').innerHTML;
  var sport_id = parseInt(document.getElementById('team-sport-id').innerHTML);
  var gender = document.getElementById('team-sport-gender').innerHTML;
  // Check if all reequired fields are filled

  var team_formData = serializeArray(document.getElementById('sport-team-form'));
  var team_captain_name = team_formData[0].value;
  var team_captain_email = team_formData[1].value;
  var team_captain_phone = team_formData[2].value;
  var team_coach_name = team_formData[3].value;
  var team_coach_gender = '';
  var num_extra_participants = document.getElementsByClassName('extra_team_participant').length;
  if (team_formData.length > (3*num_extra_participants) + 4) {
    team_coach_gender = team_formData[4].value;
  }
  var extra_participants_details = [];

  for (var i = 0; i < num_extra_participants; i++) {
    if (team_coach_gender=='') {
      extra_participants_details[3*i] = team_formData[4+(3*i)].value;
      extra_participants_details[(3*i)+1] = team_formData[5+(3*i)].value;
      extra_participants_details[(3*i)+2] = team_formData[6+(3*i)].value;
    } else {
      extra_participants_details[3*i] = team_formData[5+(3*i)].value;
      extra_participants_details[(3*i)+1] = team_formData[6+(3*i)].value;
      extra_participants_details[(3*i)+2] = team_formData[7+(3*i)].value;
    }
  }

  var check_extra_details = true;
  var check_extra_participants_phone = true;
  var check_extra_participants_email = true;

  for (var i = 0; i < num_extra_participants; i++) {
    if (!validatePhoneNumber(extra_participants_details[(3*i)+1])) {
      check_extra_participants_phone = false;
      break;
    }
    if (!validateEmail(extra_participants_details[(3*i)+2])) {
      check_extra_participants_email = false;
      break;
    }
    if (extra_participants_details[3*i]=='' || extra_participants_details[(3*i)+1]=='' || extra_participants_details[(3*i)+2]=='') {
      check_extra_details = false;
      break;
    }
  }

  if (team_coach_name != '' && team_coach_gender == '') {
    Materialize.toast('Must fill both Coach Fields!', 4000);
  } else if(team_coach_name == '' && team_coach_gender != '') {
    Materialize.toast('Must fill both Coach Fields!', 4000);
  } else if (!validateEmail(team_captain_email) || !validatePhoneNumber(team_captain_phone) || !check_extra_participants_phone || !check_extra_participants_email) {
    Materialize.toast('One or more Email/Phone Number(s) are Wrong', 4000);
  } else if (team_captain_name && team_captain_email && team_captain_phone && check_extra_details) {
    // Proceed With Upper and Lower Limit Checks Further
    var lower_limit = parseInt(document.getElementById('team-sport-lower-limit').innerHTML);
    var upper_limit = parseInt(document.getElementById('team-sport-upper-limit').innerHTML);
    var total_participants = num_extra_participants + 1;
    if (total_participants < lower_limit || total_participants > upper_limit) {
      Materialize.toast('Total Number of Participants should be between '+lower_limit+' and '+upper_limit, 4000);
    } else {
      // Open Add More Page.
      add_sport(sport_name, sport_id, gender, team_captain_name, team_captain_email, team_captain_phone, team_coach_name, team_coach_gender, extra_participants_details, lower_limit, upper_limit);
    }
  }
  else {
    // Display Error Toast that all fields are not filled.
    Materialize.toast('Please Fill All Required fields before proceeding!', 4000);
  }

  // Check if lower and upper limit requirements are met
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
function reset_team_form_fields() {
  document.getElementById('team-form-wrapper').innerHTML='<div class="container purple accent-2" id="head-msgs"> <h4 id="team-registration-head">Team Registrations for <span id="team-sport-name">Team Sport Name</span></h4> <h5 id="team-registration-msg">This is a team event. Total no. of participants must be between <span id="team-sport-lower-limit">Lower Limit</span> and <span id="team-sport-upper-limit">Upper Limit</span></h5> <span id="team-sport-id">Team Sport ID</span><span id="team-sport-gender">Team Sport Gender</span> </div><div class="container purple accent-2"> <div class="row"> <form class="col s12" id="sport-team-form"> <div class="row"> <div class="input-field col s12"> <i class="material-icons prefix">person</i> <input type="text" name="Captain_Name" id="captain_name_field" class="validate" required="required"> <label for="captain_name_field" data-error="Enter Name of Team Captain">Name of Team Captain</label> </div></div><div class="row"> <div class="input-field col s12"> <i class="material-icons prefix">email</i> <input type="email" name="Captain_Email" id="captain_email_field" class="validate" required="required"> <label for="captain_email_field" data-error="Enter a Valid Email">E-Mail of Team Captain</label> </div></div><div class="row"> <div class="input-field col s12"> <i class="material-icons prefix">local_phone</i> <input type="text" name="Captain_Phone" id="captain_phone_field" class="validate" required="required" maxlength="10" data-length="10"> <label for="captain_phone_field" data-error="Enter Phone Number">Team Captain Phone Number</label> </div></div><div class="row"> <div class="input-field col s12"> <i class="material-icons prefix">record_voice_over</i> <input type="text" name="Coach_Name" id="coach_name_field" class="validate"> <label for="coach_name_field" data-error="Enter Coach Name">Coach Name (Optional)</label> </div></div><div class="row"> <div class="col s4"> Coach Gender (Optional) </div><div class="col s4"> <input type="radio" name="coach_gender" id="coach_male" value="Male"> <label for="coach_male">Male</label> </div><div class="col s4"> <input type="radio" name="coach_gender" id="coach_female" value="Female"> <label for="coach_female">Female</label> </div></div><div class="row"> <div class="col s12"> <div class="divider"></div></div></div><div class="row"> <div class="col s12 center"> <a class="waves-effect waves-light btn" onclick="addNewParticipant()"><i class="material-icons left">group_add</i>Add Participant</a> </div></div><div class="row"> <div class="col s12"> <div class="divider"></div></div></div> <div class="row" id="submit-team-btn"> <div class="col s12 center"> <a class="waves-effect waves-light btn btn-large" onclick="team_addMoreSports()"><i class="material-icons right">send</i>Submit</a> </div></div></form> </div></div>';
}
function reset_indi_form_fields() {
  document.getElementById('indi-form-wrapper').innerHTML='<div class="container cyan" id="indi-head-msgs"> <h4 id="individual-registration-head">Registrations for <span id="individual-sport-name">Individual Sport Name</span></h4> <h5 id="individual-registration-msg">This is an Individual Event.</h5> <span id="individual-sport-id">Individual Sport ID</span><span id="individual-sport-gender">Individual Sport Gender</span> </div><div class="container cyan"> <div class="row"> <form class="col s12" id="sport-indi-form"> <div class="row"> <div class="input-field col s12"> <i class="material-icons prefix">person</i> <input type="text" name="Indi_Captain_Name" id="indi_captain_name_field" class="validate" required="required"> <label for="indi_captain_name_field" data-error="Enter Name of Participant">Name of Participant</label> </div></div><div class="row"> <div class="input-field col s12"> <i class="material-icons prefix">email</i> <input type="email" name="Indi_Captain_Email" id="indi_captain_email_field" class="validate" required="required"> <label for="indi_captain_email_field" data-error="Enter a Valid Email">E-Mail of Participant</label> </div></div><div class="row"> <div class="input-field col s12"> <i class="material-icons prefix">local_phone</i> <input type="text" name="Indi_Captain_Phone" id="indi_captain_phone_field" class="validate" required="required" maxlength="10" data-length="10"> <label for="indi_captain_phone_field" data-error="Enter Phone Number">Participant Phone Number</label> </div></div><div class="row"> <div class="input-field col s12"> <i class="material-icons prefix">record_voice_over</i> <input type="text" name="Indi_Coach_Name" id="indi_coach_name_field" class="validate"> <label for="indi_coach_name_field" data-error="Enter Coach Name">Coach Name (Optional)</label> </div></div><div class="row"> <div class="col s4"> Coach Gender (Optional) </div><div class="col s4"> <input type="radio" name="indi_coach_gender" id="indi_coach_male" value="Male"> <label for="indi_coach_male">Male</label> </div><div class="col s4"> <input type="radio" name="indi_coach_gender" id="indi_coach_female" value="Female"> <label for="indi_coach_female">Female</label> </div></div><div class="row"> <div class="col s12"> <div class="divider"></div></div></div><div class="row" id="submit-indi-btn"> <div class="col s12 center"> <a class="waves-effect waves-light btn btn-large" onclick="indi_addMoreSports()"><i class="material-icons right">send</i>Submit</a> </div></div></form> </div></div>';
}
function indi_addMoreSports() {
  // Extract All Details

  var indi_sport_name = document.getElementById('individual-sport-name').innerHTML;
  var indi_sport_id = parseInt(document.getElementById('individual-sport-id').innerHTML);
  var indi_gender = document.getElementById('individual-sport-gender').innerHTML;
  // Check if all reequired fields are filled

  var indi_formData = serializeArray(document.getElementById('sport-indi-form'));
  var indi_captain_name = indi_formData[0].value;
  var indi_captain_email = indi_formData[1].value;
  var indi_captain_phone = indi_formData[2].value;
  var indi_coach_name = indi_formData[3].value;
  var indi_coach_gender = '';
  if (indi_formData.length > 4) {
    indi_coach_gender = indi_formData[4].value;
  }

  if (indi_coach_name != '' && indi_coach_gender == '') {
    Materialize.toast('Must fill both Coach Fields!', 4000);
  } else if (indi_coach_name == '' && indi_coach_gender != '') {
    Materialize.toast('Must fill both Coach Fields!', 4000);
  } else if (!validateEmail(indi_captain_email) || !validatePhoneNumber(indi_captain_phone)) {
    Materialize.toast('Email/Phone Number is Wrong', 4000);
  } else if (indi_captain_name && indi_captain_email && indi_captain_phone) {
    // Open Add More Page.
    add_sport(indi_sport_name, indi_sport_id, indi_gender, indi_captain_name, indi_captain_email, indi_captain_phone, indi_coach_name, indi_coach_gender, [], 1, 1);
  }
  else {
    // Display Error Toast that all fields are not filled.
    Materialize.toast('Please Fill All Required fields before proceeding!', 4000);
  }

  // Check if lower and upper limit requirements are met
}
// AJAX Functions

var sportsJSON;

function getSports() {
  document.getElementById("sport").innerHTML = '';
  document.getElementById("sports").innerHTML = '';
  Materialize.toast('Fetching Sports Data', 2000);
  var csrf_token = getCookie('csrftoken');
  var data = {
    "csrfmiddlewaretoken": csrf_token
  };
  var data_send = JSON.stringify(data);
  var ajaxRequest = new XMLHttpRequest();
  var url = 'display/';
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
          fillsports(sportsJSON);
          Materialize.toast('Updated!', 2000);
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
            if(sport_id!=people[x].captain) {
              sport.parentElement.children[3].innerHTML+="<li class='people'>"+people[x].fields.name+"<span class='edit-name-icon badge black-text' onclick='editname("+sport_id+",\""+people[x].fields.name+"\","+people[x].pk+")'><i class='material-icons'>edit</i></span></li>";
            }
            else {
              sport.parentElement.children[3].innerHTML+="<li class='people'>"+people[x].fields.name+"</li>";
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

function getCookie(name) {
  var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return v ? v[2] : null;
}

//AJAX Functions End

// Filling the sports for selection
function fillsports(data){
    for (var x in data){
        
        if(data[x].fields.count==0){
            fill_to_add(data[x].fields.sport, data[x].fields.idno);
        }
        else{
            fill_to_home(data[x].fields.sport, data[x].fields.idno,data[x].fields.count);
        }
    }
}
function fill_to_add(sport_name, sport_no){
    document.getElementById("sport").innerHTML+="<div class='chip'><span>"+sport_name+"</span><span class='sport_id'>"+sport_no+"</span><i class='close material-icons'onclick='add_chip(this)'>add</i></div>"
}
function fill_to_home(sport_name, sport_no,count){
    document.getElementById("sports").innerHTML+="<li><div class='collapsible-header'><i class='material-icons'>whatshot</i>"+sport_name+"<span class='sport_id'>"+sport_no+"</span>&nbsp;<span class='badge reg' onclick='reg(this)'>Register</span></div><div class='collapsible-body blue-grey white-text'><span><h5>No. of registered students: </h5><span id='reg_no'><h5>"+count+"</h5></span></span><br/><button class='btn truncate regbtn' onclick='getlist(this)'>Refresh registered</button><ol id= 'list'></ol> </div></li>"
}
// To get list of names of person in the registered section
function getlist(sport){
  var sport_id= sport.parentElement.parentElement.children[0].children[1].innerHTML;
  sport.parentElement.children[3].innerHTML="";
  getSportParticipants(sport_id, sport);
}
function add_sport(indi_sport_name, indi_sport_id, indi_gender, indi_captain_name, indi_captain_email, indi_captain_phone, indi_coach_name, indi_coach_gender, participants, lower, higher){
  var i = 0;
  var avail_sport =[];
  var avail_sport_id = [];
  var each_select;
  var j = 0;
  for (var i = 0; i < sportsJSON.length; i++) {
    if (sportsJSON[i].fields.idno != indi_sport_id) {
      if (indi_gender == sportsJSON[i].fields.gender) {
        if (sportsJSON[i].fields.upper == sportsJSON[i].fields.lower == 1) {
          avail_sport[j] = sportsJSON[i].fields.sport;
          avail_sport_id[j++] = sportsJSON[i].fields.idno;
        }
      }
    }
  }
  var tot_part = 1;
  document.getElementById("add_extra_event").innerHTML = '';
  document.getElementById("add_extra_event").innerHTML += "<div class='row'><div class='col s6 center indi-add-extra-name'><h5>"+indi_captain_name+"</h5></div><div class='input-field col s6'><select class='add_extra' id='part_num_"+(tot_part++)+"'><option value='' selected>Add Extra Event</option></select></div></div>";
  for(var j = 0; j < participants.length; j += 3) {
    document.getElementById("add_extra_event").innerHTML+="<div class='row'><div class='col s6 center indi-add-extra-name'><h5>"+participants[j]+"</h5></div><div class='input-field col s6'><select class='add_extra' id='part_num_"+(tot_part++)+"'><option value='' selected>Add Extra Event</option></select></div></div>";
  }
  var no_select= document.getElementsByClassName("add_extra");
  for(var l in no_select) {
    each_select=no_select[l];
    for(var w in avail_sport){
      each_select.innerHTML+="<option value="+avail_sport_id[w]+">"+avail_sport[w]+"</option>";
    }
  }
  $('select').material_select();
  closereg();
  close_reg_right();
  reg_top();
  temp = {
    "sport_name": indi_sport_name,
    "sport_id": indi_sport_id,
    "gender": indi_gender,
    "captain_name": indi_captain_name,
    "captain_email": indi_captain_email,
    "captain_phone": indi_captain_phone,
    "coach_name": indi_coach_name,
    "coach_gender": indi_coach_gender,
    "participants": participants,
    "lower": lower,
    "higher": higher
  };
}
function send_all_data() {
  var add_sports_arr = [];
  for (var i = 0; i < document.getElementsByClassName('add_extra').length / 2; i++) {
    add_sports_arr[i] = $('#part_num_'+(i+1)).val();
  }
  create_user_model(add_sports_arr);
  close_reg_top();
}
var temp = {};
function create_user_model(add_sports_arr) {
  // Create user models for sending data to backend.
  var backend_data = {
    "users": [],
    "csrftoken": []
  };
  backend_data = {
    "users": [],
    "csrftoken": []
  };
  var sport_id_arr;
  var captain;
  for (var i = 0; i < add_sports_arr.length; i++) {
    sport_id_arr = [];
    captain = 0;
    if (i==0) {
      if (temp.lower==temp.higher) {
        captain = 0;
      } else {
        captain = temp.sport_id;
      }
    } else {
      captain = 0;
    }
    if (add_sports_arr[i] == "") {
      sport_id_arr.push(temp.sport_id);
    } else {
      sport_id_arr.push(temp.sport_id);
      sport_id_arr.push(parseInt(add_sports_arr[i]));
    }
    if (i==0) {
      backend_data["users"].push({
        "captain": captain,
        "coach": 0,
        "sport_id": sport_id_arr,
        "name": temp.captain_name,
        "email": temp.captain_email,
        "phone": temp.captain_phone,
        "gender": temp.gender
      });
    } else {
      backend_data["users"].push({
        "captain": 0,
        "coach": 0,
        "sport_id": sport_id_arr,
        "name": temp.participants[(3*i) - 3],
        "email": temp.participants[(3*i) - 1],
        "phone": temp.participants[(3*i) - 2],
        "gender": temp.gender
      });
    }
  }
  if (temp.coach_name != '') {
    sport_id_arr = [];
    sport_id_arr.push(temp.sport_id);
    backend_data["users"].push({
      "captain": 0,
      "coach": temp.sport_id,
      "sport_id": sport_id_arr,
      "name": temp.coach_name,
      "email": "",
      "phone": "",
      "gender": temp.coach_gender
    });
  }
  var csrf_token = getCookie('csrftoken');
  backend_data["csrftoken"].push({
    "csrfmiddlewaretoken": csrf_token
  });
  var send_data = JSON.stringify(backend_data);
  Materialize.toast('Saving Participants!', 2000);
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
      }
    } else if (ajaxRequest.readyState === 4 && ajaxRequest.status != 200) {
      Materialize.toast('Error While Saving!', 2000);
    }
  }
  ajaxRequest.send(send_data);
}
function editname(sport_id, participant, pk) {
  $('#modal1').modal('open');
  document.getElementById("modal-names").innerHTML="";
  document.getElementById("modal-names").innerHTML="<li><input type='text' class='input-field' id='newName' placeholder=\""+participant+"\"></li>";
  Materialize.updateTextFields();
  oldName = participant;
  userpk = pk;
}
var oldName;
var userpk;
function sendEdit() {
  var newName = document.getElementById('newName').value;
  var csrf_token = getCookie('csrftoken');
  var data = {
    "oldname": oldName,
    "newname": newName,
    "csrfmiddlewaretoken": csrf_token,
    "pk": userpk
  }
  console.log(data);
  var data_send = JSON.stringify(data);
  Materialize.toast('Saving Participants!', 2000);
  var ajaxRequest = new XMLHttpRequest();
  var url = 'edit/';
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
}
function triggerError(msg) {
  $('#error-modal').modal('open');
  document.getElementById('error-msg').innerHTML = msg;
}