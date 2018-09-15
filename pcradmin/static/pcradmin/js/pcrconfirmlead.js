//pcrconfirmlead.js
function sel(elem){
	if(elem.innerHTML=="check_box_outline_blank")
		elem.innerHTML="check_box";
	else 
		elem.innerHTML="check_box_outline_blank";
}
var confirm_names;
var unconfirm_names;
var count;
function confirm(){
	i=0;
	count=0;
	confirm_names=[];
	next= document.getElementsByClassName("sel-conf")[i];
	if(next!= undefined){
		while(next!= undefined){
			console.log(next.innerHTML);
			if(next.innerHTML=="check_box"){
				count++;
				elem= next.parentElement.parentElement;
				console.log(elem.firstElementChild.innerHTML);
				confirm_names.push(elem.firstElementChild.innerHTML);
			}
			i++;
			next= document.getElementsByClassName("sel-conf")[i];
		}
		if(count>0){
			send_data("confirm");
			Materialize.toast('Confirming '+count+' unconfirmed groups', 4000, "toast-none_sel");
		}
		else 
			Materialize.toast('No Group Selected', 4000, "toast-none_sel");
	}
}
function unconfirm(){
	i=0;
	count=0;
	unconfirm_names=[];
	next= document.getElementsByClassName("sel-unconf")[i];
	if(next!= undefined){
		while(next!= undefined){
			console.log(next.innerHTML);
			if(next.innerHTML=="check_box"){
				count++;
				elem= next.parentElement.parentElement;
				console.log(elem.firstElementChild.innerHTML);
				unconfirm_names.push(elem.firstElementChild.innerHTML);
			}
			i++;
			next= document.getElementsByClassName("sel-unconf")[i];
		}
		if(count>0){
			send_data("unconfirm");
			Materialize.toast('Unconfirming '+count+' confirmed groups', 4000, "toast-none_sel");
		}
		else 
			Materialize.toast('No Group Selected', 4000, "toat-none_sel");
	}
}
function send_data(task){
	var csrf_token = getCookie('csrftoken');
	if(task=="confirm")
		names=confirm_names;
	else
		names=unconfirm_names;
	send_obj={
		"task": task,
		"count": count,
		"names": names,
		"csrfmiddlewaretoken": csrf_token
	};
	var ourRequest = new XMLHttpRequest();
    var url = "modify/" ;
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
    	Materialize.toast('Error Sending Request!', 4000, "toast-send_err");	
    }
    ourRequest.send(send_json);
}
function show(status){
	if(status==1){
		Materialize.toast('Successfully Changed!', 4000, "toast-send_success");
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