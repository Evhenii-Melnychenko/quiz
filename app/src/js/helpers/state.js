import { questions } from "./questions.js";

const initialAnswers = questions.map(q =>
  q.type === "form" ? null : 0
);

export const state = {
  current: 0,
  answers: initialAnswers
};