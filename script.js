'use strict'
const inputYear = document.getElementById('label-year')
const inputMonth = document.getElementById('label-month')
const inputDay = document.getElementById('label-day')
const outputYear = document.querySelector('.year-number')
const outputMonth = document.querySelector('.month-number')
const outputDay = document.querySelector('.days-number')
const btnSubmit = document.querySelector('.submit-form')
const inputs = document.querySelectorAll('.input');
const outputNums = document.querySelectorAll('.number');
const errorTexts = document.querySelectorAll('.error-text')
const renderAge = function (e) {
    e.preventDefault()
    try {
        const inputBirthYear = Number(inputYear.value)
        const inputBirthMonth = Number(inputMonth.value)
        const inputBirthDayOfMonth = Number(inputDay.value)
        console.log(inputBirthDayOfMonth, inputBirthMonth, inputBirthYear)
        const now = new Date()
        if (inputBirthYear == 0 || inputBirthDayOfMonth == 0 || inputBirthMonth == 0) {
            throw new Error('Field empty')
        }
        if (Number.isNaN(inputBirthYear) ||
            Number.isNaN(inputBirthMonth) ||
            Number.isNaN(inputBirthDayOfMonth)) {
            throw new Error('Invalid Input')
        }
        if (inputBirthYear > now.getFullYear() ||
            (inputBirthYear == now.getFullYear() && inputBirthMonth > now.getMonth() + 1) ||
            (inputBirthYear == now.getFullYear() && inputBirthMonth == now.getMonth() + 1 && inputBirthDayOfMonth > now.getDate())
        ) {
            throw new Error('Date must be in the past')
        }
        inputs.forEach(input => input.classList.remove('error'));
        errorTexts.forEach(errorText => errorText.classList.add('hidden'))
        let birthYear = now.getFullYear() - inputBirthYear - (new Date().getMonth() < inputBirthMonth ? 1 : 0);
        const inputBirthday = new Date(inputBirthYear, inputBirthMonth, inputBirthDayOfMonth)
        const timeDif = new Date(now - inputBirthday)
        let birthMonth = timeDif.getMonth() + 1;
        if (birthMonth > 11) {
            birthMonth = 0;
            birthYear++;
        }
        const birthDayOfMonth = timeDif.getDate()
        outputYear.classList.remove('number-init')
        outputYear.textContent = birthYear;

        outputMonth.textContent = birthMonth;
        outputMonth.classList.remove('number-init')
        outputDay.textContent = birthDayOfMonth;
        outputDay.classList.remove('number-init')
    }
    catch (err) {
        outputNums.forEach(function (num) {
            num.classList.add('number-init')
            num.textContent = '--'
        })
        errorTexts.forEach(function (errorText, i) {
            errorText.classList.add('hidden')
            if (err.message == 'Field empty') {

                if (inputs[i].value == '') {
                    errorText.classList.remove('hidden')
                    errorText.textContent = 'Field cannot be empty'
                }
            }
            if (err.message == 'Invalid Input') {
                if (Number.isNaN(Number(inputs[i].value))) {
                    errorText.classList.remove('hidden')
                    errorText.textContent = 'Invalid Input'

                }
            }
            if (err.message == 'Date must be in the past') {
                errorText.classList.remove('hidden')
                errorText.textContent = 'Date must be in the past'
            }

        })



        // TEST FOR OTHER ERRORS
        inputs.forEach(function (input, i) {
            input.classList.add('error');

        })
    }

}
btnSubmit.addEventListener('click', renderAge)