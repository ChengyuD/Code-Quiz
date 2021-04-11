var score = 0;
var savedScores = [];

// quiz questions and choices set
var quiz = [
    {
        question: "When you create an .html file,",
        option: [
            "the BODY element goes inside the HEAD element",
            "the HEAD element goes inside the BODY element.",
            "the TITLE element goes inside the HEAD element.",
            "the TITLE element goes inside the BODY element.",
        ],
        answer: 3
    },
    {
        question: "Which is the correct CSS syntax?",
        option: [
            "body {color: black}",
            "{body;color:black} ",
            "body:color=black",
            "{body:color=black(body}",
        ],
        answer: 1    
    },
    {
        question: "How does a 'for' loop start?",
        option: [
            "for i = 1 to 5",
            "for (i = 0; i <= 5; i++)",
            "for (i = 0; i <= 5)",
            "for (i <= 5; i++)",
        ],
        answer: 2
    },
    {
    question: "How do you call a function named 'myFunction'?",
        option: [
            "call MyFunction()",
            "MyFunction()",
            "call myFunction()",
            "myFunction()",
        ],
        answer: 4
    },
    {
        question: "Inside which HTML element do we put the JavaScript?",
        option: [
            "<script>",
            "<scripting>",
            "<javascript>",
            "<js>",
        ],
        answer: 1
    }
]


var startQuiz = document.getElementsById("coverPage");
var timerEl = document.querySelector(".timeCount");
var timerCountDown;

function countDown() {
    var viewScoreEl = document.querySelector("#scoreCount");
    viewScoreEl.textContent = retreiveScore();
    timer = questions.length * 12;
    timerCountDown = setInterval(function () {
        countDownEl.textContent = timer;
        timer--;
        if (timer === 0) {
            roundOver()
        }
    }, 1000);

    startQuiz.classList.add("hidden");
    printQuiz(index);
}

var quizQuestionEl = document.getElementById("#quizQuestions");
var quizAnswerEl = document.getElementById("#ansChoices");
var index = 0;

function printQuiz() {
    quizQuestionEl.classList.remove("hidden");

    var quizQuestion = quiz[Index].question;
    quizQuestionEl.textContent = quizQuestion;
    
    var quizOption = quiz[Index].option;
    for (var i = 0; i < quizOption.length; i++) {
        var quizOption = quizChoices[i];
        var answerList = document.getElementById("li");
        answerList.className = "list-choice";
        var selectButton = document.createElement("button");
        selectButton.className = "button-choice";
        selectButton.textContent = quizOption;
        
        selectButton.setAttribute("selectedIndex", i);
        
        selectButton.addEventListener("click", optionClicked);
        listItemEl.appendChild(selectButton);
        
        quizAnswersEl.appendChild(listItemEl);
    }
}

function checkAnswer(event) {
    var buttonEl = event.target;
    if (buttonEl) {
        var buttonChosen = parseInt(buttonEl.getAttribute("selectedIndex"));
        var answerChoice = questions[currentQuestionIndex].answer;
        
        if (buttonChosen === answerChoice) {
            feedbackEl.textContent = "CORRECT!";
            score += 5;
        
        } else if (buttonChosen != answerChoice) {
            feedbackEl.textContent = "WRONG!";
            timer -= 10;
            
            if (timer <= 0) {
                timesUp();
            }
            countDownEl.textContent = timer;
        }
        // display feedback message for 0.5 seconds unless timer has reached 0 and quiz is over
        if (timer > 0) {
            feedbackEl.removeAttribute("class", "hidden");
            feedbackEl.setAttribute("class", "feedback")
            setTimeout(feedBackTimeout, 500);
        }
    }
}
var feedbackEl = document.getElementById("question-feedback");

function feedBackTimeout() {
    feedbackEl.setAttribute("class", "hidden");
    getNextQuestion();
}
// check timer again before incrementing questions array index
function getNextQuestion() {
    if (timer <= 0) {
        roundOver();
        return;
    } else {
        ++currentQuestionIndex;
    }
    // if index indicates no more questions quiz over, otherwise clear current question and build next question
    if (currentQuestionIndex >= questions.length) {
        roundOver();
    } else {
        clearAnswers();
        buildQuiz();
    }
}
// if quiz round over set timer to 0, display text round over message 
function roundOver() {
    timer = 0;
    countDownEl.textContent = "Round Over!";
    // clear starting timer, last question displayed, prepare to end quiz
    clearInterval(countDownTimer);
    clearAnswers();
    endQuiz();
}
// clear answer buttons by looping through choices, removing answer button at first index
// so as array shrinks, we are not trying to access a non existent index
function clearAnswers() {
    var count = quizAnswersEl.childElementCount;
    for (var i = 0; i < count; i++) {
        quizAnswersEl.removeChild(quizAnswersEl.childNodes[0]);
    }
}
var quizEndEl = document.getElementById("quiz-end");
var submitButton = document.getElementById("submit-button");
// hide question screen, unhide recording score screen and display final score
function endQuiz() {
    quizQuestionEl.classList.add("hidden");
    quizEndEl.classList.remove("hidden");
    var finalScoreEl = document.getElementById("final-score");
    finalScoreEl.textContent = score;
    // after user inputs initials and clicks submit button event to save score triggered
    submitButton.addEventListener("click", getInitials);
}
// user initials input is validated, if  this is first time quiz is played, an array is created to hold score data
// initials and score are saved to local strorage if user current score is higher than last recorded high score
const scoreName = "endscore";
var initialsEl = document.getElementById("initials");

function getInitials() {
    if (!initialsEl || initialsEl.value === "") {
        alert("You must enter your initials");
        return;
    } else {
        var lastHighScore = localStorage.getItem(scoreName);
        var lastHighScoreArray = JSON.parse(lastHighScore);
        if (!lastHighScoreArray || score > lastHighScoreArray[0].newScore) {
            var scoreData = {
                name: initialsEl.value,
                newScore: score
            };
            if (!lastHighScoreArray) lastHighScoreArray = [];
            lastHighScoreArray.push(scoreData);
            lastHighScoreArray.sort(function (a, b) {
                return -(a.newScore - b.newScore)
            });
            localStorage.setItem(scoreName, JSON.stringify(lastHighScoreArray));
        }
    }
    showResults();
}
// initials screen is hidden and results from local storage are displayed, 
var highResultEl = document.getElementById("show-result");

function showResults() {
    quizEndEl.classList.add("hidden");
    highResultEl.classList.remove("hidden");
    var showHighResultEl = document.querySelector("#show-high-result");
    var lastHighScore = localStorage.getItem(scoreName);
    lastHighScoreArray = JSON.parse(lastHighScore);
    if (lastHighScoreArray) {
        showHighResultEl.value = "1. " + lastHighScoreArray[0].name + ":" + lastHighScoreArray[0].newScore;
    }
};
// user now has choice to clear all scores in storage
function clearLocalStorage() {
    document.querySelector("#show-high-result").value = "";
    document.querySelector("#view-high-score").textContent = 0;
    localStorage.clear(lastHighScoreArray);
}
// and/or start quiz over, score and question index are reset
function startGameOver() {
    highResultEl.classList.add("hidden");
    startPageEl.classList.remove("hidden")
    initialsEl.value = "";
    currentQuestionIndex = 0;
    score = 0;
}
// event handlers for start, go back(start game over) and clear all scores from storage
var startBtn = document.querySelector("#start-button");
var goBackBtn = document.querySelector("#go-back");
var clearResultBtn = document.querySelector("#clear-result");
startBtn.addEventListener("click", countDown);
goBackBtn.addEventListener("click", startGameOver);
clearResultBtn.addEventListener("click", clearLocalStorage);
