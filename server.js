const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

//initialize express
const app = express();

//connect to DB
connectDB();

//initialize body-parser
app.use(express.json({ extended: false }));

//define routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/applications', require('./routes/applications'));

if (process.env.NODE_ENV === 'production') {
	// Set static folder
	app.use(express.static('client/build'));

	app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

//set port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
