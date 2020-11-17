import {
	ADD_APPLICATION,
	DELETE_APPLICATION,
	GET_APPLICATIONS,
	APPLICATION_ERROR,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_APPLICATION,
	FILTER_APPLICATIONS,
	CLEAR_FILTER,
	CLEAR_APPLICATIONS
} from '../types';

export default (state, action) => {
	switch (action.type) {
		case GET_APPLICATIONS:
			return {
				...state,
				applications: action.payload,
				loading: false
			};
		case ADD_APPLICATION:
			return {
				...state,
				applications: [ action.payload, ...state.applications ],
				loading: false
			};
		case UPDATE_APPLICATION:
			return {
				...state,
				applications: state.applications.map(
					(application) => (application._id === action.payload._id ? action.payload : application)
				),
				filtered: state.filtered.map(
					(application) => (application._id === action.payload._id ? action.payload : application)
				),
				loading: false
			};
		case DELETE_APPLICATION:
			return {
				...state,
				applications: [ ...state.applications.filter((application) => application._id !== action.payload) ],
				filtered:
					state.filtered === null
						? null
						: state.filtered.filter((application) => application._id !== action.payload),
				loading: false
			};
		case CLEAR_APPLICATIONS:
			return {
				...state,
				applications: null,
				filtered: null,
				error: null,
				current: null
			};
		case SET_CURRENT:
			return {
				...state,
				current: action.payload
			};
		case CLEAR_CURRENT:
			return {
				...state,
				current: null
			};
		case FILTER_APPLICATIONS:
			return {
				...state,
				filtered: state.applications.filter(({ company, positionTitle, refNumber, contactName, notes }) => {
					const testString = `${company}${positionTitle}${refNumber}${contactName}${notes}`.toLowerCase();
					return testString.includes(action.payload.toLowerCase());
				})
			};
		case CLEAR_FILTER:
			return {
				...state,
				filtered: null
			};
		case APPLICATION_ERROR:
			return {
				...state,
				error: action.payload
			};
		default:
			return state;
	}
};
