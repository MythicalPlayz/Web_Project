import { setParameters, deleteJob } from "./jobs.js";

const urlParams = new URLSearchParams(window.location.search);
const jobid = urlParams.get('jobid');
setParameters(jobid);


const deleteButton = document.getElementById('delete');

if (deleteButton){
    deleteButton.addEventListener('click', function () {
        deleteJob(deleteButton.getAttribute('href'))
    });
}