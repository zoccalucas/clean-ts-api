import { IAddAccount } from './../domain/usecases/add-account'
import { InvalidParamError, MissingParamError } from '../errors'
import { IController, IHttpRequest, IHttpResponse, IEmailValidator } from "../protocols"
import { badRequest, serverError } from "../helpers/http-helper"

export class SignUpController implements IController {
  private readonly emailValidator: IEmailValidator
  private readonly addAccount: IAddAccount
  constructor (emailValidator: IEmailValidator, addAccount: IAddAccount) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
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
      const { name, email, password, passwordConfirmation } = httpRequest.body
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      this.addAccount.add({
        name,
        email,
        password
      })
      return {
        statusCode: 200,
        body: 'success'
      }
    } catch (error) {
      return serverError()
    }
  }
}
