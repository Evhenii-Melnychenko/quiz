import { renderQuestion } from "./ui.js";
import { closeQuiz, goNext, goPrev } from "./quiz.js";

export function initQuizEvents() {
  const openBtn = document.querySelector(".course__button");
  const quizSection = document.querySelector(".quiz");
  const closeBtn = document.querySelector(".quiz__close");
  const prevBtn = document.querySelector(".nav-back");
  const nextBtn = document.querySelector(".nav-next");

  if (!quizSection) return;

  openBtn?.addEventListener("click", () => {
    quizSection.classList.add("active");
    document.body.style.overflow = "hidden";

    if (!quizSection.dataset.inited) {
      renderQuestion();
      quizSection.dataset.inited = "true";
    }
  });

  closeBtn?.addEventListener("click", () => closeQuiz(quizSection));

  prevBtn?.addEventListener("click", () => goPrev(quizSection));
  nextBtn?.addEventListener("click", goNext);

  document.addEventListener("keydown", (e) => {
    if (!quizSection.classList.contains("active")) return;

    if (e.key === "Escape") closeQuiz(quizSection);
    if (e.key === "Enter") goNext();
  });
}