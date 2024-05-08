import { getAccountInfoFromDB } from "./accounts.js";
import { getCompany } from "./company.js";
import { redirectTo } from "./redirect-module.js";

function createElement(tag,parent,classList = null,text = null){
    let element = document.createElement(tag);
    parent.append(element);
    element.className = classList;
    element.innerHTML = text;
    return element;
}

function viewJobs(){
    const account = getAccountInfoFromDB(JSON.parse(localStorage.getItem('local-account')).username);
    const company = (account.company) ? account.company : account.username;
    const com = getCompany(company);
    if (!com)
        return 0;
    const Jobs = com.jobs;
    for (let idx in Jobs){
        let job = Jobs[idx];
        let e = createElement('div',document.getElementById('jobs'),'job');
        let i = createElement('div',e,'info');
        createElement('h3',i,'jobid',job.id);
        createElement('h3',i,'jobname',job.name);
        createElement('p',e,'status','Created by: ' + job.admin);
        e.addEventListener('click',function() {
            redirectTo('details.html?jobid=' + job.id, 0);
        })
    }
}

viewJobs();