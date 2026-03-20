# Gulp config

Super duper config



### Installing

Clone this repo.

Install packages

```
npm i
```


## Getting Started

```
npm run dev
```

## Build

```
npm run build
```

## Built With

* [Webpack](https://webpack.js.org/) - bundler for scripts
* [Gulp](https://gulpjs.com/) - Automate and enhance your workflow


##

# Quiz Page

This page features an interactive **quiz** where users can answer a series of questions. The quiz is fully **configurable**, allowing you to **edit questions and answer options** directly in the code or via the provided data structure.  

---

## ✨ Features

### 1️Customizable Questions & Answers
- Add, remove, or modify questions.
- Each question can have a type, such as **multiple choice** or **text input**.
- Answers can be customized for each question.

Example structure:

```js
const questions = [
  {
    title: "Title 1",
    answers: [
      "Answer 1",
      "Answer 2",
      "Answer 3",
      "Answer 4",
    ]
  },
  {
    title: "Title 2",
    answers: [
      "Answer 1", 
      "Answer 2", 
      "Answer 3", 
      "Answer 4",
      "Answer 5"]
  },
   {
    type: "form",
    title: "Title form",
  }
];

```
a. The final step includes a form for user data (e.g., name, email).

Inputs are marked as required and validated before submission

```

```
b. Required fields must be filled.

Email format is validated.

Name and text fields are validated for length and allowed characters.

Real-time feedback shows errors next to the inputs.
```

```
c. After successful submission, a modal overlay displays a “Data sent successfully” message to confirm that the quiz answers were sent successfully.
```

# Validate

a. in main.js import this lib:
```
import FormValid from './helpers/validation';
```

b. create an instance of the class and call its method init:
```
const formValid = new FormValid();
formValid.init()
```
c. in html: <br> 
  - in form add class _valid-form
  - input must have a wrapper
  - in input add class _valid-input and attr required
  - validation runs on attr type
```
<form class="_valid-form">
  <div class="form-group">
    <input type="text" class="_valid-input" required>
  </div>
</form>
```
in styles ./customize/index.scss add file form.scss ad change style in this file
:
```
@import "form";
```

d. if you need custom type, in input add data-type="typeName" <br>
in html:
```
<input data-type="typeName" class="_valid-input" required>
```
in validation.js add static function :
```
 static typeName = (elem) => {
    if (elem.value === "") {
      ... custom checks
    } else if (!(/^[а-яА-ЯёЁa-zA-Z\s'\-]{2,40}$/.test(elem.value))) {
      ... custom checks
    }
    ... custom checks
    
    this.tipMessage(elem, tips.success, false);
    return false;
  };
```

e. if you need change notice text
in validation.js in tips change your text
```
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
```


# Timer

### Get starterd

a. in main.js import this lib
```
import Timer from './helpers/timer';
```

b. create an instance of the class and call its method init <br>
default date is 3 days in advance
```
const timer = new Timer();

// for defoult
timer.init()

/ for custom
timer.init(new Date('2019-12-17T03:25:00').getTime())
```

c. in html you definitely need id="timer"; you add only classes yuo need

```
<div id="timer">
  <div class="timer__days">
     <div class="number"></div>
  </div>
  <div class="timer__hours">
     <div class="number"></div>
  </div>
  <div class="timer__minutes">
     <div class="number"></div>
  </div>
  <div class="timer__seconds">
     <div class="number"></div>
  </div>
</div>
```

## Author

* **Melnychenko Evhenii** - (https://www.linkedin.com/in/evhenii-melnychenko/)