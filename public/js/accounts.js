/* 
Account
	Username -> str Unique
	Password -> str
	Type -> int/str
	Email -> str
	Company -> str/NULL
	Jobs -> JobApplied[]
*/
class Account {
    constructor(username, password, type, email, company) {
        this.username = username
        this.password = password
        this.type = type
        this.email = email
        this.company = company
        this.jobs = {};
    }

    isRightInfo(username, password) {
        return this.username === username && this.password === password;
    }
}

function getLocalStorage(key){
    return localStorage.getItem(key);
}

function setLocalStorage(key,value){
    localStorage.setItem(key,value);
    return 0;
}

function removeLocalStorage(key){
    localStorage.removeItem(key);
    return 0;
}

var savedAccount = null, accountDB = [];

function getAccountFromDB() {
    for (let account of accountDB){
        if (account.username === savedAccount.username && account.password === savedAccount.password) {
            return account;
        }
    }
    return null
}

function isOnRightPage(account,type){
    return account.type == type;
}

function checkIfSignedIn() {
    savedAccount = getLocalStorage('local-account');
    if (savedAccount === null){
        //redirect to login
        return false;
    }

    savedAccount = JSON.parse(savedAccount);
    accountDB = getLocalStorage('accounts');
    if (accountDB === null)
    {
        //redirect to login
        return false;
    }

    let account = getAccountFromDB();
    return (account === null) ? false : true;
}

function addAccount(username, password, type, email, company){
    let newAcc = new Account(username,password,type,email,company);
    accountDB.push(newAcc);
    setLocalStorage('accounts', accountDB);
    console.log('Account Created');
}

