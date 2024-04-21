import { addJob, setParameters } from "./jobs.js";
import { redirectTo } from "./redirect-module.js";

function validate(val){
    if (typeof val === 'string' ){
        return val.length >= 2;
    }
    if (typeof val === 'number'){
        return val >= 0;
    }
    return true;
}

function add(){
    let name = document.getElementById('name').value;
    let id = document.getElementById('id').value;
    let status = (document.getElementById('job-status').value === 'Open') ? true : false;
    let xp = parseInt(document.getElementById('xp').value);
    let desc = document.getElementById('description').value;
    let salary = parseInt(document.getElementById('salary').value);

    if (!validate(name) || !validate(id) || !validate(name) || !validate(status) || !validate(xp) || !validate(desc) || !validate(salary)){
        alert('Invalid Input');
        return 0;
    }
    addJob(name, id, status, xp, desc, salary, 'ADMIN1234');
    redirectTo('job_success.html',0);
}


const acceptButton = document.getElementById('submit');

if (acceptButton) {
    acceptButton.addEventListener('click', add);
}