const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
	//get token from header
	const token = req.header('x-auth-token');

	//check if token doesnt exist
	if (!token) {
		return res.status(401).json({ msg: 'No token, authorization denied.' });
	}

	try {
		//verify and decode token
		const decoded = jwt.verify(token, config.get('jwtsecret'));

		//set user to user on token
		req.user = decoded.user;

		next();
	} catch (err) {
		res.status(401).json({ msg: 'Token is not valid' });
	}
};
