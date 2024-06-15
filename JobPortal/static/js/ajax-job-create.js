;const idInput = document.getElementById('id');
function validJobId(){
    const xhr = new XMLHttpRequest();
    const jobid = idInput.value;
    if (!jobid)
        return;
    xhr.open('GET', `/api/job/${jobid}`, true);

                xhr.onload = function() {
                    if (xhr.status === 200) {
                        const status = JSON.parse(xhr.responseText);
                        idInput.style.borderColor = (status.valid) ? '#0f0' : '#f00';
                    };
                }
                xhr.send();
}

idInput.addEventListener('input',validJobId)