export class ResponseErrorDto {
  status: number;
  message: string;
  error: string;

  constructor(status: number, message: string, error: string) {
    this.status = status;
    this.message = message;
    this.error = error;
  }
}
