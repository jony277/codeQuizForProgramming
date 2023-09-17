var timerEl = document.getElementById("timer");
var timeLeft = 75;
timerEl.textContent = "Time: " + timeLeft;

var startQuizBtn = document.getElementById("startbtn");
var quizContainerEl = document.querySelector(".quiz");
var questionTitle = document.querySelector(".question-title");
var answerChoices = document.querySelectorAll(".choice");
var correctUserChoice = document.querySelector(".correct");
var wrongUserChoice = document.querySelector(".wrong");
var allDoneContainerEl = document.querySelector(".all-done-container");
var finalScore = document.querySelector(".final-score");
var userNameInput = document.querySelector(".name-input");
var submitBtn = document.querySelector(".submit-button");
var userHighScoresEl = document.querySelector(".view-highscore-container");
var userInitialsInput = document.querySelector("h5");
var goBackBtn = document.querySelector(".goback-button");
var clearHighScoreBtn = document.querySelector(".clearhighscore-button");
var highScoresH2 = document.getElementById("highScores");

var questions = [
    {
        title: "Commonly used data types DO Not include:",
        choices: [
            { answer: "1. Strings", correct: false },
            { answer: "2. Booleans", correct: false },
            { answer: "3. Alerts", correct: true },
            { answer: "4. Numbers", correct: false },
        ]
    },
    {
        title: "The condition in an if / else statement is enclosed within ____:",
        choices: [
            { answer: "1. Quotes", correct: false },
            { answer: "2. Curly Brackets", correct: false },
            { answer: "3. Parentheses", correct: true },
            { answer: "4. Square Brackets", correct: false },
        ]
    },
    {
        title: "Arrays in JavaScript can be used to store:",
        choices: [
            { answer: "1. Numbers and Strings", correct: false },
            { answer: "2. Other arrays", correct: false },
            { answer: "3. Booleans", correct: false },
            { answer: "4. All of the above", correct: true },
        ]
    },
    {
        title: "String values must be enclosed within ____ when being assigned to a variable:",
        choices: [
            { answer: "1. Commas", correct: false },
            { answer: "2. Curly Brackets", correct: false },
            { answer: "3. Parentheses", correct: false },
            { answer: "4. Quotes", correct: true },
        ]
    }
];

var questionIndex = 0;

function countdown() {
    var timeInterval = setInterval(function () {
        timeLeft--;
        timerEl.textContent = "Time: " + timeLeft;

        if (timeLeft <= 0 || questionIndex === questions.length) {
            timerEl.textContent = "";
            clearInterval(timeInterval);
            allDoneContainerEl.removeAttribute("class", "hide");
            quizContainerEl.setAttribute("class", "hide");
        }
    }, 1000);
}

function questionsDisplayed() {
    if (questionIndex < questions.length) {
        var displayCurrentQuestion = questions[questionIndex];
        questionTitle.textContent = displayCurrentQuestion.title;

        displayCurrentQuestion.choices.forEach(function (userChoice, index) {
            answerChoices[index].textContent = userChoice.answer;
            answerChoices[index].setAttribute("data-index", index);
        });
    }
}

function checkAnswer(event) {
    var userChoiceIndex = event.target.getAttribute("data-index");
    var isCorrect = questions[questionIndex].choices[userChoiceIndex].correct;

    if (isCorrect) {
        correctUserChoice.removeAttribute("class", "hide");
        setTimeout(function () {
            correctUserChoice.setAttribute("class", "hide");
        }, 1000);
    } else {
        timeLeft -= 10;
        wrongUserChoice.removeAttribute("class", "hide");
        setTimeout(function () {
            wrongUserChoice.setAttribute("class", "hide");
        }, 1000);
    }
    questionIndex++;

    if (questionIndex < questions.length) {
        questionsDisplayed();
    } else {
        allDoneDisplayed();
    }
}

function allDoneDisplayed() {
    allDoneContainerEl.removeAttribute("class", "hide");
    finalScore.textContent = timeLeft;
}

function highScoreDisplayed() {
    allDoneContainerEl.setAttribute("class", "hide");
    userHighScoresEl.removeAttribute("class", "hide");
    userInitialsInput.innerHTML = localStorage.getItem('value') + " - " + finalScore.textContent;
}

function userInitials() {
    localStorage.setItem('value', userNameInput.value);
}

function userScore() {
    localStorage.setItem("score", finalScore.textContent);
}

function clearUserInput() {
    localStorage.clear('value');
    localStorage.clear('score');
    userInitialsInput.innerHTML = "";
}

function startQuiz() {
    var firstPageEl = document.querySelector(".firstPage");
    quizContainerEl.removeAttribute("class", "hide");
    firstPageEl.setAttribute("class", "hide");
    countdown();
    questionsDisplayed();
}

function restartQuiz() {
    location.reload();
}

startQuizBtn.addEventListener("click", startQuiz);
answerChoices.forEach(function (choice) {
    choice.addEventListener("click", checkAnswer);
});

userNameInput.addEventListener("keyup", function () {
    userInitials();
    userScore();
});

submitBtn.addEventListener("click", highScoreDisplayed);

goBackBtn.addEventListener("click", restartQuiz);

clearHighScoreBtn.addEventListener("click", clearUserInput);

highScoresH2.addEventListener('click', function () {
    userHighScoresEl.removeAttribute("class", "hide");
    document.querySelector('#whole-thing').classList.add('hide');
    userInitialsInput.innerHTML = localStorage.getItem('value') + " - " + localStorage.getItem("score");
});
