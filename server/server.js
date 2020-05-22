// Server File
// Everything runs from here

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const {PORT, DATABASE_URL} = require('./config/config');

app.use(bodyParser.json());

//ROUTES
const userRouter = require('./routes/user');

app.use('/user', jsonParser, userRouter);
app.use(bodyParser.urlencoded({
	extended: true
}));

// Connect to the database, and run the server
//Connection to mongoose
function runServer(port, databaseUrl){
	//promise is like ajax
	return new Promise ((resolve, reject) => {
		mongoose.connect(databaseUrl, 
			err => {
				//Validate that its not undefined
				if(err){
					return reject(err);
				}
				else{
					server = app.listen(port, () => {
						console.log('Your app is running in port', port);
						resolve();
					})
					.on('error', err => {
						mongoose.disconnect();
						return reject(err);
					});
				}
			}
		);
	});
}

// Used to close the server
function closeServer(){
	return mongoose.disconnect()
		.then(() => {
			return new Promise((resolve, reject) => {
				console.log('Closing the server');
				server.close(err => {
					if(err){
						return reject(err);
					}
					else{
						resolve();
					}
				});
			});
		});
}


// Execute the runServer function, when running start, this is the first thing running
runServer(PORT, DATABASE_URL)
.catch(err => console.log(err));


module.exports = { app, runServer, closeServer};