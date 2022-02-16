export default class BadRequest {
  code: number;
  message: string;

  constructor(message: string) {
    this.code = 400;
    this.message = message;
  }
}
