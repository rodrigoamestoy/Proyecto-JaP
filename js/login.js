"use strict";

const email = document.getElementById('email');
const password = document.getElementById('password');
const form = document.getElementById('myForm');
const passwordError = document.getElementById('password-error');
const emailError = document.getElementById('email-error');

form.addEventListener("submit", e => {
    e.preventDefault();
    storeEmail();
    redirect();
})

email.addEventListener('textInput', emailVerify);
password.addEventListener('textInput', passwordVerify);

// Login verification

    function redirect() {
        if (email.value.length < 6) {
            email.style.border = "1px solid red";
            emailError.style.display = "block";
            email.focus();
            return false;
        } else if (password.value.length < 6) {
            password.style.border = "1px solid red";
            passwordError.style.display = "block";
            password.focus();
            return false
        } else {
            window.location.href = "inicio.html";
        }
}
    
function emailVerify() {
    if (email.value.length > 6) {
        email.style.border = "1px solid silver";
        emailError.style.display = "none";
        return true;
    }
}

function passwordVerify() {
    if (password.value.length >= 6) {
        password.style.border = "1px solid silver";
        passwordError.style.display = "none";
        return true;
    }
}

// Saves email in local storage

function storeEmail() {
    let userEmail = document.getElementById('email').value;
    localStorage.setItem('user', userEmail);
}