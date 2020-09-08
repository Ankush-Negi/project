export function validateEmail(email: string): boolean {
    const reg = /^[a-z0-9](\.?[a-z0-9]){5,}@successive\.tech$/;
    if (reg.test(email) === false) {
        return (false);
    }
    else {
        return (true);
    }

}