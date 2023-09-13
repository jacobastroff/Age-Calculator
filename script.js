'use strict'
const inputYear = document.getElementById('label-year')
const inputMonth = document.getElementById('label-month')
const inputDay = document.getElementById('label-day')
const outputYear = document.querySelector('.year-number')
const outputMonth = document.querySelector('.month-number')
const outputDay = document.querySelector('.days-number')
const btnSubmit = document.querySelector('.submit-form')
const renderAge = function (e) {
    e.preventDefault()
    try {
        const inputBirthYear = Number(inputYear.value)
        const inputBirthMonth = Number(inputMonth.value)
        const inputBirthDayOfMonth = Number(inputDay.value)
        if (Number.isNaN(inputBirthYear) ||
            Number.isNaN(inputBirthMonth) ||
            Number.isNaN(inputBirthDayOfMonth)) {
            throw new Error('Some fields have invalid inputs')
        }
        let birthYear = new Date().getFullYear() - inputBirthYear - (new Date().getMonth() < inputBirthMonth ? 1 : 0);
        const inputBirthday = new Date(inputBirthYear, inputBirthMonth, inputBirthDayOfMonth)
        const timeDif = new Date(new Date() - inputBirthday)
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
        console.log(err.message)
    }

}
btnSubmit.addEventListener('click', renderAge)