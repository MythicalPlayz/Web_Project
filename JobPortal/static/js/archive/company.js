class Company {
    constructor(name) {
        this.name = name;
        this.jobs = {};
        this.applicants = [];
    }
}

function getLocalStorage(key) {
    return localStorage.getItem(key);
}

function setLocalStorage(key, value) {
    localStorage.setItem(key, value);
    return 0;
}

var CompanyDB = {};

function loadDB() {
    CompanyDB = getLocalStorage('company');
    CompanyDB = JSON.parse(CompanyDB);
    if (!CompanyDB) {
        CompanyDB = {};
    }
}

loadDB();

function saveDB() {
    let x = JSON.stringify(CompanyDB);
    setLocalStorage('company', x);
}

function getCompany(name) {
    return CompanyDB[name];
}

function pushCompany(name,job){
    let company = (getCompany(name)) ? getCompany(name) : new Company(name);
    company.jobs[job.id] = job;
    CompanyDB[name] = company;
    saveDB();
}

export {pushCompany ,getCompany};