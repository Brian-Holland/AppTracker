const express = require('express');
const router = express.Router();

// @route       GET api/applications
// @descr       Get all applications
// @access      Private
router.get('/', (req, res) => {
	res.send('Lists all applications');
});

// @route       POST api/applications
// @descr       Add new application
// @access      Private
router.post('/', (req, res) => {
	res.send('add new app');
});

// @route       PUT api/applications/:id
// @descr       Update application
// @access      Private
router.put('/:id', (req, res) => {
	res.send('Update application');
});

// @route       DELETE api/applications/:id
// @descr       Delete application
// @access      Public
router.delete('/:id', (req, res) => {
	res.send('Delete application');
});

module.exports = router;
