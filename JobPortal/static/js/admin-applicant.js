function reply(id, type) {
    const xhr = new XMLHttpRequest();

    xhr.open("POST", window.location.href);
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

    const info = JSON.stringify({'id': id, 'type': type});
    console.log(info)
    xhr.send(info);
}

const acceptButtons = document.getElementsByClassName('accept');
const denyButtons = document.getElementsByClassName('deny');


for (x of acceptButtons){
    var id = x.parentElement.parentElement.id;
    x.addEventListener('click', function () {
        var type = 'accepted';
        reply(id, type)
    })
}

for (x of denyButtons){
    var id = x.parentElement.parentElement.id;
    x.addEventListener('click', function () {
        var type = 'denied';
        reply(id, type)
    })
}
