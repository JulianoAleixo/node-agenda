export default class ChangeTheme {
    constructor(switchClass) {
        this.switchButton = document.querySelector(switchClass);
        this.body = document.querySelector("body");
    }

    init() {
        this.loadThemeFromCookie();
        this.events();
    }

    loadThemeFromCookie() {
        const theme = this.getCookie("theme");
        if (theme === "dark") {
            this.switchButton.checked = true;
            this.applyDarkTheme();
        } else {
            this.switchButton.checked = false;
            this.applyLightTheme();
        }
    }

    events() {
        this.switchButton.addEventListener("click", (e) => {
            const isChecked = e.target.checked;
            if (isChecked) {
                this.applyDarkTheme();
                this.setCookie("theme", "dark", 7);
            } else {
                this.applyLightTheme();
                this.setCookie("theme", "light", 7);
            }
        });
    }

    applyDarkTheme() {
        this.body.classList.replace("bg-light", "bg-dark");
        document.querySelector(".container").classList.replace("text-dark", "text-light");
        const table = document.querySelector(".table")
        if (table) {
            table.classList.add("table-dark");
        }

        document.querySelectorAll(".container .text-dark").forEach((text) => {
            text.classList.replace("text-dark", "text-light");
        });
    }

    applyLightTheme() {
        this.body.classList.replace("bg-dark", "bg-light");
        document.querySelector(".container").classList.replace("text-light", "text-dark");
        const table = document.querySelector(".table")
        if (table) {
            table.classList.remove("table-dark");
        }

        document.querySelectorAll(".container .text-light").forEach((text) => {
            text.classList.replace("text-light", "text-dark");
        });
    }

    setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
    }

    getCookie(name) {
        const cookies = document.cookie.split("; ");
        for (const cookie of cookies) {
            const [key, value] = cookie.split("=");
            if (key === name) return value;
        }
        return null;
    }
}
