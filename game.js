var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickPattern = [];
var isGameStart = false;
var level = 0;
var highestLevel = 0;

function nextSequence() {
  level++;
  if(level > highestLevel)
  {
    highestLevel = level;
    $("#score").text(level);
  }
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#level-title").text("Level "+level);
  //make the chosen button flash
  $("#" + randomChosenColour).fadeOut(200).fadeIn(200);
  chosenButtonSound(randomChosenColour);
}

function chosenButtonSound(id)
{
  //play sound of the chosen button
  var audio = new Audio("sounds/" + id + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function() {
    $("#"+currentColour).removeClass("pressed");
}, 100);
}

$(".btn").click(function(){
  if(!isGameStart)
  {
    alert("please press any key to start");
  }else{
  var isUserCurrentCorrect = true;
  var userChosenColour = this.id;
  userClickPattern.push(userChosenColour);
  animatePress(userChosenColour);
  chosenButtonSound(userChosenColour);

  //check if it is currently correct
  for(var i  = 0; i < userClickPattern.length ; i++)
  {
    if(userClickPattern[i]!==gamePattern[i])
    isUserCurrentCorrect = false;
  }
  //wrong input
  if(!isUserCurrentCorrect){
    var audio = new Audio("sounds/sadsad.m4a");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
  }, 200);
  $("h1").text("Silly BiBiJi, Press Any Key to Restart");
  $("#instruction").text("");
  startOver();
  }
  //all corrent, move to next level
  if(isUserCurrentCorrect && (userClickPattern.length == gamePattern.length)){
    var timeOut = 500;
    if(showYeah())
    {
      timeOut = 1500;
    }
    setTimeout(function(){
      nextSequence();
      userClickPattern =[];
    },timeOut)
  }
}
})

function startGame(){
  if(!isGameStart)
  {
    nextSequence();
    isGameStart=true;
    $("#level-title").text("Level "+level);
    $("#instruction").text("input the whole sequence");
    $("#sad").remove();
  }
  else{
    alert("please click the sequence");
  }
}

$("#level-title").click(function(){

  startGame();
})

$(document).keypress(function(){
  startGame();
}
);

function showYeah()
{
  var yeahAudio = new Audio("sounds/yeahyeah.m4a");
  var yeah = false;
  if(level % 2 == 0){
    yeah = true;
    yeahAudio.play();
    $("#instruction").text("Yeah!");
    $("#instruction").after("<img id='yeah' src='image/yeah.jpg' width='200px'/>");
    setTimeout(function() {
      $("#instruction").text("input the whole sequence");
      $("#yeah").remove();
  }, 1300);
  }
  if(level === 20){
    $("#instruction").text("You must be really bored");
  }
  return yeah;
}

function startOver(){
  $("#instruction").after("<img id='sad' src='image/sadsad.jpg' width='200px'/>");
  level = 0;
  gamePattern = [];
  isGameStart = false;
  userClickPattern = [];
}
