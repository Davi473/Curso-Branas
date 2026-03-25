import Observable from "./Observable";

export default class SignupForm extends Observable {
    step = 1;
    name = "";
    email = "";
    document = "";
    password = "";
    confirmPassword = "";
    accountId = "";
    message = "";

    constructor() {
        super();
    }

    previous() {
        this.step--;
    }

    getProgress() {
        let progress = 0;
        if (this.name) {
            progress += 25;
        }
        if (this.email) {
            progress += 25;
        }
        if (this.document) {
            progress += 25;
        }
        if (this.password && this.confirmPassword && this.password === this.confirmPassword) {
            progress += 25;
        }
        return progress;
    }

    validate() {
        this.message = "";
        if (this.step === 1) {
            if (!this.name) {
                this.message = "Name is required";
                return;
            }
            if (!this.email) {
                this.message = "Email is required";
                return;
            }
            if (!this.document) {
                this.message = "Document is required";
                return;
            }
        }
        if (this.step === 2) {
            if (!this.password) {
                this.message = "Password is required";
                return;
            }
            if (!this.confirmPassword) {
                this.message = "Confirm password is required";
                return;
            }
            if (this.password !== this.confirmPassword) {
                this.message = "Password and confirm password must match";
                return;
            }
        }
    }

    next() {
        this.validate();
        if (this.message) return;
        this.step++;
    }

    signup() {
        this.validate();
        if (this.message) return;
        const event = {
            name: this.name,
            email: this.email,
            document: this.document,
            password: this.password
        }
        this.notifyAll("signup", event);
    }

    populate() {
        this.name = "John Doe";
        this.email = "john.doe@gmail.com";
        this.document = "97456321558";
        this.password = "asdQWE123";
        this.confirmPassword = "asdQWE123";
    }
}