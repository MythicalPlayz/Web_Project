import { setParameters } from "./jobs.js";

const urlParams = new URLSearchParams(window.location.search);
const jobid = urlParams.get('jobid');
setParameters(jobid);