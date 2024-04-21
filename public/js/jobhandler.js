import { addJob, updateJob ,setParametersEdit} from "./jobs.js";
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
    let status = (document.getElementById('status').value === 'Open') ? true : false;
    let xp = parseInt(document.getElementById('xp').value);
    let desc = document.getElementById('description').value;
    let salary = parseInt(document.getElementById('salary').value);

    if (!validate(name) || !validate(id) || !validate(name) || !validate(status) || !validate(xp) || !validate(desc) || !validate(salary)){
        alert('Invalid Input');
        return 0;
    }
    addJob(name, id, status, xp, desc, salary, 'ADMIN1234');

}
function update(){
    let name = document.getElementById('name').value;
    let status = (document.getElementById('status').value === 'Open') ? true : false;
    let xp = parseInt(document.getElementById('xp').value);
    let desc = document.getElementById('description').value;
    let salary = parseInt(document.getElementById('salary').value);

    if (!validate(name) || !validate(name) || !validate(status) || !validate(xp) || !validate(desc) || !validate(salary)){
        alert('Invalid Input');
        return 0;
    }
    updateJob(document.getElementById('id').innerHTML, name , status, xp, desc, salary);
}


const acceptButton = document.getElementById('submit');

if (acceptButton) {
    acceptButton.addEventListener('click', add);
}

const updateButton = document.getElementById('update');

if (updateButton) {
    const urlParams = new URLSearchParams(window.location.search);
    const jobid = urlParams.get('jobid');

    setParametersEdit(jobid);
    updateButton.addEventListener('click', update);
}