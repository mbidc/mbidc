import { API } from "../constants";

export class APIError extends Error {
  code: number;
  cause?: Error;
  constructor(code: number, cause?: Error) {
    super();
    this.code = code;
    this.cause = cause;
    if (cause) {
      this.message = cause.message;
      this.stack = cause.stack;
    }
  }
  toString() {
    return (
      `APIError: ${this.code}` +
      (this.cause ? `, cause: ${this.stack}` : `${this.message}`)
    );
  }
}

const fetcher = (url: string) =>
  fetch(API + url)
    .then((r) => {
      if (r.status === 404) {
        throw new APIError(404);
      }
      return r.json();
    })
    .catch((e) => {
      if (e instanceof APIError) {
        throw e;
      } else if (e instanceof TypeError) {
        throw new APIError(-1, e);
      }
      throw new APIError(-1, e);
    });

export default fetcher;
