const express = require('express')

const app = express()

const passport = require('passport')

const session = require('express-session')

const User = require('./models/User')

const facebookStrategy = require('passport-facebook').Strategy

app.set("view engine", "ejs")
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new facebookStrategy({

  // pull in our app id and secret from our auth.js file
  clientID: "362036274793526",
  clientSecret: "c6e7bbed1c04f8bd635fe387f81981f8",
  callbackURL: "http://localhost:5000/facebook/callback",
  profileFields: ['id', 'displayName', 'name', 'birthday', 'picture.type(large)', 'email']

},// facebook will send back the token and profile
  function (token, refreshToken, profile, done) {

    // asynchronous
    process.nextTick(function () {


      // find the user in the database based on their facebook id
      User.findOne({ 'uid': profile.id }, function (err, user) {

        // if there is an error, stop everything and return that
        // ie an error connecting to the database
        if (err)
          return done(err);

        // if the user is found, then log them in
        if (user) {
          return done(null, user); // user found, return that user
        } else {
          // if there is no user found with that facebook id, create them
          var newUser = new User();

          // set all of the facebook information in our user model
          newUser.uid = profile.id; // set the users facebook id                   
          newUser.token = token; // we will save the token that facebook provides to the user                    
          newUser.name = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
          newUser.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first
          newUser.pic = profile.photos[0].value;
          newUser.pic = profile.photos[0].value;
          console.log("log1", profile._json.birthday);
          newUser.birthday = profile._json.birthday;
          console.log("log2", newUser.birthday);
          console.log("log3", typeof profile._json.birthday);



          // save our user to the database
          newUser.save(function (err) {
            if (err)
              throw err;

            // if successful, return the new user
            return done(null, newUser);

          });

        }

      }); console.log(profile._json.birthday);


    })

  }));

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

app.get('/profile', isLoggedIn, function (req, res) {
  res.render('profile', {
    user: req.user // get the user out of session and pass to template
  });

});

app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

// route middleware to make sure
function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to the home page
  res.redirect('/');
}

app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'user_birthday'] }));

app.get('/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/profile',
    failureRedirect: '/'
  }));

app.get('/', (req, res) => {
  res.render("index")
})

app.listen(5000, () => {
  console.log("App is listening on Port 5000")
})


