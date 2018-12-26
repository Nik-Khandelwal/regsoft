$('document').ready(function() {
  $('.coll-0').sideNav({
    menuWidth: 300, // Default is 300
    edge: 'left', // Choose the horizontal origin
    closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
    draggable: true // Choose whether you can drag to open on touch screens
  });
  $('ul.tabs').tabs();
  $('.modal').modal({
    dismissible: false
  });
  fetchParticipants();
  fetchSportList();
});
var sportsArr;
function fetchSportList() {
  Materialize.toast('Fetching List!', 3000);
  csrf_token = getCookie('csrftoken');
  var ourRequest = new XMLHttpRequest();
  var url = "/controls/sportlist/";
  ourRequest.open("POST", url, true);
  ourRequest.setRequestHeader("Content-type", "application/json");
  ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
  ourRequest.onreadystatechange = function() {
    if (ourRequest.readyState === 4 && ourRequest.status === 200) {
      var jsonResponse = JSON.parse(ourRequest.responseText);
      sportsArr = jsonResponse.data;
      Materialize.toast('Updated!', 3000);
    } else if (ourRequest.readyState === 4 && ourRequest.status != 200) {
      Materialize.toast('There was some error connecting to the server!', 3000);
    }
  };
  ourRequest.send('');
}
function fetchParticipants() {
  document.getElementById('part-body').innerHTML='';
  Materialize.toast('Fetching List!', 3000);
  csrf_token = getCookie('csrftoken');
  var ourRequest = new XMLHttpRequest();
  var url = "/controls/con_pan_details/";
  ourRequest.open("POST", url, true);
  ourRequest.setRequestHeader("Content-type", "application/json");
  ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
  ourRequest.onreadystatechange = function() {
    if (ourRequest.readyState === 4 && ourRequest.status === 200) {
      var jsonResponse = JSON.parse(ourRequest.responseText);
      for (var i = 0; i < jsonResponse.length; i++) {
        document.getElementById('part-body').innerHTML+='<tr class="flex-container hover-effect" onclick="editDetails(this)"> <td class="center name-container">'+jsonResponse[i][1]+'</td><td class="center mobile-container">'+jsonResponse[i][2]+'</td><td class="center sports-container">'+jsonResponse[i][3]+'</td><td class="center edit-container"><i class="material-icons">edit</i></td><td class="center pk-container">'+jsonResponse[i][0]+'</td></tr>';
      }
      Materialize.toast('Updated!', 3000);
    } else if (ourRequest.readyState === 4 && ourRequest.status != 200) {
      Materialize.toast('There was some error connecting to the server!', 3000);
    }
  };
  ourRequest.send('');
}
var global_pk = 0;
function editDetails(option) {
  var pk = parseInt(option.getElementsByTagName('td')[4].innerHTML);
  var sendObj = {
    "data": {
      "pk": pk
    }
  }
  var stringObj = JSON.stringify(sendObj);
  Materialize.toast('Fetching Details!', 3000);
  csrf_token = getCookie('csrftoken');
  var ourRequest = new XMLHttpRequest();
  var url = "/controls/con_pan_spec_details/";
  ourRequest.open("POST", url, true);
  ourRequest.setRequestHeader("Content-type", "application/json");
  ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
  ourRequest.onreadystatechange = function() {
    if (ourRequest.readyState === 4 && ourRequest.status === 200) {
      var jsonResponse = JSON.parse(ourRequest.responseText);
      global_pk = jsonResponse.pk;
      editForm(jsonResponse.name, jsonResponse.college, jsonResponse.phone, jsonResponse.email, jsonResponse.blood_grp, jsonResponse.city, jsonResponse.notes, jsonResponse.sport);
    } else if (ourRequest.readyState === 4 && ourRequest.status != 200) {
      Materialize.toast('There was some error connecting to the server!', 3000);
    }
  };
  ourRequest.send(stringObj);
}
function editForm(name, clg, phn, email, bg, addr, notes, sport) {
  document.getElementById('edit-part-form').innerHTML='<div class="row"> <div class="input-field col s12"> <i class="material-icons prefix">create</i> <input type="text" name="part_name" id="part_name" class="validate" required="required" value="'+name+'"> <label for="part_name" data-error="Enter Name">Name</label> </div></div><div class="row"> <div class="input-field col s12"> <i class="material-icons prefix">local_phone</i> <input type="number" name="part_phone" id="part_phone" class="validate" required="required" maxlength="10" data-length="10" value="'+phn+'"> <label for="part_phone" data-error="Enter Phone">Phone</label> </div></div><div class="row"> <div class="input-field col s12"> <i class="material-icons prefix">mail_outline</i> <input type="email" name="part_email" id="part_email" class="validate" required="required" value="'+email+'"> <label for="part_email" data-error="Enter Email">Email</label> </div></div><div class="row"> <div class="input-field col s12"> <i class="material-icons prefix">local_hospital</i> <input type="text" name="part_bloodgp" id="part_bloodgp" class="validate" required="required" value="'+bg+'"> <label for="part_bloodgp" data-error="Enter Blood Group">Blood Group</label> </div></div><div class="row"> <div class="input-field col s12"> <i class="material-icons prefix">location_city</i> <input type="text" name="part_address" id="part_address" class="validate" required="required" value="'+addr+'"> <label for="part_address" data-error="Enter Postal Address">Postal Address</label> </div></div><div class="row"> <div class="input-field col s12"> <i class="material-icons prefix">school</i> <input type="text" name="part_college" id="part_college" class="validate" required="required" value="'+clg+'" disabled="disabled"> <label for="part_college" data-error="Enter College">College</label> </div></div><div class="row"> <div class="input-field col s12"> <i class="material-icons prefix">directions_run</i> <input id="part_sport" type="text" class="validate" required="required" name="part_sport" value="'+sport+'" disabled="disabled"> <label for="part_sport" data-error="Enter Sport">Sport</label> </div></div><div class="row"> <div class="input-field col s12"> <i class="material-icons prefix">directions_run</i> <select id="sport_select" multiple="multiple" required="required" name="sport_select"> <option value="" disabled="disabled" selected="selected"></option> </select> <label for="sport_select" data-error="Enter Sport">Sport</label> </div></div><div class="row"> <div class="input-field col s12"> <i class="material-icons prefix">note</i> <input type="text" name="part_notes" id="part_notes" class="validate" required="required" value="'+notes+'"> <label for="part_notes" data-error="Enter Notes">Notes</label> </div></div>';
  document.getElementById("sport_select").innerHTML = '<option value="" disabled="disabled" selected="selected"></option>';
  a=sportsArr;
  for (var o = 0; o < a.length; o++) document.getElementById("sport_select").innerHTML += '<option value="' + a[o][0] + '">' + a[o][1] + "</option>";
  $('select').material_select();
  Materialize.updateTextFields();
  $('#edit-part-modal').modal('open');
}
function sendEdit() {
  var formData = serializeArray(document.getElementById('edit-part-form'));
  var sport_id = [];
  var temp=6;
  //this loop selects all sports selected by the user and append their ids in sport_id
  for(let i = temp; i<formData.length - 1; i++,temp++)
  {
    if(formData[i].name == 'sport_select')
    {
      sport_id.push(parseInt(formData[temp].value));
    }
  }
  var notesss = formData[temp].value;
  var sendObj = {
    "data": {
      "pk": global_pk,
      "name": formData[0].value,
      "phone": parseInt(formData[1].value),
      "email": formData[2].value,
      "blood_grp": formData[3].value,
      "city": formData[4].value,
      "sport": formData[5].value,
      "sport_id": sport_id,
      "notes": notesss
    }
  }
  var stringObj = JSON.stringify(sendObj);
  $('#edit-part-modal').modal('close');
  Materialize.toast('Updating Details!', 4000);
  csrf_token = getCookie('csrftoken');
  var ourRequest = new XMLHttpRequest();
  var url = "/controls/con_pan_edit/";
  ourRequest.open("POST", url, true);
  ourRequest.setRequestHeader("Content-type", "application/json");
  ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
  ourRequest.onreadystatechange = function() {
    if (ourRequest.readyState === 4 && ourRequest.status === 200) {
      var jsonResponse = JSON.parse(ourRequest.responseText);
       //if the participant details are changed , fetch the new participant list
      fetchParticipants();
      Materialize.toast('Success!', 3000);
    } else if (ourRequest.readyState === 4 && ourRequest.status != 200) {
      Materialize.toast('There was some error connecting to the server!', 3000);
    }
  };
  ourRequest.send(stringObj);
}
function back() {
  $('#edit-part-modal').modal('close');
}

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
function search() {
  var name;
  var filter_name = document.getElementById("name-search").value.toUpperCase();
  var tbody = document.getElementById('part-body');
  for (var i = 0; i < tbody.getElementsByTagName('tr').length; i++) {
    name = tbody.getElementsByTagName('tr')[i].getElementsByTagName('td')[0];
    if ((name && name.innerHTML.toUpperCase().indexOf(filter_name) > -1)) {
      tbody.getElementsByTagName('tr')[i].style.display='';
    } else {
      tbody.getElementsByTagName('tr')[i].style.display='none';
    }
  }
}
