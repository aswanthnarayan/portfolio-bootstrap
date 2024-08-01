var name1 = document.querySelector('#name');
var email = document.querySelector('#email');
var mobile = document.querySelector('#mobile');
var messege = document.querySelector('#messege');
var submitBtn = document.querySelector('#btnSubmit');

const form = document.getElementById('form');
const result = document.getElementById('result');

// Email validation function
function validateEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Mobile validation function
function validateMobile(mobile) {
    var re = /^[0-9]{10}$/;
    return re.test(mobile);
}

//Function for form validations
document.getElementById('btnSubmit').addEventListener('click', (e) => {
    
    // delete previous error messages
    document.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');

    let valid = true;

    // Validate name
    if (document.getElementById('name').value.trim().length < 2) {
        document.getElementById('name-error').innerText = "Enter a valid Name";
        document.getElementById('name-error').style.display = 'block';
        valid = false;
    }

    // Validate email
    if (!validateEmail(document.getElementById('email').value)) {
        document.getElementById('email-error').innerText = "Enter a valid Email";
        document.getElementById('email-error').style.display = 'block';
        valid = false;
    }

    // Validate mobile
    if (!validateMobile(document.getElementById('mobile').value)) {
        document.getElementById('mobile-error').innerText = "Enter a valid Phone Number";
        document.getElementById('mobile-error').style.display = 'block';
        valid = false;
    }

    // Validate message
    if (document.getElementById('message').value.trim().length < 10) {
        document.getElementById('message-error').innerText = "Message must be at least 10 characters long.";
        document.getElementById('message-error').style.display = 'block';
        valid = false;
    }

    if (!valid) {
        e.preventDefault();
    }
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateMobile(mobile) {
    const re = /^[0-9]{10}$/;
    return re.test(mobile);
}


//Code from web3forms

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
    result.innerHTML = "Please wait..."
  
      fetch('https://api.web3forms.com/submit', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
              },
              body: json
          })
          .then(async (response) => {
              let json = await response.json();
              if (response.status == 200) {
                  result.innerHTML = "Form submitted successfully";
              } else {
                  console.log(response);
                  result.innerHTML = json.message;
              }
          })
          .catch(error => {
              console.log(error);
              result.innerHTML = "Something went wrong!";
          })
          .then(function() {
              form.reset();
              setTimeout(() => {
                  result.style.display = "none";
              }, 3000);
          });
  });