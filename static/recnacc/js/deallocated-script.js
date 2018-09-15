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
  document.getElementById('table-ul').innerHTML = '';
  fetchParticipants();
});
// AJAX Functions
function fetchParticipants() {
  Materialize.toast('Updating Participants!', 3000);
  var csrf_token = getCookie('csrftoken');
  var ourRequest = new XMLHttpRequest();
  ourRequest.open("POST", "/recnacc/deallocated_page/", true);
  ourRequest.setRequestHeader("Content-type", "application/json");
  ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
  ourRequest.onload = function() {
    if (ourRequest.status >= 200 && ourRequest.status < 400) {
      document.getElementById('table-ul').innerHTML = '';
      var ourData = JSON.parse(ourRequest.responseText);
      // var data = ourData.data;
      // for (var i = 0; i < data.length; i++) {
      //   document.getElementById('table-ul').innerHTML+='<div class="collapsible-body blue lighten-5"> <span class="name center" style="flex-basis: 45%;">'+data[i].name+'</span> <span class="coll-name center" style="flex-basis: 45%;">'+data[i].college+'</span> <i style="flex-basis: 10%;" class="material-icons hover" onclick="addBack('+data[i].pk+')">add_circle</i> </div>';
      // }
      poppulate_left(ourData);
      Materialize.toast('Updated Participants!', 3000);
    } else {
      Materialize.toast('Server Error!', 3000, "toast-fetch_error");  
    }
  }
  ourRequest.onerror = function() {
    Materialize.toast('Could not connect to server!', 3000, "toast-fetch_no_connect");
  }
  ourRequest.send('');
}
function poppulate_left(ourData) {
  for (ind = 0; ind < ourData.length; ind++) {
    var tmp_group = document.getElementById("left-group-temp"); //template || group
    var un_list = document.getElementsByClassName("left-one")[0];
    // append as last child of unordered list
    //un_list.appendChild(tmp_group.content.cloneNode(true)); 
    un_list.insertBefore(tmp_group.content.cloneNode(true), un_list.firstElementChild); //add group || list index to expandable container || ul
    document.getElementsByClassName("group-id-group")[0].innerHTML = ourData[ind].groupid; // group added as first element[li] of ul || give groupId to first group
    for (j = 0; j < ourData[ind].participants.length; j++) { // go through all participants in a group
      indiv_name = ourData[ind].participants[j].indiv_name;
      indiv_college = ourData[ind].participants[j].indiv_college;
      indiv_group = ourData[ind].groupid;
      indiv_gender = ourData[ind].participants[j].indiv_gender;
      indiv_id = ourData[ind].participants[j].indiv_id;
      add_to_left(document.getElementsByClassName("list-ind")[0]); // insert participant to group 0 || first li of ul
    }
  }
  $(".group").each(function (index) {
    $(this).toggleClass("active");
  });
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
function search() {
  var span_name, span_college;
  var filter_name = document.getElementById("name-search").value.toUpperCase();
  var filter_college = document.getElementById("college-search").value.toUpperCase();
  var ul = document.getElementById('table-ul');
  for (var i = 0; i < ul.getElementsByTagName('div').length; i++) {
    span_name = ul.getElementsByTagName('div')[i].getElementsByTagName("span")[0];
    span_college = ul.getElementsByTagName('div')[i].getElementsByTagName("span")[1];
    if ((span_name && span_name.innerHTML.toUpperCase().indexOf(filter_name) > -1) && (span_college && span_college.innerHTML.toUpperCase().indexOf(filter_college) > -1)) {
      ul.getElementsByTagName('div')[i].style.display = "";
    } else {
      ul.getElementsByTagName('div')[i].style.display = "none";
    }
  }
}
Pusher.logToConsole = false;
var pusher = new Pusher('9b825df805e0b694cccc', {
  cluster: 'ap2',
  encrypted: true
});

var recndeacc_channel = pusher.subscribe('recndeacc_channel');
recndeacc_channel.bind('recndeacc_event', function(data) {
  pusher_fetchParticipants();
});
function pusher_fetchParticipants() {
  var csrf_token = getCookie('csrftoken');
  var ourRequest = new XMLHttpRequest();
  ourRequest.open("POST", "/recnacc/deallocated_page/", true);
  ourRequest.setRequestHeader("Content-type", "application/json");
  ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
  ourRequest.onload = function() {
    if (ourRequest.status >= 200 && ourRequest.status < 400) {
      document.getElementById('table-ul').innerHTML = '';
      var ourData = JSON.parse(ourRequest.responseText);
      var data = ourData.data;
      for (var i = 0; i < data.length; i++) {
        document.getElementById('table-ul').innerHTML+='<div class="collapsible-body blue lighten-5"> <span class="name center" style="flex-basis: 45%;">'+data[i].name+'</span> <span class="coll-name center" style="flex-basis: 45%;">'+data[i].college+'</span> <i style="flex-basis: 10%;" class="material-icons hover" onclick="addBack('+data[i].pk+')">add_circle</i> </div>';
      }
      // Nothing
    } else {
      // Nothing
    }
  }
  ourRequest.onerror = function() {
    // Nothing
  }
  ourRequest.send('');
}

/////// RecnAcc Changes

function addBack(option) {
  var pk = parseInt(option.previousElementSibling.innerHTML);
  var send_obj = {
    "data": {
      "pk": pk
    }
  };
  var string_obj = JSON.stringify(send_obj);
  Materialize.toast('Adding Back!', 3000);
  var csrf_token = getCookie('csrftoken');
  var ourRequest = new XMLHttpRequest();
  ourRequest.open("POST", "/recnacc/redeaccomodate/", true);
  ourRequest.setRequestHeader("Content-type", "application/json");
  ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
  ourRequest.onload = function() {
    if (ourRequest.status >= 200 && ourRequest.status < 400) {
      var ourData = JSON.parse(ourRequest.responseText);
      fetchParticipants();
      Materialize.toast('Done!', 3000);
    } else {
      Materialize.toast('Error while connecting!', 3000);
    }
  }
  ourRequest.onerror = function() {
    Materialize.toast('Error while connecting!', 3000);
  }
  ourRequest.send(string_obj);
}
function search() {
  var span_name, span_college, span_groupid;
  var filter_name = document.getElementById("name-search").value.toUpperCase();
  var filter_college = document.getElementById("college-search").value.toUpperCase();
  var filter_groupid = document.getElementById("groupid-search").value.toUpperCase();
  var ul = document.getElementById('left-table-ul');
  for (var j = 0; j < ul.getElementsByTagName('li').length; j++) {
    var div = ul.getElementsByTagName('li')[j].getElementsByTagName('div');
    var count = 0;
    for (i = 1; i < div.length; i++) {
      span_name = div[i].getElementsByTagName("span")[0];
      span_college = div[i].getElementsByTagName("span")[1];
      span_groupid = div[i].getElementsByTagName("span")[2];
      if ((span_name && span_name.innerHTML.toUpperCase().indexOf(filter_name) > -1) && (span_college && span_college.innerHTML.toUpperCase().indexOf(filter_college) > -1) && (span_groupid && span_groupid.innerHTML.toUpperCase().indexOf(filter_groupid) > -1)) {
        div[i].style.display = "";
      } else {
        div[i].style.display = "none";
        count++;
      }
    }
    if (count == (div.length - 1)) {
      ul.getElementsByTagName('li')[j].style.display = 'none';
    } else {
      ul.getElementsByTagName('li')[j].style.display = 'list-item';
    }
  }
}