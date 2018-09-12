$(document).ready(function () {
  $(".tap-target").tapTarget("open");
  $(".modal").modal();
});
function switchPreRegPayment(option) {
  var pre_reg_allowed=1;
  if(pre_reg_allowed==1) {
    if (option.innerHTML=='check_box_outline_blank' && !option.parentElement.parentElement.classList.contains('disabled-pre-reg')) {
      option.innerHTML='check_box';
      option.parentElement.parentElement.classList.add('pay-pre-reg');
    } else if (!option.parentElement.parentElement.classList.contains('disabled-pre-reg')) {
      option.innerHTML='check_box_outline_blank';
      option.parentElement.parentElement.classList.remove('pay-pre-reg');
    } else {
      Materialize.toast('Pre-Reg payment already made!', 3000);
    }
  } else {
    Materialize.toast('Pre-Reg payment period over!', 3000);
  }
}
function switchRegPayment(option) {
  if (option.innerHTML=='check_box_outline_blank' && !option.parentElement.parentElement.classList.contains('disabled-reg')) {
    option.innerHTML='check_box';
    option.parentElement.parentElement.classList.add('pay-reg');
    if (option.parentElement.parentElement.classList.contains('disabled-pre-reg')) {
      option.style.color='green';
    }
  } else if (!option.parentElement.parentElement.classList.contains('disabled-reg')) {
    option.innerHTML='check_box_outline_blank';
    option.parentElement.parentElement.classList.remove('pay-reg');
  } else {
    Materialize.toast('Reg payment already made!', 3000);
  }
}

function openPolicy() {
  $('#policy-modal').modal('open');
}

function submitPayParts() {
  var pre_reg = [];
  var reg = [];
  var extra = [];
  var success=1;
  for (var i = 0; i < document.getElementsByClassName('pay-reg').length; i++) {
  	if(document.getElementsByClassName('pay-reg')[i].classList.contains('pay-pre-reg')) {
  		success=0;
  		break;
  	}
    var reg_pk = parseInt(document.getElementsByClassName('pay-reg')[i].getElementsByTagName('td')[0].innerHTML);
    if(!document.getElementsByClassName('pay-reg')[i].classList.contains('disabled-pre-reg')) {
      reg.push(reg_pk);
    } else {
      extra.push(reg_pk);
    }
    success=2;
  }
  for (var j = 0; j < document.getElementsByClassName('pay-pre-reg').length; j++) {
    if (!document.getElementsByClassName('pay-pre-reg')[j].classList.contains('pay-reg')) {
      var pre_reg_pk = parseInt(document.getElementsByClassName('pay-pre-reg')[j].getElementsByTagName('td')[0].innerHTML);
      pre_reg.push(pre_reg_pk);
      success=2;
    }
  }
  var sendObj = {
    "pre-reg": pre_reg,
    "reg": reg,
    "extra": extra
  }
  if(success==2) {
    var stringObj = JSON.stringify(sendObj);
    document.getElementById('data-field').setAttribute('value', stringObj);
    document.getElementById('payment-form').submit();
  } else if (success==0) {
    Materialize.toast('Please select only one of Pre-Reg and Reg for payment!', 4000);
  } else {
    Materialize.toast('Please select atleast one option for payment!', 3000);
  }
}