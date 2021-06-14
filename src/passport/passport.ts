import { ExtractJwt, Strategy as StrategyJwt } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';

import { jwtSecret } from '../config/config';
import { comparePasswords } from '../utils/passwordHelpers';

import { UserService } from '../services';

const initialize = (passport) => {
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret,
  };

  const verifyToken = async (jwtPayload, done) => {
    const user = await UserService.getOneUser(jwtPayload.username);
      if(!user) {
        return done(null, false);
      } else {
        return done(null, user)
      }
  };

  const authenticateUser = async (username, password, done) => {
    const user = await UserService.getOneUser(username);
    const isUser = process.env.DB === 'pg' ? user.length :  user;
    if (!isUser) {
      return done(null, false);
    }

    try {
      const isPasswordMatched = await comparePasswords(password, user);
      if (isPasswordMatched) {
        return done(null, user)
      } else {
        return done(null, false);
      }
    } catch (e) {
      return done(e)
    }
  }

  passport.use(new LocalStrategy({ usernameField: 'username', passwordField: 'password' }, authenticateUser));
  passport.use(new StrategyJwt(jwtOptions, verifyToken));
}

module.exports = initialize;