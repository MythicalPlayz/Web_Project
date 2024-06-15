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

const acceptButtons = document.getElementsByClassName('accept');
const denyButtons = document.getElementsByClassName('deny');


for (x of acceptButtons){
    var id = x.parentElement.parentElement.id;
    x.addEventListener('click', function () {
        var type = 'accepted';
        reply(id, type, x.parentElement);
    })
}

for (x of denyButtons){
    var id = x.parentElement.parentElement.id;
    x.addEventListener('click', function () {
        var type = 'denied';
        reply(id, type, x.parentElement);
    })
}

function resetApp(buttonsElement,type){
    buttonsElement.parentElement.getElementsByClassName('type')[0].innerHTML = `Status: ${type.charAt(0).toUpperCase() + type.slice(1)}`
    buttonsElement.parentElement.getElementsByClassName('admin')[0].innerHTML = `Reviewed by: ${document.getElementById('username').innerHTML}`
    buttonsElement.remove();
}