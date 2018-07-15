var a=["check_box","check_box_outline_blank"];
function elem_selected(elem){
	elem.firstChild.innerHTML="check_box";
}
function elem_deselected(elem){
	elem.firstChild.innerHTML="check_box_outline_blank";
}
function over_header(elem){
	i=0; //select all
	// console.log("clicked");
	if(elem.innerHTML=="check_box")
		i=1; //attempt: deselect all
	sel_this_all(elem,i,1); //1 :toggle class || avoid expandable click expand feature
}
function sel_this_all(elem,i,resist){
	count=0;
	elem.innerHTML=a[i];
	parent=elem.parentElement;
	if(resist==1){
		$(parent).toggleClass("active");
	}
	// console.log(parent);
	next=parent.nextElementSibling;
	// console.log(next);
	while(next){
		next.firstElementChild.innerHTML=a[i];
		next=next.nextElementSibling;
		// console.log(next);
		count++;
	}
	// console.log(count);
}

function click_indiv(elem){
	i=0;
	if(elem.innerHTML=="check_box"){
		i=1;
		elem.parentElement.parentElement.firstElementChild.firstElementChild.innerHTML=a[1];
	}
	elem.innerHTML=a[i];
}

function loaded(){
$(".group").each(function(index) {
  // console.log( index + ": " + $( this ).text() );
});
$('.modal').modal();
$("#tools-info_outline-tapped").tapTarget('open');
retrieve_left();
$('.coll-1').sideNav({
      menuWidth: 200, // Default is 300
      edge: 'right', // Choose the horizontal origin
      closeOnClick: false, // Closes side-nav on <a> clicks, useful for Angular/Meteor
      draggable: true // Choose whether you can drag to open on touch screens
    }
  );
    $('.coll-0').sideNav({
      menuWidth: 300, // Default is 300
      edge: 'left', // Choose the horizontal origin
      closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
      draggable: true // Choose whether you can drag to open on touch screens
    }
  );
// timedCheck();
/*
$(window).resize(function() {
  // This will execute whenever the window is resized
  if($(window).width()<700){
	$(".sel-text").innerHTML="";
	$(".sel-text").innerHTML="";
	}	
  else{
	$(".sel-text").innerHTML="Select All";
	$(".sel-text").innerHTML="Deselect All";
  }
});
*/
}
var indiv;
function add_this_group(parent,resist){
	i=0;
	if(resist==1){
		$(parent).toggleClass("active");
	}
	next=parent.nextElementSibling;
	while(next){
		remove=0; // don't remove from left
		if(next.firstElementChild.innerHTML=="check_box"){
			remove=1; // remove from left
			i++;
			indiv_name=next.getElementsByClassName("name")[0].innerHTML;
			// console.log(indiv_name);
			l_to_r(next); // take participant from left to right || left display none || right add node
		}
		prev=next;
		next=next.nextElementSibling;
		if(remove==1)
			removeElement(prev);
	}
	// console.log("i="+i);
	if(i==0&&resist==1) // none selected in group and called for one group only
		Materialize.toast('No participant selected in group!', 4000, "toast-none_sel");
	else if(i>0&&resist==1) //some selected in group and called for one group only
		Materialize.toast(i+' participants added', 4000, "toast-some_sel");
}

function sel_all_all(sel){
	i=0;
	next_header= document.getElementsByClassName("group")[i];
	while(next_header){
		sel_this_all(next_header.firstElementChild,sel,0); //i=0: select all, resist=0: expandable click not involved
		i++;
		next_header= document.getElementsByClassName("group")[i];
	}
}

function add_all_sel(){
	part_no=0;
	add=0;
	next_header= document.getElementsByClassName("group")[add];
	while(next_header){
		add_this_group(next_header,0); //resist=0: expandable click not involved
		add++;
		part_no+=i;
		next_header= document.getElementsByClassName("group")[add];
		// console.log(part_no);
	}
	if(part_no==0)
		Materialize.toast('No participant selected in all groups!', 4000, "toast-none_sel");
	else
		Materialize.toast(part_no+' participants added from all groups!', 4000, "toast-none_sel");
}

function l_to_r(elem){
	indiv_name=indiv_name=next.getElementsByClassName("name")[0].innerHTML;
	indiv_college=next.getElementsByClassName("coll-name")[0].innerHTML;
	indiv_amt=next.getElementsByClassName("amt")[0].innerHTML;
	indiv_group=next.getElementsByClassName("group-id")[0].innerHTML;
	indiv_id=next.getElementsByClassName("indiv-id")[0].innerHTML;
	// console.log(indiv_name+indiv_amt+indiv_college);
	var tot_amt = parseInt(document.getElementById('tot_amount_text').innerHTML);
	document.getElementById('tot_amount_text').innerHTML = (tot_amt + parseInt(indiv_amt));
// add to right
	var tmp = document.getElementById("right-indiv-temp"); //template
	var rightbody = document.getElementById("right-body"); 
	////appends as last child
	//document.getElementById("right-body").appendChild(tmp.content.cloneNode(true)); 
	//appends as first child    
	rightbody.insertBefore(tmp.content.cloneNode(true),rightbody.firstElementChild);
	var up =rightbody.firstElementChild; //element to be updated
	up.getElementsByClassName("right-indiv-name")[0].innerHTML=indiv_name;
	up.getElementsByClassName("right-indiv-college")[0].innerHTML=indiv_college;
	up.getElementsByClassName("right-indiv-amt")[0].innerHTML=indiv_amt;
	up.getElementsByClassName("right-indiv-group")[0].innerHTML=indiv_group;
	up.getElementsByClassName("right-indiv-id")[0].innerHTML=indiv_id;
// set to unchecked at left for group header
	elem.parentElement.firstElementChild.firstElementChild.innerHTML="check_box_outline_blank";
// remove from left || display none	
	//elem.parentNode.removeChild(elem); 
//// cannot remove here, will not be able to reach to next element
	document.getElementById('no_of_part_text').innerHTML = parseInt(document.getElementById('no_of_part_text').innerHTML)+1;
}

function removeElement(elem){
	elem.parentNode.removeChild(elem);
}

function undo_this(elem){
	r_to_l(elem);
}

function r_to_l(elem){
	indiv_name=elem.getElementsByClassName("right-indiv-name")[0].innerHTML;
	indiv_college=elem.getElementsByClassName("right-indiv-college")[0].innerHTML;
	indiv_group=elem.getElementsByClassName("right-indiv-group")[0].innerHTML;
	indiv_amt=elem.getElementsByClassName("right-indiv-amt")[0].innerHTML;
	indiv_id=elem.getElementsByClassName("right-indiv-id")[0].innerHTML;
	// console.log(indiv_name+indiv_college+indiv_group+indiv_amt);
	// Search group for element in left table/expandable
	find=0;
	next_element=document.getElementsByClassName("group")[find];
	while(next_element){
		if(next_element.getElementsByClassName("group-id-group")[0].innerHTML==indiv_group){
			add_to_left(next_element.parentElement);
			break;
		}
		find++;
		next_element=document.getElementsByClassName("group")[find];
	}
	removeElement(elem);
	document.getElementById('no_of_part_text').innerHTML = parseInt(document.getElementById('no_of_part_text').innerHTML)-1;
	var tot_amt = parseInt(document.getElementById('tot_amount_text').innerHTML);
	document.getElementById('tot_amount_text').innerHTML = (tot_amt - indiv_amt);
}

function add_to_left(l_index){
// values to update???
	var tmp_left= document.getElementById("left-indiv-temp"); //template
	//var l_index= elem.parentElement; 
// append as first (second) child of grouplist
	l_index.insertBefore(tmp_left.content.cloneNode(true),l_index.firstElementChild.nextElementSibling);
	//l_index.appendChild(tmp_left.content.cloneNode(true)); 
	var update =l_index.firstElementChild.nextElementSibling; //element to be updated
	update.getElementsByClassName("name")[0].innerHTML=indiv_name;
	update.getElementsByClassName("coll-name")[0].innerHTML=indiv_college;
	update.getElementsByClassName("group-id")[0].innerHTML=indiv_group;
	update.getElementsByClassName("amt")[0].innerHTML=indiv_amt;
	update.getElementsByClassName("indiv-id")[0].innerHTML=indiv_id;
}
var net_amt; 
var id_arr;
var send_obj;
function gen_bill(){
	var csrf_token = getCookie('csrftoken');
	// calculate net_amt (initially zero)
	// add id's of selected participants to json
	net_amt=0;
	id_arr=[];
	send_obj={
		"data": {
			"net_amt": net_amt,
			"paid_amt": 0,
			"deno_2000": 0,
			"deno_500": 0,
			"deno_200": 0,
			"deno_100": 0,
			"deno_50": 0,
			"id_arr": id_arr
		},
		"csrftoken": {
			"csrfmiddlewaretoken": csrf_token
		}
	}; 
	i=0;
	elem_pay=document.getElementById("right-body").getElementsByClassName("right-indiv")[0];
	// console.log(elem_pay);
	if(elem_pay==undefined)
		Materialize.toast('No participant added!', 4000, "toast-none_add");
	else{
		while(elem_pay){
			// console.log(i);
			// console.log(elem_pay);
			net_amt+=parseFloat(elem_pay.getElementsByClassName("right-indiv-amt")[0].innerHTML);
			// console.log(id_arr);
			id_arr.push(elem_pay.getElementsByClassName("right-indiv-id")[0].innerHTML);
			i++;
			elem_pay=document.getElementsByClassName("right-indiv")[i];
		}
		send_obj={
			"data": {
				"net_amt": net_amt,
				"paid_amt": 0,
				"deno_2000": 0,
				"deno_500": 0,
				"deno_200": 0,
				"deno_100": 0,
				"deno_50": 0,
				"id_arr": id_arr
			},
			"csrftoken": {
				"csrfmiddlewaretoken": csrf_token
			}
		};
		document.getElementById("unbill_amt").innerHTML= net_amt;
		document.getElementById("modalpay").style.display="block";
		document.getElementById('bill_form').style.display='block';
		document.getElementById('dd_bill_form').style.display='block';
		document.getElementById('return_bill_form').style.display='none';
		document.getElementById('bill_head').style.display='block';
		document.getElementById('unbilled_text').style.display='block';
		document.getElementById('bill_form').innerHTML = '<div class="row"> <div class="col s6 center deno_field">2000\'s</div><div class="col s6 center input-field"> <input type="text" name="2000s" id="deno_2000" value="0" required="required"> <label for="deno_2000" class="lab"></label> </div><div class="col s6 center deno_field">500\'s</div><div class="col s6 center input-field"> <input type="text" name="500s" id="deno_500" value="0" required="required"> <label for="deno_500" class="lab"></label> </div><div class="col s6 center deno_field">200\'s</div><div class="col s6 center input-field"> <input type="text" name="200s" id="deno_200" value="0" required="required"> <label for="deno_200" class="lab"></label> </div><div class="col s6 center deno_field">100\'s</div><div class="col s6 center input-field"> <input type="text" name="100s" id="deno_100" value="0" required="required"> <label for="deno_100" class="lab"></label> </div><div class="col s6 center deno_field">50\'s</div><div class="col s6 center input-field"> <input type="text" name="50s" id="deno_50" value="0" required="required"> <label for="deno_50" class="lab"></label> </div></div>';
		document.getElementById('dd_bill_form').innerHTML = '<div class="row"> <div class="col s6 center deno_field">Amount Paid</div><div class="col s6 center input-field"> <input type="text" name="Amount" id="amount_paid" value="0" required="required"> <label for="amount_paid" class="lab"></label> </div><div class="col s6 center deno_field">DD Number</div><div class="col s6 center input-field"> <input type="text" name="ddnum" id="dd_num" required="required"> <label for="ded_num" class="lab"></label> </div></div>';
		createGroup();
	}
}

function back(){
	document.getElementById("modalpay").style.display="none";
}
var paid_amt = 0;
function confirm_bill(){
	if(document.getElementsByClassName('payment_mode')[0].getAttribute('class')=='active payment_mode' || document.getElementsByClassName('payment_mode')[0].getAttribute('class')=='payment_mode active') {
		paid_amt = 0;
		var formData = serializeArray(document.getElementById('bill_form'));
		var deno_2000 = formData[0].value;
		var deno_500 = formData[1].value;
		var deno_200 = formData[2].value;
		var deno_100 = formData[3].value;
		var deno_50 = formData[4].value;
		paid_amt = (deno_2000*2000) + (deno_500*500) + (deno_200*200) + (deno_100*100) + (deno_50*50);
		// console.log(paid_amt);
		if(paid_amt>=net_amt){
			//disable buttons
				if(!document.getElementById("btn-conf_bill").classList.contains("disabled"))
					document.getElementById("btn-conf_bill").classList.add("disabled");
				if(!document.getElementById("btn-conf_back").classList.contains("disabled"))
					document.getElementById("btn-conf_back").classList.add("disabled");
			Materialize.toast('Billing!', 4000, "toast-input_valid");
			//POST TO BACKEND DETAILS
			send_obj={
				"data": {
					"net_amt": net_amt,
					"paid_amt": paid_amt,
					"deno_2000": deno_2000,
					"deno_500": deno_500,
					"deno_200": deno_200,
					"deno_100": deno_100,
					"deno_50": deno_50,
					"id_arr": id_arr
				}
			};
			post_backend();
		}
		else
			Materialize.toast('Paid Amount should be greater than Net Amount!', 4000, "toast-input_invalid");
	} else {
		paid_amt = 0;
		var formData = serializeArray(document.getElementById('dd_bill_form'));
		paid_amt = parseInt(formData[0].value);
		if (paid_amt>=net_amt) {
			var ddNum = formData[1].value;
			if (ddNum != '') {
				Materialize.toast('Sending data to server!', 4000, "toast-post");
				//Post to backend
				var csrf_token = getCookie('csrftoken');
				var myObj = {
					"data": {
						"paid_amt": paid_amt,
						"dd_num": ddNum,
						"id_arr":id_arr
					},
					"csrftoken": {
						"csrfmiddlewaretoken": csrf_token
					}
				}
				// console.log(myObj);
				var ourRequest = new XMLHttpRequest();
				var url = "/controls/piyali/";
				ourRequest.open("POST", url, true);
				ourRequest.setRequestHeader("Content-type", "application/json");
				ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
				// POST 
				var jsonObj = JSON.stringify(myObj);
				// alert(data);
				// Obtain 
				ourRequest.onreadystatechange = function() {
				  // alert('Hello');
				  if (ourRequest.readyState === 4 && ourRequest.status === 200) {
					// alert('Hi');
					var recieve_json = JSON.parse(ourRequest.responseText);
					var status = recieve_json.success;
					// console.log(status);
					showRequestStatus(status)

					 // either 1 or 0
					//json object received
				  }
				  else if (ourRequest.readyState === 4 && ourRequest.status != 200) {
					showRequestStatus(2);
				  }
				}
				ourRequest.send(jsonObj);
			} else {
				Materialize.toast('Please Fill all the Fields!', 4000, "toast-input_invalid");
			}
			
		} else {
			Materialize.toast('Paid Amount should be greater than Net Amount!', 4000, "toast-input_invalid");
		}
	}
}
// var bills_pk = 1;
function post_backend(){
	Materialize.toast('Sending data to server!', 4000, "toast-post");
	//Post to backend
	var csrf_token = getCookie('csrftoken');
	var ourRequest = new XMLHttpRequest();
	var url = "/controls/generate_bill/";
	ourRequest.open("POST", url, true);
	ourRequest.setRequestHeader("Content-type", "application/json");
	ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
	// POST 
	var send_json = JSON.stringify(send_obj);
	// alert(data);
	// Obtain 
	ourRequest.onreadystatechange = function() {
	  // alert('Hello');
	  if (ourRequest.readyState === 4 && ourRequest.status === 200) {
		// alert('Hi');
		var recieve_json = JSON.parse(ourRequest.responseText);
		var status = recieve_json.success;
		var bills_pk = parseInt(recieve_json.bills_pk);
		document.getElementById('print-bill-btn').setAttribute('href', '/controls/bill_pdf/'+bills_pk+'');
		// console.log(status);
		showRequestStatus(status)

		 // either 1 or 0
		//json object received
	  }
	  else if (ourRequest.readyState === 4 && ourRequest.status != 200) {
		showRequestStatus(2);
	  }
	}
	ourRequest.send(send_json);
	//return 1 if successfull
	// return 0; //return 0 if unsuccesfull i.e. backend sent failure [could connect || but not match net unbilled_amt]
	// return 2, //return anything else [connection error || could not fetch data]
}	

function open_tool(){
	document.getElementById("tools-info_outline").classList.remove("pulse");
}

function retrieve_left(){
	Materialize.toast('Fertching new participants list!', 4000, "toast-fetch");
	//GET Left List
	var csrf_token = getCookie('csrftoken');
	var ourRequest = new XMLHttpRequest();
	ourRequest.open("POST", "/controls/details/");	// method and url
	ourRequest.setRequestHeader("Content-type", "application/json");
	ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
	ourRequest.onload = function() {
	if (ourRequest.status >= 200 && ourRequest.status < 400) {		// request sent and recieved
		ourData = JSON.parse(ourRequest.responseText);
		Materialize.toast('Obtained list, preparing for you!', 4000, "toast-fetch_fetched");
		document.getElementsByClassName("left-one")[0].innerHTML='';
		poppulate_left(ourData);
	}
	else 		
		Materialize.toast('Server Error!', 4000, "toast-fetch_error");	
	}																// server sent an error after connection
	ourRequest.onerror = function() {								// error connecting to URL
	Materialize.toast('Could not connect to server!', 4000, "toast-fetch_no_connect");
	}
	ourRequest.send();												// sending request
}

// function updateLeft() {
//   var csrf_token = getCookie('csrftoken');
//   var ourRequest = new XMLHttpRequest();
//   ourRequest.open("POST", "/controls/check_updates/", true);  // method and url
//   ourRequest.setRequestHeader("Content-type", "application/json");
//   ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
//   ourRequest.onload = function() {
//   if (ourRequest.status >= 200 && ourRequest.status < 400) {    // request sent and recieved
//     // Success Yaaaayyyy
//     ourData = JSON.parse(ourRequest.responseText);
//     if (ourData.update == 0) {
//       // Do nothing
//     } else {
//       poppulate_left(ourData);
//     }
//   }
//   else    
//     Materialize.toast('Server Error!', 4000, "toast-fetch_error");  
//   }                               // server sent an error after connection
//   ourRequest.onerror = function() {               // error connecting to URL
//     Materialize.toast('Could not connect to server!', 4000, "toast-fetch_no_connect");
//   }
//   ourRequest.send();
// }

function poppulate_left(ourData){
	for(ind=0;ind<ourData.length;ind++){
		var tmp_group= document.getElementById("left-group-temp"); //template || group
		var un_list= document.getElementsByClassName("left-one")[0];
		// append as last child of unordered list
		//un_list.appendChild(tmp_group.content.cloneNode(true)); 
		un_list.insertBefore(tmp_group.content.cloneNode(true),un_list.firstElementChild); //add group || list index to expandable container || ul
		document.getElementsByClassName("group-id-group")[0].innerHTML=ourData[ind].groupid; // group added as first element[li] of ul || give groupId to first group
		for(j=0;j<ourData[ind].participants.length;j++){ // go through all participants in a group
			indiv_name=ourData[ind].participants[j][1];
			indiv_college=ourData[ind].participants[j][5];
			indiv_group=ourData[ind].groupid;
			indiv_amt=ourData[ind].participants[j][4];
			indiv_id=ourData[ind].participants[j][9];
			// console.log(indiv_id);
			add_to_left(document.getElementsByClassName("list-ind")[0]); // insert participant to group 0 || first li of ul
		}
	}
	$(".group").each(function(index) {
	$( this ).toggleClass("active");
	});
}

function show_denominations(){
	var ret_amt = paid_amt - net_amt;
	document.getElementById("return_amt").innerHTML=paid_amt-net_amt;
	document.getElementById("denom_head").style.display="block";
	document.getElementById("denom_para").style.display="block";
	document.getElementById("btn-conf_done").style.display="inline-block";
	document.getElementById('bill_form').style.display='none';
	document.getElementById('dd_bill_form').style.display='none';
	document.getElementById('return_bill_form').style.display='block';
	document.getElementById('bill_head').style.display='none';
	document.getElementById('unbilled_text').style.display='none';
	document.getElementById('return_bill_form').innerHTML = '<div class="row"> <div class="col s6 center deno_field">2000\'s</div><div class="col s6 center input-field"> <input type="text" name="ret_2000s" id="ret_deno_2000" value="0"> <label for="ret_deno_2000" class="lab"></label> </div><div class="col s6 center deno_field">500\'s</div><div class="col s6 center input-field"> <input type="text" name="ret_500s" id="ret_deno_500" value="0"> <label for="ret_deno_500" class="lab"></label> </div><div class="col s6 center deno_field">200\'s</div><div class="col s6 center input-field"> <input type="text" name="ret_200s" id="ret_deno_200" value="0"> <label for="ret_deno_200" class="lab"></label> </div><div class="col s6 center deno_field">100\'s</div><div class="col s6 center input-field"> <input type="text" name="ret_100s" id="ret_deno_100" value="0"> <label for="ret_deno_100" class="lab"></label> </div><div class="col s6 center deno_field">50\'s</div><div class="col s6 center input-field"> <input type="text" name="ret_50s" id="ret_deno_50" value="0"> <label for="ret_deno_50" class="lab"></label> </div></div>';
	remove_right_all();  // empty right table
	remove_left_all(); // empty left table
	retrieve_left();
}

function confirm_done(){
	document.getElementById("return_amt").innerHTML="N/A";
	document.getElementById("denom_head").style.display="none";
	document.getElementById("denom_para").style.display="none";
	document.getElementById("btn-conf_done").style.display="none";
	if(document.getElementById("btn-conf_bill").classList.contains("disabled"))
		document.getElementById("btn-conf_bill").classList.remove("disabled");
	if(document.getElementById("btn-conf_back").classList.contains("disabled"))
		document.getElementById("btn-conf_back").classList.remove("disabled");
	document.getElementById("modalpay").style.display="none";
	var formData = serializeArray(document.getElementById('return_bill_form'));
	var deno2000 = formData[0].value;
	var deno500 = formData[1].value;
	var deno200 = formData[2].value;
	var deno100 = formData[3].value;
	var deno50 = formData[4].value;
	sendRetDenom(deno2000, deno500, deno200, deno100, deno50);
	//retrieve_left();
}

function remove_right_all(){
	/*remove=0;
	rem_next=document.getElementById("right-body").getElementsByClassName("right-indiv")[0];
	while(rem_next){
		removeElement(rem_next);
		remove++;
		rem_next=document.getElementById("right-body").getElementsByClassName("right-indiv")[0];
	}
	console.log(remove);*/
	document.getElementById("right-body").innerHTML="";
	document.getElementById("no_of_part_text").innerHTML=0;
	document.getElementById('tot_amount_text').innerHTML = 0;
}

function remove_left_all(){
	document.getElementsByClassName("left-one")[0].innerHTML="";
}
function getCookie(name) {
  var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return v ? v[2] : null;
}
function showRequestStatus(success) {
	// console.log(success);
	//success||show denominations||return success||update list
	if(success==1){
		Materialize.toast('Operation Successfull!', 4000, "toast-post_success");
		show_denominations();
	}
	//failure||nothing||return failure
	else if(success==0){
		Materialize.toast('Operation Failed!', 4000, "toast-post_failed");
		remove_right_all();  // empty right table
		remove_left_all(); // empty left table
		retrieve_left();
		if(document.getElementById("btn-conf_back").classList.contains("disabled"))
			document.getElementById("btn-conf_back").classList.remove("disabled");
		if(document.getElementById("btn-conf_bill").classList.contains("disabled"))
			document.getElementById("btn-conf_bill").classList.remove("disabled");
		document.getElementById("modalpay").style.display="none";
	}
	else{
		Materialize.toast('Could not connect to server!', 4000, "toast-post_unusual");
		if(document.getElementById("btn-conf_back").classList.contains("disabled"))
			document.getElementById("btn-conf_back").classList.remove("disabled");
		if(document.getElementById("btn-conf_bill").classList.contains("disabled"))
			document.getElementById("btn-conf_bill").classList.remove("disabled");
	}
}
function createGroup() {
	var csrf_token = getCookie('csrftoken');
	var ourRequest = new XMLHttpRequest();
	ourRequest.open("POST", "/controls/create_bill/");	// method and url
	ourRequest.setRequestHeader("Content-type", "application/json");
	ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
	ourRequest.onload = function() {
	if (ourRequest.status >= 200 && ourRequest.status < 400) {		// request sent and recieved
		// Success Yaaaayyyy
	}
	else 		
		Materialize.toast('Server Error!', 4000, "toast-fetch_error");	
	}																// server sent an error after connection
	ourRequest.onerror = function() {								// error connecting to URL
	Materialize.toast('Could not connect to server!', 4000, "toast-fetch_no_connect");
	}
	ourRequest.send();
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
function sendRetDenom(deno_2000, deno_500, deno_200, deno_100, deno_50) {
	var csrf_token = getCookie('csrftoken');
	send_obj={
		"data": {
			"deno_2000": deno_2000,
			"deno_500": deno_500,
			"deno_200": deno_200,
			"deno_100": deno_100,
			"deno_50": deno_50
		}
	};
	var string_obj = JSON.stringify(send_obj);
	var ourRequest = new XMLHttpRequest();
	ourRequest.open("POST", "/controls/arpit/");	// method and url
	ourRequest.setRequestHeader("Content-type", "application/json");
	ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
	ourRequest.onload = function() {
	if (ourRequest.status >= 200 && ourRequest.status < 400) {		// request sent and recieved
		// Success Yaaaayyyy
		$('#print-bill-modal').modal('open');
	}
	else 		
		Materialize.toast('Server Error!', 4000, "toast-fetch_error");	
	}																// server sent an error after connection
	ourRequest.onerror = function() {								// error connecting to URL
	Materialize.toast('Could not connect to server!', 4000, "toast-fetch_no_connect");
	}
	ourRequest.send(string_obj);
}
function printBill() {
	var csrf_token = getCookie('csrftoken');
	send_obj={
		"data": {
			"bills_pk":bills_pk,
		}
	};
	var string_obj = JSON.stringify(send_obj);
	var ourRequest = new XMLHttpRequest();
	ourRequest.open("POST", "/controls/bill_pdf/");	// method and url
	ourRequest.setRequestHeader("Content-type", "application/json");
	ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
	ourRequest.onload = function() {
	if (ourRequest.status >= 200 && ourRequest.status < 400) {		// request sent and recieved
		// Success Yaaaayyyy
	}
	else 		
		Materialize.toast('Server Error!', 4000, "toast-fetch_error");	
	}																// server sent an error after connection
	ourRequest.onerror = function() {								// error connecting to URL
	Materialize.toast('Could not connect to server!', 4000, "toast-fetch_no_connect");
	}
	ourRequest.send(string_obj);
}
// function timedCheck() {
//   updateLeft();
//   setTimeout(function(){
//     timedCheck();
//   }, 30000);
// }

function search() {
  var span_name, span_college, span_groupid;
  var filter_name = document.getElementById("name-search").value.toUpperCase();
  var filter_college = document.getElementById("college-search").value.toUpperCase();
  var filter_groupid = document.getElementById("groupid-search").value.toUpperCase();
  var ul = document.getElementById('left-table-ul');
  for (var j = 0; j < ul.getElementsByTagName('li').length; j++) {
  	var div = ul.getElementsByTagName('li')[j].getElementsByTagName('div');
  	var count = 0;
  	for (i = 1; i < div.length; i++) {
      span_name = div[i].getElementsByTagName("span")[0];
      span_college = div[i].getElementsByTagName("span")[1];
      span_groupid = div[i].getElementsByTagName("span")[2];
      if ((span_name && span_name.innerHTML.toUpperCase().indexOf(filter_name) > -1) && (span_college && span_college.innerHTML.toUpperCase().indexOf(filter_college) > -1) && (span_groupid && span_groupid.innerHTML.toUpperCase().indexOf(filter_groupid) > -1)) {
        div[i].style.display = "";
      } else {
        div[i].style.display = "none";
        count++;
      }
    }
    if (count == (div.length - 1)) {
    	ul.getElementsByTagName('li')[j].style.display = 'none';
    } else {
    	ul.getElementsByTagName('li')[j].style.display = 'list-item';
    }
  }
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
function fetchStats() {
  document.getElementById('stats_ul').innerHTML = '';
  Materialize.toast('Fetching Stats!', 3000);
  var csrf_token = getCookie('csrftoken');
  var ourRequest = new XMLHttpRequest();
  ourRequest.open("POST", "/controls/view_stats/", true);
  ourRequest.setRequestHeader("Content-type", "application/json");
  ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
  ourRequest.onload = function() {
    if (ourRequest.status >= 200 && ourRequest.status < 400) {
      ourData = JSON.parse(ourRequest.responseText);
      console.log(ourData);
      var data = ourData;
      for (var i = 0; i < data.length; i++) {
        var participants = '';
        for (var j = 0; j < data[i][1].length; j++) {
          participants += '<a class="collection-item">'+data[i][1][j][0]+'<span id="phn_no" class="right">'+data[i][1][j][1]+'</span></a>';
        }
        document.getElementById('stats_ul').innerHTML += '<li> <div class="collapsible-header"><i class="material-icons">account_balance</i>'+data[i][0]+'</div><div class="collapsible-body center white"> <div class="collection ">'+participants+'</div></div></li>';
      }
      Materialize.toast('Updated!', 3000);
    } else {
      Materialize.toast('Server Error!', 4000, "toast-fetch_error");  
    }
  }
  ourRequest.onerror = function() {
    Materialize.toast('Could not connect to server!', 4000, "toast-fetch_no_connect");
    // var data = [["BITS Pilani",[["Arpit", 9829775537],["Nikhil", 921379131],["Sri", 2349719891],["Satya", 9958295537]]],["BITS Hyderabad",[["Arpit", 9829775537],["Nikhil", 921379131],["Sri", 2349719891],["Satya", 9958295537],["Piyali", 4567890435]]],["IIT Delhi",[["Part1", 47656575537],["Part2", 7647676],["Part3", 2345678435678]]]];
  }
  ourRequest.send();
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
