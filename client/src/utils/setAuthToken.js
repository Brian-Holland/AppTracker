import axios from 'axios';

const setAuthToken = (token) => {
	//set to global header if token exists
	if (token) {
		axios.defaults.headers.common['x-auth-token'] = token;
		//clear global header if token does not exist
	} else {
		delete axios.defaults.headers.common['x-auth-token'];
	}
};

export default setAuthToken;
