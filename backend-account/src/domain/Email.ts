export default class Email {
    private value: string;

    constructor (value: string) {
        if (!this.isValid(value)) throw new Error("Invalid email");
        this.value = value;
    }

    private isValid (value: string) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    public getValue () {
        return this.value;
    }
}