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
  $('select').material_select();
  $('.tap-target').tapTarget('open');
  $('.modal').modal();
  getSports();
  getGLSports();
});
// Filling the sports for selection
function fillsports(data){
  for (var x in data){      
    if(data[x].fields.count==0){
      fill_to_add(data[x].fields.sport, data[x].pk);
    } else {
      fill_to_home(data[x].fields.sport, data[x].pk, data[x].fields.count, data[x].fields.lower, data[x].fields.upper, data[x].fields.gender);
    }
  }
}
function fill_to_add(sport_name, sport_no){
  document.getElementById("sport").innerHTML+="<div class='chip'><span>"+sport_name+"</span><span class='sport_id'>"+sport_no+"</span><i class='close material-icons'onclick='add_chip(this)'>add</i></div>"
}
function fill_to_home(sport_name, sport_no, count, lower, upper, gender) {
  if (lower == upper) {
    document.getElementById("sports").innerHTML+="<li><div class='collapsible-header'><i class='material-icons'>whatshot</i>"+sport_name+"<span class='sport_id'>"+sport_no+"</span>&nbsp;<span class='badge reg' onclick='reg(this)'>Register</span></div><div class='collapsible-body blue-grey white-text'><span><h5>No. of registered students: </h5><span id='reg_no'><h5>"+count+"</h5></span></span><br/><button class='btn truncate regbtn' onclick='getlist(this)'>Refresh registered</button><ol id= 'list'></ol> </div></li>";
  } else {
    document.getElementById("sports").innerHTML+="<li><div class='collapsible-header'><i class='material-icons'>whatshot</i>"+sport_name+"<span class='sport_id'>"+sport_no+"</span>&nbsp;<span class='badge reg' onclick='reg(this)'>Register</span></div><div class='collapsible-body blue-grey white-text'><span><h5>No. of registered students: </h5><span id='reg_no'><h5>"+count+"</h5></span></span><br/><button class='btn truncate regbtn' onclick='getlist(this)'>Refresh registered</button> <button class='btn truncate addbtn' onclick='addTeamParticipants(this, \""+gender+"\")'>Add Team Participants</button><ol id= 'list'></ol> </div></li>";
  }
}
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
    document.getElementById("sports").innerHTML+="<li><div class='collapsible-header'><i class='material-icons'>whatshot</i>"+sport_name+"<span class='sport_id'>"+sport_id+"</span>&nbsp;<span class='badge reg' onclick='reg(this)'>Register</span></div><div class='collapsible-body blue-grey white-text'><span><h5>No. of registered students: </h5><span id='reg_no'><h5>0</h5></span></span><br/><button class='btn truncate regbtn' onclick='getlist(this)'>Refresh registered</button><ol id= 'list'></ol></div></li>";
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
    if(data[y].pk==x){
      determineFormDiv(data[y].fields.sport, data[y].pk, data[y].fields.gender, data[y].fields.lower, data[y].fields.upper, data[y].fields.count);
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

// Code For Forms

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
    if (glsports == undefined) {
      Materialize.toast('Please Wait for List to be Updated!', 3000);
    } else {
      var allowregister = false;
      for (var i = 0; i < glsports.length; i++) {
        if (count == 1 && sport_id == glsports[i]) {
          reset_team_form_fields();
          addNewTeam(sport_name, sport_id, gender, lower, upper);
          document.getElementById('reg').style.display="block";
          setTimeout(function() {
            document.getElementById('reg').style.width="100%";
          }, 10);
          allowregister = true;
          break;
        }
      }
      if (allowregister == false) {
        Materialize.toast('You can only register one team per college!',3000);
      }
    }
  }
}
var team_extra_participant_count = 0;
function addNewTeam(sport_name, sport_id, gender, lower, upper) {
  document.getElementById('team-sport-lower-limit').innerHTML = lower;
  document.getElementById('team-sport-upper-limit').innerHTML = upper;
  document.getElementById('team-sport-name').innerHTML = sport_name;
  document.getElementById('team-sport-id').innerHTML = sport_id;
  document.getElementById('team-sport-gender').innerHTML = gender;
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
  document.getElementById('captain_add_sport_select').innerHTML = '<option value="" disabled="disabled" selected="selected"></option>';
  for (var i = 0; i < avail_sport.length; i++) {
    document.getElementById('captain_add_sport_select').innerHTML += '<option value="'+avail_sport_id[i]+'">'+avail_sport[i]+'</option>';
  }
  team_extra_participant_count = 0;
  $('select').material_select();
}
function addNewSportParticipant(sport_name, sport_id, gender) {
  document.getElementById('individual-sport-name').innerHTML = sport_name;
  document.getElementById('individual-sport-id').innerHTML = sport_id;
  document.getElementById('individual-sport-gender').innerHTML = gender;
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
  document.getElementById('indi_captain_add_sport_select').innerHTML = '<option value="" disabled="disabled" selected="selected"></option>';
  for (var i = 0; i < avail_sport.length; i++) {
    document.getElementById('indi_captain_add_sport_select').innerHTML += '<option value="'+avail_sport_id[i]+'">'+avail_sport[i]+'</option>';
  }
  $('select').material_select();
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
function team_submit() {
  // Extract All Details
  var sport_name = document.getElementById('team-sport-name').innerHTML;
  var sport_id = parseInt(document.getElementById('team-sport-id').innerHTML);
  var gender = document.getElementById('team-sport-gender').innerHTML;
  // Check if all reequired fields are filled
  var team_formData = serializeArray(document.getElementById('sport-team-form'));
  var team_captain_name = team_formData[0].value;
  var team_captain_email = team_formData[1].value;
  var team_captain_phone = team_formData[2].value;
  var captain_extra_sports = [];
  var j = 3;
  while(team_formData[j].name == "captain_add_sport_select") {
    if (j == 3) {
      captain_extra_sports.push(sport_id);
    } else {
      captain_extra_sports.push(parseInt(team_formData[j].value));
    }
    j++;
  }
  var team_coach_name = team_formData[j++].value;
  var team_coach_email = team_formData[j++].value;
  var team_coach_gender = '';
  if (team_formData[j] != undefined) {
    if (team_formData[j].name == 'coach_gender') {
      team_coach_gender = team_formData[j++].value;
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
  } else if (!validateEmail(team_captain_email) || !validatePhoneNumber(team_captain_phone) || !check_extra_participants_phone || !check_extra_participants_email) {
    Materialize.toast('One or more Email/Phone Number(s) are Wrong', 4000);
  } else if (team_captain_name && team_captain_email && team_captain_phone && check_extra_details) {
    // Proceed With Upper and Lower Limit Checks Further
    var lower_limit = parseInt(document.getElementById('team-sport-lower-limit').innerHTML);
    var upper_limit = parseInt(document.getElementById('team-sport-upper-limit').innerHTML);
    var total_participants = num_extra_participants + 1;
    if (total_participants > 1 && (total_participants < lower_limit || total_participants > upper_limit)) {
      Materialize.toast('Total Number of Participants should be between '+lower_limit+' and '+upper_limit, 4000);
    } else {
      // Create User Model
      closereg();
      close_reg_right();
      data = {
        "sport_name": sport_name,
        "sport_id": captain_extra_sports,
        "gender": gender,
        "captain_name": team_captain_name,
        "captain_email": team_captain_email,
        "captain_phone": team_captain_phone,
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
function reset_team_form_fields() {
  document.getElementById('team-form-wrapper').innerHTML='<div class="container purple accent-2" id="head-msgs"> <h4 id="team-registration-head">Team Registrations for <span id="team-sport-name">Team Sport Name</span></h4> <h5 id="team-registration-msg">This is a team event. Total no. of participants must be between <span id="team-sport-lower-limit">Lower Limit</span> and <span id="team-sport-upper-limit">Upper Limit</span></h5> <span id="team-sport-id">Team Sport ID</span><span id="team-sport-gender">Team Sport Gender</span> </div><div class="container purple accent-2"> <div class="row"> <form class="col s12" id="sport-team-form"> <div class="row"> <div class="input-field col s12"> <i class="material-icons prefix">person</i> <input type="text" name="Captain_Name" id="captain_name_field" class="validate" required="required"> <label for="captain_name_field" data-error="Enter Name of Team Captain">Name of Team Captain</label> </div></div><div class="row"> <div class="input-field col s12"> <i class="material-icons prefix">email</i> <input type="email" name="Captain_Email" id="captain_email_field" class="validate" required="required"> <label for="captain_email_field" data-error="Enter a Valid Email">E-Mail of Team Captain</label> </div></div><div class="row"> <div class="input-field col s12"> <i class="material-icons prefix">local_phone</i> <input type="text" name="Captain_Phone" id="captain_phone_field" class="validate" required="required" maxlength="10" data-length="10"> <label for="captain_phone_field" data-error="Enter Phone Number">Team Captain Phone Number</label> </div></div><div class="row"> <div class="input-field col s12"> <i class="material-icons prefix">directions_run</i> <select id="captain_add_sport_select" multiple="multiple" name="captain_add_sport_select"> <option value="" disabled="disabled" selected="selected"></option> </select> <label for="captain_add_sport_select">Add More Sports</label> </div></div><div class="row"> <div class="input-field col s12"> <i class="material-icons prefix">record_voice_over</i> <input type="text" name="Coach_Name" id="coach_name_field" class="validate"> <label for="coach_name_field" data-error="Enter Coach Name">Coach Name (Optional)</label> </div></div><div class="row"> <div class="input-field col s12"> <i class="material-icons prefix">email</i> <input type="email" name="Coach_Email" id="coach_email_field" class="validate" required="required"> <label for="coach_email_field" data-error="Enter a Valid Email">E-Mail of Coach (Optional)</label> </div></div><div class="row"> <div class="col s4"> Coach Gender (Optional) </div><div class="col s4"> <input type="radio" name="coach_gender" id="coach_male" value="male"> <label for="coach_male">Male</label> </div><div class="col s4"> <input type="radio" name="coach_gender" id="coach_female" value="female"> <label for="coach_female">Female</label> </div></div><div class="row"> <div class="col s12"> <div class="divider"></div></div></div><div class="row"> <div class="col s12 center"> <a class="waves-effect waves-light btn" onclick="addNewParticipant()"><i class="material-icons left">group_add</i>Add Participant</a> </div></div><div class="row"> <div class="col s12"> <div class="divider"></div></div></div> <div class="row" id="submit-team-btn"> <div class="col s12 center"> <a class="waves-effect waves-light btn btn-large" onclick="team_submit()"><i class="material-icons right">send</i>Submit</a> </div></div></form> </div></div>';
  $("input#captain_phone_field").characterCounter();
  $('select').material_select();
}
function reset_indi_form_fields() {
  document.getElementById('indi-form-wrapper').innerHTML='<div class="container cyan" id="indi-head-msgs"> <h4 id="individual-registration-head">Registrations for <span id="individual-sport-name">Individual Sport Name</span></h4> <h5 id="individual-registration-msg">This is an Individual Event.</h5> <span id="individual-sport-id">Individual Sport ID</span><span id="individual-sport-gender">Individual Sport Gender</span> </div><div class="container cyan"> <div class="row"> <form class="col s12" id="sport-indi-form"> <div class="row"> <div class="input-field col s12"> <i class="material-icons prefix">person</i> <input type="text" name="Indi_Captain_Name" id="indi_captain_name_field" class="validate" required="required"> <label for="indi_captain_name_field" data-error="Enter Name of Participant">Name of Participant</label> </div></div><div class="row"> <div class="input-field col s12"> <i class="material-icons prefix">email</i> <input type="email" name="Indi_Captain_Email" id="indi_captain_email_field" class="validate" required="required"> <label for="indi_captain_email_field" data-error="Enter a Valid Email">E-Mail of Participant</label> </div></div><div class="row"> <div class="input-field col s12"> <i class="material-icons prefix">local_phone</i> <input type="text" name="Indi_Captain_Phone" id="indi_captain_phone_field" class="validate" required="required" maxlength="10" data-length="10"> <label for="indi_captain_phone_field" data-error="Enter Phone Number">Participant Phone Number</label> </div></div><div class="row"> <div class="input-field col s12"> <i class="material-icons prefix">directions_run</i> <select id="indi_captain_add_sport_select" multiple="multiple" name="indi_captain_add_sport_select"> <option value="" disabled="disabled" selected="selected"></option> </select> <label for="indi_captain_add_sport_select">Add More Sports</label> </div></div><div class="row"> <div class="input-field col s12"> <i class="material-icons prefix">record_voice_over</i> <input type="text" name="Indi_Coach_Name" id="indi_coach_name_field" class="validate"> <label for="indi_coach_name_field" data-error="Enter Coach Name">Coach Name (Optional)</label> </div></div><div class="row"> <div class="input-field col s12"> <i class="material-icons prefix">email</i> <input type="email" name="Indi_Coach_Email" id="indi_coach_email_field" class="validate" required="required"> <label for="indi_coach_email_field" data-error="Enter a Valid Email">E-Mail of Coach (Optional)</label> </div></div><div class="row"> <div class="col s4"> Coach Gender (Optional) </div><div class="col s4"> <input type="radio" name="indi_coach_gender" id="indi_coach_male" value="male"> <label for="indi_coach_male">Male</label> </div><div class="col s4"> <input type="radio" name="indi_coach_gender" id="indi_coach_female" value="female"> <label for="indi_coach_female">Female</label> </div></div><div class="row"> <div class="col s12"> <div class="divider"></div></div></div><div class="row" id="submit-indi-btn"> <div class="col s12 center"> <a class="waves-effect waves-light btn btn-large" onclick="indi_submit()"><i class="material-icons right">send</i>Submit</a> </div></div></form> </div></div>';
  $("input#indi_captain_phone_field").characterCounter();
  $('select').material_select();
}

function indi_submit() {
  // Extract All Details
  var indi_sport_name = document.getElementById('individual-sport-name').innerHTML;
  var indi_sport_id = parseInt(document.getElementById('individual-sport-id').innerHTML);
  var indi_gender = document.getElementById('individual-sport-gender').innerHTML;
  // Check if all reequired fields are filled
  var indi_formData = serializeArray(document.getElementById('sport-indi-form'));
  var indi_captain_name = indi_formData[0].value;
  var indi_captain_email = indi_formData[1].value;
  var indi_captain_phone = indi_formData[2].value;
  var indi_captain_extra_sports = [];
  var j = 3;
  while(indi_formData[j].name == "indi_captain_add_sport_select") {
    if (j == 3) {
      indi_captain_extra_sports.push(indi_sport_id);
    } else {
      indi_captain_extra_sports.push(parseInt(indi_formData[j].value));
    }
    j++;
  }
  var indi_coach_name = indi_formData[j++].value;
  var indi_coach_email = indi_formData[j++].value;
  var indi_coach_gender = '';
  if (indi_formData[j] != undefined) {
    if (indi_formData[j].name == 'indi_coach_gender') {
      indi_coach_gender = indi_formData[j++].value;
    }
  }
  if (indi_coach_name != '' && indi_coach_gender == '') {
    Materialize.toast('Must fill all Coach Fields!', 4000);
  } else if (indi_coach_name == '' && indi_coach_gender != '') {
    Materialize.toast('Must fill all Coach Fields!', 4000);
  } else if (indi_coach_name != '' && !validateEmail(indi_coach_email)) {
    Materialize.toast('Coach Email is Wrong!',4000);
  } else if (!validateEmail(indi_captain_email) || !validatePhoneNumber(indi_captain_phone)) {
    Materialize.toast('Email/Phone Number is Wrong', 4000);
  } else if (indi_captain_name && indi_captain_email && indi_captain_phone) {
    // Create User Model
    closereg();
    close_reg_right();
    data = {
      "sport_name": indi_sport_name,
      "sport_id": indi_captain_extra_sports,
      "gender": indi_gender,
      "captain_name": indi_captain_name,
      "captain_email": indi_captain_email,
      "captain_phone": indi_captain_phone,
      "coach_name": indi_coach_name,
      "coach_gender": indi_coach_gender,
      "participants": [],
      "lower": 1,
      "higher": 1
    };
    createUserModel(data);
  }
  else {
    // Display Error Toast that all fields are not filled.
    Materialize.toast('Please Fill All Required fields before proceeding!', 4000);
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
    backend_data["users"].push({
      "captain": data.sport_id[0],
      "coach": 0,
      "sport_id": data.sport_id,
      "name": data.captain_name,
      "email": data.captain_email,
      "phone": data.captain_phone,
      "gender": data.gender
    });
  }
  if (data.coach_name != '') {
    var sport_arr = [];
    sport_arr.push(data.sport_id[0]);
    backend_data["users"].push({
      "captain": 0,
      "coach": data.sport_id[0],
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
  var sport_id= sport.parentElement.parentElement.children[0].children[1].innerHTML;
  $('#add-team-participants-modal').modal('open');
  document.getElementById('add_team_participants_div').innerHTML = '<div class="row"> <form class="col s12" id="sport-extra-form"> <div class="row" id="submit-add-team-part-btn"> <div class="col s12 center"> <a class="waves-effect waves-light btn btn-large" onclick="addTeamPartSubmit(\'Male/Female\')" id="add_team_parts_btn"><i class="material-icons right">send</i>Submit</a> </div></div></form> </div>';
  document.getElementById('add_team_parts_btn').setAttribute('onclick', 'addTeamPartSubmit('+sport_id+',\''+gender+'\')');
  add_team_participants_count = 0
  addNewTeamParticipant(sport_id, '\''+gender+'\'');
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
      "users" : [{
        "name": name,
        "phone": phone,
        "email": email,
        "sport_id": extra_sports,
        "gender": gender,
        "captain":0,
        "coach":0
      }]
    }
    sendExtraParticipants(data);
    $('#add-team-participants-modal').modal('close');
  }
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
var glsports;
function getGLSports() {
  Materialize.toast('Fetching Your Sports!', 2000);
  var csrf_token = getCookie('csrftoken');
  var data = {
    "csrfmiddlewaretoken": csrf_token
  };
  var data_send = JSON.stringify(data);
  var ajaxRequest = new XMLHttpRequest();
  var url = 'leadersport/';
  ajaxRequest.open("POST", url, true);
  ajaxRequest.setRequestHeader("Content-type", "application/json");
  ajaxRequest.setRequestHeader("X-CSRFToken", csrf_token);
  ajaxRequest.onreadystatechange = function() {
    if (ajaxRequest.readyState === 4 && ajaxRequest.status === 200) {
        var sportsData = JSON.parse(ajaxRequest.responseText);
        if (sportsData.error != null) {
          triggerError(sportsData.error);
        } else {
          glsports = sportsData.data; // Store for future use.
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
          var people = participantsDetails.data;
          // A function to get the list of people who have been enrolled in the sport of sport_id and store in an array;
          for(var x in people) {
            if(people[x][1]==0 && people[x][3]==0) {
              if (sport.parentElement.children[3].getAttribute('id')=='list') {
                sport.parentElement.children[3].innerHTML+="<li class='people'>"+people[x][0]+"<span class='edit-name-icon badge black-text' onclick='editname("+sport_id+",\""+people[x][0]+"\","+people[x][2]+")'><i class='material-icons'>edit</i></span></li>";
              } else {
                sport.parentElement.children[4].innerHTML+="<li class='people'>"+people[x][0]+"<span class='edit-name-icon badge black-text' onclick='editname("+sport_id+",\""+people[x][0]+"\","+people[x][2]+")'><i class='material-icons'>edit</i></span></li>";
              }
            }
            else {
              if (sport.parentElement.children[3].getAttribute('id')=='list') {
                sport.parentElement.children[3].innerHTML+="<li class='people'>"+people[x][0]+"</li>";
              } else {
                sport.parentElement.children[4].innerHTML+="<li class='people'>"+people[x][0]+"</li>";
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
function sendUsers(data) {
  var csrf_token = getCookie('csrftoken');
  var send_data = JSON.stringify(data);
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
function sendExtraParticipants(data) {
  var csrf_token = getCookie('csrftoken');
  var send_data = JSON.stringify(data);
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