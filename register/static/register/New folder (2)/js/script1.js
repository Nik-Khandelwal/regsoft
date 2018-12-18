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
  fetchSportList();
}
function fetchSportList() {
  Materialize.toast('Fetching Sport List!', 4000);
  csrf_token = getCookie('csrftoken');
  var ourRequest = new XMLHttpRequest();
  var url = "sportlist/";
  ourRequest.open("POST", url, true);
  ourRequest.setRequestHeader("Content-type", "application/json");
  ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
  ourRequest.onreadystatechange = function() {
    if (ourRequest.readyState === 4 && ourRequest.status === 200) {
      var jsonData = JSON.parse(ourRequest.responseText);
      var sport = jsonData.data;
      document.getElementById('sport_select').innerHTML = '<option value="" disabled="disabled" selected="selected"></option>';
      for (var i = 0; i < sport.length; i++) {
        document.getElementById('sport_select').innerHTML += '<option value="'+sport[i][0]+'">'+sport[i][1]+'</option>';
      }
      $('select').material_select();
      Materialize.updateTextFields();
    } else if (ourRequest.readyState === 4 && ourRequest.status != 200) {
      Materialize.toast('There was some error connecting to the server!', 3000);
      // var sport = [[1, "Basketball"],[2, "Badminton Boys"],[3, "Cricket Girls"]];
    }
  };
  ourRequest.send('');
}
function getCookie(name) {
  var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return v ? v[2] : null;
}