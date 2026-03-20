export default class SendData {
  static async send(form) {
    const formData = new FormData(form);
    const thanks = document.querySelector('.thanks');
    const thanksOverlay = document.querySelector('.thanks__overlay');
    const message = document.querySelector('.thanks__message');
    const inputs = form.querySelectorAll('.form__input-wrapper');

    inputs.forEach(input => {
      input.classList.remove('error', 'success');
      input.removeAttribute('data-error');
    });

    form.reset();

    try {
      const response = await fetch(form.action || '/send', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        if (message) {
          message.classList.add('success');
          message.textContent = 'Data sent successfully';
        }
        
      } else {
        if (message) {
          message.classList.add('error');
          message.textContent = 'There was an error sending the data';
        }
      }

    } catch (error) {
      console.log('Send error:', error);
      if (message) {
        message.classList.add('error');
        message.textContent = 'There was an error sending the data';
      }
    }

    if (thanks) thanks.classList.add('active');
    if (thanksOverlay) thanksOverlay.classList.add('active');
  }
}