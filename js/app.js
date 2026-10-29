// app.js
// Day 1 capstone: render a hardcoded issues array as cards, filter by category.
// Same data shape (id, title, category, status, votes) the Mongoose Issue
// schema uses from Day 4 onward, and the same .filter() logic the real
// React Dashboard will use from Day 3.

const issues = [
  { id: 1, title: "Leaking tap in Block C washroom", category: "Plumbing", status: "Open", votes: 12 },
  { id: 2, title: "Wi-Fi down on 3rd floor, Hostel 2", category: "Internet", status: "In Progress", votes: 27 },
  { id: 3, title: "Broken tube light, Room 214", category: "Electrical", status: "Resolved", votes: 4 },
  { id: 4, title: "Mess food quality complaint", category: "Food", status: "Open", votes: 19 },
  { id: 5, title: "Router needs restart, Hostel 1", category: "Internet", status: "Open", votes: 8 },
];

function statusClass(status) {
  return status.toLowerCase().replace(" ", "-"); // "In Progress" -> "in-progress"
}

function renderIssues(list) {
  const container = document.querySelector("#issues-grid");
  container.innerHTML = "";

  if (list.length === 0) {
    container.innerHTML = `<p class="empty-state">No issues match this filter.</p>`;
    return;
  }

  list.forEach((issue) => {
    const card = document.createElement("article");
    card.className = "issue-card";
    card.innerHTML = `
      <div class="card-top">
        <span class="badge category">${issue.category}</span>
        <span class="status ${statusClass(issue.status)}">${issue.status}</span>
      </div>
      <h3>${issue.title}</h3>
      <p class="meta">${issue.votes} upvotes</p>
      <div class="card-footer">
        <button class="vote-btn" data-id="${issue.id}">▲ ${issue.votes}</button>
      </div>
    `;
    container.appendChild(card);
  });
}

function applyFilter(category) {
  const filtered =
    category === "all" ? issues : issues.filter((issue) => issue.category === category);

  renderIssues(filtered);
}

// wire up every filter button once
document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    document.querySelector(".filter-btn.active")?.classList.remove("active");
    e.target.classList.add("active");
    applyFilter(e.target.dataset.category);
  });
});

// upvote button — bumps the in-memory count and re-renders (local state only, Day 1 style)
document.querySelector("#issues-grid").addEventListener("click", (e) => {
  if (!e.target.classList.contains("vote-btn")) return;

  const id = Number(e.target.dataset.id);
  const issue = issues.find((i) => i.id === id); // preview of Day 3's useParams lookup
  issue.votes += 1;

  const activeCategory = document.querySelector(".filter-btn.active").dataset.category;
  applyFilter(activeCategory);
});

renderIssues(issues); // initial paint, unfiltered