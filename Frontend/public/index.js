import { authLoginForm } from "./auth.js";
import { authRegisterForm } from "./auth.js";
import { isLogin, getUsername, logout, authLink} from "./module.js";

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

    isLogin();
    getUsername();
});
