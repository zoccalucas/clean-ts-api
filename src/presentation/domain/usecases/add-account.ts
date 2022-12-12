import { IAccountModel } from "../models/accounts"

export interface IAddAccountModel {
  name: string,
  email: string,
  password: string
}

export interface IAddAccount {
  add (account: IAddAccountModel): IAccountModel
}
