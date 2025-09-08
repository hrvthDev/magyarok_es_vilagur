export const isLogin = () => {
    const protectedRoutes = ["/index.html"];
    const isLogin = localStorage.getItem("isLogin");

    const currentPage = window.location.pathname;
    if (!isLogin && protectedRoutes.includes(currentPage)) {
        alert("Először jelentkezz be!");
        window.location.href = "login.html";
        return false;
    }

    return !!isLogin;
};

export const authLink = () => {
    const isLogin = localStorage.getItem("isLogin") === "true";
    const authLink = document.getElementById("auth-link");

    if (isLogin) {
        authLink.innerHTML = "<a href='#' id='logout-link' >Kijelentkezés</a>";
    } else {
        authLink.innerHTML = "<a href='login.html'>Bejelentkezés</a>";
    }
};

export const getUsername = () => {
    const username = localStorage.getItem("username");
    const welcomeMessage = document.getElementById("welcome-msg");
    const headerUsername = document.getElementById("username2");

    if (username) {
        welcomeMessage.textContent = `Üdvözöllek kedves ${username}`;
    } else {
        welcomeMessage.innerHTML = `Üdvözöllek kedves látogató, kérlek jelentkezz be az oldal megtekintéshez! Ha még nincs fiókod akkor a következő linken tudsz <a href="register.html">regisztrálni</a>`;
        welcomeMessage.classList.add("warning");
    }

    if (headerUsername) {
        headerUsername.textContent = username || "Vendég";
    }
};

export const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("isLogin");
    window.location.href = "login.html";
    alert("Sikeresen kijelentkeztél!");
};

export const errorNotifaction = () => {
    Toastify({
        text: "Hiba történt a bejelentkezés/regisztráció során!",
        style: {
            background: "red",
        },
        position: "center",
    }).showToast();
};


export const succesNotifaction = () => {
    Toastify({
        text: "Sikeresen bejelentkeztél/regisztráltál!",
        style:{
            background: "green",
        },
        position: "center"
    }).showToast();

}

export const dataValidation = () => {
    Toastify({
        text: "Kötelező megadni az adatokat!",
        style:{
            background: "red",
        },
        position: "center"
    }).showToast();
}