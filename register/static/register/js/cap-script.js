$(document).ready(function(){
  $('.tap-target').tapTarget('open');
  $('.modal').modal();
  $('.dropdown-button').dropdown({
    inDuration: 300,
    outDuration: 225,
    constrainWidth: false, // Does not change width of dropdown to that of the activator
    hover: false, // Activate on hover
    gutter: 0, // Spacing from edge
    belowOrigin: false, // Displays dropdown below the button
    alignment: 'left', // Displays dropdown with edge aligned to the left of button
    stopPropagation: false // Stops event propagation
  });
  $('select').material_select();
  $('input#part-phone-1').characterCounter();
  fetchLeftTable();
  // fetchSportList();
  emptyRightTable();
  changeSport(document.getElementById('sport-dropdown').getElementsByTagName('li')[0].getElementsByTagName('a')[0]);
});
function changeSport(option) {
  document.getElementById('select-sport-btn').innerHTML = option.innerHTML;
  var sport_pk = parseInt(option.getElementsByTagName('span')[0].innerHTML);
  var gender = option.getElementsByTagName('span')[1].innerHTML;
  sortLeftDisabling();
  emptyRightTable();
  fetchRightTable(sport_pk, gender);
}
function toggleCaptain(option) {
  if (option.parentElement.parentElement.parentElement.parentElement.classList.contains('disabled-right-part')) {
    Materialize.toast('Can\'t switch status, contact PCR if you wish to.', 3000);
  } else if (option.innerHTML == '<i class="material-icons">check_box_outline_blank</i>') {
    option.innerHTML = '<i class="material-icons">check_box</i>';
    option.parentElement.parentElement.classList.add('selected-part-captain');
  } else {
    option.innerHTML = '<i class="material-icons">check_box_outline_blank</i>';
    option.parentElement.parentElement.classList.remove('selected-part-captain');
  }
}
function toggleCoach(option) {
  if (option.parentElement.parentElement.parentElement.parentElement.classList.contains('disabled-right-part')) {
    Materialize.toast('Can\'t switch status, contact PCR if you wish to.', 3000);
  } else if (option.innerHTML == '<i class="material-icons">check_box_outline_blank</i>') {
    option.innerHTML = '<i class="material-icons">check_box</i>';
    option.parentElement.parentElement.classList.add('selected-part-coach');
  } else {
    option.innerHTML = '<i class="material-icons">check_box_outline_blank</i>';
    option.parentElement.parentElement.classList.remove('selected-part-coach');
  }
}
// function sortLeft() {
//   var array = [];
//   for (var i = 0; i < document.getElementsByClassName('left-part-content-row').length; i++) {
//     var name = document.getElementsByClassName('left-part-content-row')[i].children[0].innerHTML;
//     var sports = document.getElementsByClassName('left-part-content-row')[i].children[1].innerHTML;
//     var gender = document.getElementsByClassName('left-part-content-row')[i].children[2].innerHTML;
//     var pk = parseInt(document.getElementsByClassName('left-part-content-row')[i].children[3].innerHTML);
//     var disabledPart = 0;
//     var disabledCoach = 0;
//     if (document.getElementsByClassName('left-part-content-row')[i].parentElement.parentElement.parentElement.classList.contains('disabled-collection-item')) {
//       disabledPart = 1;
//     }
//     if (document.getElementsByClassName('left-part-content-row')[i].parentElement.parentElement.parentElement.classList.contains('disabled-coach-item')) {
//       disabledCoach = 1;
//     }
//     array.push([name, sports, gender, pk, disabledPart, disabledCoach]);
//   }
//   array = array.sort(function(a, b) {
//     return a[0].toLowerCase().localeCompare(b[0].toLowerCase());
//   });
//   document.getElementById('reg-parts-ul').innerHTML = '<li class="collection-item table-top-header-item"> <table class="table-top-header centered"> <tr class="table-top-header-row"> <td id="left-table-top-name-col">Name</td><td id="left-table-top-sport-col">Sports</td><td id="left-table-top-gender-col">Gender</td><td id="left-table-top-pk-col">ID No.</td><td id="left-table-top-add-col">Add</td></tr></table> </li>';
//   for (var i = 0; i < array.length; i++) {
//     if (array[i][4] == 1 && array[i][5] == 0) {
//       document.getElementById('reg-parts-ul').innerHTML += '<li class="collection-item avatar disabled-collection-item"> <table class="left-part-content-table centered disabled-left-part"> <tr class="left-part-content-row" valign="middle"> <td class="part-name-flex">'+array[i][0]+'</td><td class="part-sport-flex">'+array[i][1]+'</td><td class="part-gender-flex">'+array[i][2]+'</td><td class="part_pk">'+array[i][3]+'</td><td class="add-right-button-wrapper"><a class="hover-effect" onclick="addToRight(this)"><i class="material-icons add-btn-color">add_circle</i></a></td></tr></table> </li>';
//     } else if (array[i][4] == 1 && array[i][5] == 1) {
//       document.getElementById('reg-parts-ul').innerHTML += '<li class="collection-item avatar disabled-collection-item disabled-coach-item"> <table class="left-part-content-table centered disabled-left-part"> <tr class="left-part-content-row" valign="middle"> <td class="part-name-flex">'+array[i][0]+'</td><td class="part-sport-flex">'+array[i][1]+'</td><td class="part-gender-flex">'+array[i][2]+'</td><td class="part_pk">'+array[i][3]+'</td><td class="add-right-button-wrapper"><a class="hover-effect" onclick="addToRight(this)"><i class="material-icons add-btn-color">add_circle</i></a></td></tr></table> </li>';
//     } else {
//       document.getElementById('reg-parts-ul').innerHTML += '<li class="collection-item avatar"> <table class="left-part-content-table centered"> <tr class="left-part-content-row" valign="middle"> <td class="part-name-flex">'+array[i][0]+'</td><td class="part-sport-flex">'+array[i][1]+'</td><td class="part-gender-flex">'+array[i][2]+'</td><td class="part_pk">'+array[i][3]+'</td><td class="add-right-button-wrapper"><a class="hover-effect" onclick="addToRight(this)"><i class="material-icons add-btn-color">add_circle</i></a></td></tr></table> </li>';
//     }
//   }
// }
function sortLeftDisabling() {
  var array = [];
  for (var i = 0; i < document.getElementsByClassName('left-part-content-row').length; i++) {
    var name = document.getElementsByClassName('left-part-content-row')[i].children[0].innerHTML;
    var sports = document.getElementsByClassName('left-part-content-row')[i].children[1].innerHTML;
    var gender = document.getElementsByClassName('left-part-content-row')[i].children[2].innerHTML;
    var pk = parseInt(document.getElementsByClassName('left-part-content-row')[i].children[3].innerHTML);
    var disabledPart = 0;
    var disabledCoach = 0;
    if (document.getElementsByClassName('left-part-content-row')[i].parentElement.parentElement.parentElement.classList.contains('disabled-collection-item')) {
      disabledPart = 1;
    }
    if (document.getElementsByClassName('left-part-content-row')[i].parentElement.parentElement.parentElement.classList.contains('disabled-coach-item')) {
      disabledCoach = 1;
    }
    array.push([name, sports, gender, pk, disabledPart, disabledCoach]);
  }
  array = array.sort(function(a, b) {
    return a[0].toLowerCase().localeCompare(b[0].toLowerCase());
  });
  document.getElementById('reg-parts-ul').innerHTML = '<li class="collection-item table-top-header-item"> <table class="table-top-header centered"> <tr class="table-top-header-row"> <td id="left-table-top-name-col">Name</td><td id="left-table-top-sport-col">Sports</td><td id="left-table-top-gender-col">Gender</td><td id="left-table-top-pk-col">ID No.</td><td id="left-table-top-add-col">Add</td></tr></table> </li>';
  for (var i = 0; i < array.length; i++) {
    if (array[i][5] == 0) {
      document.getElementById('reg-parts-ul').innerHTML += '<li class="collection-item avatar disabled-collection-item"> <table class="left-part-content-table centered disabled-left-part"> <tr class="left-part-content-row" valign="middle"> <td class="part-name-flex">'+array[i][0]+'</td><td class="part-sport-flex">'+array[i][1]+'</td><td class="part-gender-flex">'+array[i][2]+'</td><td class="part_pk">'+array[i][3]+'</td><td class="add-right-button-wrapper"><a class="hover-effect" onclick="addToRight(this)"><i class="material-icons add-btn-color">add_circle</i></a></td></tr></table> </li>';
    } else if (array[i][4] == 1 && array[i][5] == 1) {
      document.getElementById('reg-parts-ul').innerHTML += '<li class="collection-item avatar disabled-collection-item disabled-coach-item"> <table class="left-part-content-table centered disabled-left-part"> <tr class="left-part-content-row" valign="middle"> <td class="part-name-flex">'+array[i][0]+'</td><td class="part-sport-flex">'+array[i][1]+'</td><td class="part-gender-flex">'+array[i][2]+'</td><td class="part_pk">'+array[i][3]+'</td><td class="add-right-button-wrapper"><a class="hover-effect" onclick="addToRight(this)"><i class="material-icons add-btn-color">add_circle</i></a></td></tr></table> </li>';
    }
  }
}
// function sortRight() {
//   var array = [];
//   for (var i = 0; i < document.getElementsByClassName('selected-part').length; i++) {
//     var name = document.getElementsByClassName('selected-part')[i].children[0].innerHTML;
//     var sports = document.getElementsByClassName('selected-part')[i].children[2].innerHTML;
//     var gender = document.getElementsByClassName('selected-part')[i].children[4].innerHTML;
//     var pk = parseInt(document.getElementsByClassName('selected-part')[i].children[5].innerHTML);
//     var checkBoxes = document.getElementsByClassName('selected-part')[i].children[6].innerHTML;
//     var captainTrue = 0;
//     var coachTrue = 0;
//     if (document.getElementsByClassName('selected-part')[i].classList.contains('selected-part-captain')) {
//       captainTrue = 1;
//     }
//     if (document.getElementsByClassName('selected-part')[i].classList.contains('selected-part-coach')) {
//       coachTrue = 1;
//     }
//     array.push([name, sports, gender, pk, checkBoxes, captainTrue, coachTrue]);
//   }
//   array = array.sort(function(a, b) {
//     return a[0].toLowerCase().localeCompare(b[0].toLowerCase());
//   });
//   document.getElementById('select-parts-ul').innerHTML = '';
//   for (var i = 0; i < array.length; i++) {
//     if (array[i][5] == 0 && array[i][6] == 0) {
//       document.getElementById('select-parts-ul').innerHTML += '<li class="collection-item avatar selected-part"> <span class="title">'+array[i][0]+'</span><br><span>'+array[i][1]+'</span><br><span>'+array[i][2]+'</span> <span class="part_pk">'+array[i][3]+'</span> <div class="row check-boxes-container">'+array[i][4]+'</div><a class="secondary-content hover-effect" onclick="removefromRight(this)"><i class="material-icons remove-btn-color">remove_circle</i></a> </li>';
//     } else if (array[i][5] == 1 && array[i][6] == 0) {
//       document.getElementById('select-parts-ul').innerHTML += '<li class="collection-item avatar selected-part selected-part-captain"> <span class="title">'+array[i][0]+'</span><br><span>'+array[i][1]+'</span><br><span>'+array[i][2]+'</span> <span class="part_pk">'+array[i][3]+'</span> <div class="row check-boxes-container">'+array[i][4]+'</div><a class="secondary-content hover-effect" onclick="removefromRight(this)"><i class="material-icons remove-btn-color">remove_circle</i></a> </li>';
//     } else if (array[i][5] == 1 && array[i][6] == 1) {
//       document.getElementById('select-parts-ul').innerHTML += '<li class="collection-item avatar selected-part selected-part-captain selected-part-coach"> <span class="title">'+array[i][0]+'</span><br><span>'+array[i][1]+'</span><br><span>'+array[i][2]+'</span> <span class="part_pk">'+array[i][3]+'</span> <div class="row check-boxes-container">'+array[i][4]+'</div><a class="secondary-content hover-effect" onclick="removefromRight(this)"><i class="material-icons remove-btn-color">remove_circle</i></a> </li>';
//     } else {
//       document.getElementById('select-parts-ul').innerHTML += '<li class="collection-item avatar selected-part selected-part-coach"> <span class="title">'+array[i][0]+'</span><br><span>'+array[i][1]+'</span><br><span>'+array[i][2]+'</span> <span class="part_pk">'+array[i][3]+'</span> <div class="row check-boxes-container">'+array[i][4]+'</div><a class="secondary-content hover-effect" onclick="removefromRight(this)"><i class="material-icons remove-btn-color">remove_circle</i></a> </li>';
//     }
//   }
// }
var num_add_parts = 0;
function resetAddPartModal() {
  if (participantsSaved != 0) {
    $('#add-part-modal').modal('open');
  } else {
    Materialize.toast('Please wait while participants are being saved', 3000);
  }
  num_add_parts = 0;
  document.getElementById('add-part-modal').innerHTML = '<div class="modal-content"> <h5 class="center-align">Add Details</h5> <form id="add-parts-modal-wrapper"> </form><div class="row center"> <div class="col s12 center"> <a class="waves-effect waves-light btn custom-btn z-depth-5" id="add-part-modal-btn" onclick="addParticipant()"><i class="material-icons left">person_add</i>Add More</a> </div></div><div class="row center"> <div class="col s12 center"> <a class="waves-effect waves-light btn custom-btn z-depth-5" id="submit-part-modal-btn" onclick="submitParticipant()"><i class="material-icons right">send</i>Submit Participants</a> </div></div></div><div class="modal-footer teal lighten-4" id="add-part-modal-footer"> <a class="modal-action modal-close white black-text btn-flat hover-effect">Close</a> </div>';
  addParticipant();
}
function addParticipant() {
  num_add_parts++;
  var template = '<div class="col s11"> <div class="row"> <div class="input-field col s6"> <i class="material-icons prefix">account_circle</i> <input id="part-name-'+num_add_parts+'" name="part-name-'+num_add_parts+'" type="text" class="validate" required="required"> <label for="part-name-'+num_add_parts+'" data-error="Enter Name">Name</label> </div><div class="input-field col s6"> <i class="material-icons prefix">email</i> <input id="part-email-'+num_add_parts+'" name="part-email-'+num_add_parts+'" type="email" class="validate" required="required"> <label for="part-email-'+num_add_parts+'" data-error="Wrong Email">Email</label> </div></div><div class="row"> <div class="input-field col s6"> <i class="material-icons prefix">phone</i> <input id="part-phone-'+num_add_parts+'" name="part-phone-'+num_add_parts+'" type="tel" class="validate" maxlength="10" data-length="10" required="required"> <label for="part-phone-'+num_add_parts+'" data-error="Enter Mobile Number">Mobile Number</label> </div><div class="input-field col s6"> <i class="material-icons prefix">face</i> <select id="part-gender-'+num_add_parts+'" required="required"> <option value="" disabled selected>Choose your Gender</option> <option value="male">Male</option> <option value="female">Female</option> </select> <label data-error="Select Gender">Gender</label> </div></div></div><div class="col s1 center valign-wrapper flex-center"> <a class="hover-effect" onclick="delParticipant(this)"><i class="material-icons remove-btn-color">remove_circle</i></a> </div>';
  var newParticipant = document.createElement('div');
  newParticipant.classList = ['modal-added-participant row match-height'];
  newParticipant.innerHTML = template;
  document.getElementById('add-parts-modal-wrapper').insertBefore(newParticipant, null);
  $('select').material_select();
  Materialize.updateTextFields();
  $("input#part-phone-"+num_add_parts+"").characterCounter();
}
function delParticipant(select) {
  var parentNode = document.getElementById('add-parts-modal-wrapper');
  var childNode = select.parentElement.parentElement;
  parentNode.removeChild(childNode);
}
function submitParticipant() {
  var formData = serializeArray(document.getElementById('add-parts-modal-wrapper'));
  var valid_email = true;
  var valid_phone = true;
  var valid_gender = true;
  var valid_name = true;
  // Phone and Email Checking
  for (var i = 0; i < formData.length; i+=3) {
    if (formData[i].value == "") {
      valid_name = false;
      break;
    }
    if(!validatePhoneNumber(formData[i+2].value)) {
      valid_phone = false;
      break;
    } else if (!validateEmail(formData[i+1].value)) {
      valid_email = false;
      break;
    }
  }
  for (var i = 0; i < document.getElementsByClassName('modal-added-participant').length; i++) {
    if(document.getElementsByClassName('modal-added-participant')[i].getElementsByClassName('s11')[0].getElementsByClassName('row')[1].getElementsByClassName('s6')[1].getElementsByTagName('select')[0].value=="") {
      valid_gender = false;
    }
  }
  if (!valid_gender) {
    Materialize.toast('Please select gender of all Participants!', 3000);
  } else if (!valid_phone) {
    Materialize.toast('One or more Mobile number(s) are incorrect!', 3000);
  } else if (!valid_email) {
    Materialize.toast('One or more email(s) are incorrect!', 3000);
  } else if (!valid_name) {
    Materialize.toast('Please fill all the name fields!', 3000);
  } else {
    var user_data = [];
    for (var i = 0, j = 0; i < formData.length; i+=3, j++) {
      var name = '';
      var phone = '';
      var email = '';
      var gender = '';
      var user = {
        "name": formData[i].value,
        "email": formData[i+1].value,
        "phone": parseInt(formData[i+2].value),
        "gender": document.getElementsByClassName('modal-added-participant')[j].getElementsByClassName('s11')[0].getElementsByClassName('row')[1].getElementsByClassName('s6')[1].getElementsByTagName('select')[0].value
      }
      user_data.push(user);
    }
    var send_users = {
      "data": user_data
    }
    sendAddPartData(send_users);
  }
}
function emptyRightTable() {
  document.getElementById('select-parts-ul').innerHTML = '';
}
function activateLeftTable(pk_arr, genderReceived) {
  var array = [];
  for (var i = 0; i < document.getElementsByClassName('left-part-content-row').length; i++) {
    var name = document.getElementsByClassName('left-part-content-row')[i].children[0].innerHTML;
    var sports = document.getElementsByClassName('left-part-content-row')[i].children[1].innerHTML;
    var gender = document.getElementsByClassName('left-part-content-row')[i].children[2].innerHTML;
    var pk = parseInt(document.getElementsByClassName('left-part-content-row')[i].children[3].innerHTML);
    var disabledPart = 0;
    var disabledCoach = 0;
    if (document.getElementsByClassName('left-part-content-row')[i].parentElement.parentElement.parentElement.classList.contains('disabled-collection-item')) {
      disabledPart = 1;
    }
    if (document.getElementsByClassName('left-part-content-row')[i].parentElement.parentElement.parentElement.classList.contains('disabled-coach-item')) {
      disabledCoach = 1;
    }
    array.push([name, sports, gender, pk, disabledPart, disabledCoach]);
  }
  document.getElementById('reg-parts-ul').innerHTML = '<li class="collection-item table-top-header-item"> <table class="table-top-header centered"> <tr class="table-top-header-row"> <td id="left-table-top-name-col">Name</td><td id="left-table-top-sport-col">Sports</td><td id="left-table-top-gender-col">Gender</td><td id="left-table-top-pk-col">ID No.</td><td id="left-table-top-add-col">Add</td></tr></table> </li>';
  for (var i = 0; i < array.length; i++) {
    if (array[i][5] == 1) {
      document.getElementById('reg-parts-ul').innerHTML += '<li class="collection-item avatar disabled-collection-item disabled-coach-item"> <table class="left-part-content-table centered disabled-left-part"> <tr class="left-part-content-row" valign="middle"> <td class="part-name-flex">'+array[i][0]+'</td><td class="part-sport-flex">'+array[i][1]+'</td><td class="part-gender-flex">'+array[i][2]+'</td><td class="part_pk">'+array[i][3]+'</td><td class="add-right-button-wrapper"><a class="hover-effect" onclick="addToRight(this)"><i class="material-icons add-btn-color">add_circle</i></a></td></tr></table> </li>';
    } else {
      var disableField = false;
      for (var j = 0; j < pk_arr.length; j++) {
        if (array[i][3]==pk_arr[j]) {
          disableField = true;
          break;
        }
      }
      if (!disableField) {
        document.getElementById('reg-parts-ul').innerHTML += '<li class="collection-item avatar"> <table class="left-part-content-table centered"> <tr class="left-part-content-row" valign="middle"> <td class="part-name-flex">'+array[i][0]+'</td><td class="part-sport-flex">'+array[i][1]+'</td><td class="part-gender-flex">'+array[i][2]+'</td><td class="part_pk">'+array[i][3]+'</td><td class="add-right-button-wrapper"><a class="hover-effect" onclick="addToRight(this)"><i class="material-icons add-btn-color">add_circle</i></a></td></tr></table> </li>';
      } else {
        document.getElementById('reg-parts-ul').innerHTML += '<li class="collection-item avatar disabled-collection-item"> <table class="left-part-content-table centered disabled-left-part"> <tr class="left-part-content-row" valign="middle"> <td class="part-name-flex">'+array[i][0]+'</td><td class="part-sport-flex">'+array[i][1]+'</td><td class="part-gender-flex">'+array[i][2]+'</td><td class="part_pk">'+array[i][3]+'</td><td class="add-right-button-wrapper"><a class="hover-effect" onclick="addToRight(this)"><i class="material-icons add-btn-color">add_circle</i></a></td></tr></table> </li>';
      }
    }
  }
}
function resetSportSelection() {
  document.getElementById('select-sport-btn').innerHTML = '<i class="material-icons left">directions_run</i>Select Sport';
  changeSport(document.getElementById('sport-dropdown').getElementsByTagName('li')[0].getElementsByTagName('a')[0]);
}
function addToRight(option) {
  if (option.parentElement.parentElement.parentElement.parentElement.classList.contains('disabled-left-part')) {
    Materialize.toast('This participant can\'t be added for this sport!', 3000);
  } else {
    var name = option.parentElement.parentElement.children[0].innerHTML;
    var sports = option.parentElement.parentElement.children[1].innerHTML;
    var gender = option.parentElement.parentElement.children[2].innerHTML;
    var pk = parseInt(option.parentElement.parentElement.children[3].innerHTML);
    var template = '<table class="right-part-content-table centered"> <tr class="right-part-content-row" valign="middle"> <td class="right-part-name-flex">'+name+'</td><td class="right-part-sport-flex">'+sports+'</td><td class="right-part-gender-flex">'+gender+'</td><td class="part_pk">'+pk+'</td><td class="right-part-coptain-check"><a class="btn cap-coach-btn" onclick="toggleCaptain(this)"><i class="material-icons">check_box_outline_blank</i></a></td><td class="right-part-coach-check"><a class="btn cap-coach-btn" onclick="toggleCoach(this)"><i class="material-icons">check_box_outline_blank</i></a></td><td class="remove-right-button-wrapper"><a class="hover-effect" onclick="removefromRight(this)"><i class="material-icons remove-btn-color">remove_circle</i></a></td></tr></table>';
    var newRightParticipant = document.createElement('li');
    newRightParticipant.classList = ['collection-item avatar selected-part'];
    newRightParticipant.innerHTML = template;
    document.getElementById('select-parts-ul').insertBefore(newRightParticipant, document.getElementById('select-parts-ul').getElementsByClassName('collection-item')[1]);
    option.parentElement.parentElement.parentElement.parentElement.classList.add('disabled-left-part');
    option.parentElement.parentElement.parentElement.parentElement.parentElement.classList.add('disabled-collection-item');
  }
}
function removefromRight(option) {
  if (option.parentElement.parentElement.parentElement.parentElement.classList.contains('disabled-right-part')) {
    Materialize.toast('Can\t remove this participant, contact PCR if you wish to!', 3000);
  } else {
    var pk = parseInt(option.parentElement.parentElement.children[3].innerHTML);
    enableLeftRow(pk);
    var childNode = option.parentElement.parentElement.parentElement.parentElement.parentElement;
    var parentNode = document.getElementById('select-parts-ul');
    parentNode.removeChild(childNode);
  }
}
function enableLeftRow(rec_pk) {
  for (var i = 0; i < document.getElementsByClassName('left-part-content-row').length; i++) {
    var pk = parseInt(document.getElementsByClassName('left-part-content-row')[i].children[3].innerHTML);
    if (pk == rec_pk) {
      document.getElementsByClassName('left-part-content-row')[i].parentElement.parentElement.classList.remove('disabled-left-part');
      document.getElementsByClassName('left-part-content-row')[i].parentElement.parentElement.parentElement.classList.remove('disabled-collection-item');
    }
  }
}
function submitSportParts() {
  var part_arr = [];
  var capCount = 0;
  var sport_id = parseInt(document.getElementById('select-sport-btn').getElementsByTagName('span')[0].innerHTML);
  for (var i = 0; i < document.getElementsByClassName('right-part-content-row').length; i++) {
    if(!document.getElementsByClassName('right-part-content-row')[i].parentElement.parentElement.classList.contains('disabled-right-part')) {
      var captain = 0;
      var coach = 0;
      if (document.getElementsByClassName('right-part-content-row')[i].classList.contains('selected-part-captain')) {
        captain = sport_id;
        capCount++;
      }
      if (document.getElementsByClassName('right-part-content-row')[i].classList.contains('selected-part-coach')) {
        coach = sport_id;
      }
      var pk = parseInt(document.getElementsByClassName('right-part-content-row')[i].children[3].innerHTML);
      var part_data = {
        "captain": captain,
        "coach": coach,
        "pk": pk
      }
      part_arr.push(part_data);
    }
  }
  if (capCount>1) {
    Materialize.toast('A Sport cannot have more than one Captain!', 3000);
  } else {
    var data_send = {
      "data": part_arr,
      "sport_id": sport_id
    }
    if (participantsSaved == 1) {
      sendPartSportData(data_send);
    } else {
      Materialize.toast('Please wait for participants to be updated!', 3000);
    }
  }
}
function checkFetchedSports() {
  if (document.getElementById('sport-dropdown').innerHTML == "") {
    Materialize.toast('Please wait while we are retriving the list!', 3000);
  }
}
// AJAX Functions
function fetchLeftTable() {
  document.getElementById('reg-parts-ul').innerHTML = '';
  var csrf_token = getCookie('csrftoken');
  var ajaxRequest = new XMLHttpRequest();
  var url = 'playerlist/';
  ajaxRequest.open("POST", url, true);
  ajaxRequest.setRequestHeader("Content-type", "application/json");
  ajaxRequest.setRequestHeader("X-CSRFToken", csrf_token);
  ajaxRequest.onreadystatechange = function() {
    if (ajaxRequest.readyState === 4 && ajaxRequest.status === 200) {
      document.getElementById('reg-parts-ul').innerHTML = '<li class="collection-item table-top-header-item"> <table class="table-top-header centered"> <tr class="table-top-header-row"> <td id="left-table-top-name-col">Name</td><td id="left-table-top-sport-col">Sports</td><td id="left-table-top-gender-col">Gender</td><td id="left-table-top-pk-col">ID No.</td><td id="left-table-top-add-col">Add</td></tr></table> </li>';
      var jsonResponse = JSON.parse(ajaxRequest.responseText);
      var array = jsonResponse.data;
      for (var i = 0; i < array.length; i++) {
        var sports = '';
        for (var j = 0; j < array[i][1].length; j++) {
          sports += array[i][1][j];
          if (j != array[i][1].length-1) {
            sports += '<br>';
          }
        }
        if (array[i][4] == 0) {
          document.getElementById('reg-parts-ul').innerHTML += '<li class="collection-item avatar disabled-collection-item"> <table class="left-part-content-table centered disabled-left-part"> <tr class="left-part-content-row" valign="middle"> <td class="part-name-flex">'+array[i][0]+'</td><td class="part-sport-flex">'+sports+'</td><td class="part-gender-flex">'+array[i][2]+'</td><td class="part_pk">'+array[i][3]+'</td><td class="add-right-button-wrapper"><a class="hover-effect" onclick="addToRight(this)"><i class="material-icons add-btn-color">add_circle</i></a></td></tr></table> </li>';
        } else {
          document.getElementById('reg-parts-ul').innerHTML += '<li class="collection-item avatar disabled-collection-item disabled-coach-item"> <table class="left-part-content-table centered disabled-left-part"> <tr class="left-part-content-row" valign="middle"> <td class="part-name-flex">'+array[i][0]+'</td><td class="part-sport-flex">'+sports+'</td><td class="part-gender-flex">'+array[i][2]+'</td><td class="part_pk">'+array[i][3]+'</td><td class="add-right-button-wrapper"><a class="hover-effect" onclick="addToRight(this)"><i class="material-icons add-btn-color">add_circle</i></a></td></tr></table> </li>';
        }
      }
      emptyRightTable();
      resetSportSelection();
    } else if (ajaxRequest.readyState === 4 && ajaxRequest.status != 200) {
      Materialize.toast('Error while Fetching!', 2000);
    }
  }
  ajaxRequest.send('');
}
var participantsSaved = 1;
function sendAddPartData(data) {
  participantsSaved = 0;
  $('#add-part-modal').modal('close');
  var csrf_token = getCookie('csrftoken');
  var ajaxRequest = new XMLHttpRequest();
  var url = 'add/';
  var send_data = JSON.stringify(data);
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
        fetchLeftTable();
      }
      participantsSaved = 1;
    } else if (ajaxRequest.readyState === 4 && ajaxRequest.status != 200) {
      Materialize.toast('Error while connecting!', 2000);
      participantsSaved = 1;
    }
  }
  ajaxRequest.send(send_data);
}
function fetchRightTable(sport_pk, gender) {
  document.getElementById('select-parts-ul').innerHTML = '';
  var csrf_token = getCookie('csrftoken');
  var ajaxRequest = new XMLHttpRequest();
  var url = 'show/';
  var data = {
    "sport_id": sport_pk
  }
  var send_data = JSON.stringify(data);
  ajaxRequest.open("POST", url, true);
  ajaxRequest.setRequestHeader("Content-type", "application/json");
  ajaxRequest.setRequestHeader("X-CSRFToken", csrf_token);
  ajaxRequest.onreadystatechange = function() {
    if (ajaxRequest.readyState === 4 && ajaxRequest.status === 200) {
      var jsonResponse = JSON.parse(ajaxRequest.responseText);
      if (jsonResponse.error != null) {
        triggerError(jsonResponse.error);
      } else {
        var array = jsonResponse.data;
        document.getElementById('select-parts-ul').innerHTML = '<li class="collection-item table-top-header-item"> <table class="table-top-header centered"> <tr class="table-top-header-row"> <td id="right-table-top-name-col">Name</td><td id="right-table-top-sport-col">Sports</td><td id="right-table-top-gender-col">Gender</td><td id="right-table-top-pk-col">ID No.</td><td id="right-table-top-cap-col">Captain</td><td id="right-table-top-coach-col">Coach</td><td id="right-table-top-remove-col">Remove</td></tr></table> </li>';
        for (var i = 0; i < array.length; i++) {
          var sports = '';
          for (var j = 0; j < array[i][1].length; j++) {
            sports += array[i][1][j];
            if (j != array[i][1].length-1) {
              sports += '<br>';
            }
          }
          if (array[i][4] == 0 && array[i][5] == 0) {
            document.getElementById('select-parts-ul').innerHTML += '<li class="collection-item avatar selected-part disabled-collection-item"> <table class="right-part-content-table centered disabled-right-part"> <tr class="right-part-content-row" valign="middle"> <td class="right-part-name-flex">'+array[i][0]+'</td><td class="right-part-sport-flex">'+sports+'</td><td class="right-part-gender-flex">'+array[i][2]+'</td><td class="part_pk">'+array[i][3]+'</td><td class="right-part-coptain-check"><a class="btn cap-coach-btn" onclick="toggleCaptain(this)"><i class="material-icons">check_box_outline_blank</i></a></td><td class="right-part-coach-check"><a class="btn cap-coach-btn" onclick="toggleCoach(this)"><i class="material-icons">check_box_outline_blank</i></a></td><td class="remove-right-button-wrapper"><a class="hover-effect" onclick="removefromRight(this)"><i class="material-icons remove-btn-color">remove_circle</i></a></td></tr></table> </li>';
          } else if (array[i][4] == 1 && array[i][5] == 0) {
            document.getElementById('select-parts-ul').innerHTML += '<li class="collection-item avatar selected-part disabled-collection-item"> <table class="right-part-content-table centered disabled-right-part"> <tr class="right-part-content-row selected-part-captain" valign="middle"> <td class="right-part-name-flex">'+array[i][0]+'</td><td class="right-part-sport-flex">'+sports+'</td><td class="right-part-gender-flex">'+array[i][2]+'</td><td class="part_pk">'+array[i][3]+'</td><td class="right-part-coptain-check"><a class="btn cap-coach-btn" onclick="toggleCaptain(this)"><i class="material-icons">check_box</i></a></td><td class="right-part-coach-check"><a class="btn cap-coach-btn" onclick="toggleCoach(this)"><i class="material-icons">check_box_outline_blank</i></a></td><td class="remove-right-button-wrapper"><a class="hover-effect" onclick="removefromRight(this)"><i class="material-icons remove-btn-color">remove_circle</i></a></td></tr></table> </li>';
          } else if (array[i][4] == 0 && array[i][5] == 1) {
            document.getElementById('select-parts-ul').innerHTML += '<li class="collection-item avatar selected-part disabled-collection-item"> <table class="right-part-content-table centered disabled-right-part"> <tr class="right-part-content-row selected-part-coach" valign="middle"> <td class="right-part-name-flex">'+array[i][0]+'</td><td class="right-part-sport-flex">'+sports+'</td><td class="right-part-gender-flex">'+array[i][2]+'</td><td class="part_pk">'+array[i][3]+'</td><td class="right-part-coach-check"><a class="btn cap-coach-btn" onclick="toggleCaptain(this)"><i class="material-icons">check_box_outline_blank</i></a></td><td class="right-part-coach-check"><a class="btn cap-coach-btn" onclick="toggleCoach(this)"><i class="material-icons">check_box</i></a></td><td class="remove-right-button-wrapper"><a class="hover-effect" onclick="removefromRight(this)"><i class="material-icons remove-btn-color">remove_circle</i></a></td></tr></table> </li>';
          } else {
            document.getElementById('select-parts-ul').innerHTML += '<li class="collection-item avatar selected-part disabled-collection-item"> <table class="right-part-content-table centered disabled-right-part"> <tr class="right-part-content-row selected-part-captain selected-part-coach" valign="middle"> <td class="right-part-name-flex">'+array[i][0]+'</td><td class="right-part-sport-flex">'+sports+'</td><td class="right-part-gender-flex">'+array[i][2]+'</td><td class="part_pk">'+array[i][3]+'</td><td class="right-part-coptain-check"><a class="btn cap-coach-btn" onclick="toggleCaptain(this)"><i class="material-icons">check_box</i></a></td><td class="right-part-coach-check"><a class="btn cap-coach-btn" onclick="toggleCoach(this)"><i class="material-icons">check_box</i></a></td><td class="remove-right-button-wrapper"><a class="hover-effect" onclick="removefromRight(this)"><i class="material-icons remove-btn-color">remove_circle</i></a></td></tr></table> </li>';
          }
        }
        var pk_arr = [];
        for (var i = 0; i < array.length; i++) {
          pk_arr.push(array[i][3]);
        }
        activateLeftTable(pk_arr, gender);
      }
    } else if (ajaxRequest.readyState === 4 && ajaxRequest.status != 200) {
      Materialize.toast('Error while connecting!', 2000);
    }
  }
  ajaxRequest.send(send_data);
}
// function fetchSportList() {
//   document.getElementById('sport-dropdown').innerHTML = '';
//   var csrf_token = getCookie('csrftoken');
//   var ajaxRequest = new XMLHttpRequest();
//   var url = 'url';
//   ajaxRequest.open("POST", url, true);
//   ajaxRequest.setRequestHeader("Content-type", "application/json");
//   ajaxRequest.setRequestHeader("X-CSRFToken", csrf_token);
//   ajaxRequest.onreadystatechange = function() {
//     if (ajaxRequest.readyState === 4 && ajaxRequest.status === 200) {
//       document.getElementById('sport-dropdown').innerHTML = '';
//       var jsonResponse = JSON.parse(ajaxRequest.responseText);
//       var array = jsonResponse.data;
//       for (var i = 0; i < array.length; i++) {
//         document.getElementById('sport-dropdown').innerHTML += '<li><a class="hover-effect" onclick="changeSport(this)"><span class="select-sport-pk">'+array[i][0]+'</span>'+array[i][1]+'<span class="select-sport-gender">'+array[i][2]+'</span></a></li>';
//       }
//     } else if (ajaxRequest.readyState === 4 && ajaxRequest.status != 200) {
//       Materialize.toast('Error while Fetching!', 2000);
//     }
//   }
//   ajaxRequest.send('');
// }
function sendPartSportData(data) {
  Materialize.toast('Submitting participants!',3000);
  participantsSaved = 0;
  var csrf_token = getCookie('csrftoken');
  var ajaxRequest = new XMLHttpRequest();
  var url = 'submit/';
  var send_data = JSON.stringify(data);
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
        fetchLeftTable();
        emptyRightTable();
        resetSportSelection();
      }
      participantsSaved = 1;
    } else if (ajaxRequest.readyState === 4 && ajaxRequest.status != 200) {
      Materialize.toast('Error while connecting!', 2000);
      participantsSaved = 1;
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
