document.addEventListener("DOMContentLoaded", function () {

    const btnLogin = document.getElementById("btnLogin");

    if (btnLogin) {
        btnLogin.addEventListener("click", function logIn(event) {
            event.preventDefault();

            const email = document.getElementById("email")?.value.trim();
            const password = document.getElementById("password")?.value.trim();

            const rememberMe = document.getElementById("remember-me")?.checked;

            const users = JSON.parse(window.localStorage.getItem("users")) || [];
            
            const isAdmin = (email === "admin@admin" && password === "adminadmin");
            const userFound = users.find(user => (
                (user.email === email && user.password === password) || isAdmin
            ));
            
            if (userFound) {
                if (rememberMe) {
                    window.localStorage.setItem("rememberedEmail", email);
                    window.localStorage.setItem("rememberedPassword", password);
                } else {
                    window.localStorage.removeItem("rememberedEmail");
                    window.localStorage.removeItem("rememberedPassword");
                }
                window.localStorage.setItem("rememberedRole", userFound.role);
                window.localStorage.setItem("rememberedName", userFound.name);
                alert(`Welcome, ${userFound.name}!`);
                if (["admin", "editor", "salesperson", "shippper"].includes(userFound.role)) {
                    location.href = "dashboard.html";
                } else {
                    alert("Unauthorized role.");
                }
            } else {
                const errorMessage = document.getElementById("error-message");
                errorMessage.style.display = "block";
            }
        });

        const rememberedEmail = window.localStorage.getItem("rememberedEmail");
        const rememberedPassword = window.localStorage.getItem("rememberedPassword");

        if (rememberedEmail && rememberedPassword) {
            const emailInput = document.getElementById("email");
            const passwordInput = document.getElementById("password");

            if (emailInput){ 
                emailInput.value = rememberedEmail;
            }
            if (passwordInput){
                 passwordInput.value = rememberedPassword;
            }

            let rememberMeCheckbox = document.getElementById("remember-me");
            if (rememberMeCheckbox) {
                rememberMeCheckbox.checked = true;
            }
        }
    }
});
