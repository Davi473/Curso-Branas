export function validateName (name: string): boolean {
    return /[a-zA-Z]+ [a-zA-Z]+/.test(name);
}