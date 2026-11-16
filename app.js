
/**
 * IUEA EQUAL Platform - Core Application Logic
 * Built by: Wilondja Mukamba Gabriel (@gabrielmukamba)
 * Institution: International University of East Africa (IUEA)
 */

const DEFAULT_PROJECTS = [
  {
    title: "CivilTech Concrete & Structural Estimator",
    student: "Wilondja Mukamba Gabriel",
    faculty: "Engineering",
    summary: "Web-based structural material and concrete mix calculator designed to improve accuracy and efficiency for civil engineering students and site engineers.",
    link: "https://github.io"
  },
  {
    title: "AI Engineering Multilingual Translator",
    student: "Wilondja Mukamba Gabriel",
    faculty: "Engineering",
    summary: "AI-powered technical translation tool bridging civil and automotive engineering terminology across English, French, and Swahili.",
    link: "https://onrender.com"
  },
  {
    title: "Campus Peer Mentorship & Legal Aid Portal",
    student: "IUEA Student Governance Group",
    faculty: "Law",
    summary: "Structured peer guidance platform helping international and local students navigate university policies, rights, and academic procedures.",
    link: "#transparency"
  },
  {
    title: "East Africa Youth Entrepreneurship Tracker",
    student: "IUEA Innovation Society",
    faculty: "Business",
    summary: "Digital directory connecting student-led startups with campus mentors, pitch competitions, and seed funding opportunities.",
    link: "#innovation-hub"
  }
];

const STORAGE_KEY = "iuea_equal_projects_v1";
const FEEDBACK_KEY = "iuea_equal_feedback_v1";

function loadProjects() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : DEFAULT_PROJECTS;
}

function saveProjects(projects) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

let projects = loadProjects();
let activeFilter = "all";

const projectsGrid = document.getElementById("projectsGrid");
const projectCount = document.getElementById("projectCount");

function renderProjects() {
  const filtered = activeFilter === "all"
    ? projects
    : projects.filter(p => p.faculty === activeFilter);

  projectCount.textContent = projects.length;

  projectsGrid.innerHTML = filtered.map(project => `
    <article class="project-card">
      <div>
        <span class="faculty-tag">${escapeHTML(project.faculty)}</span>
        <h3>${escapeHTML(project.title)}</h3>
        <p>${escapeHTML(project.summary)}</p>
      </div>
      <div class="project-footer">
        <span>By <strong>${escapeHTML(project.student)}</strong></span>
        ${project.link ? `<a href="${escapeHTML(project.link)}" target="_blank" rel="noopener">View &rarr;</a>` : ""}
      </div>
    </article>
  `).join("");
}

function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

// Faculty Filter Buttons
document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    activeFilter = btn.dataset.filter;
    renderProjects();
  });
});

// Project Submission Modal
const modal = document.getElementById("projectModal");
document.getElementById("openSubmitModal").addEventListener("click", () => modal.classList.add("open"));
document.getElementById("closeSubmitModal").addEventListener("click", () => modal.classList.remove("open"));
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.remove("open");
});

document.getElementById("projectForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const newProject = {
    title: document.getElementById("projTitle").value.trim(),
    student: document.getElementById("projStudent").value.trim(),
    faculty: document.getElementById("projFaculty").value,
    summary: document.getElementById("projSummary").value.trim(),
    link: document.getElementById("projLink").value.trim() || "#innovation-hub"
  };

  projects.unshift(newProject);
  saveProjects(projects);
  renderProjects();
  e.target.reset();
  modal.classList.remove("open");
});

// Constructive Student Feedback Form
document.getElementById("feedbackForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const entry = {
    category: document.getElementById("fbCategory").value,
    rating: document.getElementById("fbRating").value,
    message: document.getElementById("fbMessage").value.trim(),
    submittedAt: new Date().toISOString()
  };

  const existing = JSON.parse(localStorage.getItem(FEEDBACK_KEY) || "[]");
  existing.push(entry);
  localStorage.setItem(FEEDBACK_KEY, JSON.stringify(existing));

  const status = document.getElementById("feedbackStatus");
  status.textContent = "Thank you. Your constructive feedback has been recorded for the IUEA EQUAL annual review.";
  e.target.reset();
});

// Initial Render
renderProjects();