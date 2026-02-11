// ================= GLOBAL =================

const loginPage = document.getElementById("loginPage");
const app = document.getElementById("app");

const alertBox = (msg) => {

    const alert = document.createElement("div");

    alert.className = "alert";
    alert.textContent = msg;

    document.body.appendChild(alert);

    setTimeout(() => {
        alert.remove();
    }, 3000);
};

// ================= TASK 1 : LOGIN =================

const loginForm = document.getElementById("loginForm");
const user = document.getElementById("username");
const pass = document.getElementById("password");
const error = document.getElementById("error");

loginForm.addEventListener("submit", (e) => {

    e.preventDefault();

    if (user.value === "" || pass.value === "") {

        error.textContent = "All fields are required!";

    } else {

        error.textContent = "";

        loginPage.classList.add("hidden");
        app.classList.remove("hidden");

        alertBox("Login Successful!");

        loadDashboard();
        loadCourses();
        loadAssignments();
    }
});


// ================= TASK 2 : SIDEBAR =================

const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");

menuBtn.addEventListener("click", () => {

    sidebar.classList.toggle("active");
});


// ================= TASK 9 : NAVIGATION =================

const navLinks = document.querySelectorAll(".nav");
const pages = document.querySelectorAll(".page");
const title = document.getElementById("pageTitle");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        // Remove active
        navLinks.forEach(l => l.classList.remove("active"));
        link.classList.add("active");

        // Hide pages
        pages.forEach(p => p.classList.add("hidden"));

        const page = link.dataset.page;

        document.getElementById(page).classList.remove("hidden");

        title.textContent = page.toUpperCase();
    });
});


// ================= TASK 3 : DASHBOARD =================

function loadDashboard() {

    const stats = [
        { name: "Courses", value: 5 },
        { name: "Assignments", value: 3 },
        { name: "Attendance", value: "91%" },
        { name: "GPA", value: 8.5 }
    ];

    const cards = document.getElementById("cards");

    cards.innerHTML = "";

    stats.forEach(item => {

        const div = document.createElement("div");

        div.className = "card";

        div.innerHTML = `
            <h3>${item.name}</h3>
            <p>${item.value}</p>
        `;

        cards.appendChild(div);
    });
}


// ================= TASK 4 : COURSES =================

function loadCourses() {

    const courses = [
        { name: "Java", status: "Active" },
        { name: "DBMS", status: "Completed" },
        { name: "Web Tech", status: "Active" },
        { name: "AI", status: "Active" }
    ];

    const list = document.getElementById("courseList");

    list.innerHTML = "";

    courses.forEach(c => {

        const div = document.createElement("div");

        div.className = "course-card";

        const color =
            c.status === "Active" ? "green" : "gray";

        div.innerHTML = `
            <h4>${c.name}</h4>
            <span class="${color}">
                ${c.status}
            </span>
        `;

        list.appendChild(div);
    });
}


// ================= TASK 5 & 6 : ASSIGNMENTS =================

function loadAssignments() {

    const data = [
        {
            title: "Mini Project",
            due: "2026-02-15",
            status: "Pending"
        },
        {
            title: "Report",
            due: "2026-01-10",
            status: "Pending"
        }
    ];

    const container =
        document.getElementById("assignmentsList");

    container.innerHTML = "";

    const today = new Date();

    data.forEach((a, i) => {

        const dueDate = new Date(a.due);

        if (a.status === "Pending" && dueDate < today) {

            a.status = "Late";
        }

        const div = document.createElement("div");

        div.className = "assignment";

        div.innerHTML = `
            <h4>${a.title}</h4>
            <p>Due: ${a.due}</p>

            <span id="st-${i}">
                ${a.status}
            </span>

            <br>

            <button id="btn-${i}">
                Submit
            </button>
        `;

        container.appendChild(div);

        const btn =
            document.getElementById(`btn-${i}`);

        if (a.status !== "Pending") {

            btn.disabled = true;
        }

        btn.addEventListener("click", () => {

            document.getElementById(`st-${i}`)
                .textContent = "Submitted";

            btn.disabled = true;

            alertBox("Assignment Submitted!");
        });
    });
}


// ================= TASK 7 : PROFILE =================

const editBtn = document.getElementById("editBtn");
const saveBtn = document.getElementById("saveBtn");

const inputs =
    document.querySelectorAll(".profile input");

editBtn.addEventListener("click", () => {

    inputs.forEach(i => i.disabled = false);

    editBtn.classList.add("hidden");
    saveBtn.classList.remove("hidden");
});

saveBtn.addEventListener("click", () => {

    inputs.forEach(i => i.disabled = true);

    saveBtn.classList.add("hidden");
    editBtn.classList.remove("hidden");

    alertBox("Profile Updated!");
});


// ================= TASK 8 : THEME =================

const themeBtn = document.getElementById("themeToggle");

// Load saved theme
const saved = localStorage.getItem("theme");

if (saved === "dark") {

    document.body.classList.add("dark");
}

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {

        localStorage.setItem("theme", "dark");

    } else {

        localStorage.setItem("theme", "light");
    }
});

