import { InvalidParamError, MissingParamError } from '../errors'
import { IController, IHttpRequest, IHttpResponse, IEmailValidator } from "../protocols"
import { badRequest, serverError } from "../helpers/http-helper"

export class SignUpController implements IController {
  private readonly emailValidator: IEmailValidator
  constructor (emailValidator: IEmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: IHttpRequest): IHttpResponse {
    try {
      const requiredFields = [
        "name",
        "email",
        "password",
        "passwordConfirmation"
      ]
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      if (httpRequest.body.password !== httpRequest.body.passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }
      const isValid = this.emailValidator.isValid(httpRequest.body.email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      throw new Error()
    } catch (error) {
      return serverError()
    }
  }
}
