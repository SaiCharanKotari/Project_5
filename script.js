const quizData = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        answer: "Paris"
    },
    {
        question: "What is 5 + 3?",
        options: ["5", "8", "10", "15"],
        answer: "8"
    },
    {
        question: "Which is the largest planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: "Jupiter"
    },
    {
        question: "What is the national language of Japan?",
        options: ["Chinese", "Korean", "Japanese", "Hindi"],
        answer: "Japanese"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 10;
let timer;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");
const feedbackEl = document.getElementById("feedback");
const restartBtn = document.getElementById("restart-btn");
const timerEl = document.getElementById("time");

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resultEl.classList.add("hide");
    nextBtn.style.display = "none";
    loadQuestion();
}

function loadQuestion() {
    clearInterval(timer);
    timeLeft = 10;
    timerEl.textContent = timeLeft;
    timer = setInterval(countdown, 1000);

    const currentQuestion = quizData[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;
    optionsEl.innerHTML = "";

    currentQuestion.options.forEach(option => {
        const btn = document.createElement("button");
        btn.textContent = option;
        btn.classList.add("option");
        btn.addEventListener("click", () => selectAnswer(option, btn));
        optionsEl.appendChild(btn);
    });
}

function countdown() {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft === 0) {
        clearInterval(timer);
        showNextQuestion();
    }
}

function selectAnswer(selected, btn) {
    clearInterval(timer);
    const correctAnswer = quizData[currentQuestionIndex].answer;
    if (selected === correctAnswer) {
        score++;
        btn.classList.add("correct");
    } else {
        btn.classList.add("wrong");
    }
    document.querySelectorAll(".option").forEach(button => button.disabled = true);
    nextBtn.style.display = "block";
}

function showNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
        nextBtn.style.display = "none";
    } else {
        showResults();
    }
}

function showResults() {
    document.getElementById("quiz").classList.add("hide");
    resultEl.classList.remove("hide");
    scoreEl.textContent = score;

    let feedbackMsg = "";
    if (score === quizData.length) {
        feedbackMsg = "🏆 Excellent! You got all correct!";
    } else if (score >= quizData.length / 2) {
        feedbackMsg = "😊 Good job! Try again for a perfect score!";
    } else {
        feedbackMsg = "😢 Keep practicing! You can do better!";
    }

    feedbackEl.textContent = feedbackMsg;
}

nextBtn.addEventListener("click", showNextQuestion);
restartBtn.addEventListener("click", () => {
    document.getElementById("quiz").classList.remove("hide");
    startQuiz();
});

startQuiz();
