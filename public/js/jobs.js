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
    JobsDB = JSON.parse(getLocalStorage('jobs'));
    if (!JobsDB) {
        JobsDB = {};
    }
}

function saveDB() {
    setLocalStorage('jobs', JSON.stringify(JobsDB));
}

function addJob(name, id, status, xp, description, salary, admin, company = null) {
    try {
        loadDB();
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
    document.getElementById('job-name').innerHTML = job.name;
    document.getElementById('id').innerHTML = job.id;
    document.getElementById('desc').innerHTML = job.description;
    document.getElementById('company').innerHTML = (job.company) ? job.company : job.admin;
    
    let status = (job.status) ? 'Open' : 'Closed';  
    document.getElementById('status').innerHTML = 'Job Status: ' + status;

    let xp = 'Years of Experience: ' + job.xp;
    document.getElementById('xp').innerHTML = xp;

    let salary = 'Salary: ' + job.salary.toLocaleString() +'$'
    document.getElementById('salary').innerHTML = salary;
}
















































export {addJob, setParameters}