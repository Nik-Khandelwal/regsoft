function loaded() {
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
  fetchDenoms();
}
function updateDenoms() {
  var formData = serializeArray(document.getElementById('denoms-form'));
  var deno_50 = formData[0].value;
  var deno_100 = formData[1].value;
  var deno_200 = formData[2].value;
  var deno_500 = formData[3].value;
  var deno_2000 = formData[4].value;
  sendUpdateDenoms(deno_50, deno_100, deno_200, deno_500, deno_2000);
}
function fetchDenoms() {
  Materialize.toast('Updating Denominations!', 3000, "toast-post");
  var csrf_token = getCookie('csrftoken');
  var ourRequest = new XMLHttpRequest();
  var url = "/controls/denomination_display/";
  ourRequest.open("POST", url, true);
  ourRequest.setRequestHeader("Content-type", "application/json");
  ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
  ourRequest.onreadystatechange = function() {
    if (ourRequest.readyState === 4 && ourRequest.status === 200) {
      var recieve_json = JSON.parse(ourRequest.responseText);
      var denoms_array = recieve_json;
      document.getElementById('denoms-form').innerHTML = '<div class="row"><div class="input-field col s12"><i class="material-icons prefix">attach_money</i><input type="number" name="denom-50" id="denom-50" value="'+denoms_array[0]+'"><label for="denom-50">50\'s</label></div></div><div class="row"><div class="input-field col s12"><i class="material-icons prefix">attach_money</i><input type="number" name="denom-100" id="denom-100" value="'+denoms_array[1]+'"><label for="denom-100">100\'s</label></div></div><div class="row"><div class="input-field col s12"><i class="material-icons prefix">attach_money</i><input type="number" name="denom-200" id="denom-200" value="'+denoms_array[2]+'"><label for="denom-200">200\'s</label></div></div><div class="row"><div class="input-field col s12"><i class="material-icons prefix">attach_money</i><input type="number" name="denom-500" id="denom-500" value="'+denoms_array[3]+'"><label for="denom-500">500\'s</label></div></div><div class="row"><div class="input-field col s12"><i class="material-icons prefix">attach_money</i><input type="number" name="denom-2000" id="denom-2000" value="'+denoms_array[4]+'"><label for="denom-2000">2000\'s</label></div></div>';
      Materialize.updateTextFields();
    }
    else if (ourRequest.readyState === 4 && ourRequest.status != 200) {
      Materialize.toast('Error while Updating!', 3000);
    }
  }
  ourRequest.send('');
}
function fetchPassedStats() {
  document.getElementById('fire_conf').innerHTML = 'Loading';
  document.getElementById('cont_conf').innerHTML = 'Loading';
  document.getElementById('rec_conf').innerHTML = 'Loading';
  var csrf_token = getCookie('csrftoken');
  var ourRequest = new XMLHttpRequest();
  ourRequest.open("POST", "/controls/passed_stats/", true);
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
function sendUpdateDenoms(denom50, denom100, denom200, denom500, denom2000) {
  Materialize.toast('Updating!', 2000);
  var csrf_token = getCookie('csrftoken');
  send_obj={
    "data": {
      "type":"update",
      "deno_2000": denom2000,
      "deno_500": denom500,
      "deno_200": denom200,
      "deno_100": denom100,
      "deno_50": denom50
    }
  };
  var string_obj = JSON.stringify(send_obj);
  var ourRequest = new XMLHttpRequest();
  var url = "/controls/arpit/";
  ourRequest.open("POST", url, true);
  ourRequest.setRequestHeader("Content-type", "application/json");
  ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
  ourRequest.onload = function() {
  if (ourRequest.status >= 200 && ourRequest.status < 400) {
    Materialize.toast('Updated!', 2000);
  }
  else
    Materialize.toast('Server Error!', 3000, "toast-fetch_error");  
  }
  ourRequest.onerror = function() {
    Materialize.toast('Could not connect to server!', 3000, "toast-fetch_no_connect");
  }
  ourRequest.send(string_obj);
}
// AJAX For Pusher Update
function fetchUpdateDenoms() {
  var csrf_token = getCookie('csrftoken');
  var ourRequest = new XMLHttpRequest();
  var url = "/controls/denomination_display/";
  ourRequest.open("POST", url, true);
  ourRequest.setRequestHeader("Content-type", "application/json");
  ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
  ourRequest.onreadystatechange = function() {
    if (ourRequest.readyState === 4 && ourRequest.status === 200) {
      var recieve_json = JSON.parse(ourRequest.responseText);
      var denoms_array = recieve_json;
      document.getElementById('denoms-form').innerHTML = '<div class="row"><div class="input-field col s12"><i class="material-icons prefix">attach_money</i><input type="number" name="denom-50" id="denom-50" value="'+denoms_array[0]+'"><label for="denom-50">50\'s</label></div></div><div class="row"><div class="input-field col s12"><i class="material-icons prefix">attach_money</i><input type="number" name="denom-100" id="denom-100" value="'+denoms_array[1]+'"><label for="denom-100">100\'s</label></div></div><div class="row"><div class="input-field col s12"><i class="material-icons prefix">attach_money</i><input type="number" name="denom-200" id="denom-200" value="'+denoms_array[2]+'"><label for="denom-200">200\'s</label></div></div><div class="row"><div class="input-field col s12"><i class="material-icons prefix">attach_money</i><input type="number" name="denom-500" id="denom-500" value="'+denoms_array[3]+'"><label for="denom-500">500\'s</label></div></div><div class="row"><div class="input-field col s12"><i class="material-icons prefix">attach_money</i><input type="number" name="denom-2000" id="denom-2000" value="'+denoms_array[4]+'"><label for="denom-2000">2000\'s</label></div></div>';
      Materialize.updateTextFields();
    }
    else if (ourRequest.readyState === 4 && ourRequest.status != 200) {
      Materialize.toast('Error while Updating!', 3000);
    }
  }
  ourRequest.send('');
}
// Pusher Code
// Enable pusher logging - don't include this in production
Pusher.logToConsole = false;
var pusher = new Pusher('9b825df805e0b694cccc', {
  cluster: 'ap2',
  encrypted: true
});
// Below Channel for Data from Firewallz Socket
var controls_denoms_channel = pusher.subscribe('controls_denoms_channel');
controls_denoms_channel.bind('controls_denoms_event', function(data) {
  // Same Data Format as details view.
  fetchUpdateDenoms();
});
// Utility Functions
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