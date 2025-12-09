window.onload = () => {
    if (localStorage.getItem("firstName")) {

        document.getElementById("firstName").value = localStorage.getItem("firstName");
        document.getElementById("lastName").value = localStorage.getItem("lastName");
        document.getElementById("email").value = localStorage.getItem("email");
        document.getElementById("password").value = localStorage.getItem("password");
        document.getElementById("faculty").value = localStorage.getItem("faculty");
        document.getElementById("country").value = localStorage.getItem("country");
        document.getElementById("gender").value = localStorage.getItem("gender");

        document.getElementById("fullName").innerText =
            localStorage.getItem("firstName") + " " + localStorage.getItem("lastName");

        document.getElementById("headerName").innerText =
            localStorage.getItem("firstName") + " (YOU)";
    }
};