/**
 * Changes the requirement of an element
 * @param {Element} ID - ID of an element
 * @param {boolean} value - status of requirement
 */
function manageRequired(ID, value) {
    let element = document.getElementById(ID);
    element.required = value;
}

import { addAccount, loginAccount } from "./accounts.js";

const textbasedInput = ['username', 'company', 'password', 'con-password'];
const otherInput = ['email', 'type']
function validateText(text) {
    if (text === null) {
        return false;
    }
    if (text.length < 8) {
        return false;
    }
    return true;
}

var cachedPassword = '';
var cachedtype = '';
function validatePassword(password,con) {
    if (!con) {
        cachedPassword = password;
        return true;
    }
    return cachedPassword === password;
}

/** 
 * Checks if the input is valid
*/

let button = document.querySelector('input[type=submit]');
function initForm() {
    let form = document.querySelector('form');
    let formData = new FormData(form, button);
    let returnedData = [];
    for (const [key, value] of formData) {
        if (!textbasedInput.includes(key) && !otherInput.includes(key)) {
            alert('Invalid Input');
            return false;
        }

        if (textbasedInput.includes(key)) {
            if (!validateText(value)) {
                if (key === 'company' && cachedtype !== 'coadmin') {
                    continue;
                }
                alert('Invalid Input');
                return false;
            }

            if (key.includes('password')) {
                if (!validatePassword(value,key.includes('con-password'))) {
                    alert('Passwords Do Not match');
                    return false;
                }
            }
            returnedData.push({ [key]: value })
        }

        else {
            if (value === '') {
                alert('Invalid Input');
                return false;
            }
            else if (key == 'type') {
                cachedtype = value;
            }
            returnedData.push({ [key]: value })
        }
    }
    return returnedData;
}

const coadminRadio = document.getElementById('coadmin');
if (coadminRadio) {
    const radioButtons = document.querySelectorAll("input[type='radio']");
    for (let radio of radioButtons) {
        radio.addEventListener('click', function () {
            manageRequired('company', coadminRadio.checked);
        })
    }
}

button.addEventListener('click', function () {
    let data = initForm();
    if (data === false) {
        return false;
    }
    if (data.length === 2) {
        //login
        loginAccount(data[0].username,data[1].password);
    }
    else {
        //signup
        let company = null
        if (data[5]) {
            company = data[5].company
        }
        addAccount(data[0].username, data[1].password, data[4].type, data[3].email, company);
    }
})