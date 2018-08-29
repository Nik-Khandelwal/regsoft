$(document).ready(function () {
  $(".tap-target").tapTarget("open");
  $(".modal").modal();
  if (document.getElementsByClassName('transaction-id')[0].innerHTML!="") {
    $("#transaction-modal").modal('open');
  }
});
// function switchPreRegPayment(option) {
//   if (option.innerHTML=='check_box_outline_blank' && !option.parentElement.parentElement.classList.contains('disabled-pre-reg')) {
//     option.innerHTML='check_box';
//     option.parentElement.parentElement.classList.add('pay-pre-reg');
//   } else if (!option.parentElement.parentElement.classList.contains('disabled-pre-reg')) {
//     option.innerHTML='check_box_outline_blank';
//     option.parentElement.parentElement.classList.remove('pay-pre-reg');
//   } else {
//     Materialize.toast('Pre-Reg payment already made!', 3000);
//   }
// }
// function switchRegPayment(option) {
//   if (option.innerHTML=='check_box_outline_blank' && !option.parentElement.parentElement.classList.contains('disabled-reg')) {
//     option.innerHTML='check_box';
//     option.parentElement.parentElement.classList.add('pay-reg');
//     if (option.parentElement.parentElement.classList.contains('disabled-pre-reg')) {
//       option.style.color='green';
//     }
//   } else if (!option.parentElement.parentElement.classList.contains('disabled-reg')) {
//     option.innerHTML='check_box_outline_blank';
//     option.parentElement.parentElement.classList.remove('pay-reg');
//   } else {
//     Materialize.toast('Reg payment already made!', 3000);
//   }
// }

// function submitPayParts() {
//   var pre_reg = [];
//   var reg = [];
//   for (var i = 0; i < document.getElementsByClassName('pay-reg').length; i++) {
//     var reg_pk = parseInt(document.getElementsByClassName('pay-reg')[i].getElementsByTagName('td')[0].innerHTML);
//     reg.push(reg_pk);
//   }
//   for (var j = 0; j < document.getElementsByClassName('pay-pre-reg').length; j++) {
//     if (!document.getElementsByClassName('pay-pre-reg')[j].classList.contains('pay-reg')) {
//       var pre_reg_pk = parseInt(document.getElementsByClassName('pay-pre-reg')[j].getElementsByTagName('td')[0].innerHTML);
//       pre_reg.push(pre_reg_pk);
//     }
//   }
//   var sendObj = {
//     "pre-reg": pre_reg,
//     "reg": reg
//   }
//   console.log(sendObj);
//   var stringObj=JSON.stringify(sendObj);
//   Materialize.toast('Making Payment!', 3000);
//   csrf_token = getCookie('csrftoken');
//   var ourRequest = new XMLHttpRequest();
//   var url = "url";
//   ourRequest.open("POST", url, true);
//   ourRequest.setRequestHeader("Content-type", "application/json");
//   ourRequest.setRequestHeader("X-CSRFToken", csrf_token);
//   ourRequest.onreadystatechange = function() {
//     if (ourRequest.readyState === 4 && ourRequest.status === 200) {
//       var jsonResponse = JSON.parse(ourRequest.responseText);

//     } else if (ourRequest.readyState === 4 && ourRequest.status != 200) {
//       Materialize.toast('There was some error connecting to the server!', 3000);
//     }
//   };
//   ourRequest.send(stringObj);
// }
// function getCookie(name) {
//   var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
//   return v ? v[2] : null;
// }