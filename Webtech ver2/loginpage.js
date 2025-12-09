// ---------------- Show/Hide Password ----------------
    function togglePassword() {
        const pass = document.getElementById("password");
        pass.type = pass.type === "password" ? "text" : "password";
    }

    // ---------------- Default credentials / localStorage ----------------
    const defaultEmail = "na.yeongseok@mcc.edu.ph";
    const defaultPassword = "nayeongseok";

    function getSavedEmail() {
        return localStorage.getItem("email") || defaultEmail;
    }
    function getSavedPassword() {
        return localStorage.getItem("password") || defaultPassword;
    }

    // ---------------- Handle login ----------------
    const loginForm = document.getElementById("loginForm");
    loginForm.addEventListener("submit", function(e) {
        e.preventDefault(); // prevent default submission

        const emailInput = document.getElementById("email");
        const passwordInput = document.getElementById("password");
        const errorMsg = document.getElementById("error-msg");

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if(email === getSavedEmail() && password === getSavedPassword()){
            // Login success
            window.location.href = "homepage.html";
        } else {
            // Login failed
            errorMsg.style.display = "block";
            emailInput.classList.add("shake");
            passwordInput.classList.add("shake");

            emailInput.style.borderColor = "red";
            passwordInput.style.borderColor = "red";

            setTimeout(() => {
                emailInput.classList.remove("shake");
                passwordInput.classList.remove("shake");
                emailInput.style.borderColor = "";
                passwordInput.style.borderColor = "";
            }, 1500);
        }
    });

    // ---------------- Caps Lock Warning ----------------
    const passwordField = document.getElementById("password");
    const capsLockMsg = document.getElementById("capsLockMsg");

    passwordField.addEventListener("keyup", function(e) {
        capsLockMsg.style.display = e.getModifierState("CapsLock") ? "block" : "none";
    });
    passwordField.addEventListener("keydown", function(e) {
        capsLockMsg.style.display = e.getModifierState("CapsLock") ? "block" : "none";
    });