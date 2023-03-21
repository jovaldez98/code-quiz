var timeLeftEl = document.querySelector('#timeleft');
var headingEl = document.querySelector('#heading');
var contentEl = document.querySelector('#content');
var startBtnEl = document.querySelector('#start');
var timer;
var timeLeft;
var questionIndex = 0;


// list of all questions, choices, and answers

var questions = [
    {
      title: 'Commonly used data types DO NOT include:',
      choices: ['strings', 'booleans', 'alerts', 'numbers'],
      answer: 'alerts',
    },
    {
      title: 'The condition in an if / else statement is enclosed within ____.',
      choices: ['quotes', 'curly brackets', 'parentheses', 'square brackets'],
      answer: 'parentheses',
    },
    {
      title: 'Arrays in JavaScript can be used to store ____.',
      choices: [
        'numbers and strings',
        'other arrays',
        'booleans',
        'all of the above',
      ],
      answer: 'all of the above',
    },
    {
      title:
        'String values must be enclosed within ____ when being assigned to variables.',
      choices: ['commas', 'curly brackets', 'quotes', 'parentheses'],
      answer: 'quotes',
    },
    {
      title:
        'A very useful tool used during development and debugging for printing content to the debugger is:',
      choices: ['JavaScript', 'terminal / bash', 'for loops', 'console.log'],
      answer: 'console.log',
    },
  ];

  //var timeLeft = 60;
//   var indexCurrentQuestion = 0;

  function renderNextQuestion() {
    contentEl.innerHTML = '';
    var currentQuestion = questions[questionIndex];

    headingEl.textContent = currentQuestion.title;

    for (var i = 0; i < currentQuestion.choices.length; i++) {
        var buttonEl = document.createElement('button');
        buttonEl.setAttribute('class', 'choice');
        buttonEl.setAttribute('value', currentQuestion.choices[i]);
        buttonEl.textContent = currentQuestion.choices[i];
        contentEl.appendChild(buttonEl);
        buttonEl.onclick = btnClick;
    }
  };

   function startTimer () {
    //timeLeftEl.textContent = timeLeft;

    timer = setInterval(function () {
        timeLeft--;
        timeLeftEl.textContent = timeLeft;

        if (timeLeft === 0) {
            endQuiz();
        }
    }, 1000);
  };

  // When the user clicks on a choice button
  function startQuiz () {
   // event.preventDefault(); 
    timeLeft = 60;
    startBtnEl.classList.add('hide');
    startTimer();
    renderNextQuestion();
  };

  function btnClick () {
    //  console.log('wrong', event);
    // if (event.target.matches('.choice')) {
    //     console.log();
    //     console.log();

        // if (event.target.textContent === questionIndex.answer) {
        //     // Increase the current score
        //     // increase the indexOfCurrentQuestion
        //     // renderNextQuestion
        //     console.log('Yay!', questionIndex.answer);
            
        //     document.getElementById('#content').innerHTML = `Your score is ${score}`;
        // }
        //   else {
        //     currentQuestion++;
        //     score++;
        //     renderNextQuestion();
        //   }
    // }
    //   else {
    //     //var errorMessage = document.createElement('error message');
    //     console.log('Please select an answer');
    //   }

    if (this.value !== questions[questionIndex].answer) {
        timeLeft -= 15;
        if (timeLeft <= 0 ) {
            timeLeft = 0;
            timeLeftEl.textContent = timeLeft;
        }
    } 

    questionIndex++;

    if (questionIndex === questions.length){
        endQuiz();
    } else {
        renderNextQuestion(); 
    }
  };

  function endQuiz () {
    clearInterval(timer);
    contentEl.classList.add('hide');
    document.querySelector('.end-quiz').classList.remove('hide');
    document.getElementById('final-score').textContent = timeLeft;
    document.getElementById('save-btn').addEventListener('click', function() {
        var initials = document.getElementById('initials').value;
        var newScore = {
            initials: initials,
            score:timeLeft
        }
        var highScores = JSON.parse(localStorage.getItem('high-scores')) || [];
        highScores.push(newScore);
        localStorage.setItem('high-scores', JSON.stringify(highScores));
        
    });
  }
  startBtnEl.addEventListener('click', startQuiz)