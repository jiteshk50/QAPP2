let currentQuestion = 1;
let answeredQuestions = new Set();
let markedQuestions = new Set();
let questionIds = [];
let questionNumbersInitialized = false;

let timerInterval;
let timeLeft = 60;

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
    const questionToShow = document.querySelector(`.question[data-question-id="${questionId}"]`);
    if (questionToShow) {
        questionToShow.style.display = 'block';
    }
}

function updateQuestionNumbers() {
    if (questionNumbersInitialized) return;

    questionNumbers.innerHTML = '';
    questionIds = [];
    const questions = document.querySelectorAll('.question');
    const uniqueQuestionIds = new Set();

    questions.forEach((question) => {
        const questionId = parseInt(question.dataset.questionId);
        if (!uniqueQuestionIds.has(questionId)) {
            uniqueQuestionIds.add(questionId);
            questionIds.push(questionId);

            const div = document.createElement('div');
            div.textContent = questionIds.length;
            div.dataset.questionId = questionId;

            div.addEventListener('click', (event) => {
                const clickedQuestionId = parseInt(event.target.dataset.questionId);
                currentQuestion = questionIds.indexOf(clickedQuestionId) + 1;
                displayQuestion(clickedQuestionId);
                updateQuestionNumberStyles();
            });
            questionNumbers.appendChild(div);
        }
    });
    updateQuestionNumberStyles();
    questionNumbersInitialized = true;
}

function updateQuestionNumberStyles() {
    let answeredCount = answeredQuestions.size;
    let markedCount = markedQuestions.size;
    let notVisitedCount = questionIds.length - answeredCount - markedCount;

    answeredDisplay.textContent = answeredCount;
    markedDisplay.textContent = markedCount;
    notVisitedDisplay.textContent = notVisitedCount;

    const numDivs = questionNumbers.querySelectorAll('div');
    numDivs.forEach((div) => {
        const questionId = parseInt(div.dataset.questionId);
        div.classList.remove('answered', 'marked', 'active');
        const displayedNumber = questionIds.indexOf(questionId) + 1;

        if (displayedNumber === currentQuestion) {
            div.classList.add('active');
        } else if (answeredQuestions.has(questionId)) {
            div.classList.add('answered');
        } else if (markedQuestions.has(questionId)) {
            div.classList.add('marked');
        }
    });
}

function findCurrentQuestionId() {
    const displayedQuestion = document.querySelector('.question[style*="display: block"]');
    if (displayedQuestion) {
        return parseInt(displayedQuestion.dataset.questionId);
    }
    return null;
}

function isOptionSelected() {
    const currentQuestionId = findCurrentQuestionId();
    if (currentQuestionId === null) return false;
    return Array.from(document.querySelectorAll(`input[name="q${currentQuestionId}"]`)).some(radio => radio.checked);
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
    const currentQuestionId = findCurrentQuestionId();
    if (currentQuestionId === null) return;

    const currentIndex = questionIds.indexOf(currentQuestionId);
    const nextIndex = (currentIndex + 1) % questionIds.length;
    currentQuestion = nextIndex + 1;
    const nextQuestionId = questionIds[nextIndex];
    displayQuestion(nextQuestionId);
    updateQuestionNumberStyles();
}

markReview.addEventListener('click', () => {
    const currentQuestionId = findCurrentQuestionId();
    if (currentQuestionId === null) return;

    if (!isOptionSelected()) {
        displayWarning();
        return;
    }
    markedQuestions.add(currentQuestionId);
    if (answeredQuestions.has(currentQuestionId)) {
        answeredQuestions.delete(currentQuestionId);
    }
    moveToNextQuestion();
    updateQuestionNumberStyles();
});

clearResponse.addEventListener('click', () => {
    const currentQuestionId = findCurrentQuestionId();
    if (currentQuestionId === null) return;
    const currentQuestionRadios = document.querySelectorAll(`input[name="q${currentQuestionId}"]`);
    currentQuestionRadios.forEach(radio => radio.checked = false);

    answeredQuestions.delete(currentQuestionId);
    markedQuestions.delete(currentQuestionId);
    updateQuestionNumberStyles();
});

saveNext.addEventListener('click', () => {
    const currentQuestionId = findCurrentQuestionId();
    if (currentQuestionId === null) return;

    if (!isOptionSelected()) {
        displayWarning();
        return;
    }
    answeredQuestions.add(currentQuestionId);
    markedQuestions.delete(currentQuestionId);
    moveToNextQuestion();
    updateQuestionNumberStyles();
});

document.addEventListener('DOMContentLoaded', () => {
    updateQuestionNumbers();
    if (questionIds.length > 0) {
        displayQuestion(questionIds[0]);
    }
    startTimer();

    const quizForm = document.getElementById('quiz-form');
    quizForm.addEventListener('submit', (event) => {
        clearInterval(timerInterval);
        let score = 0;
        const questions = document.querySelectorAll('.question');
        questions.forEach(question => {
            const questionId = parseInt(question.dataset.questionId);
            const selectedOption = document.querySelector(`input[name="q${questionId}"]:checked`);
            if (selectedOption && selectedOption.value === question.dataset.correct) {
                score++;
            }
        });
        window.location.href = `show_result?score=${score}&totalQuestions=${questionIds.length}`;
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