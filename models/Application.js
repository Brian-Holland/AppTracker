const mongoose = require('mongoose');

const ApplicationSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	company: {
		type: String,
		required: true
	},
	positionTitle: {
		type: String,
		required: true
	},
	refNumber: {
		type: String
	},
	appliedOn: {
		type: Date
	},
	appUrl: {
		type: String
	},
	contactNumber: {
		type: String
	},
	contactName: {
		type: String
	},
	notes: {
		type: String
	}
});

module.exports = mongoose.model('application', ApplicationSchema);
