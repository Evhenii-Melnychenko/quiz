import 'webp-in-css/polyfill';

import FormValid from './helpers/validation';
import { initQuizEvents } from "./helpers/events.js";

document.addEventListener('DOMContentLoaded', () => {
   const formValid = new FormValid();
   formValid.init();

   initQuizEvents();
});