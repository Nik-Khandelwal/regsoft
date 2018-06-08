$('document').ready(function() {
  $(".button-collapse").sideNav({
    closeOnClick: true
  });
  $('.collapsible').collapsible();
  $('.tap-target').tapTarget('open');
  $('ul.tabs').tabs();
  showDiv(0);
  $('#payment-modal').modal();
  hideLoader();
});
function showDiv(num) {
  for (var i = 0; i < document.getElementsByClassName('main-content').length; i++) {
    document.getElementsByClassName('main-content')[i].style.display = 'none';
  }
  document.getElementsByClassName('main-content')[num].style.display = 'block';
}
function showLoader() {
  document.getElementById('main-content-loading').style.display = 'block';
}
function hideLoader() {
  document.getElementById('main-content-loading').style.display = 'none';
}
function showDashboard() {
  closeAllModals();
  hideLoader();
  showDiv(0);
}
function flip(num) {
  $('.custom-card:eq('+num+')').toggleClass('flipped');
  if ($('.custom-card:eq('+num+')').hasClass('flipped')) {
    fetchDashboardData(num);
  }
}
function openExtraPaymentDetails() {
  $('#payment-modal').modal('open');
  $('.custom-card:eq(3)').toggleClass('flipped');
}
function openCollegeLeaders(college, num) {
  document.getElementById('switch-status-list-body').innerHTML = '';
  var id = parseInt(college.children[0].innerHTML);
  document.getElementById('switch-status-btn').setAttribute('onclick', 'confirmChangeUserStatus('+num+')');
  if (num == 1) {
    for (var i = 0; i < leftData.length; i++) {
      if (leftData[i][3] == id) {
        for (var k = 0; k < leftData[i][4].length; k++) {
          var sportsList = '';
          for (var j = 0; j < leftData[i][4][k][4].length; j++) {
            sportsList += leftData[i][4][k][4][j];
            if (j != leftData[i][4][k][4].length - 1) {
              sportsList += ', ';
            }
          }
          document.getElementById('switch-status-list-body').innerHTML += '<tr class="status-selection"> <td style="display: none;">'+leftData[i][4][k][0]+'</td><td style="flex-basis: 20%;">'+leftData[i][4][k][1]+'</td><td style="flex-basis: 14%">'+leftData[i][4][k][2]+'</td><td style="flex-basis: 25%;">'+leftData[i][4][k][3]+'</td><td style="flex-basis: 20%;">'+sportsList+'</td><td style="flex-basis: 8%;">'+leftData[i][4][k][6]+'</td><td style="flex-basis: 8%;">'+leftData[i][4][k][5]+'</td><td style="flex-basis: 5%;"><i class="material-icons change-cursor" onclick="toggleSelection(this);">check_box_outline_blank</i></td></tr>';
        }
      }
    }
  } else {
    for (var i = 0; i < rightData.length; i++) {
      if (rightData[i][3] == id) {
        for (var k = 0; k < rightData[i][4].length; k++) {
          var sportsList = '';
          for (var j = 0; j < rightData[i][4][k][4].length; j++) {
            sportsList += rightData[i][4][k][4][j];
            if (j != rightData[i][4][k][4].length - 1) {
              sportsList += ', ';
            }
          }
          document.getElementById('switch-status-list-body').innerHTML += '<tr class="status-selection"> <td style="display: none;">'+rightData[i][4][k][0]+'</td><td style="flex-basis: 20%;">'+rightData[i][4][k][1]+'</td><td style="flex-basis: 14%">'+rightData[i][4][k][2]+'</td><td style="flex-basis: 25%;">'+rightData[i][4][k][3]+'</td><td style="flex-basis: 20%;">'+sportsList+'</td><td style="flex-basis: 8%;">'+rightData[i][4][k][6]+'</td><td style="flex-basis: 8%;">'+rightData[i][4][k][5]+'</td><td style="flex-basis: 5%;"><i class="material-icons change-cursor" onclick="toggleSelection(this);">check_box_outline_blank</i></td></tr>';
        }
      }
    }
  }
  modal_open(0);
}
function modal_open(num){
  document.getElementsByClassName("custom-modals")[num].style.display="block";
}
function back(num) {
  document.getElementsByClassName("custom-modals")[num].style.display="none";
}
function closeAllModals() {
  for (var i = 0; i < document.getElementsByClassName("custom-modals").length; i++) {
    document.getElementsByClassName("custom-modals")[i].style.display="none";
  }
}
function toggleSelection(elem) {
  if (elem.innerHTML == "check_box") {
    elem.innerHTML = "check_box_outline_blank";
    elem.parentElement.parentElement.setAttribute('class', 'status-selection');
  } else {
    elem.innerHTML = "check_box";
    elem.parentElement.parentElement.setAttribute('class', 'status-selection status-selected');
  }
}
function confirmChangeUserStatus(num) {
  if (document.getElementsByClassName('status-selected').length == 0) {
    Materialize.toast('Please Select a Player to Toggle Status!', 3000);
  } else if (document.getElementsByClassName('status-selected').length > 1) {
    Materialize.toast('You can only Toggle Status of a Single Player!', 3000);
  } else {
    var idno = parseInt(document.getElementsByClassName('status-selected')[0].children[0].innerHTML);
    if (num == 1) {
      activateUser(idno);
    } else {
      deactivateUser(idno);
    }
  }
}
function addSport() {
  closeAllModals();
  modal_open(3);
}
function resetAddSportForm() {
  document.getElementById('add-sport-form').innerHTML = '<div class="row"> <div class="input-field col s12"> <i class="material-icons prefix">person</i> <input type="text" name="sport_name_field" id="sport_name_field" class="validate" required="required"> <label for="sport_name_field" data-error="Enter Sport Name">Sport Name</label> </div></div><div class="row"> <div class="input-field col m6 s12"> <i class="material-icons prefix">compare_arrows</i> <input type="text" name="lower_limit" id="lower_limit" class="validate" required="required"> <label for="lower_limit" data-error="Enter Lower Limit">Lower Limit</label> </div><div class="input-field col m6 s12"> <i class="material-icons prefix">compare_arrows</i> <input type="text" name="upper_limit" id="upper_limit" class="validate" required="required"> <label for="upper_limit" data-error="Enter Upper Limit">Upper Limit</label> </div></div><div class="row"> <div class="col s4 center"> Gender </div><div class="col s4 center"> <input type="radio" name="indi_gender" id="indi_male" value="male"> <label for="indi_male">Male</label> </div><div class="col s4 center"> <input type="radio" name="indi_gender" id="indi_female" value="female"> <label for="indi_female">Female</label> </div></div><div class="row"> <div class="col s12 center"> <a class="waves-effect waves-light btn btn-large" onclick="addSportSubmit()"><i class="material-icons right">send</i>Submit</a> </div></div>';
}
function addCollege() {
  closeAllModals();
  modal_open(4);
}
function resetAddCollegeForm() {
  document.getElementById('add-college-form').innerHTML = '<div class="row"> <div class="input-field col s12"> <i class="material-icons prefix">business</i> <input type="text" name="college_name_field" id="college_name_field" class="validate" required="required"> <label for="college_name_field" data-error="Enter College Name">College Name</label> </div></div><div class="row"> <div class="input-field col m6 s12"> <i class="material-icons prefix">location_city</i> <input type="text" name="city" id="city" class="validate" required="required"> <label for="city" data-error="Enter City">City</label> </div><div class="input-field col m6 s12"> <i class="material-icons prefix">location_on</i> <input type="text" name="state" id="state" class="validate" required="required"> <label for="state" data-error="Enter State">State</label> </div></div><div class="row"> <div class="col s12 center"> <a class="waves-effect waves-light btn btn-large" onclick="addCollegeSubmit()"><i class="material-icons right">send</i>Submit</a> </div></div>';
}
function editSportLimit(select) {
  var idno = parseInt(select.parentElement.children[0].innerHTML);
  var min_lim = parseInt(select.parentElement.children[2].innerHTML);
  var max_lim = parseInt(select.parentElement.children[3].innerHTML);
  modal_open(5);
  document.getElementById('edit-limits-form').innerHTML = '<div class="row"> <div class="input-field col s12"> <i class="material-icons prefix">compare_arrows</i> <input type="text" name="min_limit" id="min_limit" class="validate" required="required" value="'+min_lim+'"> <label for="min_limit" data-error="Enter Minimum Limit">Minimum Limit</label> </div></div><div class="row"> <div class="input-field col s12"> <i class="material-icons prefix">compare_arrows</i> <input type="text" name="max_limit" id="max_limit" class="validate" required="required" value="'+max_lim+'"> <label for="max_limit" data-error="Enter Minimum Limit">Maximum Limit</label> </div></div><div class="row"> <div class="col s12 center"> <a class="waves-effect waves-light btn btn-large" onclick="editSportLimitSubmit('+idno+')"><i class="material-icons right">send</i>Submit</a> </div></div>';
  Materialize.updateTextFields();
}
function resetEditSportLimit() {
  document.getElementById('edit-limits-form').innerHTML = '<div class="row"> <div class="input-field col s12"> <i class="material-icons prefix">compare_arrows</i> <input type="text" name="min_limit" id="min_limit" class="validate" required="required"> <label for="min_limit" data-error="Enter Minimum Limit">Minimum Limit</label> </div></div><div class="row"> <div class="input-field col s12"> <i class="material-icons prefix">compare_arrows</i> <input type="text" name="max_limit" id="max_limit" class="validate" required="required"> <label for="max_limit" data-error="Enter Minimum Limit">Maximum Limit</label> </div></div><div class="row"> <div class="col s12 center"> <a class="waves-effect waves-light btn btn-large" onclick="editSportLimitSubmit(idno)"><i class="material-icons right">send</i>Submit</a> </div></div>';
}
function toggleSportMailSelection(option) {
  var elem = option.parentElement.parentElement;
  if (elem.nextElementSibling != null && elem.nextElementSibling.children.length > 4 && elem.nextElementSibling.children[0].children[0].innerHTML == 'check_box_outline_blank') {
    while(elem.nextElementSibling != null && elem.nextElementSibling.children.length > 4) {
      elem.nextElementSibling.children[0].children[0].innerHTML = 'check_box';
      elem.nextElementSibling.setAttribute('class', 'send-mail-sport-row selected-send-mail-sport-row');
      elem = elem.nextElementSibling;
    }
  } else {
    while(elem.nextElementSibling != null && elem.nextElementSibling.children.length > 4) {
      elem.nextElementSibling.children[0].children[0].innerHTML = 'check_box_outline_blank';
      elem.nextElementSibling.setAttribute('class', 'send-mail-sport-row');
      elem = elem.nextElementSibling;
    }
  }
}
function toggleResendCredentialsParticipantMailSelection(option) {
  if (option.innerHTML == 'check_box_outline_blank') {
    option.innerHTML = 'check_box';
    option.parentElement.parentElement.setAttribute('class', 'resend-credentials-send-mail-sport-row resend-credentials-selected-send-mail-sport-row');
  } else {
    option.innerHTML = 'check_box_outline_blank';
    option.parentElement.parentElement.setAttribute('class', 'resend-credentials-send-mail-sport-row');
  }
}
function toggleResendCredentialsSportMailSelection(option) {
  var elem = option.parentElement.parentElement;
  if (elem.nextElementSibling != null && elem.nextElementSibling.children.length > 4 && elem.nextElementSibling.children[0].children[0].innerHTML == 'check_box_outline_blank') {
    while(elem.nextElementSibling != null && elem.nextElementSibling.children.length > 4) {
      elem.nextElementSibling.children[0].children[0].innerHTML = 'check_box';
      elem.nextElementSibling.setAttribute('class', 'resend-credentials-send-mail-sport-row resend-credentials-selected-send-mail-sport-row');
      elem = elem.nextElementSibling;
    }
  } else {
    while(elem.nextElementSibling != null && elem.nextElementSibling.children.length > 4) {
      elem.nextElementSibling.children[0].children[0].innerHTML = 'check_box_outline_blank';
      elem.nextElementSibling.setAttribute('class', 'resend-credentials-send-mail-sport-row');
      elem = elem.nextElementSibling;
    }
  }
}
function toggleParticipantMailSelection(option) {
  if (option.innerHTML == 'check_box_outline_blank') {
    option.innerHTML = 'check_box';
    option.parentElement.parentElement.setAttribute('class', 'send-mail-sport-row selected-send-mail-sport-row');
  } else {
    option.innerHTML = 'check_box_outline_blank';
    option.parentElement.parentElement.setAttribute('class', 'send-mail-sport-row');
  }
}
var id_arr = [];
var email_arr = [];
function openMailCompose() {
  if (document.getElementsByClassName('selected-send-mail-sport-row').length > 0) {
    id_arr = [];
    email_arr = [];
    for (var i = 0; i < document.getElementsByClassName('selected-send-mail-sport-row').length; i++) {
      var idno = parseInt(document.getElementsByClassName('selected-send-mail-sport-row')[i].children[4].innerHTML);
      var email = document.getElementsByClassName('selected-send-mail-sport-row')[i].children[3].innerHTML;
      id_arr.push(idno);
      email_arr.push(email);
    }
    resetMailCompose();
    modal_open(7);
  } else {
    Materialize.toast('Please Select atleast one Participant to Send Email!', 3000);
  }
}
function resetMailCompose() {
  document.getElementById('send-mail-compose-form').innerHTML = '<div class="row"> <div class="input-field col s12"> <i class="material-icons prefix">create</i> <input type="text" name="email_subject" id="email_subject" class="validate" required="required" value="BOSM 2018"> <label for="email_subject" data-error="Enter Email Subject">Subject</label> </div></div><div class="row"> <div class="input-field col s12"> <i class="material-icons prefix">create</i> <textarea id="email_body" name="email_body" class="materialize-textarea" class="validate" required="required"></textarea> <label for="email_body" data-error="Enter Email Body">Body</label> </div></div>';
  Materialize.updateTextFields();
}
function composeMailGroupLeader(option) {
  id_arr = [];
  email_arr = [];
  var idno = parseInt(option.nextElementSibling.innerHTML);
  var email = option.previousElementSibling.innerHTML;
  id_arr.push(idno);
  email_arr.push(email);
  resetMailCompose();
  closeAllModals();
  modal_open(7);
  setTimeout(function() {
    document.getElementsByClassName("custom-modals")[6].style.display="none";
  }, 100);
}
var idno;
function editGroupLeader(option) {
  idno = parseInt(option.nextElementSibling.innerHTML);
  name = option.parentElement.children[0].innerHTML;
  phone = parseInt(option.parentElement.children[2].innerHTML);
  email = option.parentElement.children[3].innerHTML;
  resetEditForm();
  $('#part_name').val(name);
  $('#part_phone').val(phone);
  $('#part_email').val(email);
  document.getElementById('part_sport').innerHTML = '<option value="" disabled="disabled" selected="selected"></option>';
  for (var i = 0; i < edit_groupleaders.length; i++) {
    if (edit_groupleaders[i][6] == idno) {
      for (var j = 0; j < edit_sports.length; j+=2) {
        var added = false;
        for (var k = 0; k < edit_groupleaders[i][9].length; k++) {
          if (edit_groupleaders[i][9][k] == edit_sports[j]) {
            document.getElementById('part_sport').innerHTML += '<option value="'+edit_sports[j]+'" selected="selected">'+edit_sports[j+1]+'</option>';
            added = true;
            break;
          }
        }
        if (!added) {
          document.getElementById('part_sport').innerHTML += '<option value="'+edit_sports[j]+'">'+edit_sports[j+1]+'</option>';
        }
      }
      Materialize.updateTextFields();
      if (edit_groupleaders[i][8] == "male") {
        document.getElementById('part_male').setAttribute('checked', 'checked');
      } else {
        document.getElementById('part_female').setAttribute('checked', 'checked');
      }
      break;
    }
  }
  $('select').material_select();
  Materialize.updateTextFields();
  modal_open(9);
  setTimeout(function() {
    document.getElementsByClassName("custom-modals")[8].style.display="none";
  }, 100);
}
function editSportPart(option) {
  idno = parseInt(option.nextElementSibling.innerHTML);
  name = option.parentElement.children[0].innerHTML;
  phone = parseInt(option.parentElement.children[2].innerHTML);
  email = option.parentElement.children[3].innerHTML;
  resetEditForm();
  $('#part_name').val(name);
  $('#part_phone').val(phone);
  $('#part_email').val(email);
  document.getElementById('part_sport').innerHTML = '<option value="" disabled="disabled" selected="selected"></option>';
  for (var i = 0; i < edit_parts.length; i++) {
    if (edit_parts[i][4] == idno) {
      for (var j = 0; j < edit_sports.length; j+=2) {
        var added = false;
        for (var k = 0; k < edit_parts[i][6].length; k++) {
          if (edit_parts[i][6][k] == edit_sports[j]) {
            document.getElementById('part_sport').innerHTML += '<option value="'+edit_sports[j]+'" selected="selected">'+edit_sports[j+1]+'</option>';
            added = true;
            break;
          }
        }
        if (!added) {
          document.getElementById('part_sport').innerHTML += '<option value="'+edit_sports[j]+'">'+edit_sports[j+1]+'</option>';
        }
      }
      Materialize.updateTextFields();
      if (edit_parts[i][5] == "male") {
        document.getElementById('part_male').setAttribute('checked', 'checked');
      } else {
        document.getElementById('part_female').setAttribute('checked', 'checked');
      }
      break;
    }
  }
  $('select').material_select();
  Materialize.updateTextFields();
  modal_open(9);
}
function resetEditForm() {
  document.getElementById('edit-part-form').innerHTML = '<div class="row"> <div class="input-field col s12"> <i class="material-icons prefix">create</i> <input type="text" name="part_name" id="part_name" class="validate" required="required"> <label for="part_name" data-error="Enter Name">Name</label> </div></div><div class="row"> <div class="input-field col s12"> <i class="material-icons prefix">create</i> <input type="text" name="part_phone" id="part_phone" class="validate" required="required" maxlength="10" data-length="10"> <label for="part_phone" data-error="Enter Phone">Phone</label> </div></div><div class="row"> <div class="input-field col s12"> <i class="material-icons prefix">create</i> <input type="email" name="part_email" id="part_email" class="validate" required="required"> <label for="part_email" data-error="Enter Email">Email</label> </div></div><div class="row"> <div class="col s4 center"> Gender </div><div class="col s4 center"> <input type="radio" name="gender" id="part_male" value="male" required="required"> <label for="part_male">Male</label> </div><div class="col s4 center"> <input type="radio" name="gender" id="part_female" value="female" required="required"> <label for="part_female">Female</label> </div></div><div class="row"> <div class="input-field col s12"> <i class="material-icons prefix">directions_run</i> <select id="part_sport" multiple="multiple" required="required" name="part_sport"></select> <label for="part_sport" data-error="Enter Sport">Sport</label> </div></div>';
  $('input#part_phone').characterCounter();
  Materialize.updateTextFields();
}
var resend_credentials_id_arr = [];
var resend_credentials_email_arr = [];
function openResendCredentialsMailCompose() {
  if (document.getElementsByClassName('resend-credentials-selected-send-mail-sport-row').length > 0) {
    resend_credentials_id_arr = [];
    resend_credentials_email_arr = [];
    for (var i = 0; i < document.getElementsByClassName('resend-credentials-selected-send-mail-sport-row').length; i++) {
      var idno = parseInt(document.getElementsByClassName('resend-credentials-selected-send-mail-sport-row')[i].children[4].innerHTML);
      var email = document.getElementsByClassName('resend-credentials-selected-send-mail-sport-row')[i].children[3].innerHTML;
      resend_credentials_id_arr.push(idno);
      resend_credentials_email_arr.push(email);
    }
    modal_open(11);
  } else {
    Materialize.toast('Please Select atleast one Participant to Send Email!', 3000);
  }
}
function composeResendCredentialsMailGroupLeader(option) {
  resend_credentials_id_arr = [];
  resend_credentials_email_arr = [];
  var idno = parseInt(option.nextElementSibling.innerHTML);
  var email = option.previousElementSibling.innerHTML;
  resend_credentials_id_arr.push(idno);
  resend_credentials_email_arr.push(email);
  resetMailCompose();
  closeAllModals();
  modal_open(11);
  setTimeout(function() {
    document.getElementsByClassName("custom-modals")[10].style.display="none";
  }, 100);
}
var resend_credentials_idno;
function toggleGroupLeaaderSelection(elem) {
  if (elem.innerHTML == "check_box") {
    elem.innerHTML = "check_box_outline_blank";
    elem.parentElement.parentElement.setAttribute('class', 'group-leader-status-selection');
  } else {
    elem.innerHTML = "check_box";
    elem.parentElement.parentElement.setAttribute('class', 'group-leader-status-selection group-leader-status-selected');
  }
}
function confirmChangeUserStatus2() {
  if (document.getElementsByClassName('group-leader-status-selected').length == 0) {
    Materialize.toast('Please Select a Player to Make Group Leader!', 3000);
  } else if (document.getElementsByClassName('group-leader-status-selected').length > 1) {
    Materialize.toast('You can only Toggle Leader of a Single Player!', 3000);
  } else {
    var idno = parseInt(document.getElementsByClassName('group-leader-status-selected')[0].children[0].innerHTML);
    makeGroupLeader(idno);
  }
}
function toggleUnconfirmedTeamsSelection(elem) {
  if (elem.innerHTML == "check_box") {
    elem.innerHTML = "check_box_outline_blank";
    elem.parentElement.parentElement.setAttribute('class', 'unconfirmed-teams-status-selection');
  } else {
    elem.innerHTML = "check_box";
    elem.parentElement.parentElement.setAttribute('class', 'unconfirmed-teams-status-selection unconfirmed-teams-status-selected');
  }
}
function toggleConfirmedTeamsSelection(elem) {
  if (elem.innerHTML == "check_box") {
    elem.innerHTML = "check_box_outline_blank";
    elem.parentElement.parentElement.setAttribute('class', 'confirmed-teams-status-selection');
  } else {
    elem.innerHTML = "check_box";
    elem.parentElement.parentElement.setAttribute('class', 'confirmed-teams-status-selection confirmed-teams-status-selected');
  }
}
function toggleUnconfirmedPartDocsSelection(elem) {
  if (elem.innerHTML == "check_box") {
    elem.innerHTML = "check_box_outline_blank";
    elem.parentElement.parentElement.setAttribute('class', 'unconfirmed-parts-status-selection');
  } else {
    elem.innerHTML = "check_box";
    elem.parentElement.parentElement.setAttribute('class', 'unconfirmed-parts-status-selection unconfirmed-parts-status-selected');
  }
}
function toggleConfirmedPartDocsSelection(elem) {
  if (elem.innerHTML == "check_box") {
    elem.innerHTML = "check_box_outline_blank";
    elem.parentElement.parentElement.setAttribute('class', 'confirmed-parts-status-selection');
  } else {
    elem.innerHTML = "check_box";
    elem.parentElement.parentElement.setAttribute('class', 'confirmed-parts-status-selection confirmed-parts-status-selected');
  }
}
function toggleFinalConfirmationMailSportSelection(elem) {
  if (elem.innerHTML == "check_box") {
    elem.innerHTML = "check_box_outline_blank";
    elem.parentElement.parentElement.setAttribute('class', 'final-confirmation-mail-sport-selection');
  } else {
    elem.innerHTML = "check_box";
    elem.parentElement.parentElement.setAttribute('class', 'final-confirmation-mail-sport-selection final-confirmation-mail-sport-selected');
  }
}
// AJAX Functions
var leftData;
var rightData;
function fetchSwitchStatus() {
  showLoader();
  closeAllModals();
  Materialize.toast('Updating List!', 4000);
  document.getElementById('switch-status-left-list-clg').innerHTML = '';
  document.getElementById('switch-status-right-list-clg').innerHTML = '';
  csrf_token = getCookie('csrftoken');
  var ourRequest = new XMLHttpRequest();
  var url = "activate/";
  ourRequest.open("POST", url, true);
  ourRequest.setRequestHeader("Content-type", "application/json");
  ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
  ourRequest.onreadystatechange = function() {
    if (ourRequest.readyState === 4 && ourRequest.status === 200) {
      var jsonResponse = JSON.parse(ourRequest.responseText);
      leftData = jsonResponse.data;
      rightData = jsonResponse.data2;
      for (var i = 0; i < leftData.length; i++) {
        document.getElementById('switch-status-left-list-clg').innerHTML += '<tr onclick="openCollegeLeaders(this, 1)" class="switch-status-college-row"> <td style="display: none">'+leftData[i][3]+'</td><td style="flex-basis: 40%">'+leftData[i][0]+'</td><td style="flex-basis: 30%">'+leftData[i][1]+'</td><td style="flex-basis: 30%">'+leftData[i][2]+'</td></tr>';
      }
      for (var i = 0; i < rightData.length; i++) {
        document.getElementById('switch-status-right-list-clg').innerHTML += '<tr onclick="openCollegeLeaders(this, 2)" class="switch-status-college-row"> <td style="display: none">'+rightData[i][3]+'</td><td style="flex-basis: 40%">'+rightData[i][0]+'</td><td style="flex-basis: 30%">'+rightData[i][1]+'</td><td style="flex-basis: 30%">'+rightData[i][2]+'</td></tr>';
      }
      showDiv(1);
      hideLoader();
      closeAllModals();
    } else if (ourRequest.readyState === 4 && ourRequest.status != 200) {
      Materialize.toast('There was some error connecting to the server!', 3000);
    }
  };
  ourRequest.send('');
}
function activateUser(idno) {
  Materialize.toast('Switching User!', 4000);
  closeAllModals();
  var data = {
    "pk": idno
  }
  var sendData = JSON.stringify(data);
  csrf_token = getCookie('csrftoken');
  var ourRequest = new XMLHttpRequest();
  var url = "activate/activate/";
  ourRequest.open("POST", url, true);
  ourRequest.setRequestHeader("Content-type", "application/json");
  ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
  ourRequest.onreadystatechange = function() {
    if (ourRequest.readyState === 4 && ourRequest.status === 200) {
      var jsonResponse = JSON.parse(ourRequest.responseText);
      Materialize.toast('User Successfully Switched!', 3000);
      fetchSwitchStatus();
    } else if (ourRequest.readyState === 4 && ourRequest.status != 200) {
      Materialize.toast('There was some error connecting to the server!', 3000);
      fetchSwitchStatus();
    }
  };
  ourRequest.send(sendData);
}
function deactivateUser(idno) {
  Materialize.toast('Switching User!', 4000);
  closeAllModals();
  var data = {
    "pk": idno
  }
  var sendData = JSON.stringify(data);
  csrf_token = getCookie('csrftoken');
  var ourRequest = new XMLHttpRequest();
  var url = "activate/deactivate/";
  ourRequest.open("POST", url, true);
  ourRequest.setRequestHeader("Content-type", "application/json");
  ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
  ourRequest.onreadystatechange = function() {
    if (ourRequest.readyState === 4 && ourRequest.status === 200) {
      var jsonResponse = JSON.parse(ourRequest.responseText);
      Materialize.toast('User Successfully Switched!', 3000);
      fetchSwitchStatus();
    } else if (ourRequest.readyState === 4 && ourRequest.status != 200) {
      Materialize.toast('There was some error connecting to the server!', 3000);
      fetchSwitchStatus();
    }
  };
  ourRequest.send(sendData);
}
function fetchStats() {
  showLoader();
  closeAllModals();
  Materialize.toast('Updating Stats!', 4000);
  document.getElementById('college-wise-stats').innerHTML = '';
  document.getElementById('sport-wise-stats').innerHTML = '';
  document.getElementById('college-wise-stats-foot').innerHTML = '';
  document.getElementById('sports-wise-stats-foot').innerHTML = '';
  csrf_token = getCookie('csrftoken');
  var ourRequest = new XMLHttpRequest();
  var url = "stats/";
  ourRequest.open("POST", url, true);
  ourRequest.setRequestHeader("Content-type", "application/json");
  ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
  ourRequest.onreadystatechange = function() {
    if (ourRequest.readyState === 4 && ourRequest.status === 200) {
      var jsonResponse = JSON.parse(ourRequest.responseText);
      clgData = jsonResponse.college;
      sportData = jsonResponse.sport;
      totData = jsonResponse.total;
      for (var i = 0; i < clgData.length; i++) {
        document.getElementById('college-wise-stats').innerHTML += '<tr class="stats-row" onclick="openStats('+clgData[i][0]+', 1, this)"> <td style="flex-basis: 40%;"><a class="black-text">'+clgData[i][1]+', '+clgData[i][2]+', '+clgData[i][3]+'</td><td style="flex-basis: 15%;">'+clgData[i][4]+' | '+clgData[i][5]+'</td><td style="flex-basis: 15%;">'+clgData[i][6]+' | '+clgData[i][7]+'</td><td style="flex-basis: 15%;">'+clgData[i][8]+' | '+clgData[i][9]+'</td><td style="flex-basis: 15%;">'+clgData[i][10]+' | '+clgData[i][11]+'</td></tr>';
      }
      for (var i = 0; i < sportData.length; i++) {
        document.getElementById('sport-wise-stats').innerHTML += '<tr class="stats-row" onclick="openStats('+sportData[i][0]+', 2, this)"> <td style="flex-basis: 40%;"><a class="black-text">'+sportData[i][1]+'</td><td style="flex-basis: 15%;">'+sportData[i][2]+' | '+sportData[i][3]+'</td><td style="flex-basis: 15%;">'+sportData[i][4]+' | '+sportData[i][5]+'</td><td style="flex-basis: 15%;">'+sportData[i][6]+' | '+sportData[i][7]+'</td><td style="flex-basis: 15%;">'+sportData[i][8]+' | '+sportData[i][9]+'</td></tr>';
      }
      document.getElementById('college-wise-stats-foot').innerHTML = '<tr> <td class="center" style="flex-basis: 40%;">Total</td><td class="center" style="flex-basis: 15%;">'+totData[0]+' | '+totData[1]+'</td><td class="center" style="flex-basis: 15%;">'+totData[2]+' | '+totData[3]+'</td><td class="center" style="flex-basis: 15%;">'+totData[4]+' | '+totData[5]+'</td><td class="center" style="flex-basis: 15%;">'+totData[6]+' | '+totData[7]+'</td></tr>';
      document.getElementById('sports-wise-stats-foot').innerHTML = '<tr> <td class="center" style="flex-basis: 40%;">Total</td><td class="center" style="flex-basis: 15%;">'+totData[0]+' | '+totData[1]+'</td><td class="center" style="flex-basis: 15%;">'+totData[2]+' | '+totData[3]+'</td><td class="center" style="flex-basis: 15%;">'+totData[4]+' | '+totData[5]+'</td><td class="center" style="flex-basis: 15%;">'+totData[6]+' | '+totData[7]+'</td></tr>';
      showDiv(2);
      hideLoader();
      closeAllModals();
    } else if (ourRequest.readyState === 4 && ourRequest.status != 200) {
      Materialize.toast('There was some error connecting to the server!', 3000);
      // var jsonResponse = {"college": [[1, "BITS Pilani", "Pilani", "Rajasthan", 1, 2, 3, 4, 4, 6, 1, 2],[2, "BITS Pilani", "Hyderabad", "Hyderabad", 1, 2, 3, 4, 4, 6, 1, 2],[3, "BITS Pilani", "Goa", "Goa", 1, 2, 3, 4, 4, 6, 1, 2]], "sport": [[1, "Basketball (Boys)", 1, 2, 3, 4, 4, 6, 1, 2],[2, "Basketball (Girls)", 1, 2, 3, 4, 4, 6, 1, 2],[3, "Badminton (Boys)", 1, 2, 3, 4, 4, 6, 1, 2],[4, "Badminton (Girls)", 1, 2, 3, 4, 4, 6, 1, 2],[5, "Cricket (Boys)", 1, 2, 3, 4, 4, 6, 1, 2]], "total": [100, 200, 300, 400, 400, 600, 100, 200]};
    }
  };
  ourRequest.send('');
}
function openStats(idno, selection, option) {
  Materialize.toast('Updating Stats!', 4000);
  var name = option.children[0].children[0].innerHTML;
  document.getElementById('specific-col-sport').innerHTML = '';
  document.getElementById('specific-col-sport-body').innerHTML = '';
  document.getElementById('specific-col-sport-foot').innerHTML = '';
  if (selection == 1) {
    document.getElementById('specific-col-sport').innerHTML = '<tr> <th style="flex-basis: 40%;">Sports ('+name+')</th> <th style="flex-basis: 15%;">Male</th> <th style="flex-basis: 15%;">Female</th> <th style="flex-basis: 15%;">Total</th> <th style="flex-basis: 15%;">Coach</th> </tr>';
  } else {
    document.getElementById('specific-col-sport').innerHTML = '<tr> <th style="flex-basis: 40%;">Colleges ('+name+')</th> <th style="flex-basis: 15%;">Male</th> <th style="flex-basis: 15%;">Female</th> <th style="flex-basis: 15%;">Total</th> <th style="flex-basis: 15%;">Coach</th> </tr>';
  }
  modal_open(1);
  csrf_token = getCookie('csrftoken');
  if (selection == 1) {
    // Send College ID
    var jsonData = {
      "idno": idno
    }
    var sendData = JSON.stringify(jsonData);
    var ourRequest = new XMLHttpRequest();
    var url = "stats/college/";
    ourRequest.open("POST", url, true);
    ourRequest.setRequestHeader("Content-type", "application/json");
    ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
    ourRequest.onreadystatechange = function() {
      if (ourRequest.readyState === 4 && ourRequest.status === 200) {
        var jsonResponse = JSON.parse(ourRequest.responseText);
        sportData = jsonResponse.sport;
        totData = jsonResponse.total;
        for (var i = 0; i < sportData.length; i++) {
          document.getElementById('specific-col-sport-body').innerHTML += '<tr class="specific-col-sport-row" onclick="openSpecificStats(1, '+idno+', '+sportData[i][0]+', \''+name+'\', this)"> <td style="flex-basis: 40%;"><a class="black-text">'+sportData[i][1]+'</td><td style="flex-basis: 15%;">'+sportData[i][2]+' | '+sportData[i][3]+'</td><td style="flex-basis: 15%;">'+sportData[i][4]+' | '+sportData[i][5]+'</td><td style="flex-basis: 15%;">'+sportData[i][6]+' | '+sportData[i][7]+'</td><td style="flex-basis: 15%;">'+sportData[i][8]+' | '+sportData[i][9]+'</td></tr>';
        }
        document.getElementById('specific-col-sport-foot').innerHTML = '<tr> <td class="center" style="flex-basis: 40%;">Total</td><td class="center" style="flex-basis: 15%;">'+totData[0]+' | '+totData[1]+'</td><td class="center" style="flex-basis: 15%;">'+totData[2]+' | '+totData[3]+'</td><td class="center" style="flex-basis: 15%;">'+totData[4]+' | '+totData[5]+'</td><td class="center" style="flex-basis: 15%;">'+totData[6]+' | '+totData[7]+'</td></tr>';
        Materialize.toast('Updated List', 3000);
      } else if (ourRequest.readyState === 4 && ourRequest.status != 200) {
        Materialize.toast('There was some error connecting to the server!', 3000);
        // var jsonResponse = {"sport": [[1, "Basketball (Boys)", 1, 2, 3, 4, 4, 6, 1, 2],[2, "Basketball (Girls)", 1, 2, 3, 4, 4, 6, 1, 2],[3, "Badminton (Boys)", 1, 2, 3, 4, 4, 6, 1, 2],[4, "Badminton (Girls)", 1, 2, 3, 4, 4, 6, 1, 2],[5, "Cricket (Boys)", 1, 2, 3, 4, 4, 6, 1, 2]], "total": [100, 200, 300, 400, 400, 600, 100, 200]};
      }
    };
    ourRequest.send(sendData);
  } else {
    var jsonData = {
      "idno": idno
    }
    var sendData = JSON.stringify(jsonData);
    var ourRequest = new XMLHttpRequest();
    var url = "stats/sport/";
    ourRequest.open("POST", url, true);
    ourRequest.setRequestHeader("Content-type", "application/json");
    ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
    ourRequest.onreadystatechange = function() {
      if (ourRequest.readyState === 4 && ourRequest.status === 200) {
        var jsonResponse = JSON.parse(ourRequest.responseText);
        clgData = jsonResponse.college;
        totData = jsonResponse.total;
        for (var i = 0; i < clgData.length; i++) {
          document.getElementById('specific-col-sport-body').innerHTML += '<tr class="specific-col-sport-row" onclick="openSpecificStats(2, '+clgData[i][0]+', '+idno+', \''+name+'\', this)"> <td style="flex-basis: 40%;"><a class="black-text">'+clgData[i][1]+', '+clgData[i][2]+', '+clgData[i][3]+'</td><td style="flex-basis: 15%;">'+clgData[i][4]+' | '+clgData[i][5]+'</td><td style="flex-basis: 15%;">'+clgData[i][6]+' | '+clgData[i][7]+'</td><td style="flex-basis: 15%;">'+clgData[i][8]+' | '+clgData[i][9]+'</td><td style="flex-basis: 15%;">'+clgData[i][10]+' | '+clgData[i][11]+'</td></tr>';
        }
        document.getElementById('specific-col-sport-foot').innerHTML = '<tr> <td class="center" style="flex-basis: 40%;">Total</td><td class="center" style="flex-basis: 15%;">'+totData[0]+' | '+totData[1]+'</td><td class="center" style="flex-basis: 15%;">'+totData[2]+' | '+totData[3]+'</td><td class="center" style="flex-basis: 15%;">'+totData[4]+' | '+totData[5]+'</td><td class="center" style="flex-basis: 15%;">'+totData[6]+' | '+totData[7]+'</td></tr>';
        Materialize.toast('Updated List', 3000);
      } else if (ourRequest.readyState === 4 && ourRequest.status != 200) {
        Materialize.toast('There was some error connecting to the server!', 3000);
        // var jsonResponse = {"college": [[1, "BITS Pilani", "Pilani", "Rajasthan", 1, 2, 3, 4, 4, 6, 1, 2],[2, "BITS Pilani", "Hyderabad", "Hyderabad", 1, 2, 3, 4, 4, 6, 1, 2],[3, "BITS Pilani", "Goa", "Goa", 1, 2, 3, 4, 4, 6, 1, 2]], "total": [100, 200, 300, 400, 400, 600, 100, 200]};
      }
    };
    ourRequest.send(sendData);
  }
}
function openSpecificStats(num, id_col, id_sport, name, option) {
  Materialize.toast('Updating Stats!', 4000);
  var name2 = option.children[0].children[0].innerHTML;
  if (num == 1) {
    document.getElementById('specific-stats-header').innerHTML = '<th style="flex-basis: 50%;">'+name2+'</th> <th style="flex-basis: 50%;">'+name+'</th>';
  } else {
    document.getElementById('specific-stats-header').innerHTML = '<th style="flex-basis: 50%;">'+name+'</th> <th style="flex-basis: 50%;">'+name2+'</th>';
  }
  document.getElementById('specific-stats-head').innerHTML = '<tr> <th style="flex-basis: 18%;">Name</th> <th style="flex-basis: 10%;">Phone</th> <th style="flex-basis: 22%;">EMail</th> <th style="flex-basis: 10%;">Gender</th> <th style="flex-basis: 10%;">Participant</th> <th style="flex-basis: 10%;">Confirmation</th> <th style="flex-basis: 10%;">Payment</th> <th style="flex-basis: 10%;">Docs</th> </tr>';
  document.getElementById('specific-stats-body').innerHTML = '';
  modal_open(2);
  csrf_token = getCookie('csrftoken');
  var jsonData = {
    "col_id": id_col,
    "sport_id": id_sport
  }
  var sendData = JSON.stringify(jsonData);
  var ourRequest = new XMLHttpRequest();
  var url = "stats/specific/";
  ourRequest.open("POST", url, true);
  ourRequest.setRequestHeader("Content-type", "application/json");
  ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
  ourRequest.onreadystatechange = function() {
    if (ourRequest.readyState === 4 && ourRequest.status === 200) {
      var jsonResponse = JSON.parse(ourRequest.responseText);
      var participants = jsonResponse.participants;
      for (var i = 0; i < participants.length; i++) {
        var confirmation = '';
        var payment = '';
        var documents = '';
        if (participants[i][5] == 0) {
          confirmation = '<div class="tiny-status-div grey darken-1"></div>';
        } else {
          confirmation = '<div class="tiny-status-div green darken-1"></div>';
        }
        if (participants[i][6] == 0) {
          payment = '<div class="tiny-status-div red darken-1"></div>';
        } else if (participants[i][6] == 1) {
          payment = '<div class="tiny-status-div yellow darken-1"></div>';
        } else {
          payment = '<div class="tiny-status-div green darken-1"></div>';
        }
        if (participants[i][7] < 2) {
          documents = '<div class="tiny-status-div grey darken-1"></div>';
        } else {
          documents = '<div class="tiny-status-div green darken-1"></div>';
        }
        document.getElementById('specific-stats-body').innerHTML += '<tr class="specific-stats-row"> <td style="flex-basis: 18%;">'+participants[i][0]+'</td><td style="flex-basis: 10%;">'+participants[i][1]+'</td><td style="flex-basis: 22%;">'+participants[i][2]+'</td><td style="flex-basis: 10%;">'+participants[i][3]+'</td><td style="flex-basis: 10%;">'+participants[i][4]+'</td><td style="flex-basis: 10%;">'+confirmation+'</td><td style="flex-basis: 10%;">'+payment+'</td><td style="flex-basis: 10%;">'+documents+'</td></tr>';
      }
      Materialize.toast('Updated List', 3000);
    } else if (ourRequest.readyState === 4 && ourRequest.status != 200) {
      Materialize.toast('There was some error connecting to the server!', 3000);
      // var jsonResponse = {"participants": [["Arpit Anshuman", 9829775537, "f2016250@pilani.bits-pilani.ac.in", "male", "Participant", 1, 1],["Nikhil Khandelwal", 9090909090, "f2016192@pilani.bits-pilani.ac.in", "male", "Captain", 0, 1],["Rampalli Sai Srivatsa", 8901234567, "f2016290@pilani.bits-pilani.ac.in", "male", "Coach", 1, 0],["Piyali Manna", 1234567890, "f2016226@pilani.bits-pilani.ac.in", "female", "Participant", 1, 2]]};
    }
  };
  ourRequest.send(sendData);
}
function addSportSubmit() {
  var formData = serializeArray(document.getElementById('add-sport-form'));
  var sportName = formData[0].value;
  var lowerLimit = formData[1].value;
  var upperLimit = formData[2].value;
  var gender = '';
  if (formData.length > 3) {
    gender = formData[3].value;
  }
  if (sportName == '' || lowerLimit == '' || upperLimit == '' || gender == '') {
    Materialize.toast('Please Fill all the fields!', 3000);
  } else {
    var jsonData = {
      "sportName": sportName,
      "lowerLimit": lowerLimit,
      "upperLimit": upperLimit,
      "gender": gender
    }
    var sendData = JSON.stringify(jsonData);
    closeAllModals();
    Materialize.toast('Adding Sport!', 4000);
    resetAddSportForm();
    csrf_token = getCookie('csrftoken');
    var ourRequest = new XMLHttpRequest();
    var url = "addsport/";
    ourRequest.open("POST", url, true);
    ourRequest.setRequestHeader("Content-type", "application/json");
    ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
    ourRequest.onreadystatechange = function() {
      if (ourRequest.readyState === 4 && ourRequest.status === 200) {
        Materialize.toast('Sport Added!', 3000);
        closeAllModals();
      } else if (ourRequest.readyState === 4 && ourRequest.status != 200) {
        Materialize.toast('There was some error connecting to the server!', 3000);
        closeAllModals();
      }
    };
    ourRequest.send(sendData);
  }
}
function addCollegeSubmit() {
  var formData = serializeArray(document.getElementById('add-college-form'));
  var clgName = formData[0].value;
  var city = formData[1].value;
  var state = formData[2].value;
  if (clgName == '' || city == '' || state == '') {
    Materialize.toast('Please Fill all the fields!', 3000);
  } else {
    var jsonData = {
      "clgName": clgName,
      "city": city,
      "state": state
    }
    var sendData = JSON.stringify(jsonData);
    closeAllModals();
    Materialize.toast('Adding College!', 4000);
    resetAddCollegeForm();
    csrf_token = getCookie('csrftoken');
    var ourRequest = new XMLHttpRequest();
    var url = "addcollege/";
    ourRequest.open("POST", url, true);
    ourRequest.setRequestHeader("Content-type", "application/json");
    ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
    ourRequest.onreadystatechange = function() {
      if (ourRequest.readyState === 4 && ourRequest.status === 200) {
        Materialize.toast('College Added!', 3000);
        closeAllModals();
      } else if (ourRequest.readyState === 4 && ourRequest.status != 200) {
        Materialize.toast('There was some error connecting to the server!', 3000);
        closeAllModals();
      }
    };
    ourRequest.send(sendData);
  }
}
function editLimits() {
  showLoader();
  closeAllModals();
  document.getElementById('sport-limit-body').innerHTML = '';
  Materialize.toast('Fetching Limit Updates!', 4000);
  csrf_token = getCookie('csrftoken');
  var ourRequest = new XMLHttpRequest();
  var url = "displaylimits/";
  ourRequest.open("POST", url, true);
  ourRequest.setRequestHeader("Content-type", "application/json");
  ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
  ourRequest.onreadystatechange = function() {
    if (ourRequest.readyState === 4 && ourRequest.status === 200) {
      var jsonResponse = JSON.parse(ourRequest.responseText);
      var limits = jsonResponse.limits;
      for (var i = 0; i < limits.length; i++) {
        document.getElementById('sport-limit-body').innerHTML += '<tr> <td style="display: none;">'+limits[i][0]+'</td><td style="flex-basis: 25%;">'+limits[i][1]+'</td><td style="flex-basis: 25%;">'+limits[i][2]+'</td><td style="flex-basis: 30%;">'+limits[i][3]+'</td><td class="hover-effect" style="flex-basis: 20%;" onclick="editSportLimit(this);"><i class="material-icons">build</i></td></tr>';
      }
      showDiv(3);
      hideLoader();
      closeAllModals();
    } else if (ourRequest.readyState === 4 && ourRequest.status != 200) {
      Materialize.toast('There was some error connecting to the server!', 3000);
    }
  };
  ourRequest.send('');
}
function editSportLimitSubmit(idno) {
  var formData = serializeArray(document.getElementById('edit-limits-form'));
  var minLim = formData[0].value;
  var maxLim = formData[1].value;
  var jsonData = {
    "lowerLimit": minLim,
    "upperLimit": maxLim,
    "idno": idno
  }
  var sendData = JSON.stringify(jsonData);
  closeAllModals();
  Materialize.toast('Updating Limits!', 4000);
  resetEditSportLimit();
  csrf_token = getCookie('csrftoken');
  var ourRequest = new XMLHttpRequest();
  var url = "displaylimits/change/";
  ourRequest.open("POST", url, true);
  ourRequest.setRequestHeader("Content-type", "application/json");
  ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
  ourRequest.onreadystatechange = function() {
    if (ourRequest.readyState === 4 && ourRequest.status === 200) {
      Materialize.toast('Updated Limits!', 3000);
      closeAllModals();
      editLimits();
    } else if (ourRequest.readyState === 4 && ourRequest.status != 200) {
      Materialize.toast('There was some error connecting to the server!', 3000);
      closeAllModals();
      editLimits();
    }
  };
  ourRequest.send(sendData);
}
function fetchMail() {
  showLoader();
  closeAllModals();
  Materialize.toast('Updating Mailing List!', 3000);
  document.getElementById('mail-groupleader-body').innerHTML = '';
  csrf_token = getCookie('csrftoken');
  var ourRequest = new XMLHttpRequest();
  var url = "mail/";
  ourRequest.open("POST", url, true);
  ourRequest.setRequestHeader("Content-type", "application/json");
  ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
  ourRequest.onreadystatechange = function() {
    if (ourRequest.readyState === 4 && ourRequest.status === 200) {
      Materialize.toast('Updated List!', 3000);
      var jsonResponse = JSON.parse(ourRequest.responseText);
      var leaders = jsonResponse.groupleaders;
      for (var i = 0; i < leaders.length; i++) {
        document.getElementById('mail-groupleader-body').innerHTML += '<tr class="mail-groupleader-row" onclick="openMailSports(this)"> <td style="flex-basis: 25%;">'+leaders[i][0]+'</td><td style="flex-basis: 30%;">'+leaders[i][1]+', '+leaders[i][2]+', '+leaders[i][3]+'</td><td style="flex-basis: 30%;">'+leaders[i][4]+'</td><td style="flex-basis: 15%;" onclick="composeMailGroupLeader(this);"><i class="material-icons">email</i></td><td style="display: none;" class="mail-groupleader-id">'+leaders[i][5]+'</td><td style="display: none;" class="mail-college-groupleader-id">'+leaders[i][6]+'</td></tr>';
      }
      closeAllModals();
      showDiv(4);
      hideLoader();
    } else if (ourRequest.readyState === 4 && ourRequest.status != 200) {
      Materialize.toast('There was some error connecting to the server!', 3000);
      // var jsonResponse = {"groupleaders": [["Arpit Anshuman", "BITS Pilani", "Pilani", "Rajasthan", "f2016250@pilani.bits-pilani.ac.in", 1, 2],["Arpit Anshuman", "BITS Pilani", "Hyderabad", "Hyderabad", "f2016226@pilani.bits-pilani.ac.in", 2, 3],["Arpit Anshuman", "BITS Pilani", "Goa", "Goa", "f2016192@pilani.bits-pilani.ac.in", 3, 9],["Arpit Anshuman", "BITS Pilani", "Pilani", "Rajasthan", "f2016196@pilani.bits-pilani.ac.in", 4, 96],["Arpit Anshuman", "BITS Pilani", "Pilani", "Rajasthan", "f2016189@pilani.bits-pilani.ac.in", 5, 89]]};
    }
  };
  ourRequest.send('');
}
function openMailSports(option) {
  Materialize.toast('Updating Mailing List!', 3000);
  csrf_token = getCookie('csrftoken');
  var clg_id = parseInt(option.children[5].innerHTML);
  var jsonData = {
    "clg_id": clg_id
  }
  console.log(jsonData);
  var sendData = JSON.stringify(jsonData);
  document.getElementById('send-mail-sport-body').innerHTML = '';
  modal_open(6);
  var ourRequest = new XMLHttpRequest();
  var url = "mail/send/";
  ourRequest.open("POST", url, true);
  ourRequest.setRequestHeader("Content-type", "application/json");
  ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
  ourRequest.onreadystatechange = function() {
    if (ourRequest.readyState === 4 && ourRequest.status === 200) {
      Materialize.toast('Updated List!', 3000);
      var jsonResponse = JSON.parse(ourRequest.responseText);
      var data = jsonResponse.data;
      for (var i = 0; i < data.length; i++) {
        document.getElementById('send-mail-sport-body').innerHTML += '<tr> <td style="flex-basis: 10%;"><i style="flex-basis: 10%;" class="material-icons tooltipped change_cursor" data-position="right" data-delay="50" data-tooltip="Select/Deselect this Sport" onclick="toggleSportMailSelection(this);">check_box_outline_blank</i></td><td style="flex-basis: 90%;">'+data[i][0]+'</td><td style="display: none;">'+data[i][1]+'</td></tr>';
        for (var j = 0; j < data[i][2].length; j++) {
          document.getElementById('send-mail-sport-body').innerHTML += '<tr class="send-mail-sport-row"> <td style="flex-basis: 10%;"><i style="flex-basis: 10%;" class="material-icons tooltipped change_cursor" data-position="right" data-delay="50" data-tooltip="Select/Deselect this Participant" onclick="toggleParticipantMailSelection(this);">check_box_outline_blank</i></td><td style="flex-basis: 35%;">'+data[i][2][j][0]+'</td><td style="flex-basis: 20%;">'+data[i][2][j][1]+'</td><td style="flex-basis: 35%;">'+data[i][2][j][2]+'</td><td style="display: none;">'+data[i][2][j][3]+'</td></tr>';
        }
      }
    } else if (ourRequest.readyState === 4 && ourRequest.status != 200) {
      Materialize.toast('There was some error connecting to the server!', 3000);
      // var jsonResponse = {"data": [["Basketball (Boys)", 1, [["Arpit Anshuman", 9091901901, "f2016250@pilani.bits-pilani.ac.in", 1],["Nikhil Khandelwal", 9091901901, "f2016192@pilani.bits-pilani.ac.in", 4]]],["Basketball (Girls)", 2, [["Piyali Manna", 9091901901, "f2016226@pilani.bits-pilani.ac.in", 2],["Mansi Jain", 9091901901, "f2016226@pilani.bits-pilani.ac.in", 5]]],["Badminton (Boys)", 3, [["Srivatsa Rampalli", 9829777634, "f2016290@pilani.bits-pilani.ac.in", 3]]],["Cricket (Boys)", 1, [["Nikhil Khandelwal", 9091901901, "f2016192@pilani.bits-pilani.ac.in", 4],["Nikhil Khandelwal", 9091901901, "f2016192@pilani.bits-pilani.ac.in", 4],["Nikhil Khandelwal", 9091901901, "f2016192@pilani.bits-pilani.ac.in", 4],["Nikhil Khandelwal", 9091901901, "f2016192@pilani.bits-pilani.ac.in", 4]]]]};
    }
  };
  ourRequest.send(sendData);
}
function sendMail() {
  var formData = serializeArray(document.getElementById('send-mail-compose-form'));
  var sub = formData[0].value;
  var body = formData[1].value;
  if (sub != '' && body != '') {
    Materialize.toast('Sending Mail!', 3000);
    closeAllModals();
    csrf_token = getCookie('csrftoken');
    var jsonData = {
      "id_arr": id_arr,
      "email_arr": email_arr,
      "sub": sub,
      "body": body
    }
    console.log(jsonData);
    var sendData = JSON.stringify(jsonData);
    var ourRequest = new XMLHttpRequest();
    var url = "mail/send/modify/";
    ourRequest.open("POST", url, true);
    ourRequest.setRequestHeader("Content-type", "application/json");
    ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
    ourRequest.onreadystatechange = function() {
      if (ourRequest.readyState === 4 && ourRequest.status === 200) {
        var jsonResponse = JSON.parse(ourRequest.responseText);
        if (jsonResponse.success == 1) {
          Materialize.toast('Mails Sent!', 3000);
        } else {
          Materialize.toast('Some mails could not be sent!', 3000);
        }
        closeAllModals();
      } else if (ourRequest.readyState === 4 && ourRequest.status != 200) {
        Materialize.toast('There was some error connecting to the server!', 3000);
        closeAllModals();
      }
    };
    ourRequest.send(sendData);
  } else {
    Materialize.toast('Email Subject/Body cannot be left blank!', 3000);
  }
}
var edit_groupleaders;
var edit_sports;
function fetchEditLeaders() {
  showLoader();
  closeAllModals();
  Materialize.toast('Updating List!', 3000);
  document.getElementById('edit-groupleader-body').innerHTML = '';
  csrf_token = getCookie('csrftoken');
  var ourRequest = new XMLHttpRequest();
  var url = "edit/";
  ourRequest.open("POST", url, true);
  ourRequest.setRequestHeader("Content-type", "application/json");
  ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
  ourRequest.onreadystatechange = function() {
    if (ourRequest.readyState === 4 && ourRequest.status === 200) {
      Materialize.toast('Updated List!', 3000);
      var jsonResponse = JSON.parse(ourRequest.responseText);
      edit_groupleaders = jsonResponse.groupleaders;
      edit_sports = jsonResponse.sports;
      var leaders = jsonResponse.groupleaders;
      for (var i = 0; i < leaders.length; i++) {
        document.getElementById('edit-groupleader-body').innerHTML += '<tr class="edit-groupleader-row" onclick="openEditSports(this)"> <td style="flex-basis: 20%;">'+leaders[i][0]+'</td><td style="flex-basis: 25%;">'+leaders[i][1]+', '+leaders[i][2]+', '+leaders[i][3]+'</td><td style="flex-basis: 15%;">'+leaders[i][4]+'</td><td style="flex-basis: 25%;">'+leaders[i][5]+'</td><td style="flex-basis: 15%;" class="change_cursor" onclick="editGroupLeader(this)"><i class="material-icons">edit</i></td><td style="display: none;" class="edit-groupleader-id">'+leaders[i][6]+'</td><td style="display: none;" class="edit-college-groupleader-id">'+leaders[i][7]+'</td></tr>';
      }
      closeAllModals();
      showDiv(5);
      hideLoader();
    } else if (ourRequest.readyState === 4 && ourRequest.status != 200) {
      Materialize.toast('There was some error connecting to the server!', 3000);
      // var jsonResponse = {"groupleaders": [["Arpit Anshuman", "BITS Pilani", "Pilani", "Rajasthan", 9829775537, "f2016250@pilani.bits-pilani.ac.in", 1, 56, "male", [1,2]],["Arpit Anshuman", "BITS Pilani", "Hyderabad", "Hyderabad", 9009900990, "f2016250@pilani.bits-pilani.ac.in", 2, 45, "male", [1,2,3]],["Arpit Anshuman", "BITS Pilani", "Goa", "Goa", 1234567890, "f2016250@pilani.bits-pilani.ac.in", 3, 68, "male", [1]],["Arpit Anshuman", "BITS Pilani", "Pilani", "Rajasthan", 9876543210, "f2016250@pilani.bits-pilani.ac.in", 4, 87, "male", [1,2]],["Arpit Anshuman", "BITS Pilani", "Pilani", "Rajasthan", 1234554321, "f2016250@pilani.bits-pilani.ac.in", 5, 90, "male", [2,3]]], "sports": [1, "Basketball (Boys)", 2, "Badminton (Girls)", 3, "Cricket (Boys)"]};
    }
  };
  ourRequest.send('');
}
var edit_parts;
function openEditSports(option) {
  Materialize.toast('Updating List!', 3000);
  csrf_token = getCookie('csrftoken');
  var clg_id = parseInt(option.children[6].innerHTML);
  var jsonData = {
    "clg_id": clg_id
  }
  console.log(jsonData);
  var sendData = JSON.stringify(jsonData);
  document.getElementById('edit-part-sport-body').innerHTML = '';
  modal_open(8);
  var ourRequest = new XMLHttpRequest();
  var url = "edit/team/";
  ourRequest.open("POST", url, true);
  ourRequest.setRequestHeader("Content-type", "application/json");
  ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
  ourRequest.onreadystatechange = function() {
    if (ourRequest.readyState === 4 && ourRequest.status === 200) {
      Materialize.toast('Updated List!', 3000);
      var jsonResponse = JSON.parse(ourRequest.responseText);
      var data = jsonResponse.data;
      edit_parts = data;
      for (var i = 0; i < data.length; i++) {
        var sports = '';
        for (var j = 0; j < data[i][1].length; j++) {
          sports += data[i][1][j];
          if (j < data[i][1].length - 1) {
            sports += ', ';
          }
        }
        document.getElementById('edit-part-sport-body').innerHTML += '<tr class="edit-part-sport-row"> <td style="flex-basis: 20%;">'+data[i][0]+'</td><td style="flex-basis: 20%;">'+sports+'</td><td style="flex-basis: 15%;">'+data[i][2]+'</td><td style="flex-basis: 30%;">'+data[i][3]+'</td><td style="flex-basis: 7%;" class="change_cursor" onclick="editSportPart(this)"><i class="material-icons">edit</i></td><td style="display: none;">'+data[i][4]+'</td><td style="flex-basis: 8%;" class="change_cursor" onclick="deleteSportPart(this)"><i class="material-icons">delete</i></td></tr>';
      }
    } else if (ourRequest.readyState === 4 && ourRequest.status != 200) {
      Materialize.toast('There was some error connecting to the server!', 3000);
      // var jsonResponse = {"data": [["Arpit Anshuman", ["Basketball (Boys)", "Cricket (Boys)", "Badminton (Boys)"], 9829775537, "f2016250@pilani.bits-pilani.ac.in", 1, "male", [1, 3]],["Nikhil Khandelwal", ["Basketball (Boys)", "Badminton (Boys)"], 9090909090, "f2016192@pilani.bits-pilani.ac.in", 3, "female", [1, 2]],["Aman Singh", ["Cricket (Boys)"], 9829775537, "f2016189@pilani.bits-pilani.ac.in", 2, "male", [3]],["Srivatsa", ["Badminton (Boys)"], 9829777634, "f2016290@pilani.bits-pilani.ac.in", 10, "male", [2]],["Satyavrat Sharma", ["Basketball (Boys)", "Badminton (Boys)"], 9829775537, "f2016322@pilani.bits-pilani.ac.in", 7, "female", [1, 2]],["Arpit Anshuman", ["Basketball (Boys)", "Cricket (Boys)", "Badminton (Boys)"], 9829775537, "f2016250@pilani.bits-pilani.ac.in", 1, "male", [1, 2, 3]]]};
    }
  };
  ourRequest.send(sendData);
}
function sendEdit() {
  var formData = serializeArray(document.getElementById('edit-part-form'));
  var name = formData[0].value;
  var phone = formData[1].value;
  var email = formData[2].value;
  var gender = formData[3].value;
  var selectedSports = [];
  var i =4;
  while(formData[i] != undefined) {
    if (i!=4) {
      selectedSports.push(formData[i].value);
    }
    i++;
  }
  if (name != '' && phone != '' && email != '' && selectedSports.length > 0) {
    Materialize.toast('Updating Participant!', 3000);
    closeAllModals();
    csrf_token = getCookie('csrftoken');
    var jsonData = {
      "idno": idno,
      "name": name,
      "phone": phone,
      "email": email,
      "gender": gender,
      "selectedSports": selectedSports
    }
    console.log(jsonData);
    var sendData = JSON.stringify(jsonData);
    var ourRequest = new XMLHttpRequest();
    var url = "edit/team/modify/";
    ourRequest.open("POST", url, true);
    ourRequest.setRequestHeader("Content-type", "application/json");
    ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
    ourRequest.onreadystatechange = function() {
      if (ourRequest.readyState === 4 && ourRequest.status === 200) {
        Materialize.toast('Updated Participant!', 3000);
        closeAllModals();
        fetchEditLeaders();
      } else if (ourRequest.readyState === 4 && ourRequest.status != 200) {
        Materialize.toast('There was some error connecting to the server!', 3000);
        closeAllModals();
        fetchEditLeaders();
      }
    };
    ourRequest.send(sendData);
  } else {
    Materialize.toast('All fields must be filled!', 3000);
  }
}
var del_id;
function deleteSportPart(option) {
  del_id = parseInt(option.previousElementSibling.innerHTML);
  modal_open(16);
}
function deleteSportParticipant() {
  Materialize.toast('Deleting Participant!', 3000);
  closeAllModals();
  csrf_token = getCookie('csrftoken');
  var jsonData = {
    "idno": del_id
  }
  console.log(jsonData);
  var sendData = JSON.stringify(jsonData);
  var ourRequest = new XMLHttpRequest();
  var url = "delete/";
  ourRequest.open("POST", url, true);
  ourRequest.setRequestHeader("Content-type", "application/json");
  ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
  ourRequest.onreadystatechange = function() {
    if (ourRequest.readyState === 4 && ourRequest.status === 200) {
      Materialize.toast('Deleted Participant!', 3000);
      closeAllModals();
      fetchEditLeaders();
    } else if (ourRequest.readyState === 4 && ourRequest.status != 200) {
      Materialize.toast('There was some error connecting to the server!', 3000);
      closeAllModals();
      fetchEditLeaders();
    }
  };
  ourRequest.send(sendData);
}
function fetchExcel() {
  showLoader();
  closeAllModals();
  Materialize.toast('Updating List!', 3000);
  document.getElementById('download-excel-body').innerHTML = '';
  csrf_token = getCookie('csrftoken');
  var ourRequest = new XMLHttpRequest();
  var url = "excel/";
  ourRequest.open("POST", url, true);
  ourRequest.setRequestHeader("Content-type", "application/json");
  ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
  ourRequest.onreadystatechange = function() {
    if (ourRequest.readyState === 4 && ourRequest.status === 200) {
      Materialize.toast('Updated List!', 3000);
      var jsonResponse = JSON.parse(ourRequest.responseText);
      var leaders = jsonResponse.groupleaders;
      for (var i = 0; i < leaders.length; i++) {
        document.getElementById('download-excel-body').innerHTML += '<tr> <td style="flex-basis: 25%;">'+leaders[i][0]+'</td><td style="flex-basis: 30%;">'+leaders[i][1]+', '+leaders[i][2]+', '+leaders[i][3]+'</td><td style="flex-basis: 15%;"><a href="download_excel/'+leaders[i][4]+'/" target="_blank"><i class="material-icons black-text">file_download</i></a></td><td style="flex-basis: 15%;"><a href="download_csv/'+leaders[i][4]+'/" target="_blank"><i class="material-icons black-text">file_download</i></a></td><td style="flex-basis: 15%;"><a href="download_pdf/'+leaders[i][4]+'/" target="_blank"><i class="material-icons black-text">file_download</i></a></td><td style="display: none;" class="download-excel-groupleader-id">'+leaders[i][4]+'</td></tr>';
      }
      closeAllModals();
      showDiv(6);
      hideLoader();
    } else if (ourRequest.readyState === 4 && ourRequest.status != 200) {
      Materialize.toast('There was some error connecting to the server!', 3000);
      // var jsonResponse = {"groupleaders": [["Arpit Anshuman", "BITS Pilani", "Pilani", "Rajasthan", 1],["Arpit Anshuman", "BITS Pilani", "Hyderabad", "Hyderabad", 2],["Arpit Anshuman", "BITS Pilani", "Goa", "Goa", 3],["Arpit Anshuman", "BITS Pilani", "Pilani", "Rajasthan", 4],["Arpit Anshuman", "BITS Pilani", "Pilani", "Rajasthan", 5]]};
    }
  };
  ourRequest.send('');
}
function fetchResendCredentialsMail() {
  showLoader();
  closeAllModals();
  Materialize.toast('Updating Mailing List!', 3000);
  document.getElementById('resend-credentials-mail-groupleader-body').innerHTML = '';
  csrf_token = getCookie('csrftoken');
  var ourRequest = new XMLHttpRequest();
  var url = "credential/";
  ourRequest.open("POST", url, true);
  ourRequest.setRequestHeader("Content-type", "application/json");
  ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
  ourRequest.onreadystatechange = function() {
    if (ourRequest.readyState === 4 && ourRequest.status === 200) {
      Materialize.toast('Updated List!', 3000);
      var jsonResponse = JSON.parse(ourRequest.responseText);
      var leaders = jsonResponse.groupleaders;
      for (var i = 0; i < leaders.length; i++) {
        document.getElementById('resend-credentials-mail-groupleader-body').innerHTML += '<tr class="resend-credentials-mail-groupleader-row" onclick="openResendCredentialsMailSports(this)"> <td style="flex-basis: 25%;">'+leaders[i][0]+'</td><td style="flex-basis: 30%;">'+leaders[i][1]+', '+leaders[i][2]+', '+leaders[i][3]+'</td><td style="flex-basis: 30%;">'+leaders[i][4]+'</td><td style="flex-basis: 15%;" onclick="composeResendCredentialsMailGroupLeader(this)"><i class="material-icons">email</i></td><td style="display: none;" class="resend-credentials-mail-groupleader-id">'+leaders[i][5]+'</td><td style="display: none;" class="resend-credentials-mail-college-groupleader-id">'+leaders[i][6]+'</td></tr>';
      }
      closeAllModals();
      showDiv(7);
      hideLoader();
    } else if (ourRequest.readyState === 4 && ourRequest.status != 200) {
      Materialize.toast('There was some error connecting to the server!', 3000);
      // var jsonResponse = {"groupleaders": [["Arpit Anshuman", "BITS Pilani", "Pilani", "Rajasthan", "f2016250@pilani.bits-pilani.ac.in", 1, 2],["Arpit Anshuman", "BITS Pilani", "Hyderabad", "Hyderabad", "f2016226@pilani.bits-pilani.ac.in", 2, 3],["Arpit Anshuman", "BITS Pilani", "Goa", "Goa", "f2016192@pilani.bits-pilani.ac.in", 3, 9],["Arpit Anshuman", "BITS Pilani", "Pilani", "Rajasthan", "f2016196@pilani.bits-pilani.ac.in", 4, 96],["Arpit Anshuman", "BITS Pilani", "Pilani", "Rajasthan", "f2016189@pilani.bits-pilani.ac.in", 5, 89]]};
    }
  };
  ourRequest.send('');
}
function openResendCredentialsMailSports(option) {
  Materialize.toast('Updating Mailing List!', 3000);
  csrf_token = getCookie('csrftoken');
  var clg_id = parseInt(option.children[5].innerHTML);
  var jsonData = {
    "clg_id": clg_id
  }
  console.log(jsonData);
  var sendData = JSON.stringify(jsonData);
  document.getElementById('resend-credentials-send-mail-sport-body').innerHTML = '';
  modal_open(10);
  var ourRequest = new XMLHttpRequest();
  var url = "credential/display/";
  ourRequest.open("POST", url, true);
  ourRequest.setRequestHeader("Content-type", "application/json");
  ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
  ourRequest.onreadystatechange = function() {
    if (ourRequest.readyState === 4 && ourRequest.status === 200) {
      Materialize.toast('Updated List!', 3000);
      var jsonResponse = JSON.parse(ourRequest.responseText);
      var data = jsonResponse.data;
      for (var i = 0; i < data.length; i++) {
        document.getElementById('resend-credentials-send-mail-sport-body').innerHTML += '<tr> <td style="flex-basis: 10%;"><i style="flex-basis: 10%;" class="material-icons tooltipped change_cursor" data-position="right" data-delay="50" data-tooltip="Select/Deselect this Sport" onclick="toggleResendCredentialsSportMailSelection(this);">check_box_outline_blank</i></td><td style="flex-basis: 90%;">'+data[i][0]+'</td><td style="display: none;">'+data[i][1]+'</td></tr>';
        for (var j = 0; j < data[i][2].length; j++) {
          document.getElementById('resend-credentials-send-mail-sport-body').innerHTML += '<tr class="resend-credentials-send-mail-sport-row"> <td style="flex-basis: 10%;"><i style="flex-basis: 10%;" class="material-icons tooltipped change_cursor" data-position="right" data-delay="50" data-tooltip="Select/Deselect this Participant" onclick="toggleResendCredentialsParticipantMailSelection(this);">check_box_outline_blank</i></td><td style="flex-basis: 35%;">'+data[i][2][j][0]+'</td><td style="flex-basis: 20%;">'+data[i][2][j][1]+'</td><td style="flex-basis: 35%;">'+data[i][2][j][2]+'</td><td style="display: none;">'+data[i][2][j][3]+'</td></tr>';
        }
      }
    } else if (ourRequest.readyState === 4 && ourRequest.status != 200) {
      Materialize.toast('There was some error connecting to the server!', 3000);
      // var jsonResponse = {"data": [["Basketball (Boys)", 1, [["Arpit Anshuman", 9091901901, "f2016250@pilani.bits-pilani.ac.in", 1],["Nikhil Khandelwal", 9091901901, "f2016192@pilani.bits-pilani.ac.in", 4]]],["Basketball (Girls)", 2, [["Piyali Manna", 9091901901, "f2016226@pilani.bits-pilani.ac.in", 2],["Mansi Jain", 9091901901, "f2016226@pilani.bits-pilani.ac.in", 5]]],["Badminton (Boys)", 3, [["Srivatsa Rampalli", 9829777634, "f2016290@pilani.bits-pilani.ac.in", 3]]],["Cricket (Boys)", 1, [["Nikhil Khandelwal", 9091901901, "f2016192@pilani.bits-pilani.ac.in", 4],["Nikhil Khandelwal", 9091901901, "f2016192@pilani.bits-pilani.ac.in", 4],["Nikhil Khandelwal", 9091901901, "f2016192@pilani.bits-pilani.ac.in", 4],["Nikhil Khandelwal", 9091901901, "f2016192@pilani.bits-pilani.ac.in", 4]]]]};
    }
  };
  ourRequest.send(sendData);
}
function sendResendCredentialsMail() {
  Materialize.toast('Sending Mail!', 3000);
  closeAllModals();
  csrf_token = getCookie('csrftoken');
  var jsonData = {
    "id_arr": resend_credentials_id_arr,
    "email_arr": resend_credentials_email_arr
  }
  console.log(jsonData);
  var sendData = JSON.stringify(jsonData);
  var ourRequest = new XMLHttpRequest();
  var url = "credential/display/send/";
  ourRequest.open("POST", url, true);
  ourRequest.setRequestHeader("Content-type", "application/json");
  ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
  ourRequest.onreadystatechange = function() {
    if (ourRequest.readyState === 4 && ourRequest.status === 200) {
      var jsonResponse = JSON.parse(ourRequest.responseText);
      if (jsonResponse.success == 1) {
        Materialize.toast('Mails Sent!', 3000);
      } else {
        Materialize.toast('Some mails could not be sent!', 3000);
      }
      closeAllModals();
    } else if (ourRequest.readyState === 4 && ourRequest.status != 200) {
      Materialize.toast('There was some error connecting to the server!', 3000);
      closeAllModals();
    }
  };
  ourRequest.send(sendData);
}
function fetchChangeGroupleader() {
  showLoader();
  closeAllModals();
  Materialize.toast('Updating List!', 3000);
  document.getElementById('change-groupleader-body').innerHTML = '';
  csrf_token = getCookie('csrftoken');
  var ourRequest = new XMLHttpRequest();
  var url = "changeleader/";
  ourRequest.open("POST", url, true);
  ourRequest.setRequestHeader("Content-type", "application/json");
  ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
  ourRequest.onreadystatechange = function() {
    if (ourRequest.readyState === 4 && ourRequest.status === 200) {
      Materialize.toast('Updated List!', 3000);
      var jsonResponse = JSON.parse(ourRequest.responseText);
      var leaders = jsonResponse.groupleaders;
      for (var i = 0; i < leaders.length; i++) {
        document.getElementById('change-groupleader-body').innerHTML += '<tr class="change-groupleader-row" onclick="openChangeGroupleader(this)"> <td style="flex-basis: 30%;">'+leaders[i][0]+'</td><td style="flex-basis: 35%;">'+leaders[i][1]+', '+leaders[i][2]+', '+leaders[i][3]+'</td><td style="flex-basis: 35%;">'+leaders[i][4]+'</td><td style="display: none;" class="change-groupleader-id">'+leaders[i][5]+'</td><td style="display: none;" class="change-groupleader-college-id">'+leaders[i][6]+'</td></tr>';
      }
      closeAllModals();
      showDiv(8);
      hideLoader();
    } else if (ourRequest.readyState === 4 && ourRequest.status != 200) {
      Materialize.toast('There was some error connecting to the server!', 3000);
      // var jsonResponse = {"groupleaders": [["Arpit Anshuman", "BITS Pilani", "Pilani", "Rajasthan", "f2016250@pilani.bits-pilani.ac.in", 1, 2],["Arpit Anshuman", "BITS Pilani", "Hyderabad", "Hyderabad", "f2016226@pilani.bits-pilani.ac.in", 2, 3],["Arpit Anshuman", "BITS Pilani", "Goa", "Goa", "f2016192@pilani.bits-pilani.ac.in", 3, 9],["Arpit Anshuman", "BITS Pilani", "Pilani", "Rajasthan", "f2016196@pilani.bits-pilani.ac.in", 4, 96],["Arpit Anshuman", "BITS Pilani", "Pilani", "Rajasthan", "f2016189@pilani.bits-pilani.ac.in", 5, 89]]};
    }
  };
  ourRequest.send('');
}
var old_id;
function openChangeGroupleader(option) {
  var clg_id = parseInt(option.children[4].innerHTML);
  old_id = parseInt(option.children[3].innerHTML);
  var jsonData = {
    "clg_id": clg_id
  };
  Materialize.toast('Updating List!', 3000);
  csrf_token = getCookie('csrftoken');
  var sendData = JSON.stringify(jsonData);
  document.getElementById('group-leader-switch-status-list-body').innerHTML = '';
  modal_open(12);
  var ourRequest = new XMLHttpRequest();
  var url = "changeleader/send/";
  ourRequest.open("POST", url, true);
  ourRequest.setRequestHeader("Content-type", "application/json");
  ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
  ourRequest.onreadystatechange = function() {
    if (ourRequest.readyState === 4 && ourRequest.status === 200) {
      Materialize.toast('Updated List!', 3000);
      var jsonResponse = JSON.parse(ourRequest.responseText);
      var data = jsonResponse.data;
      for (var i = 0; i < data.length; i++) {
        var sports = '';
        for (var j = 0; j < data[i][4].length; j++) {
          sports += data[i][4][j];
          if (j != data[i][4].length - 1) {
            sports += ', ';
          }
        }
        document.getElementById('group-leader-switch-status-list-body').innerHTML += '<tr class="group-leader-status-selection"> <td style="display: none;">'+data[i][0]+'</td><td style="flex-basis: 20%;">'+data[i][1]+'</td><td style="flex-basis: 14%">'+data[i][2]+'</td><td style="flex-basis: 25%;">'+data[i][3]+'</td><td style="flex-basis: 20%;">'+sports+'</td><td style="flex-basis: 8%;">'+data[i][5]+'</td><td style="flex-basis: 8%;">'+data[i][6]+'</td><td style="flex-basis: 5%;"><i class="material-icons change-cursor" onclick="toggleGroupLeaaderSelection(this);">check_box_outline_blank</i></td></tr>';
      }
    } else if (ourRequest.readyState === 4 && ourRequest.status != 200) {
      Materialize.toast('There was some error connecting to the server!', 3000);
      // var jsonResponse = {"data": [[1, "Arpit Anshuman", 9829775537, "f2016250@pilani.bits-pilani.ac.in", ["Basketball (Boys)", "Cricket (Boys)", "Badminton (Boys)"], "male", "Participant"],[1, "Arpit Anshuman", 9829775537, "f2016250@pilani.bits-pilani.ac.in", ["Basketball (Boys)", "Cricket (Boys)", "Badminton (Boys)"], "male", "Participant"],[1, "Arpit Anshuman", 9829775537, "f2016250@pilani.bits-pilani.ac.in", ["Basketball (Boys)", "Cricket (Boys)", "Badminton (Boys)"], "male", "Participant"],[1, "Arpit Anshuman", 9829775537, "f2016250@pilani.bits-pilani.ac.in", ["Basketball (Boys)", "Cricket (Boys)", "Badminton (Boys)"], "male", "Participant"]]};
    }
  };
  ourRequest.send(sendData);
}
function makeGroupLeader(id) {
  Materialize.toast('Switching Status!', 3000);
  closeAllModals();
  csrf_token = getCookie('csrftoken');
  var jsonData = {
    "old_id": old_id,
    "new_id": id
  }
  console.log(jsonData);
  var sendData = JSON.stringify(jsonData);
  var ourRequest = new XMLHttpRequest();
  var url = "changeleader/send/change/";
  ourRequest.open("POST", url, true);
  ourRequest.setRequestHeader("Content-type", "application/json");
  ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
  ourRequest.onreadystatechange = function() {
    if (ourRequest.readyState === 4 && ourRequest.status === 200) {
      Materialize.toast('Successfully Changed Group Leader!', 3000);
      closeAllModals();
      fetchChangeGroupleader();
    } else if (ourRequest.readyState === 4 && ourRequest.status != 200) {
      Materialize.toast('There was some error connecting to the server!', 3000);
      closeAllModals();
      fetchChangeGroupleader();
    }
  };
  ourRequest.send(sendData);
}
function fetchConfirmGroupleaders() {
  showLoader();
  closeAllModals();
  Materialize.toast('Updating List!', 3000);
  document.getElementById('confirm-groupleader-body').innerHTML = '';
  csrf_token = getCookie('csrftoken');
  var ourRequest = new XMLHttpRequest();
  var url = "confirm/";
  ourRequest.open("POST", url, true);
  ourRequest.setRequestHeader("Content-type", "application/json");
  ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
  ourRequest.onreadystatechange = function() {
    if (ourRequest.readyState === 4 && ourRequest.status === 200) {
      Materialize.toast('Updated List!', 3000);
      var jsonResponse = JSON.parse(ourRequest.responseText);
      var leaders = jsonResponse.groupleaders;
      for (var i = 0; i < leaders.length; i++) {
        document.getElementById('confirm-groupleader-body').innerHTML += '<tr class="confirm-groupleader-row" onclick="openConfirmGroupleader(this)"> <td style="flex-basis: 35%;">'+leaders[i][0]+'</td><td style="flex-basis: 40%;">'+leaders[i][1]+', '+leaders[i][2]+', '+leaders[i][3]+'</td><td style="flex-basis: 25%;">'+leaders[i][4]+'</td><td style="display: none;" class="confirm-groupleader-id">'+leaders[i][5]+'</td><td style="display: none;" class="confirm-groupleader-college-id">'+leaders[i][6]+'</td></tr>';
      }
      closeAllModals();
      showDiv(9);
      hideLoader();;
    } else if (ourRequest.readyState === 4 && ourRequest.status != 200) {
      Materialize.toast('There was some error connecting to the server!', 3000);
      // var jsonResponse = {"groupleaders": [["Arpit Anshuman", "BITS Pilani", "Pilani", "Rajasthan", "f2016250@pilani.bits-pilani.ac.in", 1, 2],["Arpit Anshuman", "BITS Pilani", "Hyderabad", "Hyderabad", "f2016226@pilani.bits-pilani.ac.in", 2, 3],["Arpit Anshuman", "BITS Pilani", "Goa", "Goa", "f2016192@pilani.bits-pilani.ac.in", 3, 9],["Arpit Anshuman", "BITS Pilani", "Pilani", "Rajasthan", "f2016196@pilani.bits-pilani.ac.in", 4, 96],["Arpit Anshuman", "BITS Pilani", "Pilani", "Rajasthan", "f2016189@pilani.bits-pilani.ac.in", 5, 89]]};
    }
  };
  ourRequest.send('');
}
function openConfirmGroupleader(option) {
  var clg_id = parseInt(option.children[4].innerHTML);
  var jsonData = {
    "clg_id": clg_id
  };
  Materialize.toast('Updating List!', 3000);
  csrf_token = getCookie('csrftoken');
  var sendData = JSON.stringify(jsonData);
  document.getElementById('unconfirmed-teams-switch-status-list-body').innerHTML = '';
  document.getElementById('confirmed-teams-switch-status-list-body').innerHTML = '';
  modal_open(13);
  var ourRequest = new XMLHttpRequest();
  var url = "confirm/team/";
  ourRequest.open("POST", url, true);
  ourRequest.setRequestHeader("Content-type", "application/json");
  ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
  ourRequest.onreadystatechange = function() {
    if (ourRequest.readyState === 4 && ourRequest.status === 200) {
      Materialize.toast('Updated List!', 3000);
      var jsonResponse = JSON.parse(ourRequest.responseText);
      var unconfirmed = jsonResponse.unconfirmed;
      var confirmed = jsonResponse.confirmed;
      for (var i = 0; i < unconfirmed.length; i++) {
        document.getElementById('unconfirmed-teams-switch-status-list-body').innerHTML += '<tr class="unconfirmed-teams-status-selection"> <td style="display: none;">'+unconfirmed[i][0]+'</td><td style="flex-basis: 35%;">'+unconfirmed[i][1]+'</td><td style="flex-basis: 20%">'+unconfirmed[i][2]+'</td><td style="flex-basis: 35%;">'+unconfirmed[i][3]+'</td><td style="flex-basis: 10%;"><i class="material-icons change-cursor" onclick="toggleUnconfirmedTeamsSelection(this);">check_box_outline_blank</i></td><td style="display: none;">'+unconfirmed[i][4]+'</td></tr>';
      }
      for (var i = 0; i < confirmed.length; i++) {
        document.getElementById('confirmed-teams-switch-status-list-body').innerHTML += '<tr class="confirmed-teams-status-selection"> <td style="display: none;">'+confirmed[i][0]+'</td><td style="flex-basis: 35%;">'+confirmed[i][1]+'</td><td style="flex-basis: 20%">'+confirmed[i][2]+'</td><td style="flex-basis: 35%;">'+confirmed[i][3]+'</td><td style="flex-basis: 10%;"><i class="material-icons change-cursor" onclick="toggleConfirmedTeamsSelection(this);">check_box_outline_blank</i></td><td style="display: none;">'+confirmed[i][4]+'</td></tr>';
      }
    } else if (ourRequest.readyState === 4 && ourRequest.status != 200) {
      Materialize.toast('There was some error connecting to the server!', 3000);
      // var jsonResponse = {"unconfirmed": [["BY254", "Arpit Anshuman", 2, "Basketball (Boys)", 2], ["GZ678", "Nikhil Khandelwal", 4, "Cricket (Boys)", 2], ["GA891", "Piyali Manna", 5, "Badminton (Girls)", 2], ["GY780", "Srivatsa", 1, "Basketball (Boys)", 2]], "confirmed": [["GH671", "Satyavrat Sharma", 9, "Badminton (Boys)", 3], ["GA129", "Aman Kumar", 3, "Cricket (Boys)", 3], ["GA891", "Mansi Jain", 12, "Badminton (Girls)", 3]]};
    }
  };
  ourRequest.send(sendData);
}
function confirmTeams() {
  Materialize.toast('Confirming Teams!', 3000);
  csrf_token = getCookie('csrftoken');
  var idnos = [];
  for (var i = 0; i < document.getElementsByClassName('unconfirmed-teams-status-selected').length; i++) {
    var id = parseInt(document.getElementsByClassName('unconfirmed-teams-status-selected')[i].children[0].innerHTML);
    idnos.push(id);
  }
  var clg_id = parseInt(document.getElementsByClassName('unconfirmed-teams-status-selected')[0].children[5].innerHTML);
  var jsonData = {
    "id_arr": idnos,
    "clg_id": clg_id
  }
  console.log(jsonData);
  if (idnos.length > 0) {
    closeAllModals();
    var sendData = JSON.stringify(jsonData);
    var ourRequest = new XMLHttpRequest();
    var url = "confirmteam/";
    ourRequest.open("POST", url, true);
    ourRequest.setRequestHeader("Content-type", "application/json");
    ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
    ourRequest.onreadystatechange = function() {
      if (ourRequest.readyState === 4 && ourRequest.status === 200) {
        Materialize.toast('Confirmed Teams!', 3000);
        closeAllModals();
      } else if (ourRequest.readyState === 4 && ourRequest.status != 200) {
        Materialize.toast('There was some error connecting to the server!', 3000);
        closeAllModals();
      }
    };
    ourRequest.send(sendData);
  } else {
    Materialize.toast('Please make atleast one selection!', 3000);
  }
}
function unconfirmTeams() {
  Materialize.toast('Unconfirming Teams!', 3000);
  csrf_token = getCookie('csrftoken');
  var idnos = [];
  for (var i = 0; i < document.getElementsByClassName('confirmed-teams-status-selected').length; i++) {
    var id = parseInt(document.getElementsByClassName('confirmed-teams-status-selected')[i].children[0].innerHTML);
    idnos.push(id);
  }
  var clg_id = parseInt(document.getElementsByClassName('confirmed-teams-status-selected')[0].children[5].innerHTML);
  var jsonData = {
    "id_arr": idnos,
    "clg_id": clg_id
  }
  console.log(jsonData);
  if (idnos.length > 0) {
    closeAllModals();
    var sendData = JSON.stringify(jsonData);
    var ourRequest = new XMLHttpRequest();
    var url = "unconfirm/";
    ourRequest.open("POST", url, true);
    ourRequest.setRequestHeader("Content-type", "application/json");
    ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
    ourRequest.onreadystatechange = function() {
      if (ourRequest.readyState === 4 && ourRequest.status === 200) {
        Materialize.toast('Unconfirmed Teams!', 3000);
        closeAllModals();
      } else if (ourRequest.readyState === 4 && ourRequest.status != 200) {
        Materialize.toast('There was some error connecting to the server!', 3000);
        closeAllModals();
      }
    };
    ourRequest.send(sendData);
  } else {
    Materialize.toast('Please make atleast one selection!', 3000);
  }
}
function fetchVerifyDocsLeaders() {
  showLoader();
  closeAllModals();
  Materialize.toast('Updating List!', 3000);
  document.getElementById('verify-docs-groupleader-body').innerHTML = '';
  csrf_token = getCookie('csrftoken');
  var ourRequest = new XMLHttpRequest();
  var url = "documents/";
  ourRequest.open("POST", url, true);
  ourRequest.setRequestHeader("Content-type", "application/json");
  ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
  ourRequest.onreadystatechange = function() {
    if (ourRequest.readyState === 4 && ourRequest.status === 200) {
      Materialize.toast('Updated List!', 3000);
      var jsonResponse = JSON.parse(ourRequest.responseText);
      var leaders = jsonResponse.groupleaders;
      for (var i = 0; i < leaders.length; i++) {
        document.getElementById('verify-docs-groupleader-body').innerHTML += '<tr class="verify-docs-groupleader-row" onclick="openVerifyDocsGroupleader(this)"> <td style="flex-basis: 30%;">'+leaders[i][0]+'</td><td style="flex-basis: 35%;">'+leaders[i][1]+', '+leaders[i][2]+', '+leaders[i][3]+'</td><td style="flex-basis: 35%;">'+leaders[i][4]+'</td><td style="display: none;" class="verify-docs-groupleader-id">'+leaders[i][5]+'</td><td style="display: none;" class="verify-docs-groupleader-college-id">'+leaders[i][6]+'</td></tr>';
      }
      closeAllModals();
      showDiv(10);
      hideLoader();
    } else if (ourRequest.readyState === 4 && ourRequest.status != 200) {
      Materialize.toast('There was some error connecting to the server!', 3000);
      // var jsonResponse = {"groupleaders": [["Arpit Anshuman", "BITS Pilani", "Pilani", "Rajasthan", "f2016250@pilani.bits-pilani.ac.in", 1, 2],["Arpit Anshuman", "BITS Pilani", "Hyderabad", "Hyderabad", "f2016226@pilani.bits-pilani.ac.in", 2, 3],["Arpit Anshuman", "BITS Pilani", "Goa", "Goa", "f2016192@pilani.bits-pilani.ac.in", 3, 9],["Arpit Anshuman", "BITS Pilani", "Pilani", "Rajasthan", "f2016196@pilani.bits-pilani.ac.in", 4, 96],["Arpit Anshuman", "BITS Pilani", "Pilani", "Rajasthan", "f2016189@pilani.bits-pilani.ac.in", 5, 89]]};
    }
  };
  ourRequest.send('');
}
function openVerifyDocsGroupleader(option) {
  var clg_id = parseInt(option.children[4].innerHTML);
  var jsonData = {
    "clg_id": clg_id
  };
  Materialize.toast('Updating List!', 3000);
  csrf_token = getCookie('csrftoken');
  var sendData = JSON.stringify(jsonData);
  document.getElementById('unconfirmed-parts-view-docs-list-body').innerHTML = '';
  document.getElementById('confirmed-parts-view-docs-list-body').innerHTML = '';
  modal_open(14);
  var ourRequest = new XMLHttpRequest();
  var url = "documents/team/";
  ourRequest.open("POST", url, true);
  ourRequest.setRequestHeader("Content-type", "application/json");
  ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
  ourRequest.onreadystatechange = function() {
    if (ourRequest.readyState === 4 && ourRequest.status === 200) {
      Materialize.toast('Updated List!', 3000);
      var jsonResponse = JSON.parse(ourRequest.responseText);
      var unconfirmed = jsonResponse.unconfirmed;
      var confirmed = jsonResponse.confirmed;
      for (var i = 0; i < unconfirmed.length; i++) {
        var sports = '';
        for (var j = 0; j < unconfirmed[i][2].length; j++) {
          sports += unconfirmed[i][2][j];
          if (j != unconfirmed[i][2].length - 1) {
            sports += ', ';
          }
        }
        document.getElementById('unconfirmed-parts-view-docs-list-body').innerHTML += '<tr class="unconfirmed-parts-status-selection"> <td style="display: none;">'+unconfirmed[i][0]+'</td><td style="flex-basis: 40%;">'+unconfirmed[i][1]+'</td><td style="flex-basis: 40%">'+sports+'</td><td style="flex-basis: 10%;"><a href=\"'+unconfirmed[i][3]+'\" target="_blank"><i class="material-icons black-text">file_download</i></a></td><td style="flex-basis: 10%"><i class="material-icons black-text change_cursor" onclick="toggleUnconfirmedPartDocsSelection(this)">check_box_outline_blank</i></td></tr>';
      }
      for (var i = 0; i < confirmed.length; i++) {
        var sports = '';
        for (var j = 0; j < confirmed[i][2].length; j++) {
          sports += confirmed[i][2][j];
          if (j != confirmed[i][2].length - 1) {
            sports += ', ';
          }
        }
        document.getElementById('confirmed-parts-view-docs-list-body').innerHTML = '<tr class="confirmed-parts-status-selection"> <td style="display: none;">'+confirmed[i][0]+'</td><td style="flex-basis: 40%;">'+confirmed[i][1]+'</td><td style="flex-basis: 50%">'+sports+'</td><td style="flex-basis: 10%;"><a href=\"'+confirmed[i][3]+'\" target="_blank"><i class="material-icons black-text">file_download</i></a></td></tr>';
      }
    } else if (ourRequest.readyState === 4 && ourRequest.status != 200) {
      Materialize.toast('There was some error connecting to the server!', 3000);
      // var jsonResponse = {"unconfirmed": [[1, "Arpit Anshuman", ["Basketball (Boys)", "Badminton (Boys)", "Cricket (Boys)"], "url"], [2, "Nikhil Khandelwal", ["Cricket (Boys)", "Badminton (Boys)"], "url"], [3, "Piyali Manna", ["Badminton (Girls)"], "url"], [5, "Srivatsa", ["Basketball (Boys)"], "url"]], "confirmed": [[1, "Arpit Anshuman", ["Basketball (Boys)", "Badminton (Boys)", "Cricket (Boys)"], "url"], [2, "Nikhil Khandelwal", ["Cricket (Boys)", "Badminton (Boys)"], "url"], [3, "Piyali Manna", ["Badminton (Girls)"], "url"], [5, "Srivatsa", ["Basketball (Boys)"], "url"]]};
    }
  };
  ourRequest.send(sendData);
}
function confirmPartDocs() {
  csrf_token = getCookie('csrftoken');
  var idnos = [];
  for (var i = 0; i < document.getElementsByClassName('unconfirmed-parts-status-selected').length; i++) {
    var id = parseInt(document.getElementsByClassName('unconfirmed-parts-status-selected')[i].children[0].innerHTML);
    idnos.push(id);
  }
  var jsonData = {
    "id_arr": idnos
  }
  console.log(jsonData);
  if (idnos.length > 0) {
    Materialize.toast('Confirming Participants!', 3000);
    closeAllModals();
    var sendData = JSON.stringify(jsonData);
    var ourRequest = new XMLHttpRequest();
    var url = "documents/approve/";
    ourRequest.open("POST", url, true);
    ourRequest.setRequestHeader("Content-type", "application/json");
    ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
    ourRequest.onreadystatechange = function() {
      if (ourRequest.readyState === 4 && ourRequest.status === 200) {
        Materialize.toast('Confirmed Participants!', 3000);
        closeAllModals();
      } else if (ourRequest.readyState === 4 && ourRequest.status != 200) {
        Materialize.toast('There was some error connecting to the server!', 3000);
        closeAllModals();
      }
    };
    ourRequest.send(sendData);
  } else {
    Materialize.toast('Please make atleast one selection!', 3000);
  }
}
function unconfirmPartDocs() {
  Materialize.toast('Unconfirming Participants!', 3000);
  csrf_token = getCookie('csrftoken');
  var idnos = [];
  for (var i = 0; i < document.getElementsByClassName('confirmed-parts-status-selected').length; i++) {
    var id = parseInt(document.getElementsByClassName('confirmed-parts-status-selected')[i].children[0].innerHTML);
    idnos.push(id);
  }
  var jsonData = {
    "id_arr": idnos
  }
  console.log(jsonData);
  if (idnos.length > 0) {
    closeAllModals();
    var sendData = JSON.stringify(jsonData);
    var ourRequest = new XMLHttpRequest();
    var url = "documents/approve/";
    ourRequest.open("POST", url, true);
    ourRequest.setRequestHeader("Content-type", "application/json");
    ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
    ourRequest.onreadystatechange = function() {
      if (ourRequest.readyState === 4 && ourRequest.status === 200) {
        Materialize.toast('Unconfirmed Participants!', 3000);
        closeAllModals();
      } else if (ourRequest.readyState === 4 && ourRequest.status != 200) {
        Materialize.toast('There was some error connecting to the server!', 3000);
        closeAllModals();
      }
    };
    ourRequest.send(sendData);
  } else {
    Materialize.toast('Please make atleast one selection!', 3000);
  }
}
function fetchDashboardData(num) {
  csrf_token = getCookie('csrftoken');
  if (num == 0) {
    document.getElementById('no-registered-body').innerHTML = '<tr> <td>Loading</td><td>Loading</td><td>Loading</td></tr>';
  } else if (num == 1) {
    document.getElementById('no-confirmed-body').innerHTML = '<tr> <td>Loading</td><td>Loading</td><td>Loading</td></tr>';
  } else if (num == 2) {
    document.getElementById('no-documents-body').innerHTML = '<tr> <td>Loading</td><td>Loading</td><td>Loading</td></tr>';
  } else {
    document.getElementById('payment-body').innerHTML = '<tr> <td>Loading</td><td>Loading</td></tr>';
    document.getElementById('pre-reg-body').innerHTML = '<tr> <td>Loading</td><td>Loading</td><td>Loading</td></tr>';
    document.getElementById('tot-payment-body').innerHTML = '<tr> <td>Loading</td><td>Loading</td><td>Loading</td></tr>';
  }
  closeAllModals();
  var ourRequest = new XMLHttpRequest();
  var url = 'dashboard/';
  ourRequest.open("POST", url, true);
  ourRequest.setRequestHeader("Content-type", "application/json");
  ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
  ourRequest.onreadystatechange = function() {
    if (ourRequest.readyState === 4 && ourRequest.status === 200) {
      var jsonResponse = JSON.parse(ourRequest.responseText);
      var data1 = jsonResponse.data1;
      var data2 = jsonResponse.data2;
      var data3 = jsonResponse.data3;
      var data4 = jsonResponse.data4;
      document.getElementById('no-registered-body').innerHTML = '<tr> <td>'+data1[0]+'</td><td>'+data1[1]+'</td><td>'+data1[2]+'</td></tr>';
      document.getElementById('no-confirmed-body').innerHTML = '<tr> <td>'+data2[0]+'</td><td>'+data2[1]+'</td><td>'+data2[2]+'</td></tr>';
      document.getElementById('no-documents-body').innerHTML = '<tr> <td>'+data3[0]+'</td><td>'+data3[1]+'</td><td>'+data3[2]+'</td></tr>';
      document.getElementById('payment-body').innerHTML = '<tr> <td>'+data4[0][0]+'</td><td>'+data4[1][0]+'</td></tr>';
      document.getElementById('pre-reg-body').innerHTML = '<tr> <td>'+data4[0][1]+'</td><td>'+data4[0][2]+'</td><td>'+data4[0][3]+'</td></tr>';
      document.getElementById('tot-payment-body').innerHTML = '<tr> <td>'+data4[1][1]+'</td><td>'+data4[1][2]+'</td><td>'+data4[1][3]+'</td></tr>';
      closeAllModals();
    } else if (ourRequest.readyState === 4 && ourRequest.status != 200) {
      Materialize.toast('There was some error connecting to the server!', 3000);
      // var jsonResponse = {"data1" : [1, 4, 5], "data2": [1, 2, 3], "data3": [3,6,9], "data4": [[1000, 12, 13, 25], [2000, 13, 14, 27]]};
    }
  };
  ourRequest.send('');
}
function fetchFinalConfirmationMail() {
  showLoader();
  closeAllModals();
  Materialize.toast('Updating Mailing List!', 3000);
  document.getElementById('final-confirmation-mail-groupleader-body').innerHTML = '';
  csrf_token = getCookie('csrftoken');
  var ourRequest = new XMLHttpRequest();
  var url = "mail/";
  ourRequest.open("POST", url, true);
  ourRequest.setRequestHeader("Content-type", "application/json");
  ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
  ourRequest.onreadystatechange = function() {
    if (ourRequest.readyState === 4 && ourRequest.status === 200) {
      Materialize.toast('Updated List!', 3000);
      var jsonResponse = JSON.parse(ourRequest.responseText);
      var leaders = jsonResponse.groupleaders;
      for (var i = 0; i < leaders.length; i++) {
        document.getElementById('final-confirmation-mail-groupleader-body').innerHTML += '<tr class="final-confirmation-mail-row" onclick="openFinalConfirmationMailSports(this)"> <td style="flex-basis: 30%;">'+leaders[i][0]+'</td><td style="flex-basis: 35%;">'+leaders[i][1]+', '+leaders[i][2]+', '+leaders[i][3]+'</td><td style="flex-basis: 35%;">'+leaders[i][4]+'</td><td style="display: none;" class="final-confirmation-mail-groupleader-id">'+leaders[i][5]+'</td><td style="display: none;" class="final-confirmation-mail-college-groupleader-id">'+leaders[i][6]+'</td></tr>';
      }
      hideLoader();
      closeAllModals();
      showDiv(11);
    } else if (ourRequest.readyState === 4 && ourRequest.status != 200) {
      Materialize.toast('There was some error connecting to the server!', 3000);
      // var jsonResponse = {"groupleaders": [["Arpit Anshuman", "BITS Pilani", "Pilani", "Rajasthan", "f2016250@pilani.bits-pilani.ac.in", 1, 2],["Arpit Anshuman", "BITS Pilani", "Hyderabad", "Hyderabad", "f2016226@pilani.bits-pilani.ac.in", 2, 3],["Arpit Anshuman", "BITS Pilani", "Goa", "Goa", "f2016192@pilani.bits-pilani.ac.in", 3, 9],["Arpit Anshuman", "BITS Pilani", "Pilani", "Rajasthan", "f2016196@pilani.bits-pilani.ac.in", 4, 96],["Arpit Anshuman", "BITS Pilani", "Pilani", "Rajasthan", "f2016189@pilani.bits-pilani.ac.in", 5, 89]]};
      // var leaders = jsonResponse.groupleaders;
      // for (var i = 0; i < leaders.length; i++) {
      //   document.getElementById('final-confirmation-mail-groupleader-body').innerHTML += '<tr class="final-confirmation-mail-row" onclick="openFinalConfirmationMailSports(this)"> <td style="flex-basis: 30%;">'+leaders[i][0]+'</td><td style="flex-basis: 35%;">'+leaders[i][1]+', '+leaders[i][2]+', '+leaders[i][3]+'</td><td style="flex-basis: 35%;">'+leaders[i][4]+'</td><td style="display: none;" class="final-confirmation-mail-groupleader-id">'+leaders[i][5]+'</td><td style="display: none;" class="final-confirmation-mail-college-groupleader-id">'+leaders[i][6]+'</td></tr>';
      // }
      // hideLoader();
      // closeAllModals();
      // showDiv(11);
    }
  };
  ourRequest.send('');
}
var final_conf_clg_id;
function openFinalConfirmationMailSports(option) {
  Materialize.toast('Updating Mailing List!', 3000);
  csrf_token = getCookie('csrftoken');
  var clg_id = parseInt(option.children[4].innerHTML);
  var jsonData = {
    "clg_id": clg_id
  }
  final_conf_clg_id = clg_id;
  console.log(jsonData);
  var sendData = JSON.stringify(jsonData);
  document.getElementById('final-confirmation-mail-sport-body').innerHTML = '';
  modal_open(15);
  var ourRequest = new XMLHttpRequest();
  var url = "mail/send/";
  ourRequest.open("POST", url, true);
  ourRequest.setRequestHeader("Content-type", "application/json");
  ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
  ourRequest.onreadystatechange = function() {
    if (ourRequest.readyState === 4 && ourRequest.status === 200) {
      Materialize.toast('Updated List!', 3000);
      var jsonResponse = JSON.parse(ourRequest.responseText);
      var data = jsonResponse.data;
      for (var i = 0; i < data.length; i++) {
        document.getElementById('final-confirmation-mail-sport-body').innerHTML += '<tr class="final-confirmation-mail-sport-selection"> <td style="flex-basis: 10%;"><i style="flex-basis: 10%;" class="material-icons tooltipped change_cursor" data-position="right" data-delay="50" data-tooltip="Select/Deselect this Sport" onclick="toggleFinalConfirmationMailSportSelection(this);">check_box_outline_blank</i></td><td style="flex-basis: 90%;">'+data[i][0]+'</td><td style="display: none;">'+data[i][1]+'</td></tr>';
        for (var j = 0; j < data[i][2].length; j++) {
          document.getElementById('final-confirmation-mail-sport-body').innerHTML += '<tr class="final-confirmation-mail-sport-row"> <td style="flex-basis: 35%;">'+data[i][2][j][0]+'</td><td style="flex-basis: 25%;">'+data[i][2][j][1]+'</td><td style="flex-basis: 40%;">'+data[i][2][j][2]+'</td><td style="display: none;">'+data[i][2][j][3]+'</td></tr>';
        }
      }
    } else if (ourRequest.readyState === 4 && ourRequest.status != 200) {
      Materialize.toast('There was some error connecting to the server!', 3000);
      // var jsonResponse = {"data": [["Basketball (Boys)", 1, [["Arpit Anshuman", 9091901901, "f2016250@pilani.bits-pilani.ac.in", 1],["Nikhil Khandelwal", 9091901901, "f2016192@pilani.bits-pilani.ac.in", 4]]],["Basketball (Girls)", 2, [["Piyali Manna", 9091901901, "f2016226@pilani.bits-pilani.ac.in", 2],["Mansi Jain", 9091901901, "f2016226@pilani.bits-pilani.ac.in", 5]]],["Badminton (Boys)", 3, [["Srivatsa Rampalli", 9829777634, "f2016290@pilani.bits-pilani.ac.in", 3]]],["Cricket (Boys)", 1, [["Nikhil Khandelwal", 9091901901, "f2016192@pilani.bits-pilani.ac.in", 4],["Nikhil Khandelwal", 9091901901, "f2016192@pilani.bits-pilani.ac.in", 4],["Nikhil Khandelwal", 9091901901, "f2016192@pilani.bits-pilani.ac.in", 4],["Nikhil Khandelwal", 9091901901, "f2016192@pilani.bits-pilani.ac.in", 4]]]]};
      // var data = jsonResponse.data;
      // for (var i = 0; i < data.length; i++) {
      //   document.getElementById('final-confirmation-mail-sport-body').innerHTML += '<tr class="final-confirmation-mail-sport-selection"> <td style="flex-basis: 10%;"><i style="flex-basis: 10%;" class="material-icons tooltipped change_cursor" data-position="right" data-delay="50" data-tooltip="Select/Deselect this Sport" onclick="toggleFinalConfirmationMailSportSelection(this);">check_box_outline_blank</i></td><td style="flex-basis: 90%;">'+data[i][0]+'</td><td style="display: none;">'+data[i][1]+'</td></tr>';
      //   for (var j = 0; j < data[i][2].length; j++) {
      //     document.getElementById('final-confirmation-mail-sport-body').innerHTML += '<tr class="final-confirmation-mail-sport-row"> <td style="flex-basis: 35%;">'+data[i][2][j][0]+'</td><td style="flex-basis: 25%;">'+data[i][2][j][1]+'</td><td style="flex-basis: 40%;">'+data[i][2][j][2]+'</td><td style="display: none;">'+data[i][2][j][3]+'</td></tr>';
      //   }
      // }
    }
  };
  ourRequest.send(sendData);
}
function sendFinalConfirmationMail() {
  Materialize.toast('Sending Mail!', 3000);
  closeAllModals();
  csrf_token = getCookie('csrftoken');
  var final_conf_id_arr = [];
  for (var i = 0; i < document.getElementsByClassName('final-confirmation-mail-sport-selected').length; i++) {
    var idno = parseInt(document.getElementsByClassName('final-confirmation-mail-sport-selected')[i].children[2].innerHTML);
    final_conf_id_arr.push(idno);
  }
  var jsonData = {
    "sport_id_arr": final_conf_id_arr,
    "clg_id": final_conf_clg_id
  }
  console.log(jsonData);
  var sendData = JSON.stringify(jsonData);
  var ourRequest = new XMLHttpRequest();
  var url = "confirmationmail/";
  ourRequest.open("POST", url, true);
  ourRequest.setRequestHeader("Content-type", "application/json");
  ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
  ourRequest.onreadystatechange = function() {
    if (ourRequest.readyState === 4 && ourRequest.status === 200) {
      var jsonResponse = JSON.parse(ourRequest.responseText);
      if (jsonResponse.success == 1) {
        Materialize.toast('Mails Sent!', 3000);
      } else {
        Materialize.toast('Some mails could not be sent!', 3000);
      }
      closeAllModals();
    } else if (ourRequest.readyState === 4 && ourRequest.status != 200) {
      Materialize.toast('There was some error connecting to the server!', 3000);
      closeAllModals();
    }
  };
  ourRequest.send(sendData);
}
// AJAX Functions End
function getCookie(name) {
  var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return v ? v[2] : null;
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
// Pusher Code
Pusher.logToConsole = false;
var pusher = new Pusher('9b825df805e0b694cccc', {
  cluster: 'ap2',
  encrypted: true
});
var channel7 = pusher.subscribe('my-channel7');
channel7.bind('my-event7', function(data) {
  console.log(data);
  fetchUpdateStats();
});
var channel8 = pusher.subscribe('my-channel8');
channel8.bind('my-event8', function(data) {
  console.log(data);
  updateSwitchStatus();
});
var dashboardUpdate = pusher.subscribe('dashboard-update');
dashboardUpdate.bind('dashboard-update-event', function(data) {
  console.log(data);
  updateDashboardData();
});
function fetchUpdateStats() {
  csrf_token = getCookie('csrftoken');
  var ourRequest = new XMLHttpRequest();
  var url = "stats/";
  ourRequest.open("POST", url, true);
  ourRequest.setRequestHeader("Content-type", "application/json");
  ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
  ourRequest.onreadystatechange = function() {
    if (ourRequest.readyState === 4 && ourRequest.status === 200) {
      var jsonResponse = JSON.parse(ourRequest.responseText);
      clgData = jsonResponse.college;
      sportData = jsonResponse.sport;
      totData = jsonResponse.total;
      document.getElementById('college-wise-stats').innerHTML = '';
      document.getElementById('sport-wise-stats').innerHTML = '';
      document.getElementById('college-wise-stats-foot').innerHTML = '';
      document.getElementById('sports-wise-stats-foot').innerHTML = '';
      for (var i = 0; i < clgData.length; i++) {
        document.getElementById('college-wise-stats').innerHTML += '<tr class="stats-row" onclick="openStats('+clgData[i][0]+', 1, this)"> <td style="flex-basis: 40%;"><a class="black-text">'+clgData[i][1]+', '+clgData[i][2]+', '+clgData[i][3]+'</td><td style="flex-basis: 15%;">'+clgData[i][4]+' | '+clgData[i][5]+'</td><td style="flex-basis: 15%;">'+clgData[i][6]+' | '+clgData[i][7]+'</td><td style="flex-basis: 15%;">'+clgData[i][8]+' | '+clgData[i][9]+'</td><td style="flex-basis: 15%;">'+clgData[i][10]+' | '+clgData[i][11]+'</td></tr>';
      }
      for (var i = 0; i < sportData.length; i++) {
        document.getElementById('sport-wise-stats').innerHTML += '<tr class="stats-row" onclick="openStats('+sportData[i][0]+', 2, this)"> <td style="flex-basis: 40%;"><a class="black-text">'+sportData[i][1]+'</td><td style="flex-basis: 15%;">'+sportData[i][2]+' | '+sportData[i][3]+'</td><td style="flex-basis: 15%;">'+sportData[i][4]+' | '+sportData[i][5]+'</td><td style="flex-basis: 15%;">'+sportData[i][6]+' | '+sportData[i][7]+'</td><td style="flex-basis: 15%;">'+sportData[i][8]+' | '+sportData[i][9]+'</td></tr>';
      }
      document.getElementById('college-wise-stats-foot').innerHTML = '<tr> <td class="center" style="flex-basis: 40%;">Total</td><td class="center" style="flex-basis: 15%;">'+totData[0]+' | '+totData[1]+'</td><td class="center" style="flex-basis: 15%;">'+totData[2]+' | '+totData[3]+'</td><td class="center" style="flex-basis: 15%;">'+totData[4]+' | '+totData[5]+'</td><td class="center" style="flex-basis: 15%;">'+totData[6]+' | '+totData[7]+'</td></tr>';
      document.getElementById('sports-wise-stats-foot').innerHTML = '<tr> <td class="center" style="flex-basis: 40%;">Total</td><td class="center" style="flex-basis: 15%;">'+totData[0]+' | '+totData[1]+'</td><td class="center" style="flex-basis: 15%;">'+totData[2]+' | '+totData[3]+'</td><td class="center" style="flex-basis: 15%;">'+totData[4]+' | '+totData[5]+'</td><td class="center" style="flex-basis: 15%;">'+totData[6]+' | '+totData[7]+'</td></tr>';
    } else if (ourRequest.readyState === 4 && ourRequest.status != 200) {
      Materialize.toast('There was some error connecting to the server!', 3000);
      // var jsonResponse = {"college": [[1, "BITS Pilani", "Pilani", "Rajasthan", 1, 2, 3, 4, 4, 6, 1, 2],[2, "BITS Pilani", "Hyderabad", "Hyderabad", 1, 2, 3, 4, 4, 6, 1, 2],[3, "BITS Pilani", "Goa", "Goa", 1, 2, 3, 4, 4, 6, 1, 2]], "sport": [[1, "Basketball (Boys)", 1, 2, 3, 4, 4, 6, 1, 2],[2, "Basketball (Girls)", 1, 2, 3, 4, 4, 6, 1, 2],[3, "Badminton (Boys)", 1, 2, 3, 4, 4, 6, 1, 2],[4, "Badminton (Girls)", 1, 2, 3, 4, 4, 6, 1, 2],[5, "Cricket (Boys)", 1, 2, 3, 4, 4, 6, 1, 2]], "total": [100, 200, 300, 400, 400, 600, 100, 200]};
    }
  };
  ourRequest.send('');
}
function updateSwitchStatus() {
  csrf_token = getCookie('csrftoken');
  var ourRequest = new XMLHttpRequest();
  var url = "activate/";
  ourRequest.open("POST", url, true);
  ourRequest.setRequestHeader("Content-type", "application/json");
  ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
  ourRequest.onreadystatechange = function() {
    if (ourRequest.readyState === 4 && ourRequest.status === 200) {
      var jsonResponse = JSON.parse(ourRequest.responseText);
      leftData = jsonResponse.data;
      rightData = jsonResponse.data2;
      document.getElementById('switch-status-left-list-clg').innerHTML = '';
      document.getElementById('switch-status-right-list-clg').innerHTML = '';
      for (var i = 0; i < leftData.length; i++) {
        document.getElementById('switch-status-left-list-clg').innerHTML += '<tr onclick="openCollegeLeaders(this, 1)" class="switch-status-college-row"> <td style="display: none">'+leftData[i][3]+'</td><td style="flex-basis: 40%">'+leftData[i][0]+'</td><td style="flex-basis: 30%">'+leftData[i][1]+'</td><td style="flex-basis: 30%">'+leftData[i][2]+'</td></tr>';
      }
      for (var i = 0; i < rightData.length; i++) {
        document.getElementById('switch-status-right-list-clg').innerHTML += '<tr onclick="openCollegeLeaders(this, 2)" class="switch-status-college-row"> <td style="display: none">'+rightData[i][3]+'</td><td style="flex-basis: 40%">'+rightData[i][0]+'</td><td style="flex-basis: 30%">'+rightData[i][1]+'</td><td style="flex-basis: 30%">'+rightData[i][2]+'</td></tr>';
      }
    } else if (ourRequest.readyState === 4 && ourRequest.status != 200) {
      Materialize.toast('There was some error connecting to the server!', 3000);
    }
  };
  ourRequest.send('');
}
function updateDashboardData() {
  csrf_token = getCookie('csrftoken');
  var ourRequest = new XMLHttpRequest();
  var url = 'dashboard/';
  ourRequest.open("POST", url, true);
  ourRequest.setRequestHeader("Content-type", "application/json");
  ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
  ourRequest.onreadystatechange = function() {
    if (ourRequest.readyState === 4 && ourRequest.status === 200) {
      var jsonResponse = JSON.parse(ourRequest.responseText);
      var data1 = jsonResponse.data1;
      var data2 = jsonResponse.data2;
      var data3 = jsonResponse.data3;
      var data4 = jsonResponse.data4;
      document.getElementById('no-registered-body').innerHTML = '<tr> <td>'+data1[0]+'</td><td>'+data1[1]+'</td><td>'+data1[2]+'</td></tr>';
      document.getElementById('no-confirmed-body').innerHTML = '<tr> <td>'+data2[0]+'</td><td>'+data2[1]+'</td><td>'+data2[2]+'</td></tr>';
      document.getElementById('no-documents-body').innerHTML = '<tr> <td>'+data3[0]+'</td><td>'+data3[1]+'</td><td>'+data3[2]+'</td></tr>';
      document.getElementById('payment-body').innerHTML = '<tr> <td>'+data4[0][0]+'</td><td>'+data4[1][0]+'</td></tr>';
      document.getElementById('pre-reg-body').innerHTML = '<tr> <td>'+data4[0][1]+'</td><td>'+data4[0][2]+'</td><td>'+data4[0][3]+'</td></tr>';
      document.getElementById('tot-payment-body').innerHTML = '<tr> <td>'+data4[1][1]+'</td><td>'+data4[1][2]+'</td><td>'+data4[1][3]+'</td></tr>';
      closeAllModals();
    } else if (ourRequest.readyState === 4 && ourRequest.status != 200) {
      Materialize.toast('There was some error connecting to the server!', 3000);
    }
  };
  ourRequest.send('');
}