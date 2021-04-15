var score = 0;
var savedScores = [];

var quizSetEl = [{
    question: "When you create an .html file,",
    option: [
        "the BODY element goes inside the HEAD element",
        "the HEAD element goes inside the BODY element.",
        "the TITLE element goes inside the HEAD element.",
        "the TITLE element goes inside the BODY element.",
    ],
    answer: "the TITLE element goes inside the HEAD element."
},
{
    question: "Which is the correct CSS syntax?",
    option: [
        "body {color: black}",
        "{body;color:black} ",
        "body:color=black",
        "{body:color=black(body}",
    ],
    answer: "body {color: black}"  
},
{
    question: "How does a 'for' loop start?",
    option: [
        "for i = 1 to 5",
        "for (i = 0; i <= 5; i++)",
        "for (i = 0; i <= 5)",
        "for (i <= 5; i++)",
    ],
    answer: "for (i = 0; i <= 5; i++)"
},
{
    question: "How do you call a function named 'myFunction'?",
    option: [
        "call MyFunction()",
        "MyFunction()",
        "call myFunction()",
        "myFunction()",
    ],
    answer: "myFunction()"
},
{
    question: "Inside which HTML element do we put the JavaScript?",
    option: [
        "<script>",
        "<scripting>",
        "<javascript>",
        "<js>",
    ],
    answer: "<script>"
},
];


var coverPageEl = document.querySelector("#coverPage");
var countDownEl = document.querySelector("#timeCount");
var countDownTimer;

function countDown() {
    var scoreCountEl = document.querySelector("#scoreCount");
    scoreCountEl.textContent = retreiveHighScore();
    timeCount = quizSetEl.length * 12;
    countDownTimer = setInterval(function () {
        countDownEl.textContent = timeCount;
        timeCount--;
        
        if (timeCount === 0) {
            timesUp()
        }
    }, 1000);
    
    coverPageEl.classList.add("hidden");
    console.log("hidden")
    createQuiz();
    console.log(createQuiz())
}

function retreiveHighScore() {
    var lastHighScore = localStorage.getItem(scoreRecord);
    var lastHighScoreArray = JSON.parse(lastHighScore);
    if (lastHighScoreArray) {
        return retreivedHighScore = lastHighScoreArray[0].newScore;
        console.log(lastHighScoreArray[0])
    } else return 0;
}

var quizQuestionEl = document.getElementById("quizQuestion");
var quizAnswersEl = document.getElementById("ansChoices")
var currentQuestionIndex = 0;

function createQuiz() {
    quizQuestionEl.classList.remove("hidden");
    var quizQuestion = quizSetEl[currentQuestionIndex].question;
    quizQuestionEl.textContent = quizQuestion;
    
    var quizOption = quizSetEl[currentQuestionIndex].option;
    for (var i = 0; i < quizOption.length; i++) {
        var quizChoice = quizOption[i];
        var listItemEl = document.createElement("li");
        listItemEl.className = "list-choice";
        var selectButton = document.createElement("button");
        selectButton.className = "button-choice";
        selectButton.textContent = quizChoice;
        
        selectButton.setAttribute("selectedIndex", i);
        
        selectButton.addEventListener("click", choiceClicked);
        listItemEl.appendChild(selectButton);
        
        quizAnswersEl.appendChild(listItemEl);
    }
}

function choiceClicked(event) {
    var buttonEl = event.target;
    if (buttonEl) {
        var buttonChosen = parseInt(buttonEl.getAttribute("selectedIndex"));
        var answerChoice = quizSetEl[currentQuestionIndex].answer;
         
        if (buttonChosen === answerChoice) {
            reactEl.textContent = "CORRECT!";
            score += 7;
            
        } else if (buttonChosen != answerChoice) {
            reactEl.textContent = "WRONG!";
            timeCount -= 5;
            
            if (timeCount <= 0) {
                timesUp();
            }
            countDownEl.textContent = timeCount;
        }
        
        if (timeCount > 0) {
            reactEl.removeAttribute("class", "hidden");
            reactEl.setAttribute("class", "react")
            setTimeout(reactTimeout, 300);
        }
    }
}
var reactEl = document.getElementById("choice-react");

function reactTimeout() {
    reactEl.setAttribute("class", "hidden");
    getNextQuestion();
}

function getNextQuestion() {
    if (timeCount <= 0) {
        timesUp();
        return;
        console.log(timesUp)
    } else {
        ++currentQuestionIndex;
        console.log(timesUp)
    }
    
    if (currentQuestionIndex >= quizSetEl.length) {
        timesUp();
    } else {
        clearAnswers();
        createQuiz();
    }
}
 
function timesUp() {
    timeCount = 0;
    countDownEl.textContent = "Times Up!";
    
    clearInterval(countDownTimer);
    clearAnswers();
    endQuiz();
}

function clearAnswers() {
    var count = quizAnswersEl.childElementCount;
    for (var i = 0; i < count; i++) {
        quizAnswersEl.removeChild(quizAnswersEl.childNodes[0]);
    }
}
var quizEndEl = document.getElementById("quizEnd");
var submitButton = document.getElementById("submitBtn");

function endQuiz() {
    quizQuestionEl.classList.add("hidden");
    quizEndEl.classList.remove("hidden");
    var finalScoreEl = document.getElementById("final-score");
    finalScoreEl.textContent = score;
    
    submitButton.addEventListener("click", getInitials);
    console.log(getInitials)
}

const scoreRecord = "finalscore";
var initialsEl = document.getElementById("initials");

function getInitials() {
    if (!initialsEl || initialsEl.value === "") {
        alert("You must enter your initials");
        return;
    } else {
        var lastHighScore = localStorage.getItem(scoreRecord);
        var lastHighScoreArray = JSON.parse(lastHighScore);
        if (!lastHighScoreArray || score > lastHighScoreArray[0].newScore) {
            var scoreData = {
                name: initialsEl.value,
                newScore: score
            };
            if (!lastHighScoreArray) lastHighScoreArray = [];
            lastHighScoreArray.push(scoreData);
            lastHighScoreArray.sort(function (x, y) {
                return -(x.newScore - y.newScore)
            });
            localStorage.setItem(scoreRecord, JSON.stringify(lastHighScoreArray));
        }
    }
    showScore();
    console.log(showScore())
}

var highResultEl = document.getElementById("finalcore");

function showScore() {
    quizEndEl.classList.add("hidden");
    highResultEl.classList.remove("hidden");
    var showHighResultEl = document.querySelector("#showResult");
    var lastHighScore = localStorage.getItem(scoreRecord);
    lastHighScoreArray = JSON.parse(lastHighScore);
    if (lastHighScoreArray) {
        showHighResultEl.value = "1. " + lastHighScoreArray[0].name + ":" + lastHighScoreArray[0].newScore;
        console.log(showHighResultEl);
    }
};

function clearLocalStorage() {
    document.querySelector("#showResult").value = "";
    document.querySelector("#scoreCount").textContent = 0;
    localStorage.clear(lastHighScoreArray);
}

function startGameOver() {
    highResultEl.classList.add("hidden");
    coverPageEl.classList.remove("hidden")
    initialsEl.value = "";
    currentQuestionIndex = 0;
    score = 0;
}

var startBtn = document.querySelector("#startBtn");
var restartBtn = document.querySelector("#restart");
var resetBtn = document.querySelector("#reset");
startBtn.addEventListener("click", countDown);
restartBtn.addEventListener("click", startGameOver);
resetBtn.addEventListener("click", clearLocalStorage);
