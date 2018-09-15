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
  fetchOccupancyDetails();
  // document.getElementById('acco-wrapper').innerHTML = '';
});
var addpk;
function addFine(pk) {
  addpk = parseInt(pk);
  document.getElementById('edit-fine-field').innerHTML='<input type="number" name="add-fine" id="add-fine" value="0"> <label for="add-fine">Add Fine</label>';
  Materialize.updateTextFields();
  $('#edit-fine-modal').modal('open');
}
// AJAX Scripts
function fetchOccupancyDetails() {
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
        document.getElementById('acco-wrapper').innerHTML+='<div class="row"> <div class="col s12 hostel-header">'+data[i][0]+'</div><div class="col s8 center rooms-header">Name</div><div class="col s2 center rooms-header">Fine</div><div class="col s2 center rooms-header">Current</div><div class="col s8 center rooms-content">Common Room</div><div class="col s2 center rooms-content change-cursor" onclick="addFine('+data[i][1].pk+')"><i class="material-icons">airline_seat_individual_suite</i></div><div class="col s2 center rooms-content">1000</div><div class="col s8 center rooms-content">TT Room</div><div class="col s2 center rooms-content change-cursor" onclick="addFine('+data[i][2].pk+')"><i class="material-icons">airline_seat_individual_suite</i></div><div class="col s2 center rooms-content">1000</div><div class="col s8 center rooms-content">Single Room</div><div class="col s2 center rooms-content change-cursor" onclick="addFine('+data[i][3].pk+')"><i class="material-icons">airline_seat_individual_suite</i></div><div class="col s2 center rooms-content">1000</div></div>';
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
function updateFine() {
  Materialize.toast('Updating!', 3000);
  var csrf_token = getCookie('csrftoken');
  var ourRequest = new XMLHttpRequest();
  var url = '/recnacc/fine_page/';
  var formData = serializeArray(document.getElementById('edit-fine-form'));
  var fine = formData[0].value;
  var send_obj = {"data":{"amt":fine, "pk":addpk}};
  var string_obj = JSON.stringify(send_obj);
  ourRequest.open("POST", url, true);
  ourRequest.setRequestHeader("Content-type", "application/json");
  ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
  ourRequest.onload = function () {
    if (ourRequest.status >= 200 && ourRequest.status < 400) {
      Materialize.toast('Updated!', 2000);
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