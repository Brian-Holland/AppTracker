const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Application = require('../models/Application');

// @route       GET api/applications
// @descr       Get all users applications
// @access      Private
router.get('/', auth, async (req, res) => {
	//find applications by users id
	try {
		const applications = await Application.find({ user: req.user.id }).sort({ date: -1 });

		//send json response with app info
		res.json(applications);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

// @route       POST api/applications
// @descr       Add new application
// @access      Private
router.post(
	'/',
	[
		auth,
		[
			check('company', 'Company name is required').not().isEmpty(),
			check('positionTitle', 'Position title is required').not().isEmpty()
		]
	],
	async (req, res) => {
		//save errors from express validation in variable
		const errors = validationResult(req);

		//if there are errors, throw 400 error and log
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		//pull info from req.body
		const { company, positionTitle, refNumber, appliedOn, appUrl, contactNumber, contactName, notes } = req.body;

		try {
			//create application using info
			const newApplication = new Application({
				company,
				positionTitle,
				refNumber,
				appliedOn,
				appUrl,
				contactNumber,
				contactName,
				notes,
				user: req.user.id
			});

			//save application in variablee
			const application = await newApplication.save();

			//respond with json of the application
			res.json(application);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server error');
		}
	}
);

// @route       PUT api/applications/:id
// @descr       Update application
// @access      Private
router.put('/:id', auth, async (req, res) => {
	//pull info from req.body
	const { company, positionTitle, refNumber, appliedOn, appUrl, contactNumber, contactName, notes } = req.body;

	//build application object
	const applicationFields = {};
	if (company) applicationFields.company = company;
	if (positionTitle) applicationFields.positionTitle = positionTitle;
	if (refNumber) applicationFields.refNumber = refNumber;
	if (appliedOn) applicationFields.appliedOn = appliedOn;
	if (appUrl) applicationFields.appUrl = appUrl;
	if (contactNumber) applicationFields.contactNumber = contactNumber;
	if (contactName) applicationFields.contactName = contactName;
	if (notes) applicationFields.notes = notes;

	try {
		let application = await Application.findById(req.params.id);

		if (!application) return res.status(404).json({ msg: 'Application not found' });

		//make sure user owns contact
		if (application.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'Not authorized' });
		}

		application = await Application.findByIdAndUpdate(
			req.params.id,
			{
				$set: applicationFields
			},
			{ new: true }
		);
		res.json(application);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

// @route       DELETE api/applications/:id
// @descr       Delete application
// @access      Public
router.delete('/:id', auth, async (req, res) => {
	try {
		let application = await Application.findById(req.params.id);

		if (!application) return res.status(404).json({ msg: 'Application not found' });

		//make sure user owns contact
		if (application.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'Not authorized' });
		}

		await Application.findByIdAndRemove(req.params.id);
		res.json({ msg: 'Contact removed' });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

module.exports = router;
