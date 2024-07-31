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
submitBtn.addEventListener('click',(e)=>{
    if(name1.value.trim().length < 2){
        alert("Enter a valid Name");
        e.preventDefault();
    }
    else if(!validateEmail(email.value)){
        alert("Enter a valid Email");
        e.preventDefault();
    }
    else if(!validateMobile(mobile.value)){
        alert("Enter a valid Phone number");
        e.preventDefault();
    }
    else if (messege.value.length < 10) {
        alert("Message must be at least 10 characters long.");
        e.preventDefault();
    }
})

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