var colors = ["red", "green", "blue", "yellow"];
var gamePattern = [];
var userPattern = [];

var started = false;
var level = 0;
var highScore = 0;

$(document).keypress(function() {
    if(!started) {
        nextSequence();
        $("h3").text("High Score: "+highScore)
        started = true;
    }
})

function nextSequence() {
    userPattern = [];
    level++;
    $("h2").html(`Level ${level}`)

    var randomNo = (Math.floor(Math.random()*4)); // generates nos from 0 to 3(inclusive) hence * with 4 rather than 3
    var randomColor = colors[randomNo];
    gamePattern.push(randomColor);

    $("#"+randomColor).fadeOut(100).fadeIn(100);

    playSound(randomColor);
}

$(".btn").click(function() {
    var userChosenColor = this;  // $(this).attr("id")
    userPattern.push(userChosenColor.id);
    playSound(userChosenColor.id);
    clickAnimation(userChosenColor);
    checkAnswer(userPattern.length-1);
})

function playSound(name) {
    var audio = new Audio(`./sounds/${name}.mp3`);
    audio.play();
}

function clickAnimation(currentBtn) {
    $(currentBtn).addClass("pressed");
    setTimeout(function() {
        $(currentBtn).removeClass("pressed");
    }, 100)
}

function checkAnswer(lastColor) {
    if(userPattern[lastColor] === gamePattern[lastColor]) {  // checking if last colors of both gamePattern & userPattern are same
        highScore++;
        $("h3").text("High Score: "+highScore)
        if(userPattern.length === gamePattern.length) {  // if same, checking if the gamePattern has been completely replicated by the user. I replicated, then both the arrays length will be the same
            setTimeout(function() {   
                nextSequence();    // if yes, calling the nextSequence() again to generate next pattern
            }, 1000)
        }
    } else {
        $("body").addClass("gameOver");
        $("h2").html("Game Over!! Press Any Key To Restart");
        playSound("wrong");

        setTimeout(function() {
            $("body").removeClass("gameOver");
        }, 200)
        startOver();
    }
}

function startOver() {
    level = 0;
    highScore = 0;
    gamePattern = [];
    started = false;
}
