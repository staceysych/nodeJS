import { Strategy as LocalStrategy } from 'passport-local';

import { comparePasswords } from '../utils/passwordHelpers';

import { UserService } from '../services';

const initialize = (passport) => {
  const authenticateUser = async (username, password, done) => {
    const user = await UserService.getOneUser(username);
    if (!user || !user.length) {
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
