import SendData from './sendData.js';
import Validation from './validation.js';

export default class ValidForm {
  constructor(formsSelector = '._valid-form', inputsSelector = '._valid-input') {
    this.forms = document.querySelectorAll(formsSelector);
    this.inputs = document.querySelectorAll(inputsSelector);

    this.hasForms = this.forms.length > 0;
    this.hasInputs = this.inputs.length > 0;
  }

  init() {
    if (!this.hasForms) return;

    this.addListeners();
  }

  addListeners() {
    if (this.hasInputs) {
      this.inputs.forEach(input => {
        input.addEventListener('blur', () => Validation.check(input));
        input.addEventListener('input', () => Validation.check(input));
      });
    }

    this.forms.forEach(form => {
      form.setAttribute('novalidate', '');

      form.addEventListener('submit', (e) => {
        e.preventDefault();

        let error = false;

        Array.from(form.elements).forEach(el => {
          if (el.classList?.contains('_valid-input')) {
            if (Validation.check(el)) {
              error = true;
            }
          }
        });

        if (!error) {
          SendData.send(form);
        }
      });
    });
  }
}