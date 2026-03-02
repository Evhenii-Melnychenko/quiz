import { state } from "./state.js";
import { questions } from "./questions.js";
import { renderQuestion } from "./ui.js";

export function closeQuiz(quizSection) {
  quizSection.classList.remove("active");
  document.body.style.overflow = "";
}

export function goNext() {
  const isLast = state.current === questions.length - 1;

  if (!isLast) {
    state.current++;
    renderQuestion();

    return;
  }
}

export function goPrev(quizSection) {
  if (state.current === 0) {
    closeQuiz(quizSection);
    
    return;
  }

  state.current--;
  renderQuestion();
}