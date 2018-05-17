function sel(elem){
	if(elem.innerHTML=="check_box_outline_blank")
		elem.innerHTML="check_box";
	else 
		elem.innerHTML="check_box_outline_blank";
}
var activate_names; // sending id
var deactivate_names; // sending id
var count;
function activate(){
	i=0;
	count=0;
	activate_names=[];
	next= document.getElementsByClassName("sel-act")[i];
	if(next!= undefined){
		while(next!= undefined){
			console.log(next.innerHTML);
			if(next.innerHTML=="check_box"){
				count++;
				elem= next.parentElement.parentElement;
				console.log(elem.firstElementChild.innerHTML);
				activate_names.push(elem.firstElementChild.innerHTML);
			}
			i++;
			next= document.getElementsByClassName("sel-act")[i];
		}
		if(count>0){
			send_data("activate");
			Materialize.toast('Activating '+count+' inactive groups', 4000, "toast-none_sel");
		}
		else 
			Materialize.toast('No Group Selected', 4000, "toat-none_sel");
	}
}
function deactivate(){
	i=0;
	count=0;
	deactivate_names=[];
	next= document.getElementsByClassName("sel-deact")[i];
	if(next!= undefined){
		while(next!= undefined){
			console.log(next.innerHTML);
			if(next.innerHTML=="check_box"){
				count++;
				elem= next.parentElement.parentElement;
				console.log(elem.firstElementChild.innerHTML);
				deactivate_names.push(elem.firstElementChild.innerHTML);
			}
			i++;
			next= document.getElementsByClassName("sel-deact")[i];
		}
		if(count>0){
			send_data("deactivate");
			Materialize.toast('Deactivating '+count+' active groups', 4000, "toast-none_sel");
		}
		else 
			Materialize.toast('No Group Selected', 4000, "toat-none_sel");
	}
}
function send_data(task){
	if(task=="activate")
		names=activate_names;
	else
		names=deactivate_names;
	var csrf_token = getCookie('csrftoken');
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