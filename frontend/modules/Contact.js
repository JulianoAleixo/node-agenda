import validator from "validator";

export default class Contact {
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
            this.hideAllErrors();
            this.validate(e);
        });

        this.form.addEventListener("change", (e) => {
            this.hideAllErrors();
        });
    }

    validate(e) {
        const el = e.target;
        const nameInput = el.querySelector('input[name="name"]');
        const emailInput = el.querySelector('input[name="email"]');
        const phoneInput = el.querySelector('input[name="phone"]');

        console.log(nameInput);
        let errors = [];

        if (!nameInput.value) {
            errors.push({
                name: "Name is a required field",
            });
        }

        if (emailInput.value && !validator.isEmail(emailInput.value)) {
            errors.push({ email: "Invalid Email" });
        }

        if (phoneInput.value && !this.isValidPhone(phoneInput.value)) {
            errors.push({ phone: "Invalid Phone" });
        }

        if (!emailInput.value && !phoneInput.value) {
            errors.push({
                email: "At least one contact must be sent: email or phone",
            });
            errors.push({
                phone: "At least one contact must be sent: email or phone",
            });
        }

        if (errors.length === 0) {
            el.submit();
            return;
        }

        errors.forEach((error) => {
            const errorLabel = document.querySelector(
                `#${Object.keys(error)[0]}-error`
            );
            errorLabel.classList.remove("d-none");
            errorLabel.innerText = Object.values(error)[0];
        });
    }

    isValidPhone(phone) {
        const regex = /^(\+55\s?)?(\(?\d{2}\)?\s?)?(\d{4,5}[-\s]?\d{4})$/;
        return regex.test(phone);
    }

    hideAllErrors() {
        const elements = document.querySelectorAll("small");
        elements.forEach((el) => el.classList.add("d-none"));
    }
}
