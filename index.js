const Express = require('express');
const App = Express();
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 5000;
const morgan = require('morgan');
const bodyParser = require('body-parser');
// const passport = require('./config/passport');
// const cors = require('cors');

// Component
const UserRoutes = require('./routes/users');
const AuthRoutes = require('./routes/auth');
const SchedulesRoutes = require('./routes/schedules');

// Body Parser Muddleware
App.use(bodyParser.json({ extended: true }));
App.use(bodyParser.urlencoded({ extended: true }));
App.use(morgan('dev'));

// Route list
App.use('/api/users', UserRoutes);
App.use('/api/auth', AuthRoutes);
App.use('/api/schedules', SchedulesRoutes);

// Defined not found
App.use((req, res) => {
  res.type('application/json');
  res.status(400);
  res.send('404 not found');
});

//Lets start coffe
App.listen(PORT, () => console.log(`Server started on port ${PORT}`));
