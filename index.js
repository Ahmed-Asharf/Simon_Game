var colorarray = ["green", "red", "yellow", "blue"];
var chosecolor = [];
var userpattern = [];
var level = 0;
var start = false;
$(".btn").click(function () {
    var value = $(this).attr("id");
    userpattern.push(value);
    playsound(value);
    animatePress(value);
    checkanswer(userpattern.length - 1); // userpattern.length start with 1 not zero so get right element from array therefore subtract 1 from length to get right value

});
$(document).keypress(function (event) {
    if (event.key === 'A') {
        if (!start) {
            $('#level-title').text("Level " + level);
            nextsquence();
            start = true;
        }
    }
});

function nextsquence() {
    userpattern = [];
    level++;
    $('#level-title').text("Level " + level);
    var randomnumber = Math.floor(Math.random() * 4);
    var color = colorarray[randomnumber]
    chosecolor.push(color);
    $("#" + color).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(color);

}

function animatePress(currentcolor) {
    $("#" + currentcolor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentcolor).removeClass("pressed");
    }, 100);
}

function playsound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function checkanswer(input) {
    if (userpattern[input] === chosecolor[input]) {
        if (userpattern.length === chosecolor.length) {
            setTimeout(function () {
                nextsquence();
            }, 1000);
        }
    } else {
        playsound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press A to Restart");
        startover();
    }
}

function startover() {
    level = 0;
    userpattern = [];
    chosecolor = [];
    start = false;
}