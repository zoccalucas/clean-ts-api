import { IHttpRequest, IHttpResponse } from "../protocols/http"

export interface IController {
  handle (httpRequest: IHttpRequest): IHttpResponse
}
