import { combineReducers } from "redux";
import authReducer from "./authReducer.js";
import { reducer as reduxForm } from "redux-form";
import surveyReducer from "./surveyReducer.js";
import streamsReducer from "./streamReducer.js";

export default combineReducers({
	auth: authReducer,
	form: reduxForm,
	surveys: surveyReducer,
	streams: streamsReducer
})