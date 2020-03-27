
const express = require('express');
require('dotenv').config();
const { Client } = require('pg');
const app = express();
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const photoRouter = require('./routes/photo.router');
const calendarRouter = require('./routes/calendar.router');
const bandVenueRouter = require('./routes/bandVenue.router');
const profileRouter = require('./routes/profile.router');
const genreRouter = require('./routes/genre.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());  //to parse the files

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/photo', photoRouter);
app.use('/api/calendar', calendarRouter);
app.use('/api/event', bandVenueRouter);
app.use('/api/profile', profileRouter);
app.use('/api/genre', genreRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

//* say hi to postgres *// --comment out or remove before production build--
const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'con',
  password: 'secretpass',
})
client
  .connect()
  .then(() => console.log('postgres database connected....'))
  .catch(err => console.error('connection error', err.stack))