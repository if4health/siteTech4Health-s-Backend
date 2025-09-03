const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const { CLIENT_ID, CLIENT_SECRET, CALLBACK_URL } = process.env;

passport.use(
  new GoogleStrategy(
    {
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: CALLBACK_URL,
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._json);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
