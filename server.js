const express = require('express');
const connectDB = require('./config/db');

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

//set port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
