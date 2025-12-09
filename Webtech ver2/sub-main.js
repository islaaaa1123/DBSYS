// -----------------------------
// LOCAL STORAGE HANDLING
// -----------------------------
let attendanceList = JSON.parse(localStorage.getItem("attendanceList")) || [];

// Get attendance counts from sub1.html
let studentStatus = JSON.parse(localStorage.getItem("studentStatus")) || {};

// -----------------------------
// ADD NEW ATTENDANCE
// -----------------------------
document.getElementById("saveBtn").addEventListener("click", () => {
    const title = document.getElementById("subject").value;
    const timeIn = document.getElementById("in").value;
    const timeOut = document.getElementById("out").value;
    const date = document.getElementById("date").value;

    if (!title || !timeIn || !timeOut || !date) {
        alert("Complete all fields.");
        return;
    }

    const qrId = Math.floor(Math.random() * 90000 + 10000);

    const newAttendance = {
        title,
        timeIn,
        timeOut,
        date,
        qr: qrId
    };

    attendanceList.push(newAttendance);
    localStorage.setItem("attendanceList", JSON.stringify(attendanceList));
    renderTable();

    // Clear input fields
    document.getElementById("subject").value = "";
    document.getElementById("in").value = "";
    document.getElementById("out").value = "";
    document.getElementById("date").value = "";

    window.location.href = "#"; // close popup
});

// -----------------------------
// RENDER TABLE
// -----------------------------
function renderTable() {
    const tbody = document.querySelector("#attendanceTable tbody");
    tbody.innerHTML = "";

    let filtered = [...attendanceList];

    // FILTER BY SEMESTER
    const sem = document.getElementById("sem").value;
    filtered = filtered.filter(item => {
        const d = new Date(item.date);
        if (sem === "midterms") return d >= new Date("2025-02-02") && d <= new Date("2025-03-28");
        if (sem === "finals") return d >= new Date("2025-04-05") && d <= new Date("2025-06-06");
        return true;
    });

    // SEARCH FILTER
    const search = document.getElementById("searchInput").value.toLowerCase();
    filtered = filtered.filter(item => item.title.toLowerCase().includes(search));

    // MONTH-YEAR FILTER
    const filterDate = document.getElementById("filterDate").value; // format: YYYY-MM
    if (filterDate) {
        filtered = filtered.filter(item => {
            const itemMonthYear = item.date.slice(0,7); // get YYYY-MM from date
            return itemMonthYear === filterDate;
        });
    }

    // SORT BY DATE DESCENDING
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

    // RENDER ROWS
    filtered.forEach(item => {
        // Get present count from studentStatus (sub1.html)
        const counts = studentStatus[item.qr] || { present: 0 };
        const presentCount = counts.present || 0;

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><a href="sub1.html?qr=${item.qr}">${item.title}</a></td>
            <td>${new Date(item.date).toLocaleDateString()}</td>
            <td>${item.timeIn}</td>
            <td>${item.timeOut}</td>
            <td>${presentCount}</td>
        `;
        tbody.appendChild(tr);
    });
}

window.onload = () => {
    if (localStorage.getItem("firstName")) {
        document.getElementById("headerName").innerText =
            localStorage.getItem("firstName") + " (YOU)";
        }
    };

// FILTER LISTENERS
document.getElementById("sem").addEventListener("change", renderTable);
document.getElementById("searchInput").addEventListener("input", renderTable);
document.getElementById("filterDate").addEventListener("change", renderTable);

// INITIAL RENDER
renderTable();