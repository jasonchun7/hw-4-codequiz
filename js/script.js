var startBtn = document.querySelector('#startquiz');
var timer = document.querySelector('#timer');
var mainContent = document.querySelector('#mainContent');
var questionEl = document.querySelector('#title');
var quizContent = document.querySelector('#quiz');
var result = document.querySelector('#answer');
var score = document.querySelector('#score');
var highScores = document.querySelector('#highscores');
var highScoreLink = document.querySelector('#highscorelink');
var navLink = document.querySelector('highscorelink');

var secondsLeft = 75, questionIndex = 0, correct = 0;
var totalQuestions = questions.length;
var question, option1, option2, option3, option4, ans, previousScores;
var choiceArray = [], divArray = [];

for(var i = 0; i < 4; i++) {
    var dv = document.createElement("div");
    var ch = document.createElement('button');
    ch.setAttribute('data-index', i);
    choiceArray.push(ch);
    divArray.push(dv);
};

// start quiz
function startQuiz() {
    startTimer();
    buildQuestion();
};

// timer start when quiz start
function startTimer() {
    var timeInterval = setInterval(function() {
        secondsLeft--;
        timer.textContent = 'Time : ' +secondsLeft+ ' sec';

        if(secondsLeft <= 0 || (questionIndex > totalQuestions-1)){
            result.style.display = 'none';
            quiz.style.display = 'none';
            viewResult();
            clearInterval(timeInterval);
            timer.textContent = "";
        }
    }, 1000);
};

function buildQuestion(){
    questionEl.style.display = 'none';
    mainContent.style.display = 'none';
    quizContent.style.display = 'none';

    if(questionIndex > totalQuestions -1 ) {
        return;
    }
    else {
        ans = questions[questionIndex].answer;

        questionEl.innerHTML = questions[questionIndex].title;
        questionEl.style.display = 'block';

        for(var j = 0; j < 4; j++) {
            var index = choiceArray[j].getAttribute('data-index');
            choiceArray[j].textContent = (+index+1) + '. ' + questions[questionIndex].choices[index];
            divArray[j].appendChild(choiceArray[j]);
            quizContent.appendChild(divArray[j]);
        }
    }

    quizContent.style.display = 'block';
};

highScoreLink.addEventListener('click', function() {
    mainContent.style.display = 'none';
    navLink.style.display = 'none';

    previousScores = JSON.parse(localStorage.getItem('previousScores'));

    showHighscroes();
});

startBtn.addEventListener('click', startQuiz);