import { Strategy as GoogleStrategy } from 'passport-google-oauth2'
import passport from 'passport'
const GOOGLE_CLIENT_ID = "your_client_id"
const GOOGLE_CLIENT_SECRET = "yourclient_secret"
passport.use(new GoogleStrategy({
    clientID:     GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/google/callback",
    passReqToCallback: true
  },
  function(request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
  }
)); 
passport.serializeUser(function (user,done){
    done(null,user)
})
passport.deserializeUser(function (user,done){
    done(null,user)
})

export default passport;