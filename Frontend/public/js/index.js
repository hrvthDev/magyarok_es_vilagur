import { authLoginForm } from "../js/auth.js";
import { authRegisterForm } from "../js/auth.js";
import { isLogin, getUsername, logout, authLink } from "../js/module.js";

const registerForm = document.getElementById("register-form");
const loginForm = document.getElementById("login-form");

document.addEventListener("DOMContentLoaded", () => {
    if (loginForm) {
        loginForm.addEventListener("submit", authLoginForm);
    }

    if (registerForm) {
        registerForm.addEventListener("submit", authRegisterForm);
    }

    authLink();

    const logoutLink = document.getElementById("logout-link");
    if (logoutLink) {
        logoutLink.addEventListener("click", logout);
    }

    document
        .getElementById("dropdownBtn")
        .addEventListener("click", function () {
            document.getElementById("dropdownMenu").classList.toggle("show");
        });

    isLogin();
    getUsername();
});
