
export const extractErrorMessages = (errorObj: any): string => {
  if (!errorObj || !errorObj.error) return "";
  return errorObj.error.flatMap((err: any) => err.errors).join('\n');
};