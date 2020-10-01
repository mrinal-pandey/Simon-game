var buttonColors = ["red", "blue", "green", "yellow"]
var gamePattern = []
var userClickedPattern = []
var level = 0

// MAIN GAME

function nextSequence() {
  userClickedPattern = []
  level = level + 1;
  $("#level-title").text("Level " + level)
  var randomNumber = Math.floor(Math.random() * 4)
  var randomChosenColor = buttonColors[randomNumber]
  gamePattern.push(randomChosenColor)
  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100)
  playSound(randomChosenColor)
  animatePress(randomChosenColor)
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed")
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed")
  }, 100)
}

// PLAY SOUND

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3")
  audio.play()
}

// CHECK ANSWER

function checkAnswer(currentLevel) {
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if(gamePattern.length === userClickedPattern.length) {
      setTimeout(function() {
        nextSequence()
      }, 1000)
    }
  } else {
    playSound("wrong")
    $("body").addClass("game-over")
    setTimeout(function() {
      $("body").removeClass("game-over")
    }, 200)
    $("#level-title").text("Game over, Press any key to restart")
    startOver()
  }
}

// START AGAIN

function startOver() {
  level = 0
  gameBegin = false
  gamePattern = []
}

// ON CLICK ON THE BUTTON

$(".btn").on("click", function(event) {
  var userChosenColor = this.id
  playSound(userChosenColor)
  animatePress(userChosenColor)
  userClickedPattern.push(userChosenColor)
  checkAnswer(userClickedPattern.length - 1)
})

var gameBegin = false
$(document).on("keydown", function(event) {
  if(!gameBegin){
    gameBegin = true
    nextSequence()
  }
})
