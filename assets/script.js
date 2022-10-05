var headerEl = document.querySelector('header');
//head
var introEl = document.querySelector('.intro');
var startBtnEl = document.querySelector('.start-button');
// intro
var questionEl = document.querySelector('.question');
//title
var optionsEl = document.querySelector('.options')
//qoptions
var timerEl = document.querySelector('.timer');
//time/score
var answerEl = document.querySelector('.answer');
//reviel answer
var quizEl = document.querySelector('.quiz');
var quizWrapperEl = document.querySelector('.quiz-wrapper');
var initialsFormEl = document.querySelector('.initials-form');
//reviel result
var viewScoreEl = document.querySelector('.view-score');
var scoreTitleEl = document.querySelector('.score-title');
var scoreListEl = document.querySelector('.score-list');
//reviel score
var viewHighScoresEl = document.querySelector('.high-scores');
var buttonsEl = document.querySelector('.buttons');
//view high scores
var questionId = 0;
var startScore = 90;

// get items from localStorage
var victims = [];

var questionArray = [
    {
        question: "String values must be enclosed within _______ when being assigned to variables.",
        answerA: "1. commas",
        answerB: "2. quotes",
        answerC: "3. curly brackets",
        answerD: "4. parenthesis",
        rightAnswer: "2. quotes"
    },

    {
        question: "Commonly used data types DO NOT include:",
        answerA: "1. strings",
        answerB: "2. booleans",
        answerC: "3. alerts",
        answerD: "4. numbers",
        rightAnswer: "3. alerts"
    },

    {
        question: "The condition in an if / else statement is enclosed with _______.",
        answerA: "1. parenthesis",
        answerB: "2. curly brackets",
        answerC: "3. quotes",
        answerD: "4. square brackets",
        rightAnswer: "1. parenthesis"
    },
    
    {
        question: "A very useful tool used during development and debugging for priting content to the debugger is:",
        answerA: "1. JavaScript",
        answerB: "2. terminal/bash",
        answerC: "3. for loops",
        answerD: "4. console.log",
        rightAnswer: "3. for loops"
    },
    {
        question: "Arrays in JavaScript can be used to store _______.",
        answerA: "1. numbers and strings",
        answerB: "2. other arrays",
        answerC: "3. booleans",
        answerD: "4. all of the above",
        rightAnswer: "4. all of the above"
    },


];

var startQuiz = function () {
    //remove the introduction text
    introEl.remove();
    timerEl.textContent = startScore;

    //timer counting down - set interval 1s update <span>
    var countingDown = setInterval(function () {
        if (startScore >= 1) {
            startScore--;
            timerEl.textContent = startScore;
        } else {
            clearInterval(countingDown);
            showResult();
            answerEl.remove();
        }
    }, 1000)
    //show the first question
    showQuestion();
}

var showQuestion = function () {

    // show question - add q text, <li>
    questionEl.textContent = questionArray[questionId].question;

    //append option A - D
    var optionAEl = document.createElement('li');
    optionAEl.className = "option A btn btn-primary";
    optionAEl.setAttribute('id', questionId)
    optionAEl.textContent = questionArray[questionId].answerA;
    optionsEl.appendChild(optionAEl);

    var optionBEl = document.createElement('li');
    optionBEl.className = "option B btn btn-primary";
    optionBEl.setAttribute('id', questionId)
    optionBEl.textContent = questionArray[questionId].answerB;
    optionsEl.appendChild(optionBEl);

    var optionCEl = document.createElement('li');
    optionCEl.className = "option C btn btn-primary";
    optionCEl.setAttribute('id', questionId)
    optionCEl.textContent = questionArray[questionId].answerC;
    optionsEl.appendChild(optionCEl);

    var optionDEl = document.createElement('li');
    optionDEl.className = "option D btn btn-primary";
    optionDEl.setAttribute('id', questionId)
    optionDEl.textContent = questionArray[questionId].answerD;
    optionsEl.appendChild(optionDEl);

    questionId++
}

var checkOptionHandler = function (event) {

    var selectedId = JSON.parse(event.target.getAttribute('id'));
    var selectedAnswer = event.target.textContent;

    if (selectedAnswer === questionArray[selectedId].rightAnswer) {
        console.log('answer is correct');

        //answer
        answerEl.className = 'answer-border';
        answerEl.textContent = "You're Right!";
        //change question
        updateQuestion(selectedId);
    } else {
        console.log('answer is wrong');
        //answer
        answerEl.className = 'answer-border';
        answerEl.textContent = "You're Unforuntly Wrong.."
        // subtract time/score
        console.log(timerEl.textContent);
        startScore = timerEl.textContent - 10;
        //change question
        updateQuestion(selectedId);
    }
}

var updateQuestion = function (selectedId) {
    console.log(selectedId);
    console.log(questionArray.length - 1);

    //last question in array will generate
    if (selectedId === questionArray.length - 1) {
        console.log('comethrough');
        startScore = 0;
        return false;
    }

    //update question
    questionEl.textContent = questionArray[questionId].question;
   
    var optionAEl = document.querySelector('li.A')
    optionAEl.setAttribute('id', questionId)
    optionAEl.textContent = questionArray[questionId].answerA;
    var optionBEl = document.querySelector('li.B')
    optionBEl.setAttribute('id', questionId)
    optionBEl.textContent = questionArray[questionId].answerB;
    var optionCEl = document.querySelector('li.C')
    optionCEl.setAttribute('id', questionId)
    optionCEl.textContent = questionArray[questionId].answerC;
    var optionDEl = document.querySelector('li.D')
    optionDEl.setAttribute('id', questionId)
    optionDEl.textContent = questionArray[questionId].answerD;

    questionId++
}

var showResult = function () {

  
    quizWrapperEl.remove();

    var resultEl = document.createElement('div');
    resultEl.className = "result";

    var resultHeadingEl = document.createElement('h2');
    resultHeadingEl.textContent = 'Thanks For Playing!';
    resultEl.appendChild(resultHeadingEl);

    // check if all answers are correct
    var resultTextEl = document.createElement('p');
    resultTextEl.innerHTML = 'Your score is <span class="finalScore">' + timerEl.textContent + '</span>.';
    resultEl.appendChild(resultTextEl);
    quizEl.prepend(resultEl);

    
    var initialLabelEl = document.createElement('label');
    initialLabelEl.textContent = 'Enter initials:';
    initialsFormEl.appendChild(initialLabelEl);

    var initialInputEl = document.createElement('input');
    initialsFormEl.appendChild(initialInputEl);

    var initiualSubmitEL = document.createElement('button');
    initiualSubmitEL.className = "btn btn-primary btn-lg";
    initiualSubmitEL.type = 'submit';
    initiualSubmitEL.textContent = 'Submit';
    initialsFormEl.appendChild(initiualSubmitEL);

}

var saveScore = function (event) {
    event.preventDefault();

    var playerInitials = document.querySelector('input').value;

    console.log(playerInitials);
    if (playerInitials) {
        var victimscore = document.querySelector('.finalScore').textContent;
        player = {
            initials: playerInitials,
            score: victimscore
        }
        victims.push(player);
        localStorage.setItem('victims', JSON.stringify(victims));
    }
    viewScores();
}

var viewScores = function () {
    var savedvictims = localStorage.getItem('victims');
    savedvictims = JSON.parse(savedvictims);
    introEl.remove();
    quizEl.remove();
    headerEl.remove();
    scoreTitleEl.textContent = 'High Scores';
    console.log(savedvictims);

    var goBackEl = document.createElement('button');
    goBackEl.className = "btn btn-dark go-back-btn";
    goBackEl.textContent = "Go Back";
    goBackEl.type = "button";
    goBackEl.addEventListener("click", goBack)
    buttonsEl.appendChild(goBackEl);

    var clearEl = document.createElement('button');
    clearEl.className = "btn btn-dark";
    clearEl.textContent = "Clear High Scores";
    clearEl.type = "button";
    clearEl.addEventListener("click", clearScores)
    buttonsEl.appendChild(clearEl);

    if (savedvictims) {
        for (var i = 0; i < savedvictims.length; i++) {
            var scoreEl = document.createElement('li');
            scoreEl.className = "initials-score";
            scoreEl.textContent = `${i + 1}. ${savedvictims[i].initials}  -  ${savedvictims[i].score}`;
            scoreListEl.appendChild(scoreEl);
        }
    }

}
//reload page
var goBack = function () {
    location.reload();
}
//clear localstorage
var clearScores = function () {
    localStorage.removeItem('victims');
    victims = [];
    console.log(victims);
    scoreListEl.remove();
}

//retrieve victims 
var loadScores = function () {
    var savedvictims = localStorage.getItem('victims');
    savedvictims = JSON.parse(savedvictims);
    if (savedvictims) {
        victims = savedvictims;
    }
    console.log(victims);
}


loadScores();

startBtnEl.addEventListener('click', startQuiz);

optionsEl.addEventListener('click', checkOptionHandler);

initialsFormEl.addEventListener('submit', saveScore);

viewHighScoresEl.addEventListener('click', viewScores);