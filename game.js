var gamePattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

//to store which buttons the user clicked
var userClickedPattern = [];

//start game
var level = 0;
var started = false;

$(document).keypress(function(){
  if(!started){
    $("h1").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function(){
  // get the id of the button user clicked
  var userChosenColor = $(this).attr("id");
  //store this id in the array
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

function playSound(name){
  //play music on the random color
  var sound = new Audio('sounds/' + name + '.mp3');
  sound.play();
}

function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}


function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(nextSequence(), 1000);
    }
  }
  else{
    //play the game over sound
    var wrongSound = new Audio('sounds/wrong.mp3');
    wrongSound.play();

    //make the background flash red for a split second
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);

    //Show message to user saying game over
    $("h1").text("Game Over, Press Any Key to Restart");

    startOver();
  }
}


function nextSequence(){

  userClickedPattern = [];

  level++;
  $("h1").text("Level " + level);
  //random number between 0-3
  var randomNumber = Math.round(Math.random() * 3);
  //use the randomNumber to select a random color from the buttonColors array
  var randomChosenColor = buttonColors[randomNumber];
  //add the random color to gamePattern array
  gamePattern.push(randomChosenColor);

  //flash the random color
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);
  //animatePress(randomChosenColor);
};


function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
