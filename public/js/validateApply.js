import { applyJob } from "./jobsapplied.js";

function verifyData(element) {
    if (element.value){
        return true;
    }
    return false;
}

function verifyFile(file){
    if (!file){
        alert('No File Added');
        return false;
    }
    let fileextention = file.name.split('.');
    fileextention = fileextention[fileextention.length - 1];
    let fileFormats = ['pdf', 'doc', 'docx'];
    if (!fileFormats.includes(fileextention)){
        alert('Invalid File Type (Must be .pdf or .doc(x))');
        return false;
    }
    return true;
}

var canSubmit = false;
const fileButton = document.getElementById('resume');
fileButton.addEventListener('change', function(event) {
    const file = event.target.files[0];
    canSubmit = verifyFile(file);
    document.querySelector('label[for="resume"]').innerHTML = file.name;
})


function getID(){
    const urlParams = new URLSearchParams(window.location.search);
    const jobid = urlParams.get('jobid');
    return jobid;
}

document.getElementById('id').innerHTML = getID();

const submitButton = document.querySelector('input[type="submit"]');

submitButton.addEventListener('click', function(){
    const fname = document.getElementById('fname');
    const email = document.getElementById('email');
    if (canSubmit && verifyData(fname) && verifyData(email)){
        applyJob(getID(), JSON.parse(localStorage.getItem('local-account')).username, fname, email);
    }
});