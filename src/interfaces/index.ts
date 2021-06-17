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
export interface IProductTypeorm {
  id?: string;
  display_name: string;
  category_ids?: string[];
  created_at?: Date;
  price: string;
  total_rating: string;
  categories: number[];
}
export interface IGetUserAuthInfoRequest extends Request {
  user: any;
}
