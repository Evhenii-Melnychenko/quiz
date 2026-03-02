import { state } from "./state.js";
import { questions } from "./questions.js";

const titleEl = document.querySelector(".quiz__title");
const answersEl = document.getElementById("answers");
const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");

export function renderQuestion() {
  const q = questions[state.current];
  titleEl.textContent = q.title;
  answersEl.innerHTML = "";

  const percent = ((state.current + 1) / questions.length) * 100;

  progressFill.style.width = percent + "%";
  progressText.style.left = percent + "%";
  progressText.textContent = `${state.current + 1}/${questions.length}`;

  const nextWrap = document.querySelector(".nav-next-wrap");
  const isLast = state.current === questions.length - 1;
  nextWrap?.classList.toggle("is-hidden", isLast);

  if (q.type === "form") {
    answersEl.innerHTML = `
      <div class="form-block">
        <input class="form-input" id="userName" placeholder="Имя">
        <input class="form-input" id="userPhone" placeholder="Телефон">
        <input class="form-input" id="userEmail" placeholder="Email">
        <button class="submit-btn" id="submitBtn">Отправить</button>
      </div>
    `;
  } else {
    q.answers.forEach((answer, index) => {
      const wrapper = document.createElement("div");
      wrapper.className = "answer";

      const id = `q${state.current}_${index}`;

      wrapper.innerHTML = `
        <input type="radio" name="question-${state.current}" id="${id}"
          ${state.answers[state.current] === index ? "checked" : ""}>
        <label for="${id}">${answer}</label>
      `;

      wrapper.querySelector("input").addEventListener("change", () => {
        state.answers[state.current] = index;
      });

      answersEl.appendChild(wrapper);
    });
  }

  const current = state.current + 1;
  const total = questions.length;
  progressText.textContent = `${current}/${total}`;
  progressFill.style.width = `${(current / total) * 100}%`;
}