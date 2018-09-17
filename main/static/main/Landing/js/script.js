window.onload = loaded();
var score, count = 1, crossedLandscape = 0, animover = 0;
var start_animation;
var skipped=0;

function loaded() {
    setTimeout(function() {
        score = 0;
        setTimeout(function() {
            // console.clear();
            document.getElementsByClassName("bosmTitles")[0].classList.add("comDivL1");
            document.getElementById("cricketer").classList.add("comDivL1");
            document.getElementById("bowler").classList.add("comDivR1");
            document.getElementById("cricketBall").classList.add("comDivR1");
            document.getElementById("rd1").classList.add("comDivR1");
            document.getElementById("ld1").classList.add("comDivL1");
            document.getElementById("mb1").classList.add("mB1ComnRot");
        }, 2e3), /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4)) ? 0 != screen.orientation.angle && (setTimeout(function() {
            document.getElementById("grit-img-svg").classList = ["bosm-logo-svgs bosm-logo-svgs-anims"], document.getElementById("guts-img-svg").classList = ["bosm-logo-svgs bosm-logo-svgs-anims"], document.getElementById("glory-img-svg").classList = ["bosm-logo-svgs bosm-logo-svgs-anims"], document.getElementById("ring-1-static").classList = ["static-ring-anims"], document.getElementById("ring-2-static").classList = ["static-ring-anims"], document.getElementById("ring-3-static").classList = ["static-ring-anims"], document.getElementById("bosm-loader-text").classList = ["bosm-loader-text-anims"], window.scrollTo(0, 1)
        }, 10), setTimeout(function() {
            document.getElementById("ring-1").classist = [""], document.getElementById("ring-2").classList = [""], document.getElementById("ring-3").classList = [""], document.getElementById("ring-1").style.display = "none", document.getElementById("ring-2").style.display = "none", document.getElementById("ring-3").style.display = "none"
        }, 3e3), setTimeout(function() {
            document.getElementById("loader-screen").classList = ["loader-screen-anims"]
        }, 2800), setTimeout(function() {
            document.getElementById("loader-screen").style.display = "none"
        }, 3502)) : (setTimeout(function() {
            document.getElementById("grit-img-svg").classList = ["bosm-logo-svgs bosm-logo-svgs-anims"], document.getElementById("guts-img-svg").classList = ["bosm-logo-svgs bosm-logo-svgs-anims"], document.getElementById("glory-img-svg").classList = ["bosm-logo-svgs bosm-logo-svgs-anims"], document.getElementById("ring-1-static").classList = ["static-ring-anims"], document.getElementById("ring-2-static").classList = ["static-ring-anims"], document.getElementById("ring-3-static").classList = ["static-ring-anims"], document.getElementById("bosm-loader-text").classList = ["bosm-loader-text-anims"], window.scrollTo(0, 1)
        }, 10), setTimeout(function() {
            document.getElementById("ring-1").classList = [""], document.getElementById("ring-2").classList = [""], document.getElementById("ring-3").classList = [""], document.getElementById("ring-1").style.display = "none", document.getElementById("ring-2").style.display = "none", document.getElementById("ring-3").style.display = "none"
        }, 3e3), setTimeout(function() {
            document.getElementById("loader-screen").classList = ["loader-screen-anims"]
        }, 2800), setTimeout(function() {
            document.getElementById("loader-screen").style.display = "none"
        }, 3502));
        if (window.innerHeight < window.innerWidth) {
            setTimeout(function() {
                document.getElementById("cricketstad").classList.add("fadeins");
            }, 2000);
            start_animation = setTimeout(applyanim, 5000);
            crossedLandscape = 1;
        }
    }, 2000);
}
window.addEventListener("orientationchange", function() {
    if (window.innerHeight > window.innerWidth) {
        if (crossedLandscape == 0)
            if (count == 1) {
                setTimeout(function() {
                    document.getElementById("cricketstad").classList.add("fadeins");
                }, 2000);
                start_animation = setTimeout(applyanim, 5500);
            }
        count++;
    }
    0 != screen.orientation.angle && loaded()
});
var bosmdiv = document.getElementById("bosmdiv");
//starting animaton js
function applyanim(val) //val will denote page number of vch btn is clicked and thus animation will b applied accordingly
{
    setTimeout(function() {
        if(skipped==0) {
            $('#bowler').find('*').addClass('kickBall');
            setTimeout(function() {
                $('#cricketer').find('*').addClass('kickBall');
                document.getElementById("cricketBall").style.left = "75vw";
                document.getElementById("cricketBall").classList.add("crickBallAnim");
            }, 400);
            document.getElementById("ld1").style.left = "0vw";
            document.getElementById("rd1").style.left = "36vw";
            document.getElementById("mb1").style.left = "35vw";
            document.getElementById("ld1").classList.add("goDivL1");
            document.getElementsByClassName("bosmTitles")[0].classList.add("goTitleDivL1");
            document.getElementsByClassName("bosmTitles")[0].classList.add("fadein");
            document.getElementById("rd1").classList.add("goDivR1");
            document.getElementById("mb1").classList.add("mB1Go");
            document.getElementById("ld2").classList.add("comDivL2");
            document.getElementsByClassName("bosmTitles")[1].classList.add("comTitleDivL2");
            document.getElementById("rd2").classList.add("comDivR2");
            document.getElementById("mb2").classList.add("mB2ComnRot");
            document.getElementById("cricketer").classList.add("goDivL1");
            document.getElementById("bowler").classList.add("goDivR1");
            document.getElementById("rd2").style.display = "block";
            document.getElementById("footballer").style.display = "block";
            document.getElementById("footballcont").style.display = "block";
            document.getElementById("goalpost").style.display = "block";
            document.getElementById("cricketer").style.left = "12vw";
            document.getElementById("bowler").style.left = "68.5vw";
            setTimeout(function() {
                document.getElementById("rd1").style.display = "none";
                document.getElementById("cricketBall").style.display = "none";
                document.getElementsByClassName("bosmTitles")[0].style.display = "none";
            }, 4000);
            setTimeout(function() {
                document.getElementsByClassName("bosmTitles")[0].classList.add("fadeout");
            }, 1000);
            document.getElementById("footballer").classList.add("comDivL2");
            document.getElementById("footballcont").classList.add("comDivL2");
            document.getElementById("goalpost").classList.add("comDivR2");
        }
    }, 500);
    setTimeout(function() {
        if(skipped==0) {
            document.getElementById("cricketstad").classList.add("fadeouts");
        }
    }, 1500);
    // console.clear();

    setTimeout(function() {
        if(skipped==0) {
            document.getElementById("footballstad").classList.add("fadeins");
        }
    }, 2500);
    setTimeout(function() {
        if(skipped==0) {
            document.getElementById("mb2").classList.add("disabledbutton");
            $('#footballer').find('*').addClass('kickBall');
            document.getElementById("footballer").classList.add("goDivL2");
            document.getElementById("footballcont").classList.add("goBallR2");
            document.getElementById("goalpost").classList.add("goDivR2");
            document.getElementById("footballer").style.left = "15vw";
            document.getElementById("footballcont").style.left = "25vw";
            document.getElementById("goalpost").style.left = "70vw";
            document.getElementById("ld2").style.left = "0vw";
            document.getElementById("rd2").style.left = "60vw";
            document.getElementById("mb2").style.left = "62vw";
            document.getElementById("bd3").style.display = "block";
            setTimeout(function() {
                document.getElementById("footballstad").classList.add("fadeouts");
            }, 1700);
            setTimeout(function() {
                document.getElementById("swimmingpool").classList.add("fadeins");
            }, 2000);
            setTimeout(function() {
                document.getElementById("swimmingpool").classList.add("fadeouts");
            }, 5500);
            setTimeout(function() {
                $('#footballer').find('*').removeClass('kickBall');
                document.getElementById("rd2").style.display = "none";
                document.getElementById("footballer").style.display = "none";
                document.getElementById("footballcont").style.display = "none";
                document.getElementById("goalpost").style.display = "none";
            }, 4000);
            setTimeout(function() {
                document.getElementsByClassName("bosmTitles")[1].classList.add("fadeout");
            }, 1000);
            setTimeout(function() {
                document.getElementById("footballcont").style.left = "87vw";
                document.getElementById("footballcont").style.top = "79vh";
            }, 2000);
            setTimeout(function() {
                document.getElementsByClassName("bosmTitles")[1].style.display = "none";
            }, 3000);
            document.getElementById("ld2").classList.add("goDivL2");
            document.getElementsByClassName("bosmTitles")[1].classList.add("goTitleDivL2");
            document.getElementById("rd2").classList.add("goDivR2");
            document.getElementById("mb2").classList.add("mB2Go");

            document.getElementById("td3").classList.add("comDivT3");
            document.getElementsByClassName("bosmTitles")[1].classList.add("fadein");
            document.getElementById("bd3").classList.add("comDivB3");
            document.getElementById("mb3").classList.add("mB3ComnRot");
            document.getElementById("swimmersvg").classList.add("comDivT3");
        }
    }, 4900);



    setTimeout(function() {
        if(skipped==0) {
            document.getElementById('skip_anim_btn').style.display='none';
            hexagonanim(true, scaleme);
            document.getElementById("swimmersvg").classList.add("animSwimNgoT3");
            bosmdiv.style.display = "block";
            document.getElementById("swimmersvg").style.top = "20vh";
            document.getElementById("td3").style.top = "0";
            document.getElementById("bd3").style.top = "40vh";
            document.getElementById("mb3").style.top = "45vh";
            document.getElementById("mb3").classList.add("disabledbutton");
            landingdiv.style.display = "block";
            register.style.display = "block";
            document.getElementById("td3").classList.add("goDivT3");
            document.getElementById("bd3").classList.add("goDivB3");
            setTimeout(function() {
                document.getElementsByClassName("bosmTitles")[2].classList.add("fadein");
            }, 200);
            setTimeout(function() {
                document.getElementsByClassName("bosmTitles")[2].style.display = "none";
            }, 3000);
            document.getElementById("mb3").classList.add("mB3Go");
            setTimeout(function() {
                bosmdiv.classList.add("fadein");
                document.getElementById("swimmersvg").style.display = "none";
                landingdiv.classList.add("fadein");
                register.classList.add("fadein");
                document.getElementById("scorecard").classList.add("fadein");
                for (i = 0; i < bosm.length; i++) {
                    document.getElementById(bosm[i]).style.display = "none";
                }
            }, 2000);
            setTimeout(function() {
                document.getElementsByClassName("bosmTitles")[2].classList.add("fadeout");
            }, 1000);
            setTimeout(function() {
                document.body.classList.add('bodybg');
            }, 2000);
            setTimeout(function() {
                landingdiv.style.opacity = 1;
                register.style.opacity = 1;
                document.getElementById("scorecard").style.opacity = 1;
                landingdiv.classList.remove("fadein");
            }, 3500);
            setTimeout(function() {
                document.getElementById("wrapper").style.display = "none";
            }, 4500);
            skipped=1;
        }
    }, 9000);
    animover = 1;
}
var flag = 0;

function stop_start_anim() {
    document.getElementById('wrapper').classList.add('fadeout');
    landingdiv.classList.add('fadein');
    bosmdiv.classList.add('fadein');
    setTimeout(function() {
        bosmdiv.style.opacity = 1;
        bosmdiv.style.display = 'block';
        landingdiv.style.display = 'block';
        document.body.classList.add('bodybg');
    }, 1500);
    setTimeout(function() {
        document.getElementById('wrapper').style.display = 'none';
        landingdiv.style.opacity = 1;
        bosmdiv.style.opacity = 1;
        hexagonanim(true, scaleme);
    }, 2000);
    skipped=1;
}

var sportstemp = [];
var baxtertemp = [];

function scaleme() {
    var t = 0,
        l = 0;
    for (let k = 0; k < 7; k++) {
        do {
            rotsport[k] = Math.ceil(no_col * no_row * Math.random());
        }
        while ((stoprot.find(function(element) { //this selects all the divs vch shouldn' be rotated normally like social icons and bosm one
                return element == rotsport[k];
            }) != undefined));
    }
    var ans;
    for (let k = 0; k < 3; k++) {
        do {
            ans = 0;
            if(k==0)
                scale2p5[k] = Math.ceil((no_col * no_row/6) + (no_col * no_row/6 * Math.random()));
            else if(k==1)
                scale2p5[k] = Math.ceil((no_col * 4*no_row/10) + (no_col * no_row/6 * Math.random()));
            else
                scale2p5[k] = Math.ceil((no_col * 2*no_row/3) + (no_col * no_row/6 * Math.random()));
            for (i = 0; i < stoprot.length; i++)
                if (stoprot[i] == scale2p5[k]) {
                    ans = 1;
                }
        } while (ans == 1)
    }
    for (let i = 0; i < (7); i++) {
        var found1, found2;
        found1 = rotsport.find(function(element) {
            return element == rotsport[i];
        });
        found2 = scale2p5.find(function(element) {
            return element == scale2p5[i];
        });
        if (found1 != undefined) {
            document.getElementById("" + found1).appendChild(sport[t]);
            sport[0].classList.add("scale2p5img");
            sport[1].classList.add("scale2p5img");
            sport[2].classList.add("scale2p5img");
            sport[3].classList.add("scale2p5img");
            sport[4].classList.add("scale2p5img");
            sport[5].classList.add("scale2p5img");
            sport[6].classList.add("scale2p5img");
            // sport[7].classList.add("scale2p5img");
            // sport[8].classList.add("scale2p5img");
            // sport[9].classList.add("scale2p5img");
            t++;
            sportstemp.push(found1);
        }
        if (found2 != undefined) {
            document.getElementById("" + found2).classList.add("scale2p5");
            document.getElementById("" + found2).appendChild(baxter[l]);
            // baxter[0].classList.add("scale2p5bimg");
            // baxter[1].classList.add("scale2p5bimg");
            // baxter[2].classList.add("scale2p5bimg");
            l++;
            baxtertemp.push(found2);
        }
    }
    setTimeout(function() {
        for (let i = 0; i < 3; i++) {
            document.getElementById("" + baxtertemp[i]).classList.remove("scale2p5");
            document.getElementById("" + baxtertemp[i]).removeChild(document.getElementById("" + baxtertemp[i]).childNodes[0]);
        }
        baxtertemp = [];
        sport[0].classList.remove("scale2p5img");
        sport[1].classList.remove("scale2p5img");
        sport[2].classList.remove("scale2p5img");
        sport[3].classList.remove("scale2p5img");
        sport[4].classList.remove("scale2p5img");
        sport[5].classList.remove("scale2p5img");
        sport[6].classList.remove("scale2p5img");
        // sport[7].classList.remove("scale2p5img");
        // sport[8].classList.remove("scale2p5img");
        // sport[9].classList.remove("scale2p5img");
        // baxter[0].classList.remove("scale2p5bimg");
        // baxter[1].classList.remove("scale2p5bimg");
        // baxter[2].classList.remove("scale2p5bimg");
        // baxter[0].style.pointerEvents = "all";
        // baxter[1].style.pointerEvents = "all";
        // baxter[2].style.pointerEvents = "all";
    }, 5050);
}
//starting animation js ends here
var hexagonanimID = null;

function hexagonanim(flag, animate) {
    if (flag)
        hexagonanimID = setInterval(animate, 7000);
    else if (flag == false) {
        clearInterval(hexagonanimID);
    }
}
hexagonanim(false, scaleme);
var c = document.createDocumentFragment();
var landingdiv = document.createElement("div");
var register = document.getElementById("register");
var m = 0;
var sport = new Array(10); //this will store the images of sports
var baxter = new Array(3);
var images = ["/static/main/Landing/images/sports/badminton.svg", "/static/main/Landing/images/sports/basketball.svg", "/static/main/Landing/images/sports/boxing.svg", "/static/main/Landing/images/sports/football.svg", "/static/main/Landing/images/sports/knight.svg", "/static/main/Landing/images/sports/ping-pong.svg", "/static/main/Landing/images/sports/podium.svg", "/static/main/Landing/images/sports/swimmer.svg", "/static/main/Landing/images/sports/tennis.svg", "/static/main/Landing/images/sports/weightlifting.svg", "/static/main/Landing/images/fb.svg", "/static/main/Landing/images/insta.png"];
var bosm = []; //this array will store the indexes of portion for bosm so as to stop them from rotating
var stoprot = [];
var no_col = 26;
var no_row = 18;
var row_start = Math.ceil((no_row / 2) - 4);
var col_start = Math.ceil((no_col * 2 / 3) - 4);
var newDiv = new Array(no_row);
var iconiIndex = new Array(5);
var iconjIndex = new Array(5);
for (let i = 0; i < 10; i++) {
    sport[i] = document.createElement("img");
    sport[i].classList.add("ball");
    sport[i].id = "img" + i;
    sport[i].style.opacity = "0";
    sport[i].setAttribute("src", images[i]);
}
for (let i = 0; i < 3; i++) {
    baxter[i] = document.createElement("img");
    baxter[i].classList.add("baxter");
    baxter[i].id = "baxterimg" + i;

    baxter[i].setAttribute("src", "/static/main/Landing/images/baxter.svg");
    baxter[i].addEventListener("click", function() {
        score += 100;
        baxter[i].style.pointerEvents = "none";
        document.getElementById("scorecard").classList.remove('fadeout');
        document.getElementById("scorecard").classList.add('fadein');
        document.getElementById("scorecard").style.display = "block";
        document.getElementById("scorecard").innerHTML = "<img id='close_scores' src='/static/main/Landing/images/closebtn.svg' onclick='close_scores()'>";
        document.getElementById("scorecard").innerHTML += ("Score : " + score);
        count++;
    });
}

function close_scores() {
    document.getElementById("scorecard").classList.add('fadeout');
}
var rotsport = new Array(10);
var scale2p5 = new Array(25);
var j;

for (let j = 0; j < no_row; j++) {
    newDiv[j] = new Array(no_col);
    for (let i = 0; i < no_col; i++) {
        newDiv[j][i] = document.createElement("div");
        newDiv[j][i].classList.add("honeydiv");
        if (j % 2 == 0)
            newDiv[j][i].style.left = (4 * i) + "vw";
        else
            newDiv[j][i].style.left = ((4 * i) - 2) + "vw";
        newDiv[j][i].style.top = (6.3 * (j - .3)) + "vh";
        newDiv[j][i].style.overflow = "hidden";
        newDiv[j][i].id = "" + m;
        m++;
        c.appendChild(newDiv[j][i]);
    }
}
//cutting out div for writing bosm....
var row, column;
for (let row = row_start; row < row_start + 6; row++) {
    for (let column = col_start; column < col_start + 8; column++) {
        newDiv[row][column].classList.remove('honeydiv');
        newDiv[row][column].classList.add('honeydiv2');
        bosm.push(parseInt(newDiv[row][column].id)); //it stores id of that white portion so as to make them stop from rotating
        stoprot.push(parseInt(newDiv[row][column].id));
    }
}


landingdiv.appendChild(c);
landingdiv.style.display = "none";
landingdiv.style.opacity = 0;
document.body.appendChild(landingdiv);
//social icons and their respective divs styling
newDiv[1][no_col - 4].style.backgroundImage = "url(/static/main/Landing/images/fb.svg)";
newDiv[1][no_col - 4].onclick = openfb;
newDiv[1][no_col - 4].style.cursor = "pointer";

function openfb() {
    window.location = "https://www.facebook.com/bosmbitspilani/";

}
newDiv[1][no_col - 6].onclick = openinsta;
newDiv[1][no_col - 6].style.cursor = "pointer";

function openinsta() {
    window.location = "https://www.instagram.com/bitsbosm/";
}
newDiv[1][no_col - 6].style.backgroundImage = "url(/static/main/Landing/images/insta.png)";
newDiv[1][no_col - 6].style.transform = 'scale(1.4)';
newDiv[1][no_col - 4].style.transform = 'scale(1.4)';
newDiv[1][no_col - 8].style.transform = 'scale(1.4)';
newDiv[1][no_col - 6].style.zIndex = '591';
newDiv[1][no_col - 4].style.zIndex = '591';
newDiv[1][no_col - 8].style.zIndex = '591';
newDiv[1][no_col - 8].style.cursor = "pointer";
stoprot.push(parseInt(newDiv[1][no_col - 4].id));
stoprot.push(parseInt(newDiv[1][no_col - 6].id));

var events = document.createElement("img");
events.setAttribute("src", "/static/main/Landing/images/events.svg");
events.onclick = dispeventpage;
events.style.width = parseInt(newDiv[13][22].style.width) + 2 + "vw";
events.style.position = "absolute";
events.style.left = ".7vw";
events.style.height = "100%";
events.style.transform = "scale(2.3)";
events.style.zIndex = 100;
events.style.cursor = "pointer";
events.id = "eventsvg";
newDiv[9][8].style.overflow = "visible";
newDiv[9][8].appendChild(events);
stoprot.push(parseInt(newDiv[9][8].id));
stoprot.push(parseInt(newDiv[9][7].id));
var shows = document.createElement("img");
shows.setAttribute("src", "/static/main/Landing/images/theater.svg");
shows.onclick = dispeventpage;
shows.style.width = parseInt(newDiv[13][22].style.width) + 2 + "vw";
shows.style.position = "absolute";
shows.style.left = "-3.3vw";
shows.style.height = "100%";
shows.style.transform = "scale(2.3)";
shows.style.zIndex = 100;
shows.style.cursor = "pointer";
newDiv[7][5].style.overflow = "visible";
newDiv[7][5].appendChild(shows);
stoprot.push(parseInt(newDiv[7][5].id));
stoprot.push(parseInt(newDiv[7][4].id));
var sponsor = document.createElement("img");
sponsor.setAttribute("src", "/static/main/Landing/images/sponsor.svg");
sponsor.onclick = opensponspage;
sponsor.style.width = parseInt(newDiv[13][22].style.width) + 2 + "vw";
sponsor.style.position = "absolute";
sponsor.style.left = ".7vw";
sponsor.style.display = 'none';
sponsor.style.height = "100%";
sponsor.style.cursor = "pointer";
sponsor.style.zIndex = 100;
sponsor.style.transform = "scale(2.3)";
newDiv[5][8].style.overflow = "visible";
newDiv[5][8].appendChild(sponsor);
stoprot.push(parseInt(newDiv[5][8].id));
stoprot.push(parseInt(newDiv[5][7].id));
var contact = document.createElement("img");
contact.setAttribute("src", "/static/main/Landing/images/contact.svg");
contact.onclick = dispcontpage;
contact.style.width = parseInt(newDiv[13][22].style.width) + 2 + "vw";
contact.style.position = "absolute";
contact.style.left = ".7vw";
contact.style.height = "100%";
contact.style.cursor = "pointer";
contact.style.transform = "scale(2.3)";
contact.style.zIndex = 100;
newDiv[11][4].style.overflow = "visible";
newDiv[11][4].appendChild(contact);
stoprot.push(parseInt(newDiv[11][4].id));
stoprot.push(parseInt(newDiv[11][3].id));
var t = 0,
    l = 0;
//social icons end  215


/*----------------------------Function to randomly allot color to hexagons and body--------------------------------*/
document.body.onload = function() {
    $.fn.fullpage.setKeyboardScrolling(false);
    $.fn.fullpage.setAllowScrolling(false);
};
/*--------------------------------To know if user has clicked on reload button------------------------------*/
if (performance.navigation.type == 1) {

    history.pushState("", document.title, location.href.replace(/#.*/, ""));
}
/*-----------------------------------------Contact Us Page---------------------------------------------*/
var min = 0,
    max = 15; //denotes the range of card numbers......(0-15)
var ball = document.getElementById("ball");
var card = new Array(9);
var angle = new Array(9);
var colors = ["#192847", "#B7374E", "#4161B1", "#02486E", "#3B8EA5", "#AB3428", "#CA545F", "#0E0E52", "#000000", "#212227", "#390040", "#3E1929", "#1E000E", "#032B43", "#191D32", "#0B032D"];
for (let i = 0; i < 9; i++) {
    var index = Math.floor(Math.random() * (max - min + 1)) + min;
    card[i] = document.getElementById("card" + i);
    card[i].style.zIndex = 9 - i;
    angle[i] = -15 + Math.random() * 30;
    card[i].style.transform = 'rotate(' + angle[i] + 'deg)';
    card[i].style.backgroundColor = colors[index];
}
/*------------variables tox store card indexes of curr and last and next cards------------------------*/
var indtop = 0; //will store index of top card always
var indbtm = 8; //will store index of bottom card always
var indnext = 1;
var pors = document.getElementsByClassName("text1");
var names = document.getElementsByClassName("text2");
var cont = document.getElementsByClassName("text3");
var mails = document.getElementsByClassName("text4");
var ppor = new Array(pors.length);
var pname = new Array(names.length);
var pcont = new Array(cont.length);
var pmail = new Array(mails.length);
for (i = 0; i < ppor.length; i++) {
    ppor[i] = pors[i].textContent;
    pname[i] = names[i].textContent;
    pcont[i] = cont[i].textContent;
    pmail[i] = mails[i].textContent;
}

function goback(dir, index) {

    var por, name, mail, conta;
    var porlink = document.getElementsByClassName("porlink");
    // document.getElementById("leftbtn").classList.add("disabledbutton");
    // document.getElementById("rightbtn").classList.add("disabledbutton");
    // if ((indtop == 0) && (indbtm == 8)) {
    //     for (let i = 0; i < 9; i++)
    //         card[i].style.zIndex = 9 - i;
    //     indtop = 0;
    //     indbtm = 8;
    //     indnext = 1;
    // }
    // for (let i = 0; i < 9; i++) {

    //     card[i].classList.remove("comfrntfrmrit");
    //     card[i].classList.remove("gobackfrmleft");
    // }

    if (dir == 1) //left btn is pressed
    {
        for (i = 0; i < porlink.length; i++) {
            porlink[i].classList.remove("disabledbutton");
        }
        if (index != undefined) {
            porlink[index].classList.add("disabledbutton");
            por = pors[indbtm].textContent;
            name = names[indbtm].textContent;
            conta = cont[indbtm].textContent;
            mail = mails[indbtm].textContent;
            pors[indbtm].textContent = ppor[index];
            names[indbtm].textContent = pname[index];
            cont[indbtm].textContent = pcont[index];
            mails[indbtm].textContent = pmail[index];
            pors[index].textContent = por;
            names[index].textContent = name;
            cont[index].textContent = conta;
            mails[index].textContent = mail;

        }
        card[indtop].classList.remove("comefrntfrmrit");
        card[indbtm].classList.remove("gobackfrmleft");
        card[indbtm].classList.add("comefrntfrmrit");
        setTimeout(function() {
            card[indbtm].classList.remove("comefrntfrmrit");
        }, 1000);
        card[indtop].style.zIndex = 8;
        indnext = indtop;
        indtop = indbtm;
        if (indbtm != 0)
            indbtm--;
        else
            indbtm = 8;
        setTimeout(function() {
            for (let i = indnext; i < 9; i++) {
                card[i].style.zIndex = parseInt(card[i].style.zIndex) - 1;
            }
            for (let i = 0; i <= indbtm; i++) {
                card[i].style.zIndex = parseInt(card[i].style.zIndex) - 1;
            }
        }, 1500);
        card[indtop].style.zIndex = 9;
    } else if (dir == 2) {
        for (i = 0; i < porlink.length; i++) {
            porlink[i].classList.remove("disabledbutton");
        }
        card[indtop].classList.remove("comefrntfrmrit");
        card[indtop].classList.add("gobackfrmleft");
        setTimeout(function() {
            card[indtop].classList.remove("gobackfrmleft");
        }, 1000);
        card[indtop].style.zIndex = 8;
        indbtm = indtop;
        indtop = indnext;
        if (indnext < 8)
            indnext++;
        else
            indnext = 0;
        if (indtop != 0) {
            setTimeout(function() {
                for (let i = indtop; i < 9; i++) {
                    card[i].style.zIndex = parseInt(card[i].style.zIndex) + 1;
                }
                for (let i = 0; i < indbtm; i++) {
                    card[i].style.zIndex = parseInt(card[i].style.zIndex) + 1;
                }
            }, 1500);
        } else {
            setTimeout(function() {
                for (let i = 0; i < 8; i++) {
                    card[i].style.zIndex = parseInt(card[i].style.zIndex) + 1;
                }
            }, 1500);
        }
        card[indbtm].style.zIndex = 1;


    }
    card[indtop].style.zIndex = 9;
    card[indbtm].style.zIndex = 1;
    setTimeout(function() {
        for (let i = 0; i < 9; i++) {
            card[i].classList.remove("comfrntfrmrit");
            card[i].classList.remove("gobackfrmleft");

        }
        document.getElementById("leftbtn").classList.remove("disabledbutton");
        document.getElementById("rightbtn").classList.remove("disabledbutton");
    }, 1500);
    setTimeout(function() {
        for (let i = 0; i < 9; i++) {
            card[i].classList.remove("comfrntfrmrit");
            card[i].classList.remove("gobackfrmleft");
        }
    }, 1500);
}
var isMobile = false;
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
    isMobile = true;
}
/*---------to display contact page on clicking button--------*/
function dispcontpage() {
    if(!isMobile) {
        ball.style.display = "block";
        ball.classList.add('animation');
        hexagonanim(false, scaleme);
        setTimeout(function() {
            document.getElementById("contactpage").style.display = "block";
            ball.style.display = "none";
            document.getElementsByClassName("close-button")[0].style.display = "inline-block";
            document.getElementById("eventpage").style.display = "none";
            landingdiv.style.display = "none";
            register.style.display = "none";
            document.getElementById("scorecard").style.display = "none";
            bosmdiv.style.display = "none";
            ball.classList.remove('animation');
        }, 1000);
    } else {
        hexagonanim(false, scaleme);
        document.getElementById("contactpage").style.display = "block";
        document.getElementsByClassName("close-button")[0].style.display = "inline-block";
        document.getElementById("eventpage").style.display = "none";
        landingdiv.style.display = "none";
        register.style.display = "none";
        document.getElementById("scorecard").style.display = "none";
        bosmdiv.style.display = "none";
    }
}

function closecontpage() {
    if(!isMobile) {
        hexagonanim(true, scaleme);
        ball.style.display = "block";
        ball.classList.add('animation');
        setTimeout(function() {
            document.getElementById("contactpage").style.display = "none";
            ball.style.display = "none";
            ball.classList.remove('animation');
            bosmdiv.style.display = "block";
            document.getElementsByClassName("close-button")[0].style.display = "none";
            landingdiv.style.display = "block";
            register.style.display = "block";
            if (count != 1)
                document.getElementById("scorecard").style.display = "block";
        }, 1000);
    } else {
        hexagonanim(true, scaleme);
        document.getElementById("contactpage").style.display = "none";
        bosmdiv.style.display = "block";
        document.getElementsByClassName("close-button")[0].style.display = "none";
        landingdiv.style.display = "block";
        register.style.display = "block";
        if (count != 1)
            document.getElementById("scorecard").style.display = "block";
    }
}

/*---------------------------------Events Page -----------------------------*/
var slideno, no_of_slides;

function rotcard(currcard, nextcard, direction, slideIndex, cardtype) {
    if (nextcard == currcard)
        return;
    if (cardtype == "events")
        no_of_slides = 16;
    else if (cardtype == "shows")
        no_of_slides = 3;
    if (direction == "right") {
        currcard.classList.remove("goleft", "goright", "comefromleft", "comefromright");
        if (slideIndex != no_of_slides - 1) {
            currcard.classList.add("goleft"); //goleft class makes div go left while rotating
            nextcard.classList.add("comefromright"); //div comes from right rotating
        } else {
            currcard.classList.add("goright"); //goleft class makes div go left while rotating
            nextcard.classList.add("comefromleft"); //div comes from right rotating
        }
        nextcard.style.display = "block";
        setTimeout(function() {
            currcard.style.display = "none";
            currcard.classList.remove("goleft", "goright", "comefromleft", "comefromright");
        }, 700); //when the card leaves the screen hide it

    } else if (direction == "left") {
        currcard.classList.remove("goleft", "goright", "comefromleft", "comefromright");
        if (slideIndex != 0) {
            currcard.classList.add("goright");
            nextcard.classList.add("comefromleft");
        } else {
            currcard.classList.add("goleft");
            nextcard.classList.add("comefromright");
        }
        nextcard.style.display = "block";
        setTimeout(function() {
            currcard.style.display = "none";
            currcard.classList.remove("goleft", "goright", "comefromleft", "comefromright");
        }, 700); //when the card leaves screen hide it
    }

}
$(document).ready(function() {

    $('#fullpage').fullpage({
        anchors: ['events', 'shows'],
        'navigation': true,
        'navigationPosition': 'right',
        'navigationTooltips': ['EVENTS', 'SHOWS'],
        onLeave: function(index, nextIndex, direction) {
            if (screen.height < 768) {
                if (nextIndex == 2) {
                    setTimeout(function() {
                        document.getElementsByClassName("btmnav")[1].style.display = "block";
                        document.getElementsByClassName("btmnav")[0].style.display = "none";
                        document.getElementsByClassName("btmnavarr")[0].style.display = "none";
                        document.getElementsByClassName("btmnavarr")[1].style.display = "none";
                    }, 300);
                }
                if (nextIndex == 1) {
                    document.getElementsByClassName("btmnav")[0].style.display = "block";
                    document.getElementsByClassName("btmnavarr")[0].style.display = "block";
                    document.getElementsByClassName("btmnavarr")[1].style.display = "block";
                    setTimeout(function() {

                        document.getElementsByClassName("btmnav")[1].style.display = "none";
                    }, 500);
                }
            }

        },
        onSlideLeave: function(anchorLink, index, slideIndex, direction, nextSlideIndex) {
            //code to rotate card while leaving the slide
            // for (let i = 0; i < 16; i++) {
            //     if (i < 3) {
            //         document.getElementById("sportcard" + i + "img").style.pointerEvents = 'none';
            //         document.getElementById("eventcard" + i + "img").style.pointerEvents = 'none';
            //     } else {
            //         document.getElementById("sportcard" + i + "img").style.pointerEvents = 'none';
            //     }
            // }
            setTimeout(function() {
                if ($(".hover")[0]) {
                    $(".hover")[0].classList.remove("hover");
                }
            //     for (let i = 0; i < 16; i++) {
            //         if (i < 3) {
            //             document.getElementById("sportcard" + i + "img").style.pointerEvents = 'auto';
            //             document.getElementById("eventcard" + i + "img").style.pointerEvents = 'auto';
            //         } else {
            //             document.getElementById("sportcard" + i + "img").style.pointerEvents = 'auto';
            //         }
            //     }
            }, 700);
            if (anchorLink == "events") {
                var currecard = document.getElementById("sportcard" + slideIndex + "img"); //currecard means current slide's sport card
                var nextecard = document.getElementById("sportcard" + nextSlideIndex + "img"); // nextecard means next slide's sport card(one at center)
                document.getElementById("sportcard"+slideIndex+"img").style.pointerEvents='none';
                document.getElementById("sportcard"+nextSlideIndex+"img").style.pointerEvents='none';
                rotcard(currecard, nextecard, direction, slideIndex, anchorLink);
                setTimeout(function(){document.getElementById("sportcard"+slideIndex+"img").style.pointerEvents='auto';},500);
                setTimeout(function(){document.getElementById("sportcard"+nextSlideIndex+"img").style.pointerEvents='auto';},500);
            } else if (anchorLink == "shows") {
                var currscard = document.getElementById("eventcard" + slideIndex + "img"); //currecard means current slide's sport card
                var nextscard = document.getElementById("eventcard" + nextSlideIndex + "img"); // nextecard means next slide's sport card(one at center)
                document.getElementById("eventcard"+slideIndex+"img").style.pointerEvents='none';
                document.getElementById("eventcard"+nextSlideIndex+"img").style.pointerEvents='none';
                rotcard(currscard, nextscard, direction, slideIndex, anchorLink);
                setTimeout(function(){document.getElementById("eventcard"+slideIndex+"img").style.pointerEvents='auto';},500);
                setTimeout(function(){document.getElementById("eventcard"+nextSlideIndex+"img").style.pointerEvents='auto';},500);
            }
        }
    });
});
/*---------------------------Creating left ad right arrows for event page-----------------------------*/
function dispeventpage() {
    var loc;
    if (screen.height < 768) {
        document.getElementsByClassName("btmnav")[0].style.display = "block";
        document.getElementsByClassName("btmnav")[1].style.display = "block";
    }
    if (this.id == "eventsvg") {
        loc = "#events";
        document.getElementsByClassName("btmnavarr")[0].display = "block";
        document.getElementsByClassName("btmnavarr")[1].display = "block";
        document.getElementsByClassName("btmnav")[0].display = "block";
    } else {
        loc = "#shows";
        document.getElementsByClassName("btmnavarr")[0].display = "none";
        document.getElementsByClassName("btmnavarr")[1].display = "none";
        document.getElementsByClassName("btmnav")[0].display = "none";
    }
    if(!isMobile) {
        hexagonanim(false, scaleme);
        ball.style.display = "block";
        ball.classList.add('animation');
        setTimeout(function() {
            document.getElementById("eventpage").style.display = "block";
            $('#fp-nav').show();
            window.location.href = loc;
            ball.style.display = "none";
            $.fn.fullpage.setAllowScrolling(true);
            $.fn.fullpage.setKeyboardScrolling(true);
            document.getElementsByClassName("close-button")[1].style.display = "inline-block";
            landingdiv.style.display = "none";
            register.style.display = "none";
            document.getElementById("scorecard").style.display = "none";
            bosmdiv.style.display = "none";
            ball.classList.remove('animation');
        }, 1000);
    } else {
        hexagonanim(false, scaleme);
        document.getElementById("eventpage").style.display = "block";
        $('#fp-nav').show();
        window.location.href = loc;
        $.fn.fullpage.setAllowScrolling(true);
        $.fn.fullpage.setKeyboardScrolling(true);
        document.getElementsByClassName("close-button")[1].style.display = "inline-block";
        landingdiv.style.display = "none";
        register.style.display = "none";
        document.getElementById("scorecard").style.display = "none";
        bosmdiv.style.display = "none";
    }
}

function shift(dir) {
    if (dir == "right") {
        document.getElementsByClassName('eventsicons')[0].style.transform = 'translateX(-100vw)';
    }
    if (dir == "left") {
        document.getElementsByClassName('eventsicons')[0].style.transform = 'translateX(0vw)';
    }
}

function closeeventpage() {

    hexagonanim(true, scaleme);
    $.fn.fullpage.setKeyboardScrolling(false);
    $.fn.fullpage.setAllowScrolling(false);
    if(!isMobile) {
        ball.style.display = "block";
        ball.classList.add('animation');
        setTimeout(function() {
            $('#fp-nav').hide();
            document.getElementById("eventpage").style.display = "none";
            ball.style.display = "none";
            ball.classList.remove('animation');
            document.getElementsByClassName("close-button")[1].style.display = "none";
            landingdiv.style.display = "block";
            register.style.display = "block";
            if (count != 1)
                document.getElementById("scorecard").style.display = "block";
            bosmdiv.style.display = "block";
            history.pushState("", document.title, location.href.replace(/#.*/, ""));
        }, 1000);
        setTimeout(function() {
            for(var i=0; i<16;i++) {
                document.getElementById('sportcard'+i+'img').style.display='none';
            }
            document.getElementById('sportcard0img').style.display='block';
            for (var i = 0; i < 3; i++) {
                document.getElementById('eventcard'+i+'img').style.display='none';
            }
            document.getElementById('eventcard0img').style.display='block';
        }, 2000);
    } else {
        $('#fp-nav').hide();
        document.getElementById("eventpage").style.display = "none";
        document.getElementsByClassName("close-button")[1].style.display = "none";
        landingdiv.style.display = "block";
        register.style.display = "block";
        if (count != 1)
            document.getElementById("scorecard").style.display = "block";
        bosmdiv.style.display = "block";
        history.pushState("", document.title, location.href.replace(/#.*/, ""));
        setTimeout(function() {
            for(var i=0; i<16;i++) {
                document.getElementById('sportcard'+i+'img').style.display='none';
            }
            document.getElementById('sportcard0img').style.display='block';
            for (var i = 0; i < 3; i++) {
                document.getElementById('eventcard'+i+'img').style.display='none';
            }
            document.getElementById('eventcard0img').style.display='block';
        }, 2000);
    }
}
/*event page btm nav */
var currIndex, dir;

function gotosport(elem, nextIndex) {
    nextIndex = parseInt(nextIndex);
    currIndex = parseInt($('.fp-section.active .fp-slide.active').attr('id').charAt(5));
    currIndex2 = parseInt($('.fp-section.active .fp-slide.active').attr('id').charAt(6));
    if (nextIndex > currIndex)
        dir = "right";
    else if (nextIndex < currIndex)
        dir = "left";
    if ((currIndex == 15) && (nextIndex == 1))
        dir = "right";
    if (currIndex2 != NaN) {
        currIndex = parseInt(currIndex + "" + currIndex2);
    }
    document.getElementById("sporticon" + currIndex).classList.add('disabledbutton');
    if (currIndex < 3)
        document.getElementById("eventicon" + currIndex).classList.add('disabledbutton');

    if (currIndex != nextIndex) {
        for (let i = 0; i < 16; i++) {
            if (i < 3) {
                document.getElementById("eventicon" + i).classList.remove('disabledbutton');
            }
            document.getElementById("sporticon" + i).classList.remove('disabledbutton');
        }
    }
    if ($('.fp-section.active').attr('id').charAt(7) == 0) {
        $.fn.fullpage.moveTo('events', nextIndex);
        rotcard(document.getElementById("sportcard" + currIndex + "img"), document.getElementById("sportcard" + nextIndex + "img"), dir, currIndex, "event");
    } else {
        $.fn.fullpage.moveTo('shows', nextIndex);
        rotcard(document.getElementById("eventcard" + currIndex + "img"), document.getElementById("eventcard" + nextIndex + "img"), dir, currIndex, "event");
    }
}
/*------------------------------------Trailer And teaser -----------------------------------------*/
function registerme() {
    window.location = "https://www.bits-bosm.org/register/";
}
newDiv[1][no_col - 8].style.backgroundImage = "url(/static/main/Landing/images/youtube.svg)";
var register = document.createElement("img");
register.setAttribute("src", "/static/main/Landing/images/register.svg");
register.onclick = registerme;
register.style.width = parseInt(newDiv[13][22].style.width) + 2 + "vw";
register.style.position = "absolute";
register.style.left = "-3.3vw";
register.style.height = "100%";
register.style.cursor = "pointer";
register.style.transform = "scale(1.9)";
register.style.zIndex = "100";
newDiv[13][22].style.overflow = "visible";
newDiv[13][22].appendChild(register);
stoprot.push(parseInt(newDiv[13][22].id));
stoprot.push(221);
document.getElementById("221").style.zIndex = "151";
document.getElementById("221").onclick = function() {
    window.location.href = "https://www.bits-bosm.org/adminpanels/"
};
newDiv[1][no_col - 8].style.zIndex = 100;
newDiv[1][no_col - 8].onclick = displayTrailer;
stoprot.push(parseInt(newDiv[1][no_col - 8].id));
newDiv[1][no_col - 8].style.zIndex = 100;
//FUNCTION TO DISPLAY VIDEO DIV AFTER 2s
function displayTrailer() {
    document.getElementById("square").style.display = "block";
    document.getElementById("trailer").style.display = "block";
    document.getElementById("upper").classList.remove("goupanim");
    document.getElementById("square").classList.remove("shrinkanim");
    document.getElementById("lower").classList.remove("godownanim");
    document.getElementById("lower").classList.add("comeupanim");
    document.getElementById("upper").classList.add("comedownanim");
    document.getElementById("square").classList.add("growanim");
    hexagonanim(false, scaleme);
    setTimeout(function() {
        bosmdiv.style.display = "none";
        landingdiv.style.display = "none";
        register.style.display = "none";
        document.getElementById("scorecard").style.display = "none";
    }, 1000);
    setTimeout(function() {
        document.getElementById('video').style.display = 'block';
        document.getElementById('bookmark').style.display = 'block';
        document.getElementById('bookmark1').style.display = 'block';
        document.getElementById('bookmark2').style.display = 'block';
        document.getElementsByClassName("close-button")[2].style.display = "block";
    }, 2000);
}

//FUNCTION FOR SWITCHING TO TRAILER

document.getElementById('loader').style.left = '3vw';
document.getElementById('loader1').style.left = '3vw';
document.getElementById('loader2').style.left = '3vw';
document.getElementsByClassName('trailtext1')[0].style.color = "white";

function switchToTrailer() {

    document.getElementById('bookmark').style.left = '15vw';
    document.getElementById('bookmark').style.transitionDuration = '1s';
    document.getElementsByClassName('trailtext1')[0].innerHTML = 'Teaser\'18';
    document.getElementById('video').src = "https://www.youtube.com/embed/-RcTmH_vdTw";
    document.getElementById('loader').style.left = "3vw";
    document.getElementById('loader').style.transitionDuration = '3s';
    document.getElementById('loader1').style.left = "3vw";
    document.getElementById('loader1').style.transitionDuration = '2.5s';
    document.getElementById('loader2').style.left = "3vw";
    document.getElementById('loader2').style.transitionDuration = '2s';

}


//FUNCTION FOR SWITCHING TO AFTERMOVIE

function switchToAfterMovie() {

    document.getElementById('bookmark').style.left = '70vw';
    document.getElementById('bookmark').style.transitionDuration = '1s';
    document.getElementsByClassName('trailtext1')[0].innerHTML = 'Aftermovie\'17';
    document.getElementById('video').src = "https://www.youtube.com/embed/1e1n0_EhEXU?rel=0";
    document.getElementById('loader').style.left = "62vw";
    document.getElementById('loader').style.transitionDuration = '2s';
    document.getElementById('loader1').style.left = "62vw";
    document.getElementById('loader1').style.transitionDuration = '2.5s';
    document.getElementById('loader2').style.left = "62vw";
    document.getElementById('loader2').style.transitionDuration = '3s';
}

function closetrailpage() {
    hexagonanim(true, scaleme);
    document.getElementById("upper").style.height = 50 + "vh";
    document.getElementById("lower").style.height = 50 + "vh";
    document.getElementById("lower").style.top = 50 + "vh";
    document.getElementById("upper").classList.remove("comedownanim");
    document.getElementById("lower").classList.remove("comeupanim");
    document.getElementById("square").classList.remove("growanim");
    document.getElementById("lower").classList.add("godownanim");
    document.getElementById("upper").classList.add("goupanim");
    document.getElementById("square").classList.add("shrinkanim");
    setTimeout(function() {
        document.getElementById('bookmark').style.display = 'none';
        document.getElementById('bookmark1').style.display = 'none';
        document.getElementById('bookmark2').style.display = 'none';
    }, 500);
    setTimeout(function() {
        $('iframe').attr('src', $('iframe').attr('src')); //TO stop the video after close btn is clicked...
        document.getElementsByClassName("close-button")[2].style.display = "none";
    }, 1200);
    setTimeout(function() {
        document.getElementById("square").style.display = "none";
    }, 1000);
    setTimeout(function() {
        document.getElementById("trailer").style.display = "none";
    }, 1800);
    bosmdiv.style.display = "block";
    landingdiv.style.display = "block";
    register.style.display = "block";
    if (count != 1)
        document.getElementById("scorecard").style.display = "block";
}

function opensponspage() {
    if(!isMobile) {
        hexagonanim(false, scaleme);
        ball.style.display = "block";
        ball.classList.add('animation');
        setTimeout(function() {
            document.getElementById("sponsPage").style.display = "block";
            ball.style.display = "none";
            document.getElementsByClassName("close-button")[3].style.display = "inline-block";
            landingdiv.style.display = "none";
            register.style.display = "none";
            document.getElementById("scorecard").style.display = "none";
            bosmdiv.style.display = "none";
            ball.classList.remove('animation');
        }, 1000);
    } else {
        hexagonanim(false, scaleme);
        document.getElementById("sponsPage").style.display = "block";
        document.getElementsByClassName("close-button")[3].style.display = "inline-block";
        landingdiv.style.display = "none";
        register.style.display = "none";
        document.getElementById("scorecard").style.display = "none";
        bosmdiv.style.display = "none";
    }
}

function closesponspage() {
    if(!isMobile) {
        hexagonanim(true, scaleme);
        ball.style.display = "block";
        ball.classList.add('animation');
        setTimeout(function() {
            document.getElementById("sponsPage").style.display = "none";
            ball.style.display = "none";
            ball.classList.remove('animation');
            document.getElementsByClassName("close-button")[1].style.display = "none";
            landingdiv.style.display = "block";
            register.style.display = "block";
            if (count != 1)
                document.getElementById("scorecard").style.display = "block";
            bosmdiv.style.display = "block";
        }, 1000);
    } else {
        hexagonanim(true, scaleme);
        document.getElementById("sponsPage").style.display = "none";
        document.getElementsByClassName("close-button")[1].style.display = "none";
        landingdiv.style.display = "block";
        register.style.display = "block";
        if (count != 1)
            document.getElementById("scorecard").style.display = "block";
        bosmdiv.style.display = "block";
    }
}

function scale(elem, no) {
    if (parseInt(screen.width) > 787) {
        no = parseInt(no);
        var index = parseInt(elem.id.charAt(1));
        for (i = 1; i < index; i++) {
            document.getElementById(elem.id.charAt(0) + "" + i).style.transform = "translateX(0)";
        }
        for (i = index; i <= no; i++) {
            document.getElementById(elem.id.charAt(0) + "" + i).style.transform = "translateX(0)";
        }
        document.getElementById(elem.id.charAt(0) + "" + index).style.zIndex = "10";
        for (i = 1; i <= no; i++) {
            if (i != index)
                document.getElementById(elem.id.charAt(0) + "" + i).style.zIndex = "0";
        }
        document.getElementById(elem.id.charAt(0) + "" + index).style.transform = "scale(1)";
        setTimeout(function() {
            for (i = 1; i < index; i++) {
                document.getElementById(elem.id.charAt(0) + "" + i).style.transform = "translateX(-2.16vw)";
            }
            for (i = index; i <= no; i++) {
                document.getElementById(elem.id.charAt(0) + "" + i).style.transform = "translateX(2.16vw)";
            }
            document.getElementById(elem.id.charAt(0) + "" + index).style.transform = "scale(1.2)";

        }, 200);
    }
}

function descale(elem, no) {
    if (parseInt(screen.width) > 787) {
        no = parseInt(no);
        var index = parseInt(elem.id.charAt(1));
        for (i = 1; i < index; i++) {
            document.getElementById(elem.id.charAt(0) + "" + i).style.transform = "translateX(0)";
        }
        for (i = index; i <= no; i++) {
            document.getElementById(elem.id.charAt(0) + "" + i).style.transform = "translateX(0)";
        }

        document.getElementById(elem.id.charAt(0) + "" + index).style.transform = "scale(1)";
    }
}

function donothing() {}

function toggleHover(option) {
    option.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.classList.toggle('hover');
}