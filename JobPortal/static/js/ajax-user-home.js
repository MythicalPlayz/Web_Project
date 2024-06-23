const loadingHTML = `<div class='load-center'><div class="loader"></div></div>`;
const noneHTML = `<p>Could not find any record.</p>`;

const appElement = document.getElementById('quick-short');

async function getUserHome(){
    appElement.innerHTML = loadingHTML;
    const result = await fetch(`/api/home/`);
    if (result.ok){
        const home = await result.json();
        let container = '';
        for (let app of home.applicants){
            container += 
            `<div class="job">
                <h4>${app.job_name}</h4>
                <p>${app.job_company}</p>
                <span>Status: ${app.status}</span>
            </div>`
        }
        if (!container){
            container = noneHTML;
        }
        appElement.innerHTML = container;

    }
    else {
        appElement.innerHTML = noneHTML;
    }
}

getUserHome();