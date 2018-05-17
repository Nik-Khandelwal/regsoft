//pcreditlead.js
var count;
var code, name, event, team_captain;
function open_modal(elem){
	count=0;
	i=0;
	var next= document.getElementsByClassName("participant")[i];
	while(next!=undefined){
		i++;
		if(next.children[4].children[0].innerHTML=="check_box"){
			count++;
			code= next.children[0].innerHTML;
			name= next.children[1].innerHTML;
			event= next.children[2].innerHTML;
			team_captain= next.children[3].innerHTML;
			populate();
		}
		next= document.getElementsByClassName("participant")[i];
	}
	document.getElementsByClassName("modal")[0].style.display="block";
	Materialize.toast( count+ " participants selected", 4000, "toast-send_err");
}
function back(){
	document.getElementById("to-edit").innerHTML="";
	document.getElementsByClassName("change_btn")[0].classList.remove("disabled");
	document.getElementsByClassName("modal")[0].style.display="none";
}
function sel(elem){
	if(elem.innerHTML=="check_box_outline_blank")
		elem.innerHTML="check_box";
	else 
		elem.innerHTML="check_box_outline_blank";
}
function populate(){
	document.getElementById("to-edit").innerHTML+='<tr class="change"><td style="display: none;">'+code+'</td><td style="flex-basis: 25%;">'+name+'</td><td style="flex-basis: 35%;"><form onSubmit="return false;"><div class="input-field"><input id="new_name" type="text" class="change_name validate"><label for="new_name" class="pink-text text-lighten-2">Edit Participant Name</label></div></form></td><td style="flex-basis: 20%;">'+event+'</td><td style="flex-basis: 20%;">'+team_captain+'</td></tr>';
}
var send_obj;
var change_arr=[];
function change(elem){
	elem.classList.add("disabled");
	valid=1;
	k=0;
	after= document.getElementsByClassName("change")[k];
	while(after!= undefined){
		change_arr.push(after.children[0].innerHTML);
		change_arr.push(after.children[2].children[0].children[0].children[0].value);
		if(!document.getElementsByClassName("change_name")[k].classList.contains("valid")){
			entry=k+1;
			Materialize.toast("Participant "+entry+", '"+after.children[1].innerHTML+"', has invalid new name", 4000, "toast-send_err");
			change_arr=[];
			valid=0;
			break;
		}
		k++;
		after= document.getElementsByClassName("change")[k];
	}
	if(valid==1){
		send_obj={"data": change_arr};
		Materialize.toast('Changing names of '+k+' participants', 4000, "toast-send_err");
		send_data();
	}
	else{
		elem.classList.remove("disabled");
	}
}
function send_data(){
	Materialize.toast('Sending to Backend', 4000, "toast-send_err");
	var csrf_token = getCookie('csrftoken');
	var ourRequest = new XMLHttpRequest();
    var url = "modify/" ;
    ourRequest.open("POST", url, true);
    ourRequest.setRequestHeader("Content-type", "application/json");
    ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
    // POST 
    send_obj["csrfmiddlewaretoken"]=csrf_token;
    var send_json = JSON.stringify(send_obj);
    change_arr=[];
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
    	document.getElementsByClassName("change_btn")[0].classList.remove("disabled");	
    }
    console.log(send_obj);
    ourRequest.send(send_json);
}
function show(status){
	if(status==1){
		Materialize.toast('Successfully Changed!', 4000, "toast-send_success");
		document.getElementsByClassName("change_btn")[0].classList.remove("disabled");
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