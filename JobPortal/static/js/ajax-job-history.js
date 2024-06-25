const appElement = document.getElementById('history');
const JobId = document.getElementById('id').innerHTML;

const loadingHTML = `<h3>History</h3><div class='load-center'><div class="loader"></div></div>`;
const noneHTML = `<h3>History</h3><p>Could not find previous record.</p>`;

async function getUserHistory() {
    appElement.innerHTML = loadingHTML;
    const result = await fetch(`/api/applicants/${JobId}/you`);
    if (result.ok){
        const apps = await result.json();
        let container = '<h3>History</h3>';
        if (!apps.applicants.length){
            container = noneHTML;
        }
        else {
            for (let app of apps.applicants){
                const date = new Date(app.time);
                const dateString = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
                container += `
                    <div class="time">
                        <p>${dateString}</p>
                        <span>Status: ${app.status}</span>
                    </div>
                    `
            }
        }
        appElement.innerHTML = container;

    }
    else {
        appElement.innerHTML = noneHTML;
    }
}

getUserHistory();