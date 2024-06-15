const usernameLabel = document.getElementById('usernamelabel');
;const usernameInput = document.getElementById('username');
function vaildUsername(){
    const xhr = new XMLHttpRequest();
    const username = usernameInput.value;
    xhr.open('GET', `/api/username/${username}`, true);

                xhr.onload = function() {
                    if (xhr.status === 200) {
                        const status = JSON.parse(xhr.responseText);
                        usernameLabel.innerHTML = `Username Status: ${(status.valid) ? 'Avaliable' : 'Unavaliable'}`;
                        usernameLabel.style.color = (status.valid) ? '#0f0' : '#f00';
                    };
                }
                usernameLabel.innerHTML = `Username Status: `;
                usernameLabel.style.color = '#000';
                xhr.send();
}

usernameInput.addEventListener('input',vaildUsername)