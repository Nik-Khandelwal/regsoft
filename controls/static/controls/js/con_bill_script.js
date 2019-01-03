$(document).ready(function() {
  getGroups();
  $('.modal').modal({
    dismissible: false
  });
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
});
function open_details(data){
  document.getElementById("det").style.height="100%";
  group_id = data.children[4].innerHTML;
  document.getElementById("uncnfrm_grp").innerHTML='<div class="collapsible-body custom-collapsible-body blue lighten-5"> <span class="unconfirm-name center" style="flex-basis: 45%;">Name</span> <span class="unconfirm-coll-name center" style="flex-basis: 45%;">College</span> <span class="unconfirm-id-col center">ID</span> <i style="flex-basis: 10%;" class="material-icons">account_circle</i> </div>';
  Materialize.toast('Loading, Please Wait', 4000);
  var csrf_token = getCookie('csrftoken');
  var ourRequest = new XMLHttpRequest();
  var url = "/firewallz/show_details_unconfirm/";
  ourRequest.open("POST", url, true);
  ourRequest.setRequestHeader("Content-type", "application/json");
  ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
  // POST
  send_obj = {
    "data": {
      "group_id": group_id
    },
    "csrftoken": {
      "csrfmiddlewaretoken": csrf_token
    }
  };
  var send_json = JSON.stringify(send_obj);
  // Obtain 
  ourRequest.onreadystatechange = function () {
    if (ourRequest.readyState === 4 && ourRequest.status === 200) {
      document.getElementById("uncnfrm_grp").innerHTML='<div class="collapsible-body custom-collapsible-body blue lighten-5"> <span class="unconfirm-name center" style="flex-basis: 45%;">Name</span> <span class="unconfirm-coll-name center" style="flex-basis: 45%;">College</span> <span class="unconfirm-id-col center">ID</span> <i style="flex-basis: 10%;" class="material-icons">account_circle</i> </div>';
      var recieve_json = JSON.parse(ourRequest.responseText);
      for (var i = 0; i < recieve_json.length; i++) {
        document.getElementById("uncnfrm_grp").innerHTML+='<div class="collapsible-body custom-collapsible-body blue lighten-5"> <span class="unconfirm-name center" style="flex-basis: 45%;">'+recieve_json[i].name+'</span> <span class="unconfirm-coll-name center" style="flex-basis: 45%;">'+recieve_json[i].college+'</span> <span class="unconfirm-id-col center">'+recieve_json[i].id+'</span> <i style="flex-basis: 10%;" class="material-icons change_cursor" onclick="uncnfrm(this)"><img src="/static/firewallz/firewallz_unconfirm/icons/del.svg" class="unconfirm_icon"></i> </div>';
      }
      Materialize.toast('Updated List!', 3000);
    }
    else if (ourRequest.readyState === 4 && ourRequest.status != 200) {
      Materialize.toast('Error Fetching List!', 3000);
      // document.getElementById("uncnfrm_grp").innerHTML='<div class="collapsible-body custom-collapsible-body blue lighten-5"> <span class="unconfirm-name center" style="flex-basis: 45%;">Name</span> <span class="unconfirm-coll-name center" style="flex-basis: 45%;">College</span> <span class="unconfirm-id-col center">ID</span> <i style="flex-basis: 10%;" class="material-icons">account_circle</i> </div>';
      // var recieve_json = [{"name": "Arpit Anshuman", "college": "BITS Pilani", "id": "12"},{"name": "Rampalli Sai Srivatsa", "college": "BITS Pilani", "id": "14"},{"name": "Arpit Anshuman", "college": "BITS Pilani", "id": "12"},{"name": "Rampalli Sai Srivatsa", "college": "BITS Pilani", "id": "14"},{"name": "Arpit Anshuman", "college": "BITS Pilani", "id": "12"},{"name": "Rampalli Sai Srivatsa", "college": "BITS Pilani", "id": "14"},{"name": "Arpit Anshuman", "college": "BITS Pilani", "id": "12"},{"name": "Rampalli Sai Srivatsa", "college": "BITS Pilani", "id": "14"},{"name": "Arpit Anshuman", "college": "BITS Pilani", "id": "12"},{"name": "Rampalli Sai Srivatsa", "college": "BITS Pilani", "id": "14"}];
      // for (var i = 0; i < recieve_json.length; i++) {
      //   document.getElementById("uncnfrm_grp").innerHTML+='<div class="collapsible-body custom-collapsible-body blue lighten-5"> <span class="unconfirm-name center" style="flex-basis: 45%;">'+recieve_json[i].name+'</span> <span class="unconfirm-coll-name center" style="flex-basis: 45%;">'+recieve_json[i].college+'</span> <span class="unconfirm-id-col center">'+recieve_json[i].id+'</span> <i style="flex-basis: 10%;" class="material-icons change_cursor" onclick="uncnfrm(this)"><img src="../static/firewallz/firewallz_unconfirm/icons/del.svg" class="unconfirm_icon"></i> </div>';
      // }
    }
  }
  ourRequest.send(send_json);
}
function close_details(){
  document.getElementById("det").style.height="0";
  document.getElementById("uncnfrm_grp").innerHTML="";
}
function uncnfrm(del_data) {
  Materialize.toast('Unconfirming Please Wait!', 4000);
  var id = parseInt(del_data.parentElement.getElementsByTagName('span')[2].innerHTML);
  var csrf_token = getCookie('csrftoken');
  var ourRequest = new XMLHttpRequest();
  var url = "/firewallz/unconfirm_player/";
  ourRequest.open("POST", url, true);
  ourRequest.setRequestHeader("Content-type", "application/json");
  ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
  // POST
  send_obj = {
    "data": {
      "participant_id": id
    },
    "csrftoken": {
      "csrfmiddlewaretoken": csrf_token
    }
  };
  var send_json = JSON.stringify(send_obj);
  // Obtain 
  ourRequest.onreadystatechange = function () {
    if (ourRequest.readyState === 4 && ourRequest.status === 200) {
      Materialize.toast('Successfully Unconfirmed!', 4000);
      getGroups();
    }
    else if (ourRequest.readyState === 4 && ourRequest.status != 200) {
      Materialize.toast('Error Processing!', 3000);
      getGroups();
    }
  }
  ourRequest.send(send_json);
  close_details();
}
function getCookie(name) {
  var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return v ? v[2] : null;
}
function getGroups() {
  Materialize.toast('Fetching Group Leaders!', 3000);
  document.getElementById("table-ul").innerHTML='<div class="collapsible-body custom-collapsible-body blue lighten-5"> <span class="pk-col center" style="flex-basis: 15%;">Bill No</span> <span class="coll-name center" style="flex-basis: 75%;">College</span> <i style="flex-basis: 10%;" class="material-icons">account_circle</i> </div>';
  var csrf_token = getCookie('csrftoken');
  var ourRequest = new XMLHttpRequest();
  var url = "/controls/bill_details/";
  ourRequest.open("POST", url, true);
  ourRequest.setRequestHeader("Content-type", "application/json");
  ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
  // POST
  send_obj = {
    "csrftoken": {
      "csrfmiddlewaretoken": csrf_token
    }
  };
  var send_json = JSON.stringify(send_obj);
  // Obtain 
  ourRequest.onreadystatechange = function () {
    if (ourRequest.readyState === 4 && ourRequest.status === 200) {
      document.getElementById("table-ul").innerHTML='<div class="collapsible-body custom-collapsible-body blue lighten-5"> <span class="pk-col center" style="flex-basis: 15%;">Bill No</span> <span class="coll-name center" style="flex-basis: 45%;">College</span> <span class="group-name center" style="flex-basis: 30%;">Group ID</span> <i style="flex-basis: 10%;" class="material-icons">account_circle</i> </div>';
      var recieve_json = JSON.parse(ourRequest.responseText);
      for (var i = recieve_json.length-1; i >= 0; i--) {
        document.getElementById("table-ul").innerHTML+='<div class="collapsible-body custom-collapsible-body blue lighten-5"> <span class="pk-col center" style="flex-basis: 15%;"><a href="/controls/bill_pdf/'+recieve_json[i].bill_pk+'" target="_blank">'+recieve_json[i].bill_pk+'</a></span> <span class="coll-name center" style="flex-basis: 45%;">'+recieve_json[i].college+'</span> <span class="group-name center" style="flex-basis: 30%;">'+recieve_json[i].group_id+'</span> <i style="flex-basis: 10%;" class="material-icons">account_circle</i> </div>';
      }
    }
    else if (ourRequest.readyState === 4 && ourRequest.status != 200) {
      Materialize.toast('Error Fetching List!', 3000);
      // document.getElementById("table-ul").innerHTML='<div class="collapsible-body custom-collapsible-body blue lighten-5"> <span class="pk-col center" style="flex-basis: 10%;">Group No</span> <span class="name center" style="flex-basis: 40%;">Name</span> <span class="coll-name center" style="flex-basis: 40%;">College</span> <span class="group-id-col center">Group ID</span> <i style="flex-basis: 10%;" class="material-icons">account_circle</i> </div>';
      // var recieve_json = [{"pk": 45, "name": "Arpit Anshuman", "college": "BITS Pilani", "groupid": "GHAJHA"},{"pk": 87, "name": "Rampalli Sai Srivatsa", "college": "BITS Pilani", "groupid": "GHAJHA"},{"pk": 45, "name": "Arpit Anshuman", "college": "BITS Pilani", "groupid": "GHAJHA"},{"pk": 87, "name": "Rampalli Sai Srivatsa", "college": "BITS Pilani", "groupid": "GHAJHA"},{"pk": 45, "name": "Arpit Anshuman", "college": "BITS Pilani", "groupid": "GHAJHA"},{"pk": 87, "name": "Rampalli Sai Srivatsa", "college": "BITS Pilani", "groupid": "GHAJHA"},{"pk": 45, "name": "Arpit Anshuman", "college": "BITS Pilani", "groupid": "GHAJHA"},{"pk": 87, "name": "Rampalli Sai Srivatsa", "college": "BITS Pilani", "groupid": "GHAJHA"}]
      // for (var i = 0; i < recieve_json.length; i++) {
      //   document.getElementById("table-ul").innerHTML+='<div class="collapsible-body custom-collapsible-body blue lighten-5 change_cursor" onclick="open_details(this)"> <span class="pk-col center" style="flex-basis: 10%;">'+recieve_json[i].pk+'</span> <span class="name center" style="flex-basis: 40%;">'+recieve_json[i].name+'</span> <span class="coll-name center" style="flex-basis: 40%;">'+recieve_json[i].college+'</span> <span class="group-id-col center">'+recieve_json[i].groupid+'</span> <i style="flex-basis: 10%;" class="material-icons">account_circle</i> </div>';
      // }
    }
  }
  ourRequest.send(send_json);
}
function search() {
  var span_name;
  var filter_name = document.getElementById("name-search").value.toUpperCase();
  var grplist = document.getElementById('table-ul');
  for (var i = 1; i < grplist.getElementsByTagName('div').length; i++) {
    var div = grplist.getElementsByTagName('div');
    var span_name = grplist.getElementsByTagName('div')[i].getElementsByTagName('span')[1];
    if ((span_name && span_name.innerHTML.toUpperCase().indexOf(filter_name) > -1)) {
      div[i].style.display = "";
    } else {
      div[i].style.display = "none";
    }
  }
}
function participant_search() {
  var span_name;
  var filter_name = document.getElementById("participant-name-search").value.toUpperCase();
  var grplist = document.getElementById('uncnfrm_grp');
  for (var i = 1; i < grplist.getElementsByTagName('div').length; i++) {
    var div = grplist.getElementsByTagName('div');
    var span_name = grplist.getElementsByTagName('div')[i].getElementsByTagName('span')[0];
    if ((span_name && span_name.innerHTML.toUpperCase().indexOf(filter_name) > -1)) {
      div[i].style.display = "";
    } else {
      div[i].style.display = "none";
    }
  }
}
function stats(){
  $('.button-collapse').sideNav('hide');
  fetchStats();
  document.getElementById("stat").style.height="100vh";
  document.getElementById("close").style.display="block";
  document.getElementById("stat_data").style.display="block";
  document.getElementById("csv").style.display="inline-block";
  document.getElementById("excel").style.display="inline-block";
  document.getElementById("pdf").style.display="inline-block";
}
function close_stats(){        
  document.getElementById("stat").style.height="0vh";
  document.getElementById("close").style.display="none";
  document.getElementById("stat_data").style.display="none";
  document.getElementById("csv").style.display="none";
  document.getElementById("excel").style.display="none";
  document.getElementById("pdf").style.display="none";
}
function fetchStats() {
  document.getElementById('stats_ul').innerHTML = '';
  Materialize.toast('Fetching Stats!', 3000);
  var csrf_token = getCookie('csrftoken');
  var ourRequest = new XMLHttpRequest();
  ourRequest.open("POST", "/firewallz/view_stats/", true);
  ourRequest.setRequestHeader("Content-type", "application/json");
  ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
  ourRequest.onload = function() {
    if (ourRequest.status >= 200 && ourRequest.status < 400) {
      ourData = JSON.parse(ourRequest.responseText);
      console.log(ourData);
      var data = ourData.data;
      for (var i = 0; i < data.length; i++) {
        var participants = '';
        for (var j = 0; j < data[i][1].length; j++) {
          participants += '<a class="collection-item">'+data[i][1][j][0]+'<span id="phn_no" class="right">'+data[i][1][j][1]+'</span></a>';
        }
        document.getElementById('stats_ul').innerHTML += '<li> <div class="collapsible-header"><i class="material-icons">account_balance</i>'+data[i][0]+'</div><div class="collapsible-body center white"> <div class="collection ">'+participants+'</div></div></li>';
      }
      Materialize.toast('Updated!', 3000);
      $('.collapsible').collapsible();
    } else {
      Materialize.toast('Server Error!', 3000, "toast-fetch_error");  
    }
  }
  ourRequest.onerror = function() {
    Materialize.toast('Could not connect to server!', 4000, "toast-fetch_no_connect");
    // var data = [["BITS Pilani",[["Arpit", 9829775537],["Nikhil", 921379131],["Sri", 2349719891],["Satya", 9958295537]]],["BITS Hyderabad",[["Arpit", 9829775537],["Nikhil", 921379131],["Sri", 2349719891],["Satya", 9958295537],["Piyali", 4567890435]]],["IIT Delhi",[["Part1", 47656575537],["Part2", 7647676],["Part3", 2345678435678]]]];
    // for (var i = 0; i < data.length; i++) {
    //   var participants = '';
    //   for (var j = 0; j < data[i][1].length; j++) {
    //     participants += '<a class="collection-item">'+data[i][1][j][0]+'<span id="phn_no" class="right">'+data[i][1][j][1]+'</span></a>';
    //   }
    //   document.getElementById('stats_ul').innerHTML += '<li> <div class="collapsible-header"><i class="material-icons">account_balance</i>'+data[i][0]+'</div><div class="collapsible-body center white"> <div class="collection ">'+participants+'</div></div></li>';
    // }
    // $('.collapsible').collapsible();
  }
  ourRequest.send();
}
function fetchPassedStats() {
  document.getElementById('fire_conf').innerHTML = 'Loading';
  document.getElementById('cont_conf').innerHTML = 'Loading';
  document.getElementById('rec_conf').innerHTML = 'Loading';
  var csrf_token = getCookie('csrftoken');
  var ourRequest = new XMLHttpRequest();
  ourRequest.open("POST", "/firewallz/passed_stats/", true);
  ourRequest.setRequestHeader("Content-type", "application/json");
  ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
  ourRequest.onload = function() {
    if (ourRequest.status >= 200 && ourRequest.status < 400) {
      var ourData = JSON.parse(ourRequest.responseText);
      
      document.getElementById('fire_conf').innerHTML = ourData.fire_conf;
      document.getElementById('cont_conf').innerHTML = ourData.cont_conf;
      document.getElementById('rec_conf').innerHTML = ourData.rec_conf;
    } else {
      Materialize.toast('Server Error!', 4000, "toast-fetch_error");  
    }
  }
  ourRequest.onerror = function() {
    Materialize.toast('Could not connect to server!', 4000, "toast-fetch_no_connect");
  }
  ourRequest.send('');
}
Pusher.logToConsole = false;
var pusher = new Pusher('9b825df805e0b694cccc', {
  cluster: 'ap2',
  encrypted: true
});
// Below Channel for Data from Firewallz Socket
var firewallz_channel = pusher.subscribe('firewallz_channel');
firewallz_channel.bind('my-event2', function(data) {
  // Same Data Format as details view.
  pusherGetGroups();
});
// Below Channel for Controls Confirm
var controls_channel = pusher.subscribe('Controls--Channel');
controls_channel.bind('my-event', function(data) {
  pusherGetGroups();
});
// Below Channel for Data from Controls Unconfirm Socket
controls_channel.bind('controls_unconfirm_event', function(data) {
  // Same Data Format as details view.
  pusherGetGroups();
});
function pusherGetGroups() {
  var csrf_token = getCookie('csrftoken');
  var ourRequest = new XMLHttpRequest();
  var url = "/firewallz/unconfirm_details/";
  ourRequest.open("POST", url, true);
  ourRequest.setRequestHeader("Content-type", "application/json");
  ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
  // POST
  send_obj = {
    "csrftoken": {
      "csrfmiddlewaretoken": csrf_token
    }
  };
  var send_json = JSON.stringify(send_obj);
  // Obtain 
  ourRequest.onreadystatechange = function () {
    if (ourRequest.readyState === 4 && ourRequest.status === 200) {
      document.getElementById("table-ul").innerHTML='<div class="collapsible-body custom-collapsible-body blue lighten-5"> <span class="pk-col center" style="flex-basis: 15%;">Bill No</span> <span class="coll-name center" style="flex-basis: 45%;">College</span> <span class="group-name center" style="flex-basis: 30%;">Group ID</span> <i style="flex-basis: 10%;" class="material-icons">account_circle</i> </div>';
      var recieve_json1 = JSON.parse(ourRequest.responseText);
      var recieve_json = recieve_json1.data;
      for (var i = recieve_json.length-1; i >= 0; i--) {
        document.getElementById("table-ul").innerHTML+='<div class="collapsible-body custom-collapsible-body blue lighten-5"> <span class="pk-col center" style="flex-basis: 15%;"><a href="/controls/bill_pdf/'+recieve_json[i].bill_pk+'" target="_blank">'+recieve_json[i].bill_pk+'</a></span> <span class="coll-name center" style="flex-basis: 45%;">'+recieve_json[i].college+'</span> <span class="group-name center" style="flex-basis: 30%;">'+recieve_json[i].group_id+'</span> <i style="flex-basis: 10%;" class="material-icons">account_circle</i> </div>';
      }
    }
    else if (ourRequest.readyState === 4 && ourRequest.status != 200) {
      // Do Nothing
    }
  }
  ourRequest.send(send_json);
}
function delete_group(option) {
  setTimeout(function(){close_details();},100);
  Materialize.toast('Unconfirming Group Please Wait!', 4000);
  var id = parseInt(option.parentElement.getElementsByTagName('span')[0].innerHTML);
  var csrf_token = getCookie('csrftoken');
  var ourRequest = new XMLHttpRequest();
  var url = "/firewallz/unconfirm_player_grp/";
  ourRequest.open("POST", url, true);
  ourRequest.setRequestHeader("Content-type", "application/json");
  ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
  // POST
  send_obj = {
    "data": {
      "group_id": id
    },
    "csrftoken": {
      "csrfmiddlewaretoken": csrf_token
    }
  };
  var send_json = JSON.stringify(send_obj);
  // Obtain 
  ourRequest.onreadystatechange = function () {
    if (ourRequest.readyState === 4 && ourRequest.status === 200) {
      Materialize.toast('Successfully Unconfirmed!', 4000);
      getGroups();
    }
    else if (ourRequest.readyState === 4 && ourRequest.status != 200) {
      Materialize.toast('Error Processing!', 3000);
      getGroups();
    }
  }
  ourRequest.send(send_json);
}
