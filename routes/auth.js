const express = require('express');
const router = express.Router();

// @route       GET api/auth
// @descr       Get logged in user
// @access      Private
router.get('/', (req, res) => {
	res.send('get logged in user');
});

// @route       POST api/auth
// @descr       Auth user and get token
// @access      Public
router.post('/', (req, res) => {
	res.send('log in user');
});

module.exports = router;
