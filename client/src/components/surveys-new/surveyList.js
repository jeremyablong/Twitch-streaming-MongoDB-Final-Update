import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchSurveys } from "../../actions/index.js";
import "./surveys-new.css";

class SurveyList extends Component {


	// componentDidMount () {
	// 	this.props.fetchSurveys();
	// }
	// renderSurveys = () => {
	// 	console.log(this.props);
	// 	if (this.props.surveys.length < 1) {
	// 		return <h1 className="text-center"> You do not have any surveys yet... </h1>
	// 	} else {
	// 		return this.props.surveys.map((survey) => {
	// 		return (
	// 			<div class="card" style="width: 18rem;">
	// 			  <img class="card-img-top" src="..." alt="Card image cap" />
	// 			  <div class="card-body">
	// 			    <h5 class="card-title">{survey.title}</h5>
	// 			    <p class="card-text">{survey.body}</p>
	// 			    <p class="card-text">Send On: {new Date(survey.dateSent).toLocaleDateString()}</p>
	// 			    <p class="card-text">Yes: {survey.yes}</p>
	// 			    <p class="card-text">No: {survey.no}</p>
	// 			    <a href="/" class="btn btn-primary">View</a>
	// 			  </div>
	// 			</div>
	// 		);
	// 	})
	// 	}
	// }
	render() {
		return (
			<div>
				<h1 className="text-center">Survey List</h1>
			{/*	{this.renderSurveys()}*/}
			</div>
		);
	}
}
const mapStateToProps = ({ surveys }) => {
	return {
		surveys
	}
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);