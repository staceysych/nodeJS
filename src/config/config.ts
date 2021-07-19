require('dotenv').config();

export const db = process.env.DB;
export const dbString = process.env.DB_CONN_STRING;
export const port = process.env.PORT || 3000;
export const psqlHost = process.env.POSTGRES_HOST;
export const psqlPort = process.env.POSTGRES_PORT;
export const psqlPassword = process.env.POSTGRES_PASSWORD;
export const psqlUser = process.env.POSTGRES_USER;
export const psqlDb = process.env.POSTGRES_DB;
export const jwtSecret = process.env.JWT_SECRET_KEY;
export const refreshSecret = process.env.REFRESH_SECRET_KEY;
export const jwtConfig = {
  jwtSecret: process.env.JWT_SECRET_KEY,
  refreshSecret: process.env.REFRESH_SECRET_KEY,
  tokens: {
    access: {
      type: 'access',
      expiresIn: '2m',
    },
    refresh: {
      type: 'refresh',
      expiresIn: '3m',
    },
  },
};
