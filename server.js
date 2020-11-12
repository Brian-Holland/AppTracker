const express = require('express');

//initialize express
const app = express();

//define routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/applications', require('./routes/applications'));

app.get('/', (req, res) => {
	res.send('online');
});

//set port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
