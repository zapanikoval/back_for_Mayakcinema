const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const keys = require("../Config/keys");
const User = require("../Models/user");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.jwt
};

module.exports = passport => {
  passport.use(
    new JwtStrategy(options, async (payload, done) => {
      try {
        const user = await User.findById(payload.userId).select(
          "email id userName userRole"
        );        
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      } catch (e) {
        console.error(e);
      }
    })
  );
};
