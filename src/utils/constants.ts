export const SORT_DIRECTION = ['ASC', 'DESC'];
export const USERNAME_REGEX = /^[a-zA-Zа-яёА-ЯЁ\s\'\-]+$/i;
export const PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/i;
export const USER_ALREADY_EXISTS = 'This username already exists';
export const INVALID_USER_DATA = 'Invalid username or password. Password should be at least 8 characters including one capital letter, one number, one special sign';
