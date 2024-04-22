import { redirectTo } from "./redirect-module.js";

class JobApplied {
    constructor(name, fname, jobid, time, email, file = null) {
        this.name = name;
        this.fname = fname;
        this.jobid = jobid;
        this.time = time;
        this.status = 'pending';
        this.admin = null;
        this.email = email;
        this.file = file;  
    }
}

function getLocalStorage(key) {
    return localStorage.getItem(key);
}

function setLocalStorage(key, value) {
    localStorage.setItem(key, value);
    return 0;
}

var JobsAppliedDB = {};

function loadDB() {
    JobsAppliedDB = getLocalStorage('jobs-applied');
    JobsAppliedDB = JSON.parse(JobsAppliedDB);
    if (!JobsAppliedDB) {
        JobsAppliedDB = {};
    }
}

loadDB();

function saveDB() {
    let x = JSON.stringify(JobsAppliedDB);
    setLocalStorage('jobs-applied', x);
}

function getJob(name) {
    return JobsAppliedDB[name];
}

function applyJob(id, name, fname, email, resume = null){
    try {
    let date = Date.now();
    let job = new JobApplied(name,fname,id,date, email, resume);
    let data = JobsAppliedDB[name];
    if (!data)
        data = [];
    data.push(job);
    JobsAppliedDB[name] = data;
    saveDB();
    redirectTo('submit_success.html',0);
    } catch {
        redirectTo('submit_fail.html',0);
    }
}

function loadApplicants(jobID = null){
    let apps = [];
    for (let index in JobsAppliedDB){
        let job = JobsAppliedDB[index];
        if (jobID && !job.jobid.includes(jobID)){
            continue;
        }
        apps.push(job);
    }
    return apps;
}



export {applyJob, loadApplicants}