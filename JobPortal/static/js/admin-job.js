function getInfo() {
    const info = {
        'name': document.getElementById('name').value,
        'id': document.getElementById('id').value,
        'status': document.getElementById('status').value,
        'xp': document.getElementById('xp').value,
        'desc': document.getElementById('name').value,
        'salary': document.getElementById('salary').value,
    }
    return info;
}

function add() {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", window.location.href);
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    const i = getInfo()
    const info = JSON.stringify(i);
    xhr.send(info);
}

const addButton = document.getElementById('add')
if (addButton){
    addButton.addEventListener('click',add)
}

function deleteJob() {
    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", window.location.href + 'delete');
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                window.location.href = '/jobs/delete/success/';
            } else {
                window.location.href = '/jobs/fail/';
            }
        }
    };
    xhr.send();
}

const deleteButton = document.getElementById('delete')
if (deleteButton){
    deleteButton.addEventListener('click', deleteJob)
}