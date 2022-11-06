const passport = require("passport");
const localStrategy = require("passport-local");
const UserModel = require("./models/userModel");
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

passport.use(
  new JWTstrategy(
    {
      secretOrKey: process.env.JWT_SECRET || "secret_token",
      // jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(), // Use this if you are using Bearer token
    },
    async (payload, done) => {
      try {
        return done(null, payload.user);
      } catch (error) {
        done(error);
      }
    }
  )
);

// This middleware saves the information provided by the user to the database,
// and then sends the user information to the next middleware if successful.
// Otherwise, it reports an error.

passport.use(
  "signup",
  new localStrategy(
    {
      passReqToCallback: true,
      usernameField: "email",
      passwordField: "password",
    },
    async (req, email, password, done) => {
      try {
        const Firstname = req.body.Firstname;
        const Lastname = req.body.Lastname;
        const user = await UserModel.create({
          Firstname,
          Lastname,
          email,
          password,
        });

        return done(null, user, { message: "User created successfully" });
      } catch (error) {
        console.log(error);
        done(error);
      }
    }
  )
);

// This middleware authenticates the user based on the username and password provided.
// If the user is found, it sends the user information to the next middleware.
// Otherwise, it reports an error.
passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      // passReqToCallback: true
    },
    async (email, password, done) => {
      try {
        const user = await UserModel.findOne({ email });

        if (!user) {
          return done(null, false, { message: "User not found" });
        }

        const validate = await user.isValidPassword(password);

        if (!validate) {
          return done(null, false, { message: "Wrong Password" });
        }

        return done(null, user, { message: "Logged in Successfully" });
      } catch (error) {
        return done(error);
      }
    }
  )
);
