const tips = {
  required: "Required field",
  requiredPhone: "Enter phone number",
  requiredName: "Enter name",
  requiredMail: "Enter email",
  requiredText: "Enter text",
  lengthMinName: "Min 2 characters",
  lengthMinPassword: "Min 4 characters",
  validEmail: "Enter the correct mail format",
  onlyNumbers: "Only numbers",
  validName: "Letters only",
  formatFile: "Invalid file format",
  success: "",
  lengthMinMessage: "10 characters minimum",
  choiseDate: "Choise a date"
};

export default class Validation {
  static check(elem) {
    const type = elem.dataset.type || elem.type;

    if (typeof this[type] === 'function') {
      return this[type](elem);
    }

    if (['submit', 'hidden', 'button'].includes(type)) {
      return false;
    }

    return false;
  }

  static validateText(elem, {
    min = 2,
    requiredTip,
    minTip,
    pattern,
    patternTip
  }) {
    if (!elem.value.trim()) {
      this.tipMessage(elem, requiredTip, true);
      return true;
    }

    if (elem.value.length < min) {
      this.tipMessage(elem, minTip, true);
      return true;
    }

    if (pattern && !pattern.test(elem.value)) {
      this.tipMessage(elem, patternTip, true);
      return true;
    }

    this.tipMessage(elem, tips.success, false);
    return false;
  }

  static name(elem) {
    return this.validateText(elem, {
      min: 2,
      requiredTip: tips.requiredName,
      minTip: tips.lengthMinName,
      pattern: /^[а-яА-ЯёЁa-zA-Z\s'\-]{2,40}$/,
      patternTip: tips.validName
    });
  }

  static text(elem) {
    return this.validateText(elem, {
      min: 2,
      requiredTip: tips.requiredText,
      minTip: tips.lengthMinName,
      pattern: /^[а-яА-ЯёЁa-zA-Z\s'\-]{2,100}$/,
      patternTip: tips.validName
    });
  }

  static email(elem) {
    if (!elem.value.trim()) {
      this.tipMessage(elem, tips.requiredMail, true);
      return true;
    }

    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(elem.value);

    if (!valid) {
      this.tipMessage(elem, tips.validEmail, true);
      return true;
    }

    this.tipMessage(elem, tips.success, false);
    return false;
  }

  static password(elem) {
    if (!elem.value.trim()) {
      this.tipMessage(elem, tips.required, true);
      return true;
    }

    if (elem.value.length < 4) {
      this.tipMessage(elem, tips.lengthMinPassword, true);
      return true;
    }

    this.tipMessage(elem, tips.success, false);
    return false;
  }

  static date(elem) {
    if (!elem.value) {
      this.tipMessage(elem, tips.choiseDate, true);
      return true;
    }

    this.tipMessage(elem, tips.success, false);
    return false;
  }

  static tipMessage(elem, tip, isError) {
    const wrapper = elem.parentElement;

    wrapper.classList.toggle('error', isError);
    wrapper.classList.toggle('success', !isError);

    wrapper.setAttribute('data-error', tip);
  }
}