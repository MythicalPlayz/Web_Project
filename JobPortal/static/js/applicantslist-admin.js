import { getAccountInfoFromDB } from "./accounts.js";
import { getCompany } from "./company.js";
import { loadApplicants, setStatus } from "./jobsapplied.js";

function createElement(tag, parent, classList = null, text = null) {
    let element = document.createElement(tag);
    parent.append(element);
    element.className = classList;
    element.innerHTML = text;
    return element;
}

function reset() {
    var applicantsElement = document.getElementById('applicants');
    while (applicantsElement.firstChild) {
        applicantsElement.removeChild(applicantsElement.firstChild);
    }
}

function setJobStatus(applicant, type, username, index) {
    setStatus(applicant, type, username, index);
    reset();
    getApplicants();
}

function filterJob(id) {
    const urlParams = new URLSearchParams(window.location.search);
    const jobid = urlParams.get('jobid');
    if (jobid)
        return id.includes(jobid);
    else
        return true;
}

function getApplicants() {

    const username = JSON.parse(localStorage.getItem('local-account')).username;
    const account = getAccountInfoFromDB(username);
    const companyname = (account.company) ? account.company : account.username;
    const company = getCompany(companyname);
    if (!company)
        return;
    const jobs = company.jobs;
    for (let idx in jobs) {
        const job = jobs[idx];
        if (!filterJob(job.id)) {
            continue;
        }
        const applicants = loadApplicants(job.id);
        for (let idx2 in applicants) {
            let applicant = applicants[applicants.length - 1 - idx2];
            let e = createElement('div', document.getElementById('applicants'), 'job');

            let ji = createElement('div', e, 'job-info');
            createElement('h3', ji, 'id', job.id);
            createElement('h3', ji, 'name', job.name);

            let ui = createElement('div', e, 'app-info');
            createElement('p', ui, 'name', 'Name');
            createElement('p', ui, 'email', 'Email');
            createElement('p', ui, 'ressume', 'Resume');

            let uv = createElement('div', e, 'app-value');
            createElement('p', uv, 'name', applicant.fname);
            createElement('p', uv, 'email', applicant.email);
            let a = createElement('a', uv, 'resume', 'Download');
            a.addEventListener('click', function () { alert('Can not Implement in this phase!') });

            let s = createElement('div', e, 'status');
            let typeText = applicant.status
            let converted = typeText.substr(0, 1).toUpperCase() + typeText.substr(1);
            createElement('p', s, 'type', 'Status: ' + converted);

            if (typeText === "pending") {
                let b = createElement('div', e, 'buttons');
                let ab = createElement('button', b, 'accept', 'Accept');
                let db = createElement('button', b, 'deny', 'Deny');

                ab.addEventListener('click', function () {
                    setJobStatus(applicant, true, account.username, idx2);
                })
                db.addEventListener('click', function () {
                    setJobStatus(applicant, false, account.username, idx2);
                })
            }
            else {
                createElement('p', s, 'admin', applicant.admin);
            }

        }
    }
}

function getApplicantsHome() {

    const username = JSON.parse(localStorage.getItem('local-account')).username;
    const account = getAccountInfoFromDB(username);
    const companyname = (account.company) ? account.company : account.username;
    const company = getCompany(companyname);
    if (!company)
        return;
    const jobs = company.jobs;
    for (let idx in jobs) {
        const job = jobs[idx];
        if (!filterJob(job.id)) {
            continue;
        }
        const applicants = loadApplicants(job.id);
        for (let idx2 in applicants) {
            if (idx2 == 3)
                break;
            let applicant = applicants[applicants.length - 1 - idx2];
            let e = createElement('div', document.getElementById('quick-short'), 'job');

            createElement('h4', e, 'id', job.id);
            createElement('p', e, 'name', applicant.fname);
            let typeText = applicant.status
            let converted = typeText.substr(0, 1).toUpperCase() + typeText.substr(1);
            createElement('span', e, 'type', 'Status: ' + converted);


        }
    }
}

if (location.href.includes('/home')) {
    getApplicantsHome();
} else {
    getApplicants();
}