// config/passport.js
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/User");

const configurePassport = () => {
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "secret",
  };

  passport.use(
    new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
      console.log("JWT Payload:", jwt_payload);
      try {
        const user = await User.findById(jwt_payload.id);

        if (user) {
          console.log("User found:", user);
          return done(null, user);
        } else {
          console.log("User not found");
          return done(null, false);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        return done(error, false);
      }
    })
  );
};

module.exports = configurePassport;
