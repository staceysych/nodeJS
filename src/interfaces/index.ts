import { Request } from 'express';

export interface IUser {
  id?: string;
  username?: string;
  password?: string;
}
export interface IProduct {
  id?: string;
  displayName: string;
  categoryIds?: string[];
  createdAt?: Date;
  price: string;
  totalRating: string;
}
export interface IGetUserAuthInfoRequest extends Request {
  user: any;
}
