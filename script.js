const jobsContainer = document.getElementById("jobs-container");
const emptyState = document.getElementById("empty-state");
const totalCountEl = document.getElementById("total-count");
const interviewCountEl = document.getElementById("interview-count");
const rejectedCountEl = document.getElementById("rejected-count");
const jobsCountEl = document.getElementById("jobs-count");
const tabButtons = document.querySelectorAll(".tab-btn");


let activeTab = "all";

function createJobCard(job) {
    const card = document.createElement("div");
    card.classList.add("job-card");
    card.setAttribute("data-id", job.id);

   
    let badgeText = "NOT APPLIED";
    let badgeClass = "not-applied";
    if (job.status === "interview") {
        badgeText = "INTERVIEW";
        badgeClass = "interview";
    } else if (job.status === "rejected") {
        badgeText = "REJECTED";
        badgeClass = "rejected";
    }


    card.innerHTML = `
    <div class="job-card-header">
      <h3 class="company-name">${job.companyName}</h3>
      <button class="delete-btn" data-id="${job.id}" title="Delete">&#128465;</button>
    </div>
    <p class="position">${job.position}</p>
    <p class="job-meta">
      <span>${job.location}</span>
      <span>${job.type}</span>
      <span>${job.salary}</span>
    </p>
    <span class="status-badge ${badgeClass}">${badgeText}</span>
    <p class="description">${job.description}</p>
    <div class="action-buttons">
      <button class="action-btn interview-btn ${job.status === "interview" ? "selected" : ""}" data-id="${job.id}">INTERVIEW</button>
      <button class="action-btn rejected-btn ${job.status === "rejected" ? "selected" : ""}" data-id="${job.id}">REJECTED</button>
    </div>
  `;

    return card;
}


function renderJobs() {
    jobsContainer.innerHTML = "";

    let filtered = [];

    if (activeTab === "all") {
        filtered = jobsData;
    } else if (activeTab === "interview") {
        filtered = jobsData.filter(function (job) {
            return job.status === "interview";
        });
    } else if (activeTab === "rejected") {
        filtered = jobsData.filter(function (job) {
            return job.status === "rejected";
        });
    }

  
    jobsCountEl.textContent = filtered.length + " Jobs";

    if (filtered.length === 0) {
        jobsContainer.classList.add("hidden");
        emptyState.classList.remove("hidden");
    } else {
        jobsContainer.classList.remove("hidden");
        emptyState.classList.add("hidden");

        filtered.forEach(function (job) {
            const card = createJobCard(job);
            jobsContainer.appendChild(card);
        });
    }
}


tabButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
    
        tabButtons.forEach(function (b) {
            b.classList.remove("active");
        });
      
        btn.classList.add("active");
        activeTab = btn.getAttribute("data-tab");
        renderJobs();
    });
});