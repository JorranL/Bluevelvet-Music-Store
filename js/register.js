function initializeAdminUser() {
    const users = JSON.parse(window.localStorage.getItem("users")) || [];

    const adminExists = users.some(user => user.email === "admin@admin");

    if (!adminExists) {
        users.push({
            name: "Pedro Almeida",
            email: "admin@admin",
            password: "adminadmin",
            role: "admin"
        });
        window.localStorage.setItem("users", JSON.stringify(users));
    }
}
initializeAdminUser();

const btnRegister = document.getElementById("btnRegister");
if (btnRegister) {
    btnRegister.addEventListener("click", function register() {

        const name = document.getElementById("name")?.value.trim();
        const email = document.getElementById("email")?.value.trim();
        const password = document.getElementById("password")?.value.trim();
        const role = document.getElementById("role")?.value.trim();

        if(password.length < 8){
            alert("Your password must be at least 8 characters long.")
            return;
        }

        const users = JSON.parse(window.localStorage.getItem("users")) || [];
        
        const emailExists = users.some(user => user.email == email);
        if (emailExists) {
            alert("This email is already in use. Please use another email.");   
            return;
        }

        users.push({ name, email, password, role });
        window.localStorage.setItem("users", JSON.stringify(users));

        alert("User created successfully!");
        location.href = "index.html";
    });
}
