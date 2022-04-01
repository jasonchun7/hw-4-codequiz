var startBtn = document.querySelector('#startquiz');
var timer = document.querySelector('#timer');
var mainContent = document.querySelector('#mainContent');
var questionEl = document.querySelector('#title');
var quizContent = document.querySelector('#quiz');
var score = document.querySelector('#score');


var secondsLeft = 75, questionIndex = 0, correct = 0;
var totalQuestions = questions.length; 
var question, option1, option2, option3, option4, ans;
var choiceArray = [], divArray = [];

// create buttons for choices
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

// start timer when quiz start
function startTimer() {
    var timeInterval = setInterval(function() {
        secondsLeft--;
        timer.textContent = 'Time : ' +secondsLeft+ ' sec';

        if(secondsLeft <= 0 || (questionIndex > totalQuestions - 1)) {
            quizContent.style.display = 'none';
            viewResult();
            clearInterval(timeInterval);
            timer.textContent = "";
        }
    }, 1000);
};

// questions display after start button
function buildQuestion() {
    questionEl.style.display = 'none';
    mainContent.style.display = 'none';
    quizContent.style.display = 'none';

    if(questionIndex > totalQuestions - 1 ) {
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

// event listener for option buttons
quizContent.addEventListener('click', function(event) {
    var element = event.target;
    var userAnswer = element.textContent;
    var userOption = userAnswer.substring(3, userAnswer.length);
    
        if(userOption == ans) {
            correct++;
            
        }
        else {
            secondsLeft -= 10;

        }
        
        questionIndex++;
        buildQuestion();
});

// show score when quiz completes
function viewResult() {
    questionEl.innerHTML = "Quiz Completed";
    questionEl.style.display = 'block';

    var s = document.createElement('p');
    s.textContent = 'Your final score : ' + correct;
    score.appendChild(s);

    var form = document.createElement('form');

    var label = document.createElement('label');
    label.textContent = 'Enter Name : ';

    var text = document.createElement('input');
    text.setAttribute('id', 'nameInput');
    
    var scoreButton = document.createElement('button');
    scoreButton.textContent = 'Submit';

    form.appendChild(label);
    form.appendChild(text);
    form.appendChild(scoreButton);

    score.appendChild(form);
};


startBtn.addEventListener('click', startQuiz);