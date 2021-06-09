import { ExtractJwt, Strategy as StrategyJwt } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import { User } from '../db/schemas/typegooseSchemas/UserTypegooseSchema';
import { jwtSecret } from '../config/config';

const bcrypt = require('bcrypt')

const initialize = (passport) => {
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret,
  };

  const verifyToken = async (jwtPayload, done) => {
    try {
      const user = await User.findOne({ username: jwtPayload.username });
      return done(null, user);
    } catch(e) {
      return done(e);
    }
  };

  const authenticateUser = async (username, password, done) => {
    const user = await User.findOne({ username: username });
    if (!user) {
      return done(null, false);
    }

    try {
      if (await bcrypt.compare(password, user?.password)) {
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