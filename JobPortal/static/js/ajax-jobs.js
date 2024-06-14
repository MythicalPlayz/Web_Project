const form = document.getElementById('filterForm');
const jobsContainer = document.getElementById('jobs');

function getFilter(){
    var name = document.getElementById('name').value;
    var xp = document.getElementById('xp').value;
    if (!name){
        name = 'NULL_NAME';
    }
    if (!xp || xp < 0){
        xp = 0;
    }
    return [name,xp]
}

form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    const filter = getFilter()
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `/api/jobs/filter/${filter[0]}/${filter[1]}`, true);

                xhr.onload = function() {
                    if (xhr.status === 200) {
                        const jobs = JSON.parse(xhr.responseText);
                        reloadJobs(jobs.jobs);
                    } else {
                        window.alert('Failed to fetch jobs');
                    }
                };
                jobsContainer.innerHTML = `<div class='load-center'><div class="loader"></div></div>`;
                xhr.send();
})

function reloadJobs(jobs){
    container = '';
    for (var idx = 0; idx < jobs.length; idx++){
        var job = jobs[idx];
        container += 
        `<a href="details/${job.id}">
        <div class="job">
            <div class="job-info">
                <h3 class="id">${job.id}</h3>
                <h3 class="name">${job.name}</h3>
            </div>
            <p class="company">${job.company}</p>
        </div>
    </a>`;
    }
    if (!container) {
        container = '<p>Sorry, could not find results</p>'
    }
    jobsContainer.innerHTML = container;
}