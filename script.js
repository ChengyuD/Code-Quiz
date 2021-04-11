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
        var answerChoice = quiz[quizQuestion].answer;
        
        if (buttonChosen === answerChoice) {
            feedbackEl.textContent = "CORRECT!";
            score += 10;
        
        } else if (buttonChosen != answerChoice) {
            feedbackEl.textContent = "WRONG!";
            timer -= 5;
            
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
