const passport = require('passport');
const passportJWT = require('passport-jwt');
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  //   secretOrKey: process.env.SECRET_OR_KEY,
  secretOrKey: process.env.SCREET_KEY,
};

const strategy = new JwtStrategy(options, (payload, next) => {
  console.log(payload);
});

passport.use(strategy);

module.exports = passport;
