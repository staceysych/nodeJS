import { Strategy as LocalStrategy } from 'passport-local';

import { comparePasswords } from '../utils/passwordHelpers';

import { UserService } from '../services';
import { POSTGRES_DB } from '../utils/constants';

const initialize = (passport) => {
  const authenticateUser = async (username, password, done) => {
    const user = await UserService.getOneUser(username);
    const isUser = process.env.DB === POSTGRES_DB ? user.length : user;
    if (!isUser) {
      return done(null, false);
    }

    try {
      const isPasswordMatched = await comparePasswords(password, user);
      if (isPasswordMatched) {
        return done(null, user);
      }
      return done(null, false);
    } catch (e) {
      return done(e);
    }
  };

  passport.use(new LocalStrategy({ usernameField: 'username', passwordField: 'password' }, authenticateUser));
};

module.exports = initialize;
