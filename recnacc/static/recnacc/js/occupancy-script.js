$(document).ready(function(){
  $('.coll-1').sideNav({
    menuWidth: 200, // Default is 300
    edge: 'right', // Choose the horizontal origin
    closeOnClick: false, // Closes side-nav on <a> clicks, useful for Angular/Meteor
    draggable: true // Choose whether you can drag to open on touch screens
  });
  $('.coll-0').sideNav({
    menuWidth: 300, // Default is 300
    edge: 'left', // Choose the horizontal origin
    closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
    draggable: true // Choose whether you can drag to open on touch screens
  });
  $('.coll-2').sideNav({
    menuWidth: 300, // Default is 300
    edge: 'right', // Choose the horizontal origin
    closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
    draggable: true // Choose whether you can drag to open on touch screens
  });
  $('.modal').modal();
  fetchOccupancy();
  document.getElementById('acco-wrapper').innerHTML = '';
  $('select').material_select();
  Materialize.updateTextFields();
});
var editpk;
function editStrength(pk, option) {
  editpk = parseInt(pk);
  document.getElementById('edit-strength-field').innerHTML='<input type="number" name="edit-strength" id="edit-strength" value="'+parseInt(option.previousElementSibling.innerHTML)+'"> <label for="edit-strength">Edit Strength</label>';
  Materialize.updateTextFields();
  $('#edit-strength-modal').modal('open');
}
// AJAX Scripts
function fetchOccupancy() {
  Materialize.toast('Updating list!', 2000, "toast-fetch");
  var csrf_token = getCookie('csrftoken');
  var ourRequest = new XMLHttpRequest();
  var url = '/recnacc/disp_occupency/';
  ourRequest.open("POST", url, true);
  ourRequest.setRequestHeader("Content-type", "application/json");
  ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
  ourRequest.onload = function () {
    if (ourRequest.status >= 200 && ourRequest.status < 400) {
      ourData = JSON.parse(ourRequest.responseText);
      document.getElementById('acco-wrapper').innerHTML = '';
      var data = ourData.data;
      for (var i = 0; i < data.length; i++) {
        var temp = '';
        if(data[i][1].pk!=0) {
          temp+='<div class="col s5 center rooms-content">Common Room</div><div class="col s5 center rooms-content">'+data[i][1].strength+'</div><div class="col s2 center rooms-content change-cursor" onclick="editStrength('+data[i][1].pk+', this)"><i class="material-icons">edit</i></div>';
        }
        if(data[i][2].pk!=0) {
          temp+='<div class="col s5 center rooms-content">TT Room</div><div class="col s5 center rooms-content">'+data[i][2].strength+'</div><div class="col s2 center rooms-content change-cursor" onclick="editStrength('+data[i][2].pk+', this)"><i class="material-icons">edit</i></div>';
        }
        if(data[i][3].pk!=0) {
          temp+='<div class="col s5 center rooms-content">Single Room</div><div class="col s5 center rooms-content">'+data[i][3].strength+'</div><div class="col s2 center rooms-content change-cursor" onclick="editStrength('+data[i][3].pk+', this)"><i class="material-icons">edit</i></div>';
        }
        document.getElementById('acco-wrapper').innerHTML+='<div class="row"> <div class="col s12 hostel-header">'+data[i][0]+'</div><div class="col s5 center rooms-header">Name</div><div class="col s5 center rooms-header">Strength</div><div class="col s2 center rooms-header">Edit</div>'+temp+'</div>';
      }
      Materialize.toast('Updated!', 2000);
    }
    else
      Materialize.toast('Server Error!', 2000, "toast-fetch_error");
  }
  ourRequest.onerror = function () {
    Materialize.toast('Could not connect to server!', 2000, "toast-fetch_no_connect");
  }
  ourRequest.send();
}
function updateStrength() {
  Materialize.toast('Updating!', 3000);
  var csrf_token = getCookie('csrftoken');
  var ourRequest = new XMLHttpRequest();
  var url = '/recnacc/edit_occupency/';
  var formData = serializeArray(document.getElementById('edit-strength-form'));
  var strength = formData[0].value;
  var send_obj = {"data":{"strength":strength, "pk":editpk}};
  var string_obj = JSON.stringify(send_obj);
  ourRequest.open("POST", url, true);
  ourRequest.setRequestHeader("Content-type", "application/json");
  ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
  ourRequest.onload = function () {
    if (ourRequest.status >= 200 && ourRequest.status < 400) {
      Materialize.toast('Updated!', 2000);
      fetchOccupancy();
    }
    else
      Materialize.toast('Server Error!', 2000, "toast-fetch_error");
  }
  ourRequest.onerror = function () {
    Materialize.toast('Could not connect to server!', 2000, "toast-fetch_no_connect");
  }
  ourRequest.send(string_obj);
}
function fetchPassedStats() {
  document.getElementById('fire_conf').innerHTML = 'Loading';
  document.getElementById('cont_conf').innerHTML = 'Loading';
  document.getElementById('rec_conf').innerHTML = 'Loading';
  var csrf_token = getCookie('csrftoken');
  var ourRequest = new XMLHttpRequest();
  ourRequest.open("POST", "/recnacc/passed_stats/", true);
  ourRequest.setRequestHeader("Content-type", "application/json");
  ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
  ourRequest.onload = function() {
    if (ourRequest.status >= 200 && ourRequest.status < 400) {
      var ourData = JSON.parse(ourRequest.responseText);
      document.getElementById('fire_conf').innerHTML = ourData.fire_conf;
      document.getElementById('cont_conf').innerHTML = ourData.cont_conf;
      document.getElementById('rec_conf').innerHTML = ourData.rec_conf;
    } else {
      Materialize.toast('Server Error!', 3000, "toast-fetch_error");  
    }
  }
  ourRequest.onerror = function() {
    Materialize.toast('Could not connect to server!', 3000, "toast-fetch_no_connect");
  }
  ourRequest.send('');
}
function fetchAvailabilityStats() {
  document.getElementById('bhawan-availability-wrapper').innerHTML = 'Loading';
  var csrf_token = getCookie('csrftoken');
  var ourRequest = new XMLHttpRequest();
  ourRequest.open("POST", "/recnacc/availability_stats/", true);
  ourRequest.setRequestHeader("Content-type", "application/json");
  ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
  ourRequest.onload = function() {
    if (ourRequest.status >= 200 && ourRequest.status < 400) {
      var ourData = JSON.parse(ourRequest.responseText);
      var data = ourData.data;
      document.getElementById('bhawan-availability-wrapper').innerHTML = '';
      for (var i = 0; i < data.length; i++) {
        var accoList = ''
        for (var j = 0; j < data[i][1].length; j+=2) {
          accoList += '<li><a>'+data[i][1][j]+' : '+data[i][1][j+1]+'</a></li>';
        }
        document.getElementById('bhawan-availability-wrapper').innerHTML += '<li class="no-padding"> <ul class="collapsible collapsible-accordion"> <li> <a class="collapsible-header">'+data[i][0]+'<i class="material-icons">arrow_drop_down</i></a> <div class="collapsible-body"> <ul style="width: 100%;"> '+accoList+'</ul> </div></li></ul> </li>';
      }
      $('.collapsible').collapsible();
    } else {
      Materialize.toast('Server Error!', 3000, "toast-fetch_error");  
    }
  }
  ourRequest.onerror = function() {
    Materialize.toast('Could not connect to server!', 3000, "toast-fetch_no_connect");
    // var jsonResponse = {"data": [["Ram", ["Common Room", 90, "Single Rooms", 40, "TT Room", 80]],["Budh", ["Common Room", 120, "Single Rooms", 50]],["Meera", ["Common Room", 190, "Single Rooms", 100]],["MAL-A", ["Common Room", 90, "Single Rooms", 20, "TT Room", 10]],["Ram", ["Common Room", 90, "Single Rooms", 40, "TT Room", 80]]]};
  }
  ourRequest.send('');
}
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

function changeForm() {
  if($('#type_select').val() == 2) {
    document.getElementById('single-room-name').removeAttribute('disabled');
    document.getElementById('single-room-vacancy').removeAttribute('disabled');
    document.getElementById('acco-strength').setAttribute('disabled','disabled');
  } else {
    document.getElementById('single-room-name').setAttribute('disabled', 'disabled');
    document.getElementById('single-room-vacancy').setAttribute('disabled', 'disabled');
    document.getElementById('acco-strength').removeAttribute('disabled');
  }
}

function addRoom() {
  var send_obj;
  if($('#type_select').val() == null) {
    Materialize.toast('Select Room Type!', 3000);
    return;
  }
  if(parseInt($('#bhawan_select').val()) == 0) {
    Materialize.toast('Select Bhawan!', 3000);
    return;
  }
  if(parseInt($('#acco-strength').val()) == 0 && ((parseInt($('#type_select').val() != 0))||(parseInt($('#type_select').val()) != 2))) {
    Materialize.toast('Enter Strength!', 3000);
    return;
  }
  if(parseInt($('#type_select').val()) == 2 && ($('#single-room-name').val() == null)||(parseInt($('#single-room-vacancy').val()) == 0)) {
    Materialize.toast('Enter Missing Fields!', 3000);
    return;
  }
  var hostel_name ='';
  for(var i=0; i<hostels.length; i++) {
    if($('#bhawan_select').val() == hostels[i][4]) {
      hostel_name = hostels[i][0];
      break;
    }
  }
  if($('#type_select').val() == 0) {
    hostel_name += ' Common Room';
  } else if($('#type_select').val() == 1) {
    hostel_name += ' TT Room';
  } else {
    hostel_name += ' Single Room';
  }
  var acco_strength=0;
  if ($('#type_select').val() != 2) {
    acco_strength = parseInt($('#acco-strength').val());
  }
  var sr_name = '';
  var sr_vacancy=0;
  if ($('#type_select').val() == 2) {
    sr_name=$('#single-room-name').val();
    sr_vacancy=$('#single-room-vacancy').val();
  }
  var send_obj;
  if($('#type_select').val() != 2) {
    send_obj = {
      "data" : {
        "type": $('#type_select').val(),
        "pk": $('#bhawan_select').val(),
        "ac_name": hostel_name,
        "ac_strength": acco_strength,
        "gender": $("input[name='bhawan_gender']:checked").val()
      }
    }
  } else {
    send_obj = {
      "data" : {
        "type": 2,
        "pk": $('#bhawan_select').val(),
        "ac_name": hostel_name,
        "sr_name": sr_name,
        "sr_vacancy": sr_vacancy,
        "gender": $("input[name='bhawan_gender']:checked").val()
      }
    }
  }
  var string_obj = JSON.stringify(send_obj);
  Materialize.toast('Processing', 3000);
  var csrf_token = getCookie('csrftoken');
  var ourRequest = new XMLHttpRequest();
  ourRequest.open("POST", "/recnacc/add_acco/", true);
  ourRequest.setRequestHeader("Content-type", "application/json");
  ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
  ourRequest.onload = function() {
    if (ourRequest.status >= 200 && ourRequest.status < 400) {
      var ourData = JSON.parse(ourRequest.responseText);
      var data = ourData;
      if(data.success==1) {
        Materialize.toast('Successfully Added!', 3000);
        fetchOccupancy();
      } else {
        Materialize.toast('Room Already Exists!', 3000);
      }
    } else {
      Materialize.toast('Server Error!', 3000, "toast-fetch_error");  
    }
  }
  ourRequest.onerror = function() {
    Materialize.toast('Could not connect to server!', 3000, "toast-fetch_no_connect");
  }
  ourRequest.send(string_obj);
}
var hostels;
function updateList() {
  document.getElementById('add-room-form').innerHTML='<div class="row"> <div class="input-field col s12"> <select id="bhawan_select"> <option value="" disabled="disabled" selected="selected"></option> </select> <label for="bhawan_select" data-error="Select Bhawan">Bhawan</label> </div></div><div class="row"> <div class="input-field col s12"> <select id="type_select" onchange="changeForm()"> <option value="" disabled="disabled" selected="selected"></option> <option value="0">Common Room</option> <option value="1">TT Room</option> <option value="2">Single Room</option> </select> <label for="type_select" data-error="Select Type of Room">Type</label> </div></div><div class="row"> <div class="input-field col s12" id="single-room-field"> <input type="number" name="acco-strength" id="acco-strength" value="0"> <label for="acco-strength">Strength</label> </div></div><div class="row"> <div class="input-field col s12" id="single-room-field"> <input type="text" name="single-room-name" id="single-room-name" disabled="disabled" value=""> <label for="single-room-name">Room Name</label> </div></div><div class="row"> <div class="input-field col s12" id="single-room-vacancy-field"> <input type="number" name="single-room-vacancy" id="single-room-vacancy" disabled="disabled" value=""> <label for="single-room-vacancy">Single Room Vacancy</label> </div></div><div class="row"> <div class="col s4 center"> Gender </div><div class="col s4 center"> <input type="radio" name="bhawan_gender" id="bhawan_male" value="male" checked="checked"> <label for="bhawan_male">Male</label> </div><div class="col s4 center"> <input type="radio" name="bhawan_gender" id="bhawan_female" value="female"> <label for="bhawan_female">Female</label> </div></div>';
  Materialize.toast('Updating Bhawan list!', 2000, "toast-fetch");
  var csrf_token = getCookie('csrftoken');
  var ourRequest = new XMLHttpRequest();
  var url = '/recnacc/disp_occupency/';
  ourRequest.open("POST", url, true);
  ourRequest.setRequestHeader("Content-type", "application/json");
  ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
  ourRequest.onload = function () {
    if (ourRequest.status >= 200 && ourRequest.status < 400) {
      data = JSON.parse(ourRequest.responseText).data;
      hostels = data;
      document.getElementById('bhawan_select').innerHTML='<option value="" disabled="disabled" selected="selected"></option>';
      for (var i = 0; i < data.length; i++) {
        document.getElementById('bhawan_select').innerHTML+='<option value="'+data[i][4]+'">'+data[i][0]+'</option>';
      }
      Materialize.updateTextFields();
      $('select').material_select();
      Materialize.toast('Updated!', 2000);
    }
    else
      Materialize.toast('Server Error!', 2000, "toast-fetch_error");
  }
  ourRequest.onerror = function () {
    Materialize.toast('Could not connect to server!', 2000, "toast-fetch_no_connect");
  }
  ourRequest.send();
}

function addAcco() {
  var csrf_token = getCookie('csrftoken');
  var ourRequest = new XMLHttpRequest();
  var url = '/recnacc/add_bhawan/';
  if($('#acco-name').val() == "") {
    Materialize.toast('Enter Name!', 3000);
    return;
  }
  var send_obj = {
    "data": {
      "hostel": $('#acco-name').val()
    }
  }
  Materialize.toast('Adding!', 3000);
  var string_obj = JSON.stringify(send_obj);
  ourRequest.open("POST", url, true);
  ourRequest.setRequestHeader("Content-type", "application/json");
  ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
  ourRequest.onload = function () {
    if (ourRequest.status >= 200 && ourRequest.status < 400) {
      data = JSON.parse(ourRequest.responseText).data;
      Materialize.toast('Updated!', 2000);
      fetchOccupancy();
    }
    else
      Materialize.toast('Server Error!', 2000, "toast-fetch_error");
  }
  ourRequest.onerror = function () {
    Materialize.toast('Could not connect to server!', 2000, "toast-fetch_no_connect");
  }
  ourRequest.send(string_obj);
}