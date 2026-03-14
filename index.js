const express = require('express')
const app = express()
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const bcrypt = require('bcrypt')

LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(async function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(async function (id, done) {
  User.findById(id, async function (err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
  async function (username, password, done) {
    User.findOne({
      email: username
    }, (err, user) => {
      if (err) return done(err)
      if (!user) return done(null, false, { message: 'User not found!' });
      bcrypt.compare(password, user.password, async function(err, res) {
        if (err) return done(err)
        if (res) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Incorrect password!' });
        }
      })
    })
  }
));

async function loggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    next()
  } else {
    req.flash('error', 'You needed to be logged in to visit that page!');
    res.redirect('/login')
  }
}

var MongoDBStore = require('connect-mongodb-session')(session);

const mongoString = process.env.MONGO_DB_S || 'mongodb://dstlmike1:308boonave@ac-oc5e8f9-shard-00-00.dv4owuj.mongodb.net:27017,ac-oc5e8f9-shard-00-01.dv4owuj.mongodb.net:27017,ac-oc5e8f9-shard-00-02.dv4owuj.mongodb.net:27017/passport?ssl=true&replicaSet=atlas-526m7w-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0';

//const mongoString = 'mongodb://dstlmike1:308boonave@ac-oc5e8f9-shard-00-00.dv4owuj.mongodb.net:27017,ac-oc5e8f9-shard-00-01.dv4owuj.mongodb.net:27017,ac-oc5e8f9-shard-00-02.dv4owuj.mongodb.net:27017/passport?ssl=true&replicaSet=atlas-526m7w-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0';

var store = new MongoDBStore({
  uri: mongoString,
  collection: 'mySessions'
});

/* ************ */
app.use(express.static(__dirname + '/public'));
app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
  secret: 'SECRET_KEY_STRING',
  cookie: {
    maxAge: 1000 * 60 // 1 week
  },
  store: store,
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

const mongoose = require('mongoose');
mongoose.connect(mongoString, { useNewUrlParser: true, useUnifiedTopology: true });
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: String,
  password: String
});

const User = mongoose.model('users', userSchema);

app.post('/register', async (req, res, next) => {
  const user = await User.findOne({
    email: req.body.email
  })

  if (user) {
    req.flash('error', 'Sorry, that name is taken. Maybe you need to <a href="/login">login</a>?');
    res.redirect('/register');
  } else if (req.body.email == "" || req.body.password == "") {
    req.flash('error', 'Please fill out all the fields.');
    res.redirect('/register');
  } else {
    bcrypt.genSalt(10, async function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(req.body.password, salt, async function (err, hash) {
        if (err) return next(err);
        new User({
          email: req.body.email,
          password: hash
        }).save()
        req.flash('info', 'Account made, please log in...');
        res.redirect('/login');
      });
    });
  }
});

app.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureFlash: true }))

app.get('/', loggedIn, (req, res) => {
  res.render('index.ejs', { email: req.user.email })
})

app.get('/hi', loggedIn, (req, res) => {
  res.render('index.ejs', { email: req.user.email })
})

app.get('/login', (req, res) => {
console.log(req);
  res.render('login.ejs')
})

app.get('/register', (req, res) => {
  res.render('register.ejs')
})

app.get('/logout', (req, res) => {
req.logout(async function(err) {
    if (err) {
      return next(err); // Handle errors
    }
console.log(req);
    res.redirect('/'); // Redirect after logout is complete
  });
//console.log(req);
 // req.logOut()
//console.log(req);
//  res.redirect('/login')
})

/*
app.listen(process.env.PORT, async function(req, res, next) {
console.log('Connected');
});        // || 3000, process.env.IP || '0.0.0.0');
*/
app.listen(process.env.PORT || 3000, process.env.IP || '0.0.0.0');
