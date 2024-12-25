let currentQuestion = 1;
let answeredQuestions = new Set();
let markedQuestions = new Set();
let totalQuestions; // Declare totalQuestions here

let timerInterval;
let timeLeft = 600; // 10 minutes

const questionArea = document.getElementById('question-area');
const questionNumbers = document.getElementById('question-numbers');
const timerDisplay = document.getElementById('timer');
const answeredDisplay = document.getElementById('answered');
const markedDisplay = document.getElementById('marked');
const notVisitedDisplay = document.getElementById('not-visited');
const markReview = document.getElementById('mark-review');
const clearResponse = document.getElementById('clear-response');
const saveNext = document.getElementById('save-next');
const togglePanel = document.getElementById("toggle-panel");
const rightPanel = document.getElementById("right-panel");
const mainQuestionArea = document.getElementById("main-question-area");

function updateTimerDisplay() {
    if (timeLeft >= 0) {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `Time Left: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        timeLeft--;
    } else {
        clearInterval(timerInterval);
        timerDisplay.textContent = "Time's Up!";
        document.getElementById('quiz-form').submit();
    }
}

function startTimer() {
    updateTimerDisplay();
    timerInterval = setInterval(updateTimerDisplay, 1000);
}

function displayQuestion(questionId) {
    const questions = document.querySelectorAll('.question');
    questions.forEach(q => q.style.display = 'none');
    const questionToShow = document.getElementById(`q${questionId}`);
    if (questionToShow) {
        questionToShow.style.display = 'block';
    }
}

function updateQuestionNumbers() {
    questionNumbers.innerHTML = '';
    for (let i = 1; i <= totalQuestions; i++) {
        const div = document.createElement('div');
        div.textContent = i;
        div.dataset.questionNumber = i;

        div.addEventListener('click', (event) => {
            currentQuestion = parseInt(event.target.dataset.questionNumber);

            // Find the correct question ID based on the displayed question number
            const questions = document.querySelectorAll('.question');
            let questionIdToDisplay;
            questions.forEach(question => {
                if (parseInt(question.querySelector('h3').textContent.replace('Question No. ', '')) === currentQuestion) {
                    questionIdToDisplay = parseInt(question.dataset.questionId);
                }
            });

            if (questionIdToDisplay) {
                displayQuestion(questionIdToDisplay);
            }

            updateQuestionNumberStyles();
        });

        questionNumbers.appendChild(div);
    }
    updateQuestionNumberStyles();
}

function updateQuestionNumberStyles() {
    let answeredCount = answeredQuestions.size;
    let markedCount = markedQuestions.size;
    let notVisitedCount = totalQuestions - answeredCount - markedCount;

    answeredDisplay.textContent = answeredCount;
    markedDisplay.textContent = markedCount;
    notVisitedDisplay.textContent = notVisitedCount;

    const numDivs = questionNumbers.querySelectorAll('div');
    numDivs.forEach((div, index) => {
        const questionNumber = index + 1;
        div.classList.remove('answered', 'marked', 'active');

        // Find the corresponding question ID
        let questionId;
        const questions = document.querySelectorAll('.question');
        questions.forEach(question => {
            if (parseInt(question.querySelector('h3').textContent.replace('Question No. ', '')) === questionNumber) {
                questionId = parseInt(question.dataset.questionId);
            }
        });

        if (questionNumber === currentQuestion) {
            div.classList.add('active');
        } else if (questionId && answeredQuestions.has(questionId)) {
            div.classList.add('answered');
        } else if (questionId && markedQuestions.has(questionId)) {
            div.classList.add('marked');
        }
    });
}

// Button Event Listeners
markReview.addEventListener('click', () => {
    if (!isOptionSelected()) {
        displayWarning();
        return;
    }

    markedQuestions.add(findCurrentQuestionId());
    if (answeredQuestions.has(findCurrentQuestionId())) {
        answeredQuestions.delete(findCurrentQuestionId());
    }

    moveToNextQuestion();
    updateQuestionNumberStyles();
});

clearResponse.addEventListener('click', () => {
    const currentQuestionRadios = document.querySelectorAll(`input[name="q${findCurrentQuestionId()}"]`);
    currentQuestionRadios.forEach(radio => radio.checked = false);

    answeredQuestions.delete(findCurrentQuestionId());
    markedQuestions.delete(findCurrentQuestionId());
    updateQuestionNumberStyles();
});

saveNext.addEventListener('click', () => {
    if (!isOptionSelected()) {
        displayWarning();
        return;
    }
    answeredQuestions.add(findCurrentQuestionId());
    markedQuestions.delete(findCurrentQuestionId());
    moveToNextQuestion();
    updateQuestionNumberStyles();
});

// Helper Functions
function isOptionSelected() {
    return Array.from(document.querySelectorAll(`input[name="q${findCurrentQuestionId()}"]`)).some(radio => radio.checked);
}

function displayWarning() {
    let warningMessage = document.getElementById('warning-message');
    if (!warningMessage) {
        warningMessage = document.createElement('p');
        warningMessage.id = 'warning-message';
        warningMessage.textContent = "Please select an option before proceeding.";
        const questionArea = document.getElementById('question-area');
        questionArea.insertAdjacentElement('afterend', warningMessage);
    } else {
        warningMessage.style.display = 'block';
    }
    setTimeout(() => {
        warningMessage.style.display = 'none';
    }, 3000);
}

function moveToNextQuestion() {
    currentQuestion++;
    if (currentQuestion > totalQuestions) {
        currentQuestion = 1;
    }

    // Find the correct question ID based on the displayed question number
    const questions = document.querySelectorAll('.question');
    let questionIdToDisplay;
    questions.forEach(question => {
        if (parseInt(question.querySelector('h3').textContent.replace('Question No. ', '')) === currentQuestion) {
            questionIdToDisplay = parseInt(question.dataset.questionId);
        }
    });

    if (questionIdToDisplay) {
        displayQuestion(questionIdToDisplay);
    }
    updateQuestionNumberStyles();
}

function findCurrentQuestionId() {
    let currentQuestionId;
    const questions = document.querySelectorAll('.question');
    questions.forEach(question => {
        if (question.style.display === 'block') {
            currentQuestionId = parseInt(question.dataset.questionId);
        }
    });
    return currentQuestionId;
}

document.addEventListener('DOMContentLoaded', () => {
    totalQuestions = document.querySelectorAll('.question').length;
    updateQuestionNumbers();
    startTimer();
    displayQuestion(1);

    const quizForm = document.getElementById('quiz-form');
    quizForm.addEventListener('submit', (event) => {
        clearInterval(timerInterval);
        let score = 0;
        for (let i = 1; i <= totalQuestions; i++) {
            const selectedOption = document.querySelector(`input[name="q${i}"]:checked`);
            if (selectedOption && selectedOption.dataset.correct === "true") {
                score++;
            }
        }
        window.location.href = `result.html?score=${score}&totalQuestions=${totalQuestions}`;
    });

    togglePanel.addEventListener("click", () => {
        rightPanel.classList.toggle("show");
        if (rightPanel.classList.contains("show")) {
            mainQuestionArea.classList.remove("col-md-12");
            mainQuestionArea.classList.add("col-md-9");
        } else {
            mainQuestionArea.classList.remove("col-md-9");
            mainQuestionArea.classList.add("col-md-12");
        }
    });

});