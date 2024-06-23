function reply(id, type, element) {
    const xhr = new XMLHttpRequest();

    xhr.open("POST", window.location.href);
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

    const info = JSON.stringify({'id': id, 'type': type});
    xhr.onload = function() {
        if (xhr.status === 200) {
            resetApp(element,type);
        } else {
            window.alert('Failed to update');
        }
    }
    xhr.send(info);
}

function acceptApplicant(id){
    var type = 'accepted';
    reply(id, type, document.getElementById(`applicant-${id}`).querySelector('.buttons'));
}

function denyApplicant(id){
    var type = 'denied';
    reply(id, type, document.getElementById(`applicant-${id}`).querySelector('.buttons'));
}


function resetApp(buttonsElement,type){
    buttonsElement.parentElement.getElementsByClassName('type')[0].innerHTML = `Status: ${type}`
    buttonsElement.parentElement.getElementsByClassName('admin')[0].innerHTML = `Reviewed by: ${document.getElementById('username').innerHTML}`
    buttonsElement.remove();
}