require('dotenv').config();
require('./config/connectDB');
const express = require('express');
const app = express();

// Libraries
const helmet = require('helmet');
const morgan = require('morgan');

// Routes
const userRoute = require('./routes/users');

app.use(helmet());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/users', userRoute);

app.get('/', (req, res) => {
	res.send('Hello World');
});

const PORT = process.env.PORT || 1002;
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
