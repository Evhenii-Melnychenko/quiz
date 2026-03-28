# Quiz Landing

A landing page with an interactive quiz built in plain JavaScript.

The project includes:
- a start screen with a button to launch the quiz;
- step-by-step questions with a progress bar;
- a final step with a form;
- field validation and form submission via fetch.

## Live Demo

[Open Live Demo](https://landing-quiz-bqum3ei4z-evhenii-melnychenkos-projects.vercel.app/)

## Technologies

- JavaScript (ES6 modules)
- SCSS
- Gulp 4
- Webpack 4 + Babel
- BrowserSync

## Project Structure

Main directories:
- `app/src` - source files
- `app/dev` - development build
- `../quiz` - production build (path is configured in `pathes.js`)

Key files:
- `app/src/index.html` - landing and quiz markup
- `app/src/js/main.js` - entry point
- `app/src/js/helpers/questions.js` - questions array
- `app/src/js/helpers/ui.js` - quiz step renderer
- `app/src/js/helpers/quiz.js` - navigation logic (Next/Back/Close)
- `app/src/js/helpers/events.js` - click/keyboard handlers
- `app/src/js/helpers/validation/*` - validation and form submission
- `gulpfile.js` - build pipeline
- `webpack.config.js` - JS bundling

## Installation

```bash
npm install
```

## Run

Development mode (watch + local server):

```bash
npm run dev
```

Production build:

```bash
npm run build
```

## npm Scripts

- `npm run dev` - Gulp dev build + BrowserSync + watch
- `npm run build` - production build
- `npm run lint:css` - stylelint for SCSS
- `npm run lint:js` - eslint for JS

## How The Quiz Works

1. The `.course__button` opens the `.quiz` section.
2. On first open, the first step is rendered.
3. The Next button and Enter key move to the next step.
4. The Back button moves to the previous step.
5. On the first step, Back closes the quiz.
6. On the last step, the Next button is hidden and the form is shown.
7. Esc closes the quiz.

Quiz state is stored in `state.js`:
- `current` - current step index;
- `answers` - selected answers.

## Configuring Questions

All questions are defined in `app/src/js/helpers/questions.js`.

Basic format:

```js
export const questions = [
  {
    title: "Question 1",
    answers: ["Option 1", "Option 2", "Option 3"]
  },
  {
    type: "form",
    title: "Final step"
  }
];
```

Important:
- the step with `type: "form"` must be last, otherwise form display logic will break;
- regular questions must include the `answers` field.

## Form Validation

Initialization is done in `main.js` using the `ValidForm` class.

HTML requirements:
- the form must have the `._valid-form` class;
- fields must have the `._valid-input` class;
- each field must have a wrapper element (in this project it is `.form__input-wrapper`) where `error/success` classes and the `data-error` attribute are applied.

Validation checks are implemented in `app/src/js/helpers/validation/validation.js`:
- `name`
- `text`
- `email`
- `password`
- `date`

You can add a custom type via `data-type` if you create a static method with the same name in the `Validation` class.

## Form Submission

After successful validation, `SendData.send(form)` is called:
- data is sent as `FormData`;
- method: `POST`;
- URL: `form.action` or `/send` if action is not set;
- success message: `Data sent successfully`;
- error message: `There was an error sending the data`.

The UI message is shown in the `.thanks` block.

## Extra: Timer Module

The project includes an additional module in `app/src/js/helpers/timer/index.js`.

It is not connected by default in `main.js`, but can be used separately:

```js
import Timer from './helpers/timer';

const timer = new Timer();
timer.init(); // default is +4 days
```

Or pass your own end date:

```js
timer.init(new Date('2026-12-31T23:59:59').getTime());
```

## Author

Melnychenko Evhenii