
export default function nonEmptyString(value: string): boolean {
    return value === null || value === undefined || value === '';
}
