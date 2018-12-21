//required functions copied from pcrhome.js and id_script.js the unconfirmed group portion is removed.
$(document).ready(function() {
	fetchVerifyDocsLeaders();
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
	$('.modal').modal({
    dismissible: false
  });
});
function fetchVerifyDocsLeaders() {
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
  document.getElementById('confirmed-parts-view-docs-list-body').innerHTML = '';
  modal_open(0);
  var ourRequest = new XMLHttpRequest();
  var url = "documents/team/";
  ourRequest.open("POST", url, true);
  ourRequest.setRequestHeader("Content-type", "application/json");
  ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
  ourRequest.onreadystatechange = function() {
    if (ourRequest.readyState === 4 && ourRequest.status === 200) {
      Materialize.toast('Updated List!', 3000);
      var jsonResponse = JSON.parse(ourRequest.responseText);
      var confirmed = jsonResponse.confirmed;
      for (var i = 0; i < confirmed.length; i++) {
        var sports = '';
        for (var j = 0; j < confirmed[i][2].length; j++) {
          sports += confirmed[i][2][j];
          if (j != confirmed[i][2].length - 1) {
            sports += ', ';
          }
        }
        if (confirmed[i][3]!=""&&confirmed[i][4]!="") {
          document.getElementById('confirmed-parts-view-docs-list-body').innerHTML += '<tr class="confirmed-parts-status-selection"> <td style="display: none;">'+confirmed[i][0]+'</td><td style="flex-basis: 40%;">'+confirmed[i][1]+'</td><td style="flex-basis: 40%">'+sports+'</td><td style="flex-basis: 10%;"><a href=\"'+confirmed[i][3]+'\" target="_blank"><i class="material-icons black-text">file_download</i></a></td><td style="flex-basis: 10%;"><a href=\"'+confirmed[i][4]+'\" target="_blank"><i class="material-icons black-text">file_download</i></a></td></tr>';
        } else if (confirmed[i][3]!=""&&confirmed[i][4]=="") {
          document.getElementById('confirmed-parts-view-docs-list-body').innerHTML += '<tr class="confirmed-parts-status-selection"> <td style="display: none;">'+confirmed[i][0]+'</td><td style="flex-basis: 40%;">'+confirmed[i][1]+'</td><td style="flex-basis: 40%">'+sports+'</td><td style="flex-basis: 10%;"><a href=\"'+confirmed[i][3]+'\" target="_blank"><i class="material-icons black-text">file_download</i></a></td><td style="flex-basis: 10%;"><i class="material-icons black-text">block</i></td></tr>';
        } else if (confirmed[i][3]==""&&confirmed[i][4]!="") {
          document.getElementById('confirmed-parts-view-docs-list-body').innerHTML += '<tr class="confirmed-parts-status-selection"> <td style="display: none;">'+confirmed[i][0]+'</td><td style="flex-basis: 40%;">'+confirmed[i][1]+'</td><td style="flex-basis: 40%">'+sports+'</td><td style="flex-basis: 10%;"><i class="material-icons black-text">block</i></td><td style="flex-basis: 10%;"><a href=\"'+confirmed[i][4]+'\" target="_blank"><i class="material-icons black-text">file_download</i></a></td></tr>';
        } else {
          document.getElementById('confirmed-parts-view-docs-list-body').innerHTML += '<tr class="confirmed-parts-status-selection"> <td style="display: none;">'+confirmed[i][0]+'</td><td style="flex-basis: 40%;">'+confirmed[i][1]+'</td><td style="flex-basis: 40%">'+sports+'</td><td style="flex-basis: 10%;"><i class="material-icons black-text">block</i></td><td style="flex-basis: 10%;"><i class="material-icons black-text">block</i></td></tr>';
        }
      }
    } else if (ourRequest.readyState === 4 && ourRequest.status != 200) {
      Materialize.toast('There was some error connecting to the server!', 3000);
      // var jsonResponse = {"unconfirmed": [[1, "Arpit Anshuman", ["Basketball (Boys)", "Badminton (Boys)", "Cricket (Boys)"], "url"], [2, "Nikhil Khandelwal", ["Cricket (Boys)", "Badminton (Boys)"], "url"], [3, "Piyali Manna", ["Badminton (Girls)"], "url"], [5, "Srivatsa", ["Basketball (Boys)"], "url"]], "confirmed": [[1, "Arpit Anshuman", ["Basketball (Boys)", "Badminton (Boys)", "Cricket (Boys)"], "url"], [2, "Nikhil Khandelwal", ["Cricket (Boys)", "Badminton (Boys)"], "url"], [3, "Piyali Manna", ["Badminton (Girls)"], "url"], [5, "Srivatsa", ["Basketball (Boys)"], "url"]]};
    }
  };
  ourRequest.send(sendData);
}
function getCookie(name) {
  var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return v ? v[2] : null;
}
function modal_open(num){
  document.getElementsByClassName("custom-modals")[num].style.display="block";
}
function back(num) {
  document.getElementsByClassName("custom-modals")[num].style.display="none";
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
