function validateText(text, minlength) {
    if (text === null) {
        return false;
    }
    if (text.length < minlength) {
        return false;
    }
    return true;
}

var cachedPassword = '';
var cachedtype = '';
function validatePassword(password1,password2) {
    return password1 === password2;
}

function validate(){
    const username = document.getElementById('username').value;
    const password1 = document.getElementById('password1').value;
    const password2 = document.getElementById('password2').value;
    const email = document.getElementById('email').value;
    const user = document.getElementById('user').checked;
    const coadmin = document.getElementById('coadmin').checked;
    const company = document.getElementById('company').value;

    if (!validateText(username,8)){
        window.alert('Invalid Username');
        return false;
    }
    if (!validateText(password1,8)){
        window.alert('Invalid Password');
        return false;
    }
    if (!validateText(password2,8)){
        window.alert('Invalid Pasword');
        return false;
    }
    if (!validatePassword(password1,password2)){
        window.alert('Pasword Mismatch');
        return false;
    }
    if (!validateText(email,0)){
        window.alert('Invalid Email'); //Django would handle the rest
        return false;
    }

    if (coadmin){
        if (!validateText(company,2)){
            window.alert('Invalid Company');
            return false;
        }
    }

    return true;
}

const button = document.getElementById('')
button.addEventListener('click', function () {
    validate()
})