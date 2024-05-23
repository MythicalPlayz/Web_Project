import { getHistory } from "./jobsapplied.js";

function createElement(tag,parent,classList = null,text = null){
    let element = document.createElement(tag);
    parent.append(element);
    element.className = classList;
    element.innerHTML = text;
    return element;
}

function history(){
    const name = JSON.parse(localStorage.getItem('local-account')).username;
    const jobs = getHistory(name);
    const maxN = jobs.length;
    for (let idx = 0; idx < maxN; idx++){
        let job = jobs[jobs.length - 1 - idx];
        let e = createElement('div',document.getElementById('jobs'),'job');
        let i = createElement('div',e,'info');
        createElement('h3',i,'jobid',job.jobid);
        createElement('h3',i,'jobname',job.jobname);
        createElement('p',e,'companyname',job.company);
        createElement('p',e,'status','Status: ' + job.status.substr(0,1).toUpperCase() + job.status.substr(1));
    }
}

function historyHome(){
    const name = JSON.parse(localStorage.getItem('local-account')).username;
    const jobs = getHistory(name);
    const maxN = Math.min(jobs.length,3);
    for (let idx = 0; idx < maxN; idx++){
        let job = jobs[jobs.length - 1 - idx];
        let e = createElement('div',document.querySelector('.quick-short'),'job');
        createElement('h4',e,'jobname',job.jobname);
        createElement('p',e,'companyname',job.company);
        createElement('span',e,'status','Status: ' + job.status.substr(0,1).toUpperCase() + job.status.substr(1));
    }
}
function historyJob(){
    const name = JSON.parse(localStorage.getItem('local-account')).username;
    const jobs = getHistory(name);
    const maxN = Math.min(jobs.length,3);
    const urlParams = new URLSearchParams(window.location.search);
    const jobid = urlParams.get('jobid');
    
    for (let idx = 0; idx < maxN; idx++){
        let job = jobs[jobs.length - 1 - idx];
        if (job.jobid !== jobid){
            continue;
        }
        let e = createElement('div',document.querySelector('.history'),'time');
        let time = new Date(job.time);
        createElement('p',e,'time',time.toLocaleString());
        createElement('span',e,'status','Status: ' + job.status.substr(0,1).toUpperCase() + job.status.substr(1));
    }
}

if (window.location.href.includes('/home')){
    historyHome();
}
else if (window.location.href.includes('/details')){
    historyJob();
}
else{
    history();
}