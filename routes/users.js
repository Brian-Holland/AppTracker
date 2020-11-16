const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

// @route       POST api/users
// @descr       Register a user
// @access      Public
router.post(
	'/',
	[
		check('name', 'Name is required.').not().isEmpty(),
		check('email', 'Email is required.').isEmail(),
		check('password', 'Password must be 6 or more charachters long.').isLength({ min: 6 })
	],
	async (req, res) => {
		//save errors from express validation in variable
		const errors = validationResult(req);

		//if there are errors, throw 400 error and log
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, password } = req.body;

		const email = req.body.email.toLowerCase();

		try {
			//check db for email
			let user = await User.findOne({ email });

			//if user with email exists, throw error
			if (user) {
				return res.status(400).json({ msg: 'User already exists' });
			}

			//create new instance of user using req.body info
			user = new User({
				name,
				email,
				password
			});

			//use bcrypt to hash password using salt
			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);

			//save user to db
			await user.save();

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
