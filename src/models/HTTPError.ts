/**
 * Defines a throwable subclass of Error used for signaling an HTTP status code.
 */
class HTTPError extends Error {
  private statusCode = 0;
  private body = "";
  /**
   * Constructor for the HTTPResponseError class
   * @param statusCode the HTTP status code
   * @param body - the response body
   */
  constructor(statusCode: number, body: string) {
    super();
    this.statusCode = statusCode;
    this.body = body;
  }
}

export { HTTPError };
