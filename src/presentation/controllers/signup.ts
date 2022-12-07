import { IHttpRequest, IHttpResponse } from "../protocols/http"
import { MissingParamError } from "../errors/missing-param-error"

export class SignUpController {
  handle (httpRequest: IHttpRequest): IHttpResponse {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new MissingParamError("name")
      }
    }
    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new MissingParamError("email")
      }
    }
    return {
      statusCode: 200,
      body: "success"
    }
  }
}
