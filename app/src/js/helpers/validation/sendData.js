export default class SendData {
  static send = (form) => {
    const data = new FormData(form);
    const dataAction = form.dataset.action;

    if (dataAction) {
      fetch(dataAction, {
        method: 'POST',
        mode: 'no-cors',
        body: data,
      })
      .then(() => {
        console.log('success');
      })
      .catch(() => {
        console.log('error');
      });
    }
  };
}
