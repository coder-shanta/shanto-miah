/**
* PHP Email Form Validation - v3.1
* URL: https://bootstrapmade.com/php-email-form/
* Author: BootstrapMade.com
*/
(function () {
  "use strict";

  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach(function (e) {


    e.addEventListener('submit', function (event) {
      event.preventDefault();

      let thisForm = this;

      let formData = new FormData(thisForm);

      let data = {}
      formData.forEach((val, key) => data[key] = val)


      sendMail(data, thisForm)
    });


  });

  function sendMail(data, thisForm) {
    displayLoader(thisForm);

    fetch('https://portfolio-contact-server.herokuapp.com/mail/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => res.json()).then(data => {
      if (data.success) {
        displaySucces(thisForm)
        thisForm.reset()
      } else {
        let error = ''
        if (data.error.name) {
          data.error.name.forEach(message => error += message + '</br>')
        }

        if (data.error.email) {
          data.error.email.forEach(message => error += message + '</br>')
        }

        if (data.error.subject) {
          data.error.subject.forEach(message => error += message + '</br>')
        }

        if (data.error.message) {
          data.error.message.forEach(message => error += message + '</br>')
        }

        displayError(thisForm, error)

      }
    }).catch(err => {
      displayError(thisForm, err.message)
    })
  }


  function displayError(thisForm, error) {
    thisForm.querySelector('.loading').classList.remove('d-block');
    thisForm.querySelector('.error-message').innerHTML = error;
    thisForm.querySelector('.error-message').classList.add('d-block');
  }

  function displayLoader(thisForm) {
    thisForm.querySelector('.loading').classList.add('d-block');
    thisForm.querySelector('.error-message').classList.remove('d-block');
    thisForm.querySelector('.sent-message').classList.remove('d-block');
  }

  function displaySucces(thisForm) {
    thisForm.querySelector('.sent-message').classList.add('d-block')
    thisForm.querySelector('.loading').classList.remove('d-block');
    thisForm.querySelector('.error-message').classList.remove('d-block');
  }

})();
