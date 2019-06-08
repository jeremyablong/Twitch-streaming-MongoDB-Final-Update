import React from "react";
import "./surveys-new.css";
import { connect } from "react-redux";
import { submitSurvey } from "../../actions/index.js";
import { withRouter, Link } from "react-router-dom";


const SurveyReview = ({ onCancel, formValues, submitSurvey, history }) => {
	return (
		<div>
			<h5 className="text-center">Please confirm your entries</h5>
		
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<label><span className="span_red">Title</span></label>
						<h2>{formValues.title}</h2>
						<label><span className="span_red">Subject</span></label>
						<h2>{formValues.subject}</h2>
						<label><span className="span_red">Email List</span></label>
						<h2>{formValues.emails}</h2>
						<label><span className="span_red">Body</span></label>
						<h2>{formValues.body}</h2>
					</div>
				</div>
			</div>

			<div className="container">
				<div className="row">
					<div className="col-md-6">
						<button className="btn btn-danger" onClick={onCancel}><i className="far fa-share-square fa-2x"></i>Click To Go Back To Edit Survey</button>
					</div>
					<div className="col-md-6 ml-auto">
					<Link to="/surveys">
						<button onClick={() => submitSurvey(formValues)} className="btn btn-success lower_btn"><i className="far fa-share-square fa-2x"></i> Send Survey</button>
					</Link>
					</div>
				</div>
			</div>
			<div className="mx-auto">
			</div>
		</div>
	);
}
const mapStateToProps = (state) => {
	console.log(state);
	return {
		formValues: state.form.surveyForm.values
	}
}
export default connect(mapStateToProps, { submitSurvey })(withRouter(SurveyReview));