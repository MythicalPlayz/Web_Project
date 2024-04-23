import { redirectTo } from "./redirect-module.js";
import { getJobFromDB } from './jobs.js'

class JobApplied {
    constructor(name, fname, jobid, time, email, file = null, index) {
        this.name = name;
        this.fname = fname;
        this.jobid = jobid;
        this.time = time;
        this.status = 'pending';
        this.admin = null;
        this.email = email;
        this.file = file;
        this.company = (getJobFromDB(jobid).company) ? getJobFromDB(jobid).company : getJobFromDB(jobid).admin;
        this.jobname = getJobFromDB(jobid).name;
        this.index = index;
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

function applyJob(id, name, fname, email, resume = null) {
    try {
        let date = Date.now();
        let length = JobsAppliedDB[name];
        length = (length) ? length.length : 0;
        let job = new JobApplied(name, fname, id, date, email, resume, length);
        let data = getHistory(name);
        if (!data)
            data = [];
        data.push(job);
        JobsAppliedDB[name] = data;
        saveDB();
        redirectTo('submit_success.html', 0);
    } catch {
        redirectTo('submit_fail.html', 0);
    }
}

function loadApplicants(jobID = null) {
    let apps = [];
    for (let index in JobsAppliedDB) {
        let job = JobsAppliedDB[index];
        for (let jobapplicant of job) {
            if (jobID && !jobapplicant.jobid.includes(jobID)) {
                continue;
            }
            apps.push(jobapplicant);
        }
    }
    return apps;
}

function getHistory(user) {
    let arr = [];
    let jobs = JobsAppliedDB[user];
    if (!jobs)
        return [];
    for (let job of jobs) {
        arr.push(job);
    }
    return arr;
}

function setStatus(job, astatus, user) {
    const index = job.index;
    JobsAppliedDB[job.name][index].status = (astatus) ? 'accepted' : 'denied';
    JobsAppliedDB[job.name][index].admin = user;
    saveDB();
    alert('Responded!');
}


export { applyJob, loadApplicants, getHistory, setStatus }