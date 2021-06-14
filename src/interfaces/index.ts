import { Request } from "express"
export interface IUser {
    id?: string;
    username?: string;
    password?: string;
  }
export interface IGetUserAuthInfoRequest extends Request {
  user: any
}