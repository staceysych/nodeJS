export class ApiError extends Error {
  code: number;

  msg: string;

  constructor(code: number, msg: string) {
    super();
    this.code = code;
    this.msg = msg;
  }

  static badRequest(msg) {
    return new ApiError(400, msg);
  }

  static notFound(msg) {
    return new ApiError(404, msg);
  }

  static serverError(msg) {
    return new ApiError(500, msg);
  }

  static conflict(msg) {
    return new ApiError(409, msg);
  }

  static forbidden(msg) {
    return new ApiError(403, msg);
  }

  static unauthorized(msg) {
    return new ApiError(401, msg);
  }
}
