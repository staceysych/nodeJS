const passport = require("passport");

import { ExtractJwt, Strategy as StrategyJwt } from 'passport-jwt';
import { User } from '../db/schemas/typegooseSchemas/UserTypegooseSchema';
import { jwtSecret } from '../config/config';

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret
  };

passport.use(
  new StrategyJwt(jwtOptions, (jwtPayload, done) => {
      return User.findOne({ username: jwtPayload.username })
        .then((user) => {
          return done(null, user);
        })
        .catch((err) => {
          return done(err);
        });
    }
  )
);

