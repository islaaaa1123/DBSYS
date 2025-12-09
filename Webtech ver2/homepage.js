 window.onload = () => {
            if (localStorage.getItem("firstName")) {
                document.getElementById("headerName").innerText =
                    localStorage.getItem("firstName") + " (YOU)";
            }
        };