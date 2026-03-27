/* ============================================================
   1. THE QUESTIONS DATA
   This is the list of questions the game will ask.
   ============================================================ */
const quizData = [
  {
    question: "Which planet is known as the Red Planet?",
    a: "Earth",
    b: "Mars",
    c: "Jupiter",
    d: "Saturn",
    correct: "b",
  },
  {
    question: "What is the capital of France?",
    a: "London",
    b: "Berlin",
    c: "Paris",
    d: "Madrid",
    correct: "c",
  },
  {
    question: "Which language runs in a web browser?",
    a: "Java",
    b: "C",
    c: "Python",
    d: "JavaScript",
    correct: "d",
  },
  {
    question: "What does CSS stand for?",
    a: "Central Style Sheets",
    b: "Cascading Style Sheets",
    c: "Cascading Simple Sheets",
    d: "Cars SUVs Sailboats",
    correct: "b",
  },
  {
    question: "Which year was JavaScript created?",
    a: "1996",
    b: "1995",
    c: "1994",
    d: "none of the above",
    correct: "b",
  },
];

/* ============================================================
   2. SELECTING ELEMENTS
   We need to tell JS which HTML parts we want to control.
   ============================================================ */
const quiz = document.getElementById("quiz-screen");
const answerEls = document.querySelectorAll(".answer-btn"); // We'll use this later
const questionEl = document.getElementById("question-text");
const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");

// Screens
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

// Game Variables
let currentQuiz = 0;
let score = 0;

/* ============================================================
   3. THE LOADING ENGINE
   This function puts the text and choices onto the screen.
   ============================================================ */
function loadQuiz() {
  // 1. Deselect any previous answers (important for the next question!)
  deselectAnswers();

  // 2. Get the current question data from our array
  const currentQuizData = quizData[currentQuiz];

  // 3. Update the H2 text with the question
  questionEl.innerText = currentQuizData.question;

  // 4. Update the Answer Buttons (we'll target them by ID)
  // We use innerHTML to clear and rebuild the buttons
  const answerContainer = document.getElementById("answer-container");
  answerContainer.innerHTML = `
        <button class="answer-btn" id="a">${currentQuizData.a}</button>
        <button class="answer-btn" id="b">${currentQuizData.b}</button>
        <button class="answer-btn" id="c">${currentQuizData.c}</button>
        <button class="answer-btn" id="d">${currentQuizData.d}</button>
    `;

  // 5. Update the progress bar and question count
  updateProgress();

  // 6. Add Click Listeners to the NEWLY created buttons
  setupButtonListeners();
}

/* --- Helper: Clears any selected state --- */
function deselectAnswers() {
  // This will be used once we add the "Selected" logic
}

/* --- Helper: Updates the numbers and progress bar --- */
function updateProgress() {
  const currentNum = currentQuiz + 1;
  document.getElementById("current-question").innerText = currentNum;

  // Calculate percentage for CSS width (e.g., 1/5 = 20%)
  const progressPercent = (currentNum / quizData.length) * 100;
  document.getElementById("progress").style.width = progressPercent + "%";
}

/* ============================================================
   4. THE BRAIN (CHECKING ANSWERS)
   This function runs every time a user clicks an answer.
   ============================================================ */
function setupButtonListeners() {
  const answerButtons = document.querySelectorAll(".answer-btn");

  answerButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const selectedAnswer = e.target.id;
      const correctAnswer = quizData[currentQuiz].correct;

      // 1. Disable all buttons so they can't click twice
      answerButtons.forEach((btn) => btn.classList.add("disabled"));

      // 2. Check if the answer is right
      if (selectedAnswer === correctAnswer) {
        e.target.classList.add("correct");
        score++;
        document.getElementById("score").innerText = score;
      } else {
        e.target.classList.add("wrong");
        // Highlight the correct one so the user learns
        document.getElementById(correctAnswer).classList.add("correct");
      }

      // 3. Wait 1.5 seconds, then move to the next question
      setTimeout(() => {
        currentQuiz++;

        if (currentQuiz < quizData.length) {
          loadQuiz();
        } else {
          showResults();
        }
      }, 1500);
    });
  });
}

/* ============================================================
   5. THE FINISH LINE (RESULTS)
   This function runs when all questions are answered.
   ============================================================ */
function showResults() {
  // 1. Hide the quiz and show the result screen
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  // 2. Update the final score text
  document.getElementById("final-score").innerText = score;

  // Update all "total-questions" spans (we have 2 in the HTML)
  const totalSpans = document.querySelectorAll(".total-questions");
  totalSpans.forEach((span) => (span.innerText = quizData.length));

  // 3. Set a personalized message based on how Zain's players did
  const messageEl = document.getElementById("result-message");
  if (score === quizData.length) {
    messageEl.innerText = "Perfect Score! You're a Genius! 🏆";
  } else if (score > quizData.length / 2) {
    messageEl.innerText = "Great Job! You really know your stuff! ✨";
  } else {
    messageEl.innerText = "Good effort! Want to try again? 🔄";
  }
}

/* ============================================================
   6. GLOBAL CONTROLS (START & RESTART)
   This connects the very first and very last buttons.
   ============================================================ */

// Start Button
startBtn.addEventListener("click", () => {
  startScreen.classList.remove("active");
  quizScreen.classList.add("active");
  loadQuiz();
});

// Restart Button
restartBtn.addEventListener("click", () => {
  // Reset the game variables
  currentQuiz = 0;
  score = 0;
  document.getElementById("score").innerText = score;

  // Go back to the Start Screen
  resultScreen.classList.remove("active");
  startScreen.classList.add("active");
});
