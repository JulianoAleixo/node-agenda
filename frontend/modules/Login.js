import validator from "validator";

export default class Login {
    constructor(formClass) {
        this.form = document.querySelector(formClass);
    }

    init() {
        this.events();
    }

    events() {
        if (!this.form) return;
        this.form.addEventListener("submit", (e) => {
            e.preventDefault();
            this.validate(e);
        });

        this.form.addEventListener("change", (e) => {
            this.hideErrors(e);
        });
    }

    validate(e) {
        const el = e.target;
        const type = el.classList[0].split('-')[1]; // 'register' or 'login'
        const emailInput = el.querySelector('input[name="email"]');
        const passwordInput = el.querySelector('input[name="password"]');
        let errors = [];

        if (!validator.isEmail(emailInput.value)) {
            errors.push({ email: "Invalid Email" });
        }

        if (passwordInput.value.length < 3 || passwordInput.value.length > 50) {
            errors.push({
                password: "The password must have 3 to 50 characters",
            });
        }

        if (errors.length === 0) {
            el.submit();
            return;
        }

        errors.forEach((error) => {
            const errorLabel = document.querySelector(
                `#${Object.keys(error)[0]}-${type}-error`
            );
            errorLabel.classList.remove("d-none");
            errorLabel.innerText = Object.values(error)[0];
        });
    }

    hideErrors(e) {
        const el = e.target.parentNode.querySelector('small');
        el.classList.add("d-none");
    }
}
