const quizData = [
    {
        question: "What is JavaScript mainly used for?",
        answers: [
            { text: "Structuring web pages", correct: false },
            { text: "Styling web pages", correct: false },
            { text: "Adding interactivity", correct: true },
            { text: "Structuring web pages", correct: false },
        ]
    },
    {
        question: "What is a closure?",
        answers: [
            { text: "A loop inside a function", correct: false },
            { text: "A function inside another function", correct: true },
            { text: "A variable outside a function", correct: false },
            { text: "A type of object", correct: false },
        ]
    },
    {
        question: "What happens with an asynchronous task",
        answers: [
            { text: "Code stops and waits", correct: false },
            { text: "Code skips it", correct: false },
            { text: "Code continues running", correct: true },
            { text: "Code restarts", correct: false },
        ]
    },
    {
        question: "What does 'this' refer to?",
        answers: [
            { text: "The global object", correct: false },
            { text: "The calling object", correct: true },
            { text: "The function itself", correct: false },
            { text: "The parent function", correct: false },
        ]
    },
    {
        question: "What does the event loop do?",
        answers: [
            { text: "Runs code in order", correct: false },
            { text: "Manages async tasks", correct: true },
            { text: "Stops on delays", correct: false },
            { text: "Compiles JavaScript", correct: false },
        ]
    }
];

const questionElement = document.getElementById("quiz-question");
const answerButtons = document.getElementById("options");
const nextButton = document.getElementById("next-btn");
const progressElement = document.getElementById("progress");

// Quiz state
let currentQuestionIndex = 0;
let score = 0;

// Start Quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

// Display Question
function showQuestion() {
    resetState();
    let currentQuestion = quizData[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("opt-btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
    progressElement.textContent = `Question ${currentQuestionIndex + 1} of ${quizData.length}`;
}

// Reset Quiz
function resetState() {
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    };
    progressElement.style.display = "block";
}

// Selecting an option
function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
}

// Display score at end of quiz
function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${quizData.length}!`;
    nextButton.innerHTML = "Try Again";
    progressElement.style.display = "none";
}

// Next button function
function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < quizData.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});


startQuiz();