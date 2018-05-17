function modal_open(elem){
	document.getElementById("final-to-name").innerHTML=elem.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML;
	document.getElementById("final-to-id").innerHTML=elem.previousElementSibling.innerHTML;
	document.getElementsByClassName("modal")[0].style.display="block";
    document.getElementsByClassName("modal")[1].style.display="none";
	Materialize.updateTextFields();
}
function back(){
	document.getElementsByClassName("modal")[0].style.display="none";
	document.getElementById("final-to-name").innerHTML="";
	document.getElementById("final-to-id").innerHTML="";
}
var mail_to;
function mail(){
	mail_to=document.getElementById("final-to-id").innerHTML;
	send_data();
}
function send_data(){
	Materialize.toast('Sending Data To Backend!', 4000, "toast-none_add");
	var csrf_token = getCookie('csrftoken');
	send_obj={
		"mail_to": mail_to,
		"csrfmiddlewaretoken": csrf_token
	};
	var ourRequest = new XMLHttpRequest();
    var url = "modify/";
    ourRequest.open("POST", url, true);
    ourRequest.setRequestHeader("Content-type", "application/json");
    ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
    // POST 
    var send_json = JSON.stringify(send_obj);
    // Obtain 
    ourRequest.onreadystatechange = function() {
      if (ourRequest.readyState === 4 && ourRequest.status === 200) {
        var recieve_json = JSON.parse(ourRequest.responseText);
        var status = recieve_json.success;
        show(status);
        //json object received
      }
      else
      	console.log("State Change But Not Sent")
    }
    ourRequest.onerror = function(){
    	Materialize.toast('Error Sending!', 4000, "toast-send_err");	
    }
    ourRequest.send(send_json);
}
function show(status){
	if(status==1){
		Materialize.toast('Successfully Sent!', 4000, "toast-send_success");
		back();
	}
	else if(status==0){
		Materialize.toast('Could Not Be Sent!', 4000, "toast-send_fail");
	}
}
function getCookie(name) {
	var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
	return v ? v[2] : null;
}
function openCaptains(elem) {
	document.getElementsByClassName("modal")[1].style.display="block";
	var id = parseInt(elem.children[4].innerHTML);
	console.log(elem.children[4].innerHTML);
	console.log(id);
	fetchCaptainsList(id);
}
function back_cap() {
	document.getElementsByClassName("modal")[1].style.display="none";
}
function fetchCaptainsList(id) {
	Materialize.toast('Fetching List!', 4000, "toast-none_add");
	document.getElementById('captains_list_body').innerHTML='';
	var csrf_token = getCookie('csrftoken');
	send_obj={
		"id": id
	};
	var ourRequest = new XMLHttpRequest();
	var url = 'sendcaptain/';
    ourRequest.open("POST", url, true);
    ourRequest.setRequestHeader("Content-type", "application/json");
    ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
    // POST 
    var send_json = JSON.stringify(send_obj);
    // Obtain 
    ourRequest.onreadystatechange = function() {
      if (ourRequest.readyState === 4 && ourRequest.status === 200) {
      	//json object received
        var recieve_json = JSON.parse(ourRequest.responseText);
        for (var i = 0; i < recieve_json.data.length; i++) {
        	document.getElementById('captains_list_body').innerHTML+='<tr> <td style="flex-basis: 25%;">'+recieve_json.data[i][0]+'</td><td style="flex-basis: 25%;">'+recieve_json.data[i][1]+'</td><td style="flex-basis: 30%;">'+recieve_json.data[i][2]+'</td><td style="flex-basis: 20%;" onclick="modal_open(this);"><i class="material-icons">email</i></td></tr>';
        }
      } else if (ourRequest.readyState === 4 && ourRequest.status != 200) {
        Materialize.toast("Server Error!", 4000);
      }
    }
    ourRequest.onerror = function(){
    	Materialize.toast('Error Sending!', 4000, "toast-send_err");	
    }
    ourRequest.send(send_json);
}