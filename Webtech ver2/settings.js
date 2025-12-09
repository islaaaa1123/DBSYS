/* -------- SHOW PASSWORD -------- */
function togglePass() {
    const p = document.getElementById("password");
    p.type = p.type === "password" ? "text" : "password";
}

/* -------- LOAD STORED DATA -------- */
window.onload = function () {
    if (localStorage.getItem("firstName")) {
        document.getElementById("firstName").value = localStorage.getItem("firstName");
        document.getElementById("lastName").value = localStorage.getItem("lastName");
        document.getElementById("email").value = localStorage.getItem("email");
        document.getElementById("password").value = localStorage.getItem("password");
        document.getElementById("faculty").value = localStorage.getItem("faculty");
        document.getElementById("country").value = localStorage.getItem("country");
        document.getElementById("gender").value = localStorage.getItem("gender");

        document.getElementById("profileDisplayName").innerText = 
            localStorage.getItem("firstName") + " " + localStorage.getItem("lastName");

        document.getElementById("headerName").innerText =
            localStorage.getItem("firstName") + " (YOU)";
    }
};

/* -------- SAVE AND UPDATE PROFILE -------- */
function saveProfile() {
    // Save to localStorage
    localStorage.setItem("firstName", document.getElementById("firstName").value);
    localStorage.setItem("lastName", document.getElementById("lastName").value);
    localStorage.setItem("email", document.getElementById("email").value);
    localStorage.setItem("password", document.getElementById("password").value);
    localStorage.setItem("faculty", document.getElementById("faculty").value);
    localStorage.setItem("country", document.getElementById("country").value);
    localStorage.setItem("gender", document.getElementById("gender").value);

    // Show popup
    const popup = document.getElementById("savePopup");
    popup.style.display = "block";

    // Wait 1.5s then hide and redirect
    setTimeout(() => {
        popup.style.display = "none";
        window.location.href = "profile.html";
    }, 1500);
}

function togglePassword() {
    const pass = document.getElementById("password");
    pass.type = pass.type === "password" ? "text" : "password";
}