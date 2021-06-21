export const SORT_DIRECTION = ['ASC', 'DESC'];
export const USERNAME_REGEX = /^[a-zA-Z]+$/i;
export const PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/i;
export const USER_ALREADY_EXISTS = 'This username already exists';
export const INVALID_USER_DATA =
  'Invalid username or password. Password should be at least 8 characters including one capital letter, one number, one special sign';
export const USER_DOES_NOT_EXIST = 'User does not exist';
export const USER_IS_NOT_AUTHORIZED = 'User is not authorized';
export const AUTH_ERROR = 'Authentication error, something is not right';
export const INCORRECT_CREDENTIALS = 'Incorrect username or password';
export const PASSWORDS_DO_NOT_MATCH = ' Passwords do not match';
export const POSTGRES_DB = 'pg';
export const ONLY_ADMIN = 'Access denied. Only admins';
export const ROLES = { admin: 'admin', buyer: 'buyer' };
export const CATEGORY_WAS_DELETED = 'Category was deleted';
export const PRODUCT_WAS_DELETED = 'Product was deleted';
