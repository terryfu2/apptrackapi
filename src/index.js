import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import router from './router';
import cors from 'cors';
import dbConnection from './database/dbConnection';

const session = require('express-session');
const path = require('path');

const app = express();
dotenv.config();

const port = process.env.NODE_PORT;

app.use(morgan('dev'));

app.use(cors());

app.use( express.json());
app.use( express.urlencoded( { extended:true } ) );


router(app);

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
// http://localhost:3000/auth
app.post('/auth', function(request, response) {
	// Capture the input fields
	let email = request.body.email;
	let password = request.body.password;
	// Ensure the input fields exists and are not empty
	if (email && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		dbConnection.query('SELECT * FROM students WHERE email = ? AND password = ?', [email, password], function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// Authenticate the user
				request.session.loggedin = true;
				request.session.email = email;
				// Redirect to home page
				response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});


app.get('/home', function(request, response) {
	// If the user is loggedin
	if (request.session.loggedin) {
		// Output username
		response.send('Welcome back, ' + request.session.email + '!');
	} else {
		// Not logged in
		response.send('Please login to view this page!');
	}
	response.end();
});




app.listen( port, () => {
    console.log(`Server running in port ${port}`);
});