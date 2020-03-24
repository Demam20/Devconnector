const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const passport = require('passport'); 
const app = express();

//Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//DB config
const db = require('./config/keys').mongoURI;

//connect to mongodb
mongoose
.connect(db, { useFindAndModify: false })
.then(() => console.log('MongDb connected!'))
.catch(err => console.log(err));

//Passport middleware
app.use(passport.initialize());
//Passport config
require('./config/passport')(passport)


// let's write our first route
app.get('/',(req,res) => res.send('hello Doaa')

);
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = 8030;
app.listen(port, () => console.log(`Server running on port ${port}`));
