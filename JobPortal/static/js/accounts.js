/* 
Account
    Username -> str Unique
    Password -> str
    Type -> int/str
    Email -> str
    Company -> str/NULL
    Jobs -> JobApplied[]
*/

import { redirectTo } from "./redirect-module.js"

class Account {
    constructor(username, password, type, email, company) {
        this.username = username
        this.password = password
        this.type = type
        this.email = email
        this.company = company
        this.jobs = {};
    }
}

function isRightInfo(account ,username, password) {
    return account.username === username && account.password === password;
}

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

var savedAccount = null, accountDB = {};

function getAccountFromDB() {
    if (!exists(savedAccount.username) || accountDB[savedAccount.username].password !== savedAccount.password){
        return null;
    }
    return accountDB[savedAccount.username];
}

function getAccountInfoFromDB(username){
    return accountDB[username];
}

function exists(username){
    return accountDB[username];
}

function loadDB(){
    accountDB = getLocalStorage('accounts');
    accountDB = JSON.parse(accountDB);
    if (!accountDB) {
        accountDB = {};
    }
}

function saveDB(){
    setLocalStorage('accounts', JSON.stringify(accountDB));
}

loadDB();

function checkIfSignedIn() {
    savedAccount = getLocalStorage('local-account');
    if (savedAccount === null) {
        //redirect to login
        return false;
    }

    savedAccount = JSON.parse(savedAccount);
    
    if (accountDB === null) {
        //redirect to login
        return false;
    }
    let account = getAccountFromDB();
    return (account === null) ? false : account;
}

function addAccount(username, password, type, email, company) {
    if (exists(username)){
        alert('Username Already Taken');
        return 0;
    }
    let newAcc = new Account(username, password, type, email, company);
    accountDB[username] = newAcc;
    saveDB();
    console.log('Account Created');
    savedAccount = {
        'username': username,
        'password': password
    };

    setLocalStorage('local-account', JSON.stringify(savedAccount));

    if (type === 'user') {
        redirectTo("/user/home.html", 0);
    }
    else {
        redirectTo("/admin/home.html", 0);
    }
}

function loginAccount(username, password) {
    for (let index in accountDB) {
        let account = accountDB[index];
        if (isRightInfo(account, username, password)) {
            console.log('Account Logged In');
            savedAccount = {
                'username': username,
                'password': password
            };

            setLocalStorage('local-account', JSON.stringify(savedAccount));

            if (account.type === 'user') {
                redirectTo("/user/home.html", 0);
            }
            else {
                redirectTo("/admin/home.html", 0);
            }
            return 0;
        }
    }
    alert('Wrong Email/Password');
}

function getAccountInfo() {
    let account = checkIfSignedIn();
    if (!account)
        redirectTo('../login.html',0);
    return account;
}

if (window.location.href.includes('/user/') || window.location.href.includes('/admin/')){
    let acc = getAccountInfo();
    let name = acc.username;
    let type = acc.type;

    if ((window.location.href.includes('/user/') && type !== 'user') || (window.location.href.includes('/admin/') && type === 'user')){
        redirectTo('../login.html',0);
    }
    
    document.querySelector('nav #username').innerHTML = name;
    let title = document.querySelector('.container #welcome');
    if (title)
        title.innerHTML = "Welcome, " + name;
}

function logout(){
    removeLocalStorage('local-account');
    redirectTo('../login.html', 0);
}

const logoutButton = document.getElementById('logout')

if (logoutButton){
    logoutButton.addEventListener('click',logout)
}

export { addAccount , loginAccount, getAccountInfoFromDB}