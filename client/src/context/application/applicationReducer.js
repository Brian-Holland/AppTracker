import {
	ADD_APPLICATION,
	DELETE_APPLICATION,
	SET_CURRENT,
	CLEAR_CRRENT,
	UPDATE_APPLICATION,
	FILTER_APPLICATIONS,
	CLEAR_FILTER
} from '../types';

export default (state, action) => {
	switch (action.type) {
		case ADD_APPLICATION:
			return {
				...state,
				applications: [ ...state.applications, action.payload ]
			};
		case DELETE_APPLICATION:
			return {
				...state,
				applications: [ ...state.applications.filter((application) => application.id !== action.payload) ]
			};
		default:
			return state;
	}
};
