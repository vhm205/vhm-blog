require('dotenv').config();
require('./config/connectDB');
const express = require('express');
const app = express();

// Libraries
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// Routes
const userRoute = require('./routes/users');

// Setup Cors
const whitelist = ['http://localhost', 'http://localhost:3000'];
const corsOptions = {
	origin: function (origin, callback) {
		if (whitelist.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
};

app.use(helmet());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/users', userRoute);

app.get('/', (req, res) => {
	res.send('Hello World');
});

const PORT = process.env.PORT || 1002;
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
