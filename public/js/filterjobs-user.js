import { getJobs } from "./jobs.js";

function createElement(tag,parent,classList = null,text = null){
    let element = document.createElement(tag);
    parent.append(element);
    element.className = classList;
    element.innerHTML = text;
    return element;
}


function loadJobs(name = null, year = null){
    let jobs = getJobs(name, year);
    for (let job of jobs){
        let e = createElement('div',document.getElementById('jobs'),'job');
        let i = createElement('div',e,'job-info');
        createElement('h3',i,'id',job.id);
        createElement('h3',i,'name',job.name);
        createElement('p',e,'company',(job.company) ? job.company : job.admin);
    }
}
const urlParams = new URLSearchParams(window.location.search);
const name = urlParams.get('name');
const year = urlParams.get('xp');

loadJobs(name, year);