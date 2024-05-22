const xhr = new XMLHttpRequest();

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
    xhr.open("POST", window.location.href);
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

    const info = JSON.stringify(info);
    xhr.send(info);
}

document.getElementById('add').addEventListener('click',add)