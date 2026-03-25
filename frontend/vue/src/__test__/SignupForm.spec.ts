import SignupForm from "@/SignupForm";
import { describe, expect, it } from "vitest"

describe("", () => {
    it ("", () => {
        const form = new SignupForm();
        expect(form.step).toBe(1);
        expect(form.getProgress()).toBe(0);
        form.next();
        expect(form.message).toBe("Name is required");
        form.name = "John Doe";
        expect(form.getProgress()).toBe(25);
        form.next();
        expect(form.message).toBe("Email is required");
        form.email = "john.doe@gmail.com";
        expect(form.getProgress()).toBe(50);
        form.next();
        expect(form.message).toBe("Document is required");
        form.document = "11111111111";
        expect(form.getProgress()).toBe(75);
        form.next();
        expect(form.step).toBe(2);
        form.password = "asdQWE123";
        expect(form.getProgress()).toBe(75);
        form.confirmPassword = "asdQWE123";
        expect(form.getProgress()).toBe(100);
    });
});