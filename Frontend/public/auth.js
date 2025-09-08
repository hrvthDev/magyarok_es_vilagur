import { errorNotifaction, succesNotifaction, dataValidation} from "./module.js";

export async function authRegisterForm(e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (!username || !password) {
        dataValidation();
        return;
    }

    try {
        const registerResponse = await fetch(
            "http://localhost:5000/api/register",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            }
        );

        if (!registerResponse.ok) {
            errorNotifaction();
            throw new Error("Szerver hiba történt!");
        }
        console.log("Sikeres regisztráció!");
        succesNotifaction();
        setTimeout(() => {
            window.location.href = "index.html";
        }, 1500); 
    } catch (err) {
        console.error("Szerver hiba történt!", err);
        errorNotifaction();
    }
}

export async function authLoginForm(e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (!username || !password) {
        dataValidation();
        return;
    }

    try {
        const loginResponse = await fetch("http://localhost:5000/api/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        if (!loginResponse.ok) {
            errorNotifaction();
            throw new Error("Szerver hiba történt!");
        }

        localStorage.setItem("isLogin", true);
        localStorage.setItem("username", username);
        console.log("Sikeresen bejelentkeztél!");
        succesNotifaction();
        setTimeout(() => {
            window.location.href = "index.html";
        }, 1500)

    } catch (err) {
        console.error("Szerver hiba történt!");
    }
}
