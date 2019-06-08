import { 
	FETCH_USER,
	SIGN_OUT,	
	SIGN_IN
 } from "../actions/types.js";

const INITIAL_STATE = {
	isSignedIn: false
}

export default function (state = INITIAL_STATE, action) {
	switch (action.type) {
		case FETCH_USER:
			return action.payload || false;
		case SIGN_IN:
			return {
				...state, isSignedIn: action.payload
			}
		case SIGN_OUT:
			return {
				...state, isSignedIn: action.payload
			}
		default:
			// statements_def
			return state;
	}
}