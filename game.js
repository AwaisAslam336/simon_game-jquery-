var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;

function nextSequence(){
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#".concat(randomChosenColor)).fadeOut(100).fadeIn(100);
  playSound("sounds/".concat(randomChosenColor).concat(".mp3"));

}

$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  animatePress(userChosenColour);
  playSound("sounds/".concat(userChosenColour).concat(".mp3"));

  checkAnswer(userClickedPattern.length-1);
});

$("body").keydown(function(){
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function checkAnswer(currentLevel){

    if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
      if(userClickedPattern.length == gamePattern.length){

          setTimeout(function(){
                nextSequence();
            }, 1000);

        }
    }
    else{
      $("#level-title").text("Game Over, Press Any Key to Restart");
      var audio = new Audio("sounds/wrong.mp3");
      audio.play();
      $("body").addClass("game-over");
      setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
      startOver();
    }

}

function playSound(name){
  var audio = new Audio(name);
  audio.play();
}

function animatePress(currentColour){
  $("#".concat(currentColour)).addClass("pressed");
  setTimeout(function(){
        $("#".concat(currentColour)).removeClass("pressed");
    }, 100);
}

function startOver(){
  gamePattern = [];
  level = 0;
  userClickedPattern = [];
  started = false;
}
