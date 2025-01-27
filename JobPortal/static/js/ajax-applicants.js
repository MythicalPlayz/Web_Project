const form = document.getElementById('filterForm');
const jobsContainer = document.getElementById('applicants');

function getFilter(){
    var jobid = document.getElementById('jobid').value;
    if (!jobid){
        jobid = 'NULL_ID';
    }
    return jobid;
}

form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    const filter = getFilter()
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `/api/applicants/${filter}`, true);

                xhr.onload = function() {
                    if (xhr.status === 200) {
                        const jobs = JSON.parse(xhr.responseText);
                        reloadApps(jobs.apps);
                    } else {
                        window.alert('Failed to fetch apps');
                    }
                };

                jobsContainer.innerHTML = `<div class='load-center'><div class="loader"></div></div>`;
                xhr.send();
})

function reloadApps(apps){
    container = '';
    for (var idx = 0; idx < apps.length; idx++){
        var app = apps[idx];
        container +=
        `<div class="job" id="applicant-${app.id}">
        <div class="job-info">
            <h3 class="id">${app.job_id}</h3>
            <h3 class="name">${app.name}</h3>
        </div>
        <div class="app-info">
            <p class="name">Name</p>
            <p class="email">Email</p>
            <p class="resume">Resume</p>
        </div>
        <div class="app-value">
            <p class="name">${app.fullname}</p>
            <p class="email">${app.email}</p>
            <a class="resume" href="{{ ${app.resume}.url }}" target="_blank">View Resume</a>
        </div>
        <div class="status">
            <p class="type">Status: ${app.status}</p>
            <p class="admin">Reviewed by: ${(app.admin === 'Null') ? 'None' : app.admin}</p>
        </div>`;
        if (app.status === 'pending'){
            container += 
            `
            <div class="buttons">
            <button class="accept" onclick="acceptApplicant('${app.id}')">Accept</button>
            <button class="deny" onclick="denyApplicant('${app.id}')">Deny</button>
            </div>
            `;
        }
        container += '</div>';
    }
    if (!container){
        container = '<p>Sorry, could not find results.</p>';
    }
    jobsContainer.innerHTML = container;
}