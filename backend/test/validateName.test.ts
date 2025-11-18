import { validateName } from "../src/validateName";

test.each([
    "John Doe",
    "John Doe Xy",
    "John Doe Xy Pr",
])("Deve validar a name: %s", (name: string) => {
    const isValid = validateName(name);
    expect(isValid).toBe(true);
});

test.each([
    "John",
    ""
])("Não deve validar a name: %s", (name: string) => {
    const isValid = validateName(name);
    expect(isValid).toBe(false);
});