function modal_open(elem){
	document.getElementById("game-name").innerHTML=elem.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML;
	document.getElementById("min_limit").value=elem.previousElementSibling.previousElementSibling.innerHTML;
	document.getElementById("max_limit").value=elem.previousElementSibling.innerHTML;
	document.getElementsByClassName("modal")[0].style.display="block";
}
function back(){
	document.getElementsByClassName("modal")[0].style.display="none";
	document.getElementById("game-name").innerHTML="";
	document.getElementById("min_limit").value="";
	document.getElementById("max_limit").value="";
}
var sports,min,max;
function change(){
	sports=document.getElementById("game-name").innerHTML;
	min=document.getElementById("min_limit").value;
	max=document.getElementById("max_limit").value;
	send_data();
}
function send_data(){
	Materialize.toast('Sending Data To Backend!', 4000, "toast-none_add");
	var csrf_token = getCookie('csrftoken');
	send_obj={
		"sports": sports,
		"min": min,
		"max": max,
		"csrfmiddlewaretoken": csrf_token
	};
	var ourRequest = new XMLHttpRequest();
    var url = "change/";
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
		Materialize.toast('Refreshing Page', 4000, "toast-fetch_no_connect");
		setTimeout(function(){window.location.reload();},2000) 
	}
	else if(status==0){
		Materialize.toast('Could Not Be Sent!', 4000, "toast-send_fail");
	}
}

function getCookie(name) {
	var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
	return v ? v[2] : null;
}