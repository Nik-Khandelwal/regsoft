//Opening Bhawan Select Modal
function upload_open(){
  document.getElementById('upload').style.height="100%";
}
function upload_close(){
  document.getElementById('upload').style.height="0";
}

$( document ).ready(function(){
    var status = parseInt(document.getElementById('status-num').innerHTML);
     $(".button-collapse").sideNav();
    switch(status){
    case 0:
        break;
    case 1:
        document.getElementById('2').classList.add('active');
        break;
    case 2:
        document.getElementById('2').classList.add('active');
        document.getElementById('3').classList.add('active');
        break;
    case 3:
         document.getElementById('2').classList.add('active');
        document.getElementById('3').classList.add('active');
        document.getElementById('4').classList.add('active');
        break;
}
    document.getElementById("username").innerHTML+=name;
    document.getElementById("username1").innerHTML+=name;
});
//var status=0;
//var name="Srivatsa";


    