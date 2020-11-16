const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const User = require('../models/User');

// @route       GET api/auth
// @descr       Get logged in user
// @access      Private
router.get('/', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');

		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

// @route       POST api/auth
// @descr       Auth user and get token
// @access      Public
router.post(
	'/',
	[ check('email', 'Please include a valid email.').isEmail(), check('password', 'Password is required').exists() ],
	async (req, res) => {
		//save errors from express validation in variable
		const errors = validationResult(req);

		//if there are errors, throw 400 error and log
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		//pull email and password from req.body
		const { password } = req.body;
		const email = req.body.email.toLowerCase();

		try {
			//attempt to find user with email entered
			let user = await User.findOne({ email });

			//if no user with that email, throw 400 error
			if (!user) {
				return res.status(400).json({ msg: 'Invalid credentials' });
			}

			//check if password entered matches password with bcrypt
			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				return res.status(400).json({ msg: 'Invalid credentials' });
			}

			//create payload for jswebtoken
			const payload = {
				user: {
					id: user.id
				}
			};

			//sign jswebtoken with payload and secret from config file
			jwt.sign(
				payload,
				config.get('jwtSecret'),
				{
					expiresIn: 360000
				},
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server error');
		}
	}
);

module.exports = router;
