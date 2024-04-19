/**
 * Changes the requirement of an element
 * @param {Element} ID - ID of an element
 * @param {boolean} value - status of requirement
 */
function manageRequired(ID, value) {
    let element = document.getElementById(ID);
    element.required = value;
}

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
function validatePassword(password) {
    if (cachedPassword === '') {
        cachedPassword = password;
        return true;
    }
    return cachedPassword == password;
}

/** 
 * Checks if the input is valid
*/

let button = document.querySelector('input[type=submit]');
function initForm(isSignUp) {
    let form = document.querySelector('form');
    let formData = new FormData(form, button);

    for (const [key, value] of formData) {
        if (!textbasedInput.includes(key) && !otherInput.includes(key)) {
            alert('Invalid Input');
            return false;
        }

        if (textbasedInput.includes(key)) {
            if (!validateText(value)) {
                alert('Invalid Input');
                return false;
            }

            if (key.includes('password')) {
                if (!validatePassword(value) && isSignUp) {
                    alert('Passwords Do Not match');
                    return false;
                }
            }
        }

        else {
            if (value === '') {
                alert('Invalid Input');
                return false;
            }
        }
    }
    return true;
}

button.addEventListener('click', function() {
    alert(initForm());
})