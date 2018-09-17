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
  document.getElementById('notes-collection').innerHTML = '';
  fetchNotes();
});
// AJAX Functions
function addNotes() {
  var note = document.getElementById('add-notes-area').value;
  var send_obj = {"data": {"text": note}};
  var string_obj = JSON.stringify(send_obj);
  Materialize.toast('Adding Note!', 3000);
  var csrf_token = getCookie('csrftoken');
  var ourRequest = new XMLHttpRequest();
  ourRequest.open("POST", "/recnacc/add_note/", true);
  ourRequest.setRequestHeader("Content-type", "application/json");
  ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
  ourRequest.onload = function() {
    if (ourRequest.status >= 200 && ourRequest.status < 400) {
      Materialize.toast('Added Note!', 3000);
      fetchNotes();
      document.getElementById('add-notes-area').value = '';
    } else {
      Materialize.toast('Server Error!', 3000, "toast-fetch_error");  
    }
  }
  ourRequest.onerror = function() {
    Materialize.toast('Could not connect to server!', 3000, "toast-fetch_no_connect");
  }
  ourRequest.send(string_obj);
}
function fetchNotes() {
  Materialize.toast('Updating Notes!', 3000);
  var csrf_token = getCookie('csrftoken');
  var ourRequest = new XMLHttpRequest();
  ourRequest.open("POST", "/recnacc/view_notes/", true);
  ourRequest.setRequestHeader("Content-type", "application/json");
  ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
  ourRequest.onload = function() {
    if (ourRequest.status >= 200 && ourRequest.status < 400) {
      document.getElementById('notes-collection').innerHTML = '';
      var ourData = JSON.parse(ourRequest.responseText);
      var data = ourData.data;
      for (var i = data.length-1; i >= 0 ; i--) {
        document.getElementById('notes-collection').innerHTML+='<li class="collection-item avatar dismissable"> <i class="material-icons circle red">note</i> <span class="title"><pre>'+data[i].text+'</pre></span> <p class="date-stamp">Date: '+data[i].time+'</p><a class="secondary-content hover" onclick="deleteNote('+data[i].pk+')"><i class="material-icons">delete_forever</i></a></li>';
      }
      Materialize.toast('Updated Notes!', 3000);
    } else {
      Materialize.toast('Server Error!', 3000, "toast-fetch_error");  
    }
  }
  ourRequest.onerror = function() {
    Materialize.toast('Could not connect to server!', 3000, "toast-fetch_no_connect");
  }
  ourRequest.send('');
}
function deleteNote(id) {
  var pk = parseInt(id);
  Materialize.toast('Deleting Note!', 3000);
  var send_obj = {
    "data": {
      "pk": pk
    }
  }
  var string_obj = JSON.stringify(send_obj);
  var csrf_token = getCookie('csrftoken');
  var ourRequest = new XMLHttpRequest();
  ourRequest.open("POST", "/recnacc/del_note/", true);
  ourRequest.setRequestHeader("Content-type", "application/json");
  ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
  ourRequest.onload = function() {
    if (ourRequest.status >= 200 && ourRequest.status < 400) {
      Materialize.toast('Deleted Note!', 3000);
      fetchNotes();
    } else {
      Materialize.toast('Server Error!', 3000, "toast-fetch_error");  
    }
  }
  ourRequest.onerror = function() {
    Materialize.toast('Could not connect to server!', 3000, "toast-fetch_no_connect");
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