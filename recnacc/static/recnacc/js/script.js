var a = ["check_box", "check_box_outline_blank"];
var roomsData;
var total=0;

function elem_selected(elem) {
  elem.firstChild.innerHTML = "check_box";
}

function elem_deselected(elem) {
  elem.firstChild.innerHTML = "check_box_outline_blank";
}

function over_header(elem) {
  i = 0; //select all
  if (elem.innerHTML == "check_box")
    i = 1; //attempt: deselect all
  sel_this_all(elem, i, 1); //1 :toggle class || avoid expandable click expand feature
}

function sel_this_all(elem, i, resist) {
  count = 0;
  elem.innerHTML = a[i];
  parent = elem.parentElement;
  if (resist == 1) {
    $(parent).toggleClass("active");
  }
  next = parent.nextElementSibling;
  while (next) {
    next.firstElementChild.innerHTML = a[i];
    next = next.nextElementSibling;
    count++;
  }
}

function click_indiv(elem) {
  i = 0;
  if (elem.innerHTML == "check_box") {
    i = 1;
    elem.parentElement.parentElement.firstElementChild.firstElementChild.innerHTML = a[1];
  }
  elem.innerHTML = a[i];
}

function loaded() {
  $(".group").each(function (index) {
  });
  // $("#tools-info_outline-tapped").tapTarget('open');
  retrieve_left();
  fetchBhawanStats();
  fetchStats();
  fetchAvailabilityStats();
  // timedCheck();
  // checkPerformance();
  
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
  
  $(document).ready(function(){
    $('.collapsible').collapsible();
    for (var i = 0; i < document.getElementsByClassName('collapsible').length; i++) {
      $('.collapsible').collapsible('close', i);
    }
  });
  $('select').material_select();
  $('.modal').modal();
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
    $('.coll-2').sideNav({
      menuWidth: 300, // Default is 300
      edge: 'right', // Choose the horizontal origin
      closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
      draggable: true // Choose whether you can drag to open on touch screens
    }
  );
}
var indiv;

function add_this_group(parent, resist) {
  i = 0;
  if (resist == 1) {
    $(parent).toggleClass("active");
  }
  next = parent.nextElementSibling;
  while (next) {
    remove = 0; // don't remove from left
    if (next.firstElementChild.innerHTML == "check_box") {
      remove = 1; // remove from left
      i++;
      indiv_name = next.getElementsByClassName("name")[0].innerHTML;
      l_to_r(next); // take participant from left to right || left display none || right add node
    }
    prev = next;
    next = next.nextElementSibling;
    if (remove == 1)
      removeElement(prev);
  }
  if (i == 0 && resist == 1) // none selected in group and called for one group only
    Materialize.toast('No participant selected in group!', 4000, "toast-none_sel");
  else if (i > 0 && resist == 1) //some selected in group and called for one group only
    Materialize.toast(i + ' participants added', 4000, "toast-some_sel");
}

function sel_all_all(sel) {
  i = 0;
  next_header = document.getElementsByClassName("group")[i];
  while (next_header) {
    sel_this_all(next_header.firstElementChild, sel, 0); //i=0: select all, resist=0: expandable click not involved
    i++;
    next_header = document.getElementsByClassName("group")[i];
  }
}

function add_all_sel() {
  part_no = 0;
  add = 0;
  next_header = document.getElementsByClassName("group")[add];
  while (next_header) {
    add_this_group(next_header, 0); //resist=0: expandable click not involved
    add++;
    part_no += i;
    next_header = document.getElementsByClassName("group")[add];
  }
  if (part_no == 0)
    Materialize.toast('No participant selected in all groups!', 4000, "toast-none_sel");
  else
    Materialize.toast(part_no + ' participants added from all groups!', 4000, "toast-none_sel");
}

function l_to_r(elem) {
  indiv_name = indiv_name = next.getElementsByClassName("name")[0].innerHTML;
  indiv_college = next.getElementsByClassName("coll-name")[0].innerHTML;
  indiv_gender = next.getElementsByClassName("gender")[0].innerHTML;
  indiv_group = next.getElementsByClassName("group-id")[0].innerHTML;
  indiv_id = next.getElementsByClassName("indiv-id")[0].innerHTML;
  // add to right
  var tmp = document.getElementById("right-indiv-temp"); //template
  var rightbody = document.getElementById("right-body");
    total++;
    document.getElementById("stats").innerHTML="Selected: "+total;
  ////appends as last child
  //document.getElementById("right-body").appendChild(tmp.content.cloneNode(true)); 
  //appends as first child    
  rightbody.insertBefore(tmp.content.cloneNode(true), rightbody.firstElementChild);
  var up = rightbody.firstElementChild; //element to be updated
  up.getElementsByClassName("right-indiv-name")[0].innerHTML = indiv_name;
  up.getElementsByClassName("right-indiv-college")[0].innerHTML = indiv_college;
  up.getElementsByClassName("right-indiv-gender")[0].innerHTML = indiv_gender;
  up.getElementsByClassName("right-indiv-group")[0].innerHTML = indiv_group;
  up.getElementsByClassName("right-indiv-id")[0].innerHTML = indiv_id;
  // set to unchecked at left for group header
  elem.parentElement.firstElementChild.firstElementChild.innerHTML = "check_box_outline_blank";
  // remove from left || display none 
  //elem.parentNode.removeChild(elem); 
  //// cannot remove here, will not be able to reach to next element
}

function removeElement(elem) {
  elem.parentNode.removeChild(elem);
}

function undo_this(elem) {
  r_to_l(elem);
}

function r_to_l(elem) {
  indiv_name = elem.getElementsByClassName("right-indiv-name")[0].innerHTML;
  indiv_college = elem.getElementsByClassName("right-indiv-college")[0].innerHTML;
  indiv_group = elem.getElementsByClassName("right-indiv-group")[0].innerHTML;
  indiv_gender = elem.getElementsByClassName("right-indiv-gender")[0].innerHTML;
  indiv_id = elem.getElementsByClassName("right-indiv-id")[0].innerHTML;
  // Search group for element in left table/expandable
  find = 0;
    total--;
    document.getElementById("stats").innerHTML="Selected: "+total;
  next_element = document.getElementsByClassName("group")[find];
  while (next_element) {
    if (next_element.getElementsByClassName("group-id-group")[0].innerHTML == indiv_group) {
      add_to_left(next_element.parentElement);
      break;
    }
    find++;
    next_element = document.getElementsByClassName("group")[find];
  }
  removeElement(elem);
}

function add_to_left(l_index) {
  // values to update???
  var tmp_left = document.getElementById("left-indiv-temp"); //template
  //var l_index= elem.parentElement; 
  // append as first (second) child of grouplist
  l_index.insertBefore(tmp_left.content.cloneNode(true), l_index.firstElementChild.nextElementSibling);
  //l_index.appendChild(tmp_left.content.cloneNode(true)); 
  var update = l_index.firstElementChild.nextElementSibling; //element to be updated
  update.getElementsByClassName("name")[0].innerHTML = indiv_name;
  update.getElementsByClassName("coll-name")[0].innerHTML = indiv_college;
  update.getElementsByClassName("group-id")[0].innerHTML = indiv_group;
  update.getElementsByClassName("gender")[0].innerHTML = indiv_gender;
  update.getElementsByClassName("indiv-id")[0].innerHTML = indiv_id;
}
var net_gender;
var id_arr;
var participants_arr;
var send_obj;
var accoLength = 0;

function accomodate_people() {
  var csrf_token = getCookie('csrftoken');
  // add id's of selected participants to json
  id_arr = [];
  participants_arr = [];
  send_obj = {
    "data": {
      "id_arr": id_arr
    },
    "csrftoken": {
      "csrfmiddlewaretoken": csrf_token
    }
  };
  i = 0;
  accoLength = 0
  elem_acco = document.getElementById("right-body").getElementsByClassName("right-indiv")[0];
  if (elem_acco == undefined)
    Materialize.toast('No participant added!', 4000, "toast-none_add");
  else {
    while (elem_acco) {
      id_arr.push(elem_acco.getElementsByClassName("right-indiv-id")[0].innerHTML);
      participants_arr.push(elem_acco.getElementsByClassName("right-indiv-name")[0].innerHTML);
      i++;
      elem_acco = document.getElementsByClassName("right-indiv")[i];
    }
    send_obj = {
      "data": {
        "id_arr": id_arr
      },
      "csrftoken": {
        "csrfmiddlewaretoken": csrf_token
      }
    };
    accoLength = i;
    document.getElementById("select_bhawan").style.display = "block";
    setTimeout('bhawan_open()', 10);
    updateSelectBhawans(roomsData, id_arr);
    createGroup();
  }
}

function open_tool() {
  document.getElementById("tools-info_outline").classList.remove("pulse");
}

function retrieve_left() {
  Materialize.toast('Fetching new participants list!', 4000, "toast-fetch");
  //GET Left List
  var csrf_token = getCookie('csrftoken');
  var ourRequest = new XMLHttpRequest();
  ourRequest.open("POST", "/recnacc/participant_details/", true); // method and url
  ourRequest.setRequestHeader("Content-type", "application/json");
  ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
  ourRequest.onload = function () {
    if (ourRequest.status >= 200 && ourRequest.status < 400) { // request sent and recieved
      ourData = JSON.parse(ourRequest.responseText);
      remove_right_all();
      document.getElementsByClassName("left-one")[0].innerHTML='';
      poppulate_left(ourData);
      total = 0;
      document.getElementById("stats").innerHTML="Selected: "+total;
    }
    else
      Materialize.toast('Server Error!', 4000, "toast-fetch_error");
  } // server sent an error after connection
  ourRequest.onerror = function () { // error connecting to URL
    Materialize.toast('Could not connect to server!', 4000, "toast-fetch_no_connect");
  }
  ourRequest.send(); // sending request
}

function updateLeft() {
  var csrf_token = getCookie('csrftoken');
  var ourRequest = new XMLHttpRequest();
  ourRequest.open("POST", "/recnacc/check_updates/", true);  // method and url
  ourRequest.setRequestHeader("Content-type", "application/json");
  ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
  ourRequest.onload = function() {
  if (ourRequest.status >= 200 && ourRequest.status < 400) {    // request sent and recieved
    // Success Yaaaayyyy
    ourData = JSON.parse(ourRequest.responseText);
    if (ourData.update == 0) {
      // Do nothing
    } else {
      poppulate_left(ourData);
    }
  }
  else    
    Materialize.toast('Server Error!', 4000, "toast-fetch_error");  
  }                               // server sent an error after connection
  ourRequest.onerror = function() {               // error connecting to URL
    Materialize.toast('Could not connect to server!', 4000, "toast-fetch_no_connect");
  }
  ourRequest.send();
}

function poppulate_left(ourData) {
  for (ind = 0; ind < ourData.length; ind++) {
    var tmp_group = document.getElementById("left-group-temp"); //template || group
    var un_list = document.getElementsByClassName("left-one")[0];
    // append as last child of unordered list
    //un_list.appendChild(tmp_group.content.cloneNode(true)); 
    un_list.insertBefore(tmp_group.content.cloneNode(true), un_list.firstElementChild); //add group || list index to expandable container || ul
    document.getElementsByClassName("group-id-group")[0].innerHTML = ourData[ind].groupid; // group added as first element[li] of ul || give groupId to first group
    for (j = 0; j < ourData[ind].participants.length; j++) { // go through all participants in a group
      indiv_name = ourData[ind].participants[j].indiv_name;
      indiv_college = ourData[ind].participants[j].indiv_college;
      indiv_group = ourData[ind].groupid;
      indiv_gender = ourData[ind].participants[j].indiv_gender;
      indiv_id = ourData[ind].participants[j].indiv_id;
      add_to_left(document.getElementsByClassName("list-ind")[0]); // insert participant to group 0 || first li of ul
    }
  }
  $(".group").each(function (index) {
    $(this).toggleClass("active");
  });
}

function submitList() {
  var radioId = $("input[type='radio'][name='bhawansRadio']:checked").val();
  var accoSelLeft = document.getElementsByClassName('acco-left')[radioId-1].innerHTML;
  if (parseInt(accoLength) > parseInt(accoSelLeft)) {
    Materialize.toast('Insufficient Accomdation for Number of People Selected!', 3000);
  } else {
    post_backend();
    bhawan_close();
  }
}

function remove_right_all() {
  /*remove=0;
  rem_next=document.getElementById("right-body").getElementsByClassName("right-indiv")[0];
  while(rem_next){
    removeElement(rem_next);
    remove++;
    rem_next=document.getElementById("right-body").getElementsByClassName("right-indiv")[0];
  }*/
  document.getElementById("right-body").innerHTML = "";
}

function remove_left_all() {
  document.getElementsByClassName("left-one")[0].innerHTML = "";
}

function getCookie(name) {
  var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return v ? v[2] : null;
}

function showRequestStatus(success) {
  //success||show denominations||return success||update list
  if (success == 1) {
    Materialize.toast('Operation Successfull!', 4000, "toast-post_success");
    retrieve_left();
    fetchBhawanStats();
    fetchStats();
    fetchAvailabilityStats();
    removeFirewallzUpdates();
  }
  //failure||nothing||return failure
  else if (success == 0) {
    Materialize.toast('Operation Failed!', 4000, "toast-post_failed");
    retrieve_left();
    fetchBhawanStats();
    fetchStats();
    fetchAvailabilityStats();
  }
  else {
    Materialize.toast('Could not connect to server!', 4000, "toast-post_unusual");
    retrieve_left();
    fetchBhawanStats();
    fetchStats();
    fetchAvailabilityStats();
  }
}
//Opening Bhawan Select Modal
function bhawan_open(){
  document.getElementById('select_bhawan').style.height="100%";
  document.getElementById('select_bhawan').style.overflowY='auto';
}
function bhawan_close(){
  document.getElementById('select_bhawan').style.height="0";
  setTimeout(function() {
    document.getElementById('select_bhawan').style.display = 'none';
  }, 900);
}

function fetchBhawanStats() {
  Materialize.toast('Fetching Bhawans Stats!', 4000, "toast-fetch");
  //GET Left List
  var csrf_token = getCookie('csrftoken');
  var ourRequest = new XMLHttpRequest();
  ourRequest.open("POST", "/recnacc/acco_details/", true); // method and url
  ourRequest.setRequestHeader("Content-type", "application/json");
  ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
  ourRequest.onload = function () {
    if (ourRequest.status >= 200 && ourRequest.status < 400) { // request sent and recieved
      ourData = JSON.parse(ourRequest.responseText);
      Materialize.toast('Updated Bhawans Stats!', 4000, "toast-fetch_fetched");
      roomsData = ourData;
    }
    else
      Materialize.toast('Server Error!', 4000, "toast-fetch_error");
  } // server sent an error after connection
  ourRequest.onerror = function () { // error connecting to URL
    Materialize.toast('Could not connect to server!', 4000, "toast-fetch_no_connect");
  }
  ourRequest.send(); // sending request
}

// function updateBhawans(data) {
//   document.getElementById('bhawans-row').innerHTML = '<td class="bhawans">Bhawans</td>';
//   document.getElementById('occupancy-row').innerHTML = '<td class="occupancy">Occupancy</td>';
//   for (var i = 0; i < data.fields.length; i++) {
//     document.getElementById('bhawans-row').innerHTML += '<td class="bhawans">'+data.fields[i].name+'</td>';
//     document.getElementById('occupancy-row').innerHTML += '<td class="occupancy">'+data.fields[i].no+'</td>';
//   }
// }

function updateSelectBhawans(data, participants) {
  // Update Bhawans Data displayed in Modal
  document.getElementById("datas").innerHTML = '<ul class="collection" id="rooms-collection"></ul>';
  var collection_size = 0;
  var participants_size = participants.length;
  for(var i = 0; i < data.fields.length; i++) {
    if (data.fields[i].rooms != undefined) {
      // Collapsible Template
      document.getElementById("rooms-collection").innerHTML += '<li class="collection-item search-class"> <ul class="collapsible" data-collapsible="expandable"> <li> <div class="collapsible-header"><i class="material-icons">hotel</i><span>'+data.fields[i].name+'</span></div><div class="collapsible-body custom-collapsible-body"></div></li>';
      collection_size++;
      var count=0;
      participants_size = participants.length;
      for (var j = 0; participants_size--; j++) {
        document.getElementsByClassName("custom-collapsible-body")[collection_size-1].innerHTML += '<div class="container"> <div class="row"> <div class="col s6 center participant_name"> <h5 class="participant-name-wrapper">'+participants_arr[j]+'</h5> </div><div class="input-field col s6"> <select class="select_rooms" id="Participant_'+data.fields[i].id+'_'+j+'" bhawan-id='+data.fields[i].id+'> <option value="" selected>Room No.</option> </select> </div></div></div>';
      }
      document.getElementById("rooms-collection").innerHTML += '<li> <div class="collapsible-header center"> <span class="shift-btn-right"><a onclick="selectBhawanRooms('+data.fields[i].id+')" class="secondary-content waves-effect waves-light btn"><i class="material-icons right">done</i>Confirm</a></span> </div></ul> </li>';
      var no_select= document.getElementsByClassName("select_rooms");
      for(var l = 0; l < no_select.length; l++) {
        each_select=no_select[l];
        for(var w = 0; w < data.fields[i].rooms.length; w++) {
          var bhawan_id = document.getElementsByClassName('select_rooms')[l].getAttribute('bhawan-id');
          // var bhawan_id = 21;
          // console.log(bhawan_id);
          // console.log(++count);
          if (bhawan_id==data.fields[i].id) {
            each_select.innerHTML+="<option value="+data.fields[i].rooms[w].name+">"+data.fields[i].rooms[w].name+"</option>";
            // console.log(each_select.innerHTML);
          }
        }
      }
      
    } else {
      document.getElementById("rooms-collection").innerHTML += '<li class="collection-item avatar search-class"> <i class="material-icons circle">hotel</i> <span class="title">'+data.fields[i].name+'</span> <p class="acco-avail">'+data.fields[i].no+'</p><a onclick="selectBhawan('+data.fields[i].id+')" class="secondary-content"><i class="material-icons">done</i></a> </li>';
    }
  }
  $(document).ready(function(){
    $('.collapsible').collapsible();
    $('select').material_select();
  });
}

function selectBhawan(index) {
  
  // Write Code to send selected bhawan to backend.
  var acco_available = document.getElementsByClassName('acco-avail')[index-1].innerHTML;
  if (acco_available < id_arr.length) {
    Materialize.toast('Insufficient Space in this Hostel!', 4000);
  } else {
    Materialize.toast('Sending data to server!', 4000, "toast-post");
    //Post to backend
    
    var csrf_token = getCookie('csrftoken');
    var ourRequest = new XMLHttpRequest();
    var url = "/recnacc/accomodate/";
    ourRequest.open("POST", url, true);
    ourRequest.setRequestHeader("Content-type", "application/json");
    ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
    // POST
    send_obj = {
      "data": {
        "id_arr": id_arr,
        "bhawan_select": index
      },
      "csrftoken": {
        "csrfmiddlewaretoken": csrf_token
      }
    };
    
    var send_json = JSON.stringify(send_obj);
    console.log(send_obj);
    // alert(send_obj);
    // Obtain 
    ourRequest.onreadystatechange = function () {
      if (ourRequest.readyState === 4 && ourRequest.status === 200) {
        var recieve_json = JSON.parse(ourRequest.responseText);
        var status = recieve_json.success;
        showRequestStatus(status)
        // either 1 or 0
        //json object received
      }
      else if (ourRequest.readyState === 4 && ourRequest.status != 200) {
        showRequestStatus(2);
      }
    }
    ourRequest.send(send_json);
    bhawan_close();
    //return 1 if successfull
    // return 0; //return 0 if unsuccesfull i.e. backend sent failure [could connect || but not match net unbilled_gender]
    // return 2, //return anything else [connection error || could not fetch data]
  }
}

function selectBhawanRooms(index) {
  // Selected Individual Rooms for Participants. Send Data to Backend
  var rooms_arr = [];
  for (var i = 0; i < id_arr.length; i++) {
    rooms_arr[i] = $('#Participant_'+index+'_'+i+'').val();
  }
  var filled_all = true;
  for (var i = 0; i < id_arr.length; i++) {
    if (rooms_arr[i] == '') {
      filled_all = false;
      break;
    }
  }
  if (filled_all) {
    createSingleGroup(id_arr.length);
    // Send Data to Backend
    Materialize.toast('Sending data to server!', 4000, "toast-post");
    bhawan_close();
    setTimeout(function(){
      //Post to backend
      var csrf_token = getCookie('csrftoken');
      var ourRequest = new XMLHttpRequest();
      var url = "/recnacc/accomodate_singleroom/";
      ourRequest.open("POST", url, true);
      ourRequest.setRequestHeader("Content-type", "application/json");
      ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
      // POST
      send_obj = {
        "data": {
          "id_arr": id_arr,
          "bhawan_select": rooms_arr
        },
        "csrftoken": {
          "csrfmiddlewaretoken": csrf_token
        }
      };
      var send_json = JSON.stringify(send_obj);
      // console.log(send_obj);
      // Obtain 
      ourRequest.onreadystatechange = function () {
        if (ourRequest.readyState === 4 && ourRequest.status === 200) {
          var recieve_json = JSON.parse(ourRequest.responseText);
          var status = recieve_json.success;
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
      // return 0; //return 0 if unsuccesfull i.e. backend sent failure [could connect || but not match net unbilled_gender]
      // return 2, //return anything else [connection error || could not fetch data]
    }, 2000);
  } else {
    Materialize.toast('Please Allocate rooms to all Participants Selected!', 4000);
  }
}

function createSingleGroup(num) {
  var csrf_token = getCookie('csrftoken');
    var ourRequest = new XMLHttpRequest();
    var url = "/recnacc/satyavrat/";
    ourRequest.open("POST", url, true);
    ourRequest.setRequestHeader("Content-type", "application/json");
    ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
    // POST
    send_obj = {
      "data": {
        "num": num
      },
      "csrftoken": {
        "csrfmiddlewaretoken": csrf_token
      }
    };
    var send_json = JSON.stringify(send_obj);
    // console.log(send_obj);
    // Obtain 
    ourRequest.onreadystatechange = function () {
      if (ourRequest.readyState === 4 && ourRequest.status === 200) {
        // Yippee
      }
      else if (ourRequest.readyState === 4 && ourRequest.status != 200) {
        showRequestStatus(2);
      }
    }
    ourRequest.send(send_json);
}

// function timedCheck() {
//   checkUpdates();
//   updateLeft();
//   setTimeout(function(){
//     timedCheck();
//   }, 30000);
// }

// function checkUpdates () {
//   var csrf_token = getCookie('csrftoken');
//   var json_data = {
//     "csrfmiddlewaretoken": csrf_token
//   }
//   var send_data = JSON.stringify(json_data);
//   var ourRequest = new XMLHttpRequest();
//   var url = "/recnacc/check_updates/";
//   ourRequest.open("GET", url, true);
//   ourRequest.setRequestHeader("Content-type", "application/json");
//   // ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
//   // Obtain 
//   ourRequest.onreadystatechange = function () {
//     if (ourRequest.readyState === 4 && ourRequest.status === 200) {
//       var recieve_json = JSON.parse(ourRequest.responseText);
//       if (recieve_json.updated == 1) {
//         // Show Updates
//         document.getElementById('notification').setAttribute('class', 'btn-floating btn-large waves-effect waves-light cyan z-depth-4 modal-trigger pulse');
//         document.getElementById('update-participants').innerHTML = '';
//         for (var i = 0; i < recieve_json.participants.length; i++) {
//           document.getElementById('update-participants').innerHTML += '<tr> <td class="center">'+recieve_json.participants[i].groupCode+'</td><td class="center">'+recieve_json.participants[i].name+'</td></tr>';
//         }
//       } else {
//         document.getElementById('notification').setAttribute('class', 'btn-floating btn-large waves-effect waves-light cyan z-depth-4 modal-trigger');
//       }
//     }
//     else if (ourRequest.readyState === 4 && ourRequest.status != 200) {
//       // Error Connecting
//       Materialize.toast('There was some error connecting to the server!', 4000);
//     }
//   }
//   ourRequest.send(send_data);
// }

function firewallzUpdates(recieve_json) {
  document.getElementById('notification').setAttribute('class', 'btn-floating btn-large waves-effect waves-light cyan z-depth-4 modal-trigger pulse');
  // document.getElementById('update-participants').innerHTML = '';
  for(ind=0;ind<recieve_json.length;ind++){
    for(j=0;j<recieve_json[ind].participants.length;j++){ // go through all participants in a group
      indiv_name=recieve_json[ind].participants[j][1];
      indiv_id=recieve_json[ind].participants[j][9];
      indiv_group=recieve_json[ind].groupid;
      document.getElementById('update-participants').innerHTML += '<tr> <td class="center">'+indiv_group+'</td><td class="center">'+indiv_name+'</td><td class="part_id">'+indiv_id+'</td></tr>';
    }
  }
}

function removeFirewallzUpdates() {
  var partsList = document.getElementById('update-participants').getElementsByTagName('tr');
  for (var i = 0; i < id_arr.length; i++) {
    for (var j = 0; j < partsList.length; j++) {
      var parent = partsList[j];
      if (parseInt(partsList[j].getElementsByTagName('td')[2].innerHTML) == id_arr[i]) {
        removeElement(parent);
        break;
      }
    }
  }
}

function disablePulse() {
  document.getElementById('notification').setAttribute('class', 'btn-floating btn-large waves-effect waves-light cyan z-depth-4 modal-trigger');
}
function createGroup() {
  var csrf_token = getCookie('csrftoken');
  var ourRequest = new XMLHttpRequest();
  ourRequest.open("POST", "/recnacc/srivatsa/");  // method and url
  ourRequest.setRequestHeader("Content-type", "application/json");
  ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
  ourRequest.onload = function() {
  if (ourRequest.status >= 200 && ourRequest.status < 400) {    // request sent and recieved
    // Success Yaaaayyyy
  }
  else    
    Materialize.toast('Server Error!', 4000, "toast-fetch_error");  
  }                               // server sent an error after connection
  ourRequest.onerror = function() {               // error connecting to URL
  Materialize.toast('Could not connect to server!', 4000, "toast-fetch_no_connect");
  }
  ourRequest.send();
}

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
function stats() {
  if (statsReady == 1) {
    $('.button-collapse').sideNav('hide');
    document.getElementById("stat").style.height="100vh";
    document.getElementById("close").style.display="block";
    document.getElementById("stat_data").style.display="block";
    document.getElementById("csv").style.display="inline-block";
    document.getElementById("excel").style.display="inline-block";
    document.getElementById("pdf").style.display="inline-block";
    $('.collapsible').collapsible();
  } else {
    Materialize.toast('Stats Still Updating, Please Wait!', 3000);
  }
}
function close_stats() {
  document.getElementById("stat").style.height="0vh";
  document.getElementById("close").style.display="none";
  document.getElementById("stat_data").style.display="none";
  document.getElementById("csv").style.display="none";
  document.getElementById("excel").style.display="none";
  document.getElementById("pdf").style.display="none";
}
var statsReady = 0;
function fetchStats() {
  statsReady = 0;
  document.getElementById('stats_ul').innerHTML = '';
  // Materialize.toast('Fetching Stats!', 3000);
  var csrf_token = getCookie('csrftoken');
  var ourRequest = new XMLHttpRequest();
  ourRequest.open("POST", "/recnacc/view_stats/", true);
  ourRequest.setRequestHeader("Content-type", "application/json");
  ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
  ourRequest.onload = function() {
    if (ourRequest.status >= 200 && ourRequest.status < 400) {
      ourData = JSON.parse(ourRequest.responseText);
      var data = ourData.data;
      document.getElementById('stats_ul').innerHTML = '';
      for (var i = 0; i < data.length; i++) {
        var hostel_name = data[i].hostel_name;
        var list = data[i].list;
        var common_room = '';
        var common_room_present = false;
        var common_room_list = '';
        var tt_room = '';
        var tt_room_present = false;
        var tt_room_list = '';
        var single_room = '';
        var single_room_present = false;
        var single_room_list = '';
        for (var j = 0; j < list.length; j++) {
          if (list[j].type=="common_room") {
            common_room_present=true;
            single_room_list+='<a class="collection-item">'+list[j].name+'<span class="right">'+list[j].mobile+'</span></a>';
          } else if(list[j].type=="tt_room") {
            tt_room_present=true;
            tt_room_list+='<a class="collection-item">'+list[j].name+'<span class="right">'+list[j].mobile+'</span></a>';
          } else if (list[j].type=='s_room') {
            single_room_present=true;
            single_room_list+='<a class="collection-item">'+list[j].name+' - Room No : '+list[j].room_no+'<span class="right">'+list[j].mobile+'</span></a>';
          }
        }
        if (common_room_present) {
          common_room = '<li class="bhawan-rooms-wrapper"> <div class="collapsible-header"><i class="material-icons">airline_seat_individual_suite</i>Common Room</div><div class="collapsible-body center white parts-wrapper"> <div class="collection" style="width: 100%;"> '+common_room_list+' </div></div></li>';
        }
        if (tt_room_present) {
          tt_room = '<li class="bhawan-rooms-wrapper"> <div class="collapsible-header"><i class="material-icons">airline_seat_individual_suite</i>TT Room</div><div class="collapsible-body center white parts-wrapper"> <div class="collection" style="width: 100%;"> '+tt_room_list+' </div></div></li>';
        }
        if (single_room_present) {
          single_room = '<li class="bhawan-rooms-wrapper"> <div class="collapsible-header"><i class="material-icons">airline_seat_individual_suite</i>Common Room</div><div class="collapsible-body center white parts-wrapper"> <div class="collection" style="width: 100%;"> '+single_room_list+' </div></div></li>';
        }
        document.getElementById('stats_ul').innerHTML += '<li class="bhawan-name-wrapper"> <div class="collapsible-header"><i class="material-icons">airline_seat_individual_suite</i>'+hostel_name+'</div><div class="collapsible-body center white bhawan-wrapper"> <ul class="collapsible popout center-align" data-collapsible="accordion" style="width: 100%;">'+common_room+tt_room+single_room+'</ul> </div></li>';
      }
      $('.collapsible').collapsible();
      for (var i = 0; i < document.getElementsByClassName('collapsible').length; i++) {
        $('.collapsible').collapsible('close', i);
      }
      statsReady = 1;
    } else {
      Materialize.toast('Server Error!', 3000, "toast-fetch_error");  
    }
  }
  ourRequest.onerror = function() {
    Materialize.toast('Could not connect to server!', 3000, "toast-fetch_no_connect");
    // var jsonResponse = {"data": [["Ram", [["Common Room", ["Arpit Anshuman", 1, "Nikhil Khandelwal", 2, "Srivatsa", 3]],["Common Room", ["Arpit Anshuman", 1, "Nikhil Khandelwal", 2, "Srivatsa", 3]],["Common Room", ["Arpit Anshuman", 1, "Nikhil Khandelwal", 2, "Srivatsa", 3]]]],["Ram", [["Common Room", ["Arpit Anshuman", 1, "Nikhil Khandelwal", 2, "Srivatsa", 3]],["Common Room", ["Arpit Anshuman", 1, "Nikhil Khandelwal", 2, "Srivatsa", 3]],["Common Room", ["Arpit Anshuman", 1, "Nikhil Khandelwal", 2, "Srivatsa", 3]]]],["Ram", [["Common Room", ["Arpit Anshuman", 1, "Nikhil Khandelwal", 2, "Srivatsa", 3]],["Common Room", ["Arpit Anshuman", 1, "Nikhil Khandelwal", 2, "Srivatsa", 3]],["Common Room", ["Arpit Anshuman", 1, "Nikhil Khandelwal", 2, "Srivatsa", 3]]]],["Ram", [["Common Room", ["Arpit Anshuman", 1, "Nikhil Khandelwal", 2, "Srivatsa", 3]],["Common Room", ["Arpit Anshuman", 1, "Nikhil Khandelwal", 2, "Srivatsa", 3]],["Common Room", ["Arpit Anshuman", 1, "Nikhil Khandelwal", 2, "Srivatsa", 3]]]]]};
  }
  ourRequest.send();
}
function fetchPassedStats() {
  document.getElementById('fire_conf').innerHTML = 'Loading';
  document.getElementById('cont_conf').innerHTML = 'Loading';
  document.getElementById('rec_conf').innerHTML = 'Loading';
  var csrf_token = getCookie('csrftoken');
  var ourRequest = new XMLHttpRequest();
  ourRequest.open("POST", "/recnacc/passed_stats/", true);
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
function bhawanSearch() {
  var bhawan_name;
  var filter_name = document.getElementById("bhawan-search").value.toUpperCase();
  var ul = document.getElementById('rooms-collection');
  for (var j = 0; j < ul.getElementsByClassName('search-class').length; j++) {
    var span = '';
    if (ul.getElementsByClassName('search-class')[j].children[1] == undefined) {
      span = ul.getElementsByClassName('search-class')[j].children[0].children[0].children[0].children[1];
    } else {
      span = ul.getElementsByClassName('search-class')[j].children[1];
    }
    if ((span && span.innerHTML.toUpperCase().indexOf(filter_name) > -1)) {
      if (ul.getElementsByClassName('search-class')[j].getAttribute('class') == 'collection-item search-class') {
        ul.getElementsByClassName('search-class')[j].style.display = "";
        ul.getElementsByClassName('search-class')[j].nextElementSibling.style.display = "";
      } else {
        ul.getElementsByClassName('search-class')[j].style.display = "";
      }
    } else {
      if (ul.getElementsByClassName('search-class')[j].getAttribute('class') == 'collection-item search-class') {
        ul.getElementsByClassName('search-class')[j].style.display = "none";
        ul.getElementsByClassName('search-class')[j].nextElementSibling.style.display = "none";
      } else {
        ul.getElementsByClassName('search-class')[j].style.display = "none";
      }
    }
  }
}
function fetchAvailabilityStats() {
  document.getElementById('bhawan-availability-wrapper').innerHTML = 'Loading';
  var csrf_token = getCookie('csrftoken');
  var ourRequest = new XMLHttpRequest();
  ourRequest.open("POST", "/recnacc/availability_stats/", true);
  ourRequest.setRequestHeader("Content-type", "application/json");
  ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
  ourRequest.onload = function() {
    if (ourRequest.status >= 200 && ourRequest.status < 400) {
      var ourData = JSON.parse(ourRequest.responseText);
      var data = ourData.data;
      document.getElementById('bhawan-availability-wrapper').innerHTML = '';
      for (var i = 0; i < data.length; i++) {
        var accoList = ''
        for (var j = 0; j < data[i][1].length; j+=2) {
          accoList += '<li><a>'+data[i][1][j]+' : '+data[i][1][j+1]+'</a></li>';
        }
        document.getElementById('bhawan-availability-wrapper').innerHTML += '<li class="no-padding"> <ul class="collapsible collapsible-accordion"> <li> <a class="collapsible-header">'+data[i][0]+'<i class="material-icons">arrow_drop_down</i></a> <div class="collapsible-body"> <ul style="width: 100%;"> '+accoList+'</ul> </div></li></ul> </li>';
      }
      $('.collapsible').collapsible();
    } else {
      Materialize.toast('Server Error!', 4000, "toast-fetch_error");  
    }
  }
  ourRequest.onerror = function() {
    Materialize.toast('Could not connect to server!', 4000, "toast-fetch_no_connect");
    // var jsonResponse = {"data": [["Ram", ["Common Room", 90, "Single Rooms", 40, "TT Room", 80]],["Budh", ["Common Room", 120, "Single Rooms", 50]],["Meera", ["Common Room", 190, "Single Rooms", 100]],["MAL-A", ["Common Room", 90, "Single Rooms", 20, "TT Room", 10]],["Ram", ["Common Room", 90, "Single Rooms", 40, "TT Room", 80]]]};
  }
  ourRequest.send('');
}