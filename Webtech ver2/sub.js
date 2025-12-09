// -----------------------------
// Dynamic Attendance Title and Date from sub1-main.html
// -----------------------------
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function setAttendanceDetails() {
    const qrId = getQueryParam("qr"); // get qr ID from URL
    if (!qrId) return;

    // Get attendance list from localStorage
    const attendanceList = JSON.parse(localStorage.getItem("attendanceList")) || [];
    const attendance = attendanceList.find(a => a.qr == qrId);
    if (!attendance) return;

    // Set h5 title dynamically
    const h5 = document.querySelector("h5");
    h5.innerHTML = `<a href="homepage.html">Home</a> ❯ <a href="sub1-main.html">IT21WEBTECH BSIT-1A</a> ❯ <b>${attendance.title}</b>`;

    // Set subject in popups
    document.getElementById("subject").value = attendance.title;
    document.getElementById("subjectEdit").value = attendance.title;

    // Set QR code number dynamically
    document.getElementById("qrCode").textContent = attendance.qr;
    document.getElementById("qrCodeEdit").textContent = attendance.qr;

    // Set date and times in QR popup dynamically
    document.getElementById("date").value = attendance.date;
    document.getElementById("dateEdit").value = attendance.date;
    document.getElementById("in").value = attendance.timeIn;
    document.getElementById("inEdit").value = attendance.timeIn;
    document.getElementById("out").value = attendance.timeOut;
    document.getElementById("outEdit").value = attendance.timeOut;

    // Set the date input in the filter section dynamically
    const filterDateInput = document.querySelector('.sec input[type="date"]');
    if(filterDateInput) filterDateInput.value = attendance.date;
}

// Count total Present, Absent, Late
function updateCounts() {
    const rows = document.querySelectorAll("#studentTable tbody tr");
    let counts = {present:0, absent:0, late:0};

    rows.forEach(row => {
        const status = row.querySelector(".status").textContent.toLowerCase();
        if(counts[status] !== undefined) counts[status]++;
    });

    document.getElementById("presentCount").textContent = counts.present;
    document.getElementById("absentCount").textContent = counts.absent;
    document.getElementById("lateCount").textContent = counts.late;

    // Save to localStorage for sub1-main.html
    const qrId = getQueryParam("qr") || 93294; // fallback qrId
    let studentStatus = JSON.parse(localStorage.getItem("studentStatus")) || {};
    studentStatus[qrId] = counts;
    localStorage.setItem("studentStatus", JSON.stringify(studentStatus));
}

// Search Function
document.getElementById("searchInput").addEventListener("input", function() {
    const searchValue = this.value.toLowerCase();
    const rows = document.querySelectorAll("#studentTable tbody tr");
    rows.forEach(row => {
        const name = row.cells[1].textContent.toLowerCase();
        row.style.display = name.includes(searchValue) ? "" : "none";
    });
});

// Filter by status
document.getElementById("statusFilter").addEventListener("change", function() {
    const filter = this.value;
    const rows = document.querySelectorAll("#studentTable tbody tr");
    rows.forEach(row => {
        const status = row.querySelector(".status").textContent.toLowerCase();
        row.style.display = (filter === "all" || status === filter) ? "" : "none";
    });
});

// Initialize page
setAttendanceDetails();
updateCounts();

window.onload = () => {
    if (localStorage.getItem("firstName")) {
        document.getElementById("headerName").innerText =
            localStorage.getItem("firstName") + " (YOU)";
        }
    };