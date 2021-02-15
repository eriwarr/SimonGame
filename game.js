var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keypress(function(){
  if (!started) {
    $("#level-title").html("Level " + level)
    nextSequence();
    started = true;
}
})

$(".btn").click(function (){
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);

})

function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  } else {
    $("#level-title").html("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function() {
    $("body").removeClass("game-over");
    }, 200);
    var audio = new Audio('wrong.mp3');
    audio.play();
    console.log("wrong");
    startOver();
  }
}

function nextSequence(){
  userClickedPattern = [];
  level++;
  $("#level-title").html("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200);
  playSound(randomChosenColor);

}

function playSound(name){
  var audio = new Audio('' + name + '.mp3');
  audio.play();
}

function animatePress(currentColor){
  $("#" + currentColor + "").addClass("pressed");
  setTimeout(function() {
  $("." + currentColor + "").removeClass("pressed");
  }, 100);
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
