const EmailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

export default function validEmail(value: string): boolean {
    return EmailRegex.test(value);
}
