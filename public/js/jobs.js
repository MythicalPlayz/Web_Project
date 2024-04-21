class Job {
    constructor(name, id, status, xp, description, salary, admin, company) {
        this.name = name;
        this.id = id;
        this.status = status;
        this.xp = xp;
        this.description = description;
        this.salary = salary;
        this.admin = admin;
        this.company = company;
    }
}

class JobApplied {
    constructor(name, jobid, time) {
        this.name = name;
        this.jobid = jobid;
        this.time = time;
    }
}

import { redirectTo } from "./redirect-module.js"

function getLocalStorage(key) {
    return localStorage.getItem(key);
}

function setLocalStorage(key, value) {
    localStorage.setItem(key, value);
    return 0;
}

function removeLocalStorage(key) {
    localStorage.removeItem(key);
    return 0;
}

var JobsDB = {}
function getJob(jobid) {
    return JobsDB[jobid];
}

function loadDB() {
    JobsDB = getLocalStorage('jobs');
    JobsDB = JSON.parse(JobsDB);
    if (!JobsDB) {
        JobsDB = {};
    }
}

loadDB();

function saveDB() {
    let x = JSON.stringify(JobsDB);
    setLocalStorage('jobs', x);
}

function addJob(name, id, status, xp, description, salary, admin, company = null) {
    try {
        if (getJob(id)){
            throw 0;
        }
        let job = new Job(name, id, status, xp, description, salary, admin, company);
        JobsDB[id] = job;
        saveDB();
        redirectTo('job_success.html', 0);
    } catch {
        redirectTo('job_fail.html', 0);
    }
}

function setParameters(id) {
    if (!id || !getJob(id)){
        redirectTo('home.html',0);
        return 0;
    }
    let job = getJob(id);
    document.getElementById('name').innerHTML = job.name;
    document.getElementById('id').innerHTML = job.id;
    document.getElementById('description').innerHTML = job.description;
    document.getElementById('company').innerHTML = (job.company) ? job.company : job.admin;
    
    let status = (job.status) ? 'Open' : 'Closed';  
    document.getElementById('status').innerHTML = 'Job Status: ' + status;

    let xp = 'Years of Experience: ' + job.xp;
    document.getElementById('xp').innerHTML = xp;

    let salary = 'Salary: ' + job.salary.toLocaleString() +'$'
    document.getElementById('salary').innerHTML = salary;

    let admin = document.getElementById('admin');
    if (admin){
        admin.innerHTML = "Created by " + job.admin;
    }
}

function setParametersEdit(id) {
    if (!id || !getJob(id)){
        redirectTo('home.html',0);
        return 0;
    }
    let job = getJob(id);
    document.getElementById('name').value = job.name;
    document.getElementById('id').innerHTML = job.id;
    document.getElementById('description').innerHTML = job.description;
    
    let status = (job.status) ? 'open' : 'closed';  
    document.getElementById('status').value = status;
    document.getElementById('xp').value = job.xp;
    document.getElementById('salary').value = job.salary;
}

function updateJob(id, name, status, xp, description, salary) {
    try {
        if (!getJob(id)){
            throw 0;
        }
        let job = getJob(id);
        job.name = name;
        job.description = description;
        job.status = status;
        job.xp = xp;
        job.salary = salary;
        JobsDB[id] = job;
        saveDB();
        redirectTo('job_success.html', 0);
    } catch {
        redirectTo('job_fail.html', 0);
    }
}














































export {addJob, setParameters, setParametersEdit, updateJob}