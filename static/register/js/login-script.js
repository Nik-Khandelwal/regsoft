$(document).ready(function(){
  $('.modal').modal();
  $('.button-collapse').sideNav({
      menuWidth: 300,
      closeOnClick: true
    }
  );
});
function closelogin(){
  document.getElementById('login').style.width="0";
}
function closesignup(){
  document.getElementById('signup').style.width="0";
}
function login(){
  document.getElementById('login').style.width="100%";
}
function signup(){
  document.getElementById('signup').style.width="100%";
  resetRegisterForm();
  fetchSportList();
}
function fetchSportList() {
  Materialize.toast('Fetching Sport List!', 4000);
  csrf_token = getCookie('csrftoken');
  var ourRequest = new XMLHttpRequest();
  var url = "/register/sportlist/";
  ourRequest.open("POST", url, true);
  ourRequest.setRequestHeader("Content-type", "application/json");
  ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
  ourRequest.onreadystatechange = function() {
    if (ourRequest.readyState === 4 && ourRequest.status === 200) {
      Materialize.toast('Updated Form!', 3000);
      var jsonData = JSON.parse(ourRequest.responseText);
      var sport = jsonData.data;
      var college = jsonData.college;
      document.getElementById('sport_select').innerHTML = '<option value="" disabled="disabled" selected="selected"></option>';
      for (var i = 0; i < sport.length; i++) {
        document.getElementById('sport_select').innerHTML += '<option value="'+sport[i][0]+'">'+sport[i][1]+'</option>';
      }
      document.getElementById('college_field').innerHTML = '<option value="" disabled="disabled" selected="selected"></option>';
      for (var i = 0; i < college.length; i++) {
        document.getElementById('college_field').innerHTML += '<option value="'+college[i][3]+'">'+college[i][0]+', '+college[i][1]+', '+college[i][2]+'</option>';
      }
      $('select').material_select();
      Materialize.updateTextFields();
    } else if (ourRequest.readyState === 4 && ourRequest.status === 403) {
      Materialize.toast('Authentication Error, Please Refresh the Page!', 3000);
    } else if (ourRequest.readyState === 4 && ourRequest.status != 200) {
      Materialize.toast('There was some error connecting to the server!', 3000);
      // var sport = [[1, "Basketball"],[2, "Badminton Boys"],[3, "Cricket Girls"]];
      // var college = [["BITS Pilani", "Hyderabad", "Hyderabad", 34], ["BITS Pilani", "Goa", "Goa", 23], ["IIT Delhi", "Delhi", "Delhi", 132],];
    }
  };
  ourRequest.send('');
}
function getCookie(name) {
  var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return v ? v[2] : null;
}
function resetRegisterForm() {
  document.getElementById('register-form').innerHTML = '<div class="row"> <div class="input-field col s12"> <i class="material-icons prefix">person</i> <input type="text" name="Name" id="name_field" class="validate" required="required" maxlength="100"> <label for="name_field" data-error="Enter your Name">Name</label> </div></div><div class="row"> <div class="input-field col s12"> <i class="material-icons prefix">email</i> <input type="email" name="Email" id="email_field" class="validate" required="required" maxlength="100"> <label for="email_field" data-error="Enter a Valid Email">E-Mail</label> </div></div><div class="row"> <div class="input-field col m6 s12"> <i class="material-icons prefix">create</i> <input type="text" name="Username" id="username_field" class="validate" required="required" maxlength="50"> <label for="username_field" data-error="Enter your Username">Username</label> </div><div class="input-field col m6 s12"> <i class="material-icons prefix">lock_outline</i> <input type="password" name="Password" id="password_field" class="validate" required="required" maxlength="50"> <label for="password_field" data-error="Enter a Valid Password">Password</label> </div></div><div class="row"> <div class="input-field col s12"> <i class="material-icons prefix">people</i> <select id="participant_coach_select" name="register_as"> <option value="" disabled="disabled" selected="selected"></option> <option value="L">Captain</option> <option value="P">Participant</option> <option value="C">Coach</option> </select> <label for="participant_coach_select" data-error="Register As Captain/Participant/Coach">Register As</label> </div></div><div class="row"> <div class="input-field col s12"> <i class="material-icons prefix">local_phone</i> <input type="text" name="Phone" id="phone_field" class="validate" required="required" maxlength="10" data-length="10"> <label for="phone_field" data-error="Enter your Phone Number">Phone Number</label> </div></div><div class="row"> <div class="input-field col s12"> <i class="material-icons prefix">business</i> <select id="college_field" name="College"> <option value="" disabled="disabled" selected="selected"></option> </select> <label for="college_field" data-error="Enter your College Name">College</label><span class="helper-text">If you can\'t find your college, Contact : <span>1234567890</span></span> </div></div><div class="row"> <div class="input-field col s12"> <i class="material-icons prefix">directions_run</i> <select id="sport_select" multiple="multiple" required="required" name="sport_select"> <option value="" disabled="disabled" selected="selected"></option> </select> <label for="sport_select" data-error="Enter Sport">Sport</label> </div></div><div class="row"> <div class="col s4 center"> Gender </div><div class="col s4 center"> <input type="radio" name="gender" id="indi_male" value="male" required="required"> <label for="indi_male">Male</label> </div><div class="col s4 center"> <input type="radio" name="gender" id="indi_female" value="female" required="required"> <label for="indi_female">Female</label> </div></div><div class="row center"> <div class="col s12 center"> <div id="captcha_container"></div></div></div><div class="row center"> <button class="btn green waves-effect waves-light" id="submit-form-btn" type="submit" name="action" onclick="submitRegisterForm()">Submit <i class="material-icons right large">send</i> </button> </div>';
  $("input#phone_field").characterCounter();
  reloadCaptcha();
}
function submitRegisterForm() {
  var formData = serializeArray(document.getElementById('register-form'));
  var name = formData[0].value;
  var email = formData[1].value;
  var username = formData[2].value;
  var password = formData[3].value;
  var register_as = formData[4].value;
  var phone = formData[5].value;
  var college = parseInt(formData[6].value);
  var sport_id = [];
  var i = 7;
  while(formData[i].name == 'sport_select') {
    if (i!=7) {
      var id = parseInt(formData[i].value);
      sport_id.push(id);
    }
    i++;
    if (formData[i] == undefined) {
      break;
    }
  }
  if (formData[i] == undefined || formData[i+1] == undefined) {
    Materialize.toast('Please Select Gender!', 4000);
  } else {
    var gender = formData[i].value;
    if (register_as == "") {
      Materialize.toast('You Must Register as either Captain/Participant/Coach!', 4000);
    } else if (sport_id.length == 0) {
      Materialize.toast('You Must Register in atleast one Sport!', 4000);
    } else if (!validatePhoneNumber(phone)) {
      Materialize.toast('Incorrect Phone Number', 3000);
    } else if (!validateEmail(email)) {
      Materialize.toast('Incorrect Email', 3000);
    } else if (college == "") {
      Materialize.toast('Please Select your College!', 3000);
    } else if (name==""||username==""||password=="") {
      Materialize.toast('Please Fill all Fields!', 3000);
    } else if (grecaptcha.getResponse()=="") {
      Materialize.toast('Please Verify Captcha!', 3000);
    } else {
      var data = {
        "name": name,
        "email": email,
        "username": username,
        "password": password,
        "register_as": register_as,
        "phone": parseInt(phone),
        "college": college,
        "sport_id": sport_id,
        "gender": gender,
        "captcha": grecaptcha.getResponse()
      }
      sendRegisterData(data);
    }
  }
}
function sendRegisterData(data) {
  closesignup();
  document.getElementById('loader').style.display = 'block';
  Materialize.toast('Submitting Please Wait!', 4000);
  csrf_token = getCookie('csrftoken');
  var send_data = JSON.stringify(data);
  var ourRequest = new XMLHttpRequest();
  var url = "register/";
  ourRequest.open("POST", url, true);
  ourRequest.setRequestHeader("Content-type", "application/json");
  ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
  ourRequest.onreadystatechange = function() {
    if (ourRequest.readyState === 4 && ourRequest.status === 200) {
      var jsonData = JSON.parse(ourRequest.responseText);
      if (jsonData.error != null) {
        if (jsonData.error == 'activation mail has been sent. please activate your account and wait for further correspondence') {
          Materialize.toast('You are Registered!', 4000);
          $('#sent-email-modal').modal('open');
        } else {
          triggerError(jsonData.error);
        }
      } else {
        var success = jsonData.success;
        if (success == 1) {
          Materialize.toast('You are Registered!', 4000);
          $('#sent-email-modal').modal('open');
        }
      }
      document.getElementById('loader').style.display = 'none';
    } else if (ourRequest.readyState === 4 && ourRequest.status != 200) {
      Materialize.toast('There was some error connecting to the server!', 3000);
      document.getElementById('loader').style.display = 'none';
    }
  };
  ourRequest.send(send_data);
}
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
function reloadCaptcha() {
  var captchaContainer = null;
  captchaContainer = grecaptcha.render('captcha_container', {
    'sitekey' : '6LcNq10UAAAAAEI1OCTzADo2HtFQcgHoCY_b8OcD',
    'callback' : function(response) {
      // console.log(response);
    }
  });
}