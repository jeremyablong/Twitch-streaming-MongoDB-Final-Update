import React, { Component } from 'react';
import "./main-content.css";
import { Link } from "react-router-dom";
import SurveyList from "../../../surveys-new/surveyList.js";

class MainContentDashboard extends Component {
	render() {
		return (
			<div className="survey_list_container container-fluid">
				<div className="container">
					<SurveyList />
				</div>

				<div className="bottom_right">
					<Link to="surveys/new">
						<i className="fas fa-plus-circle fa-6x"></i>
					</Link>
				</div>
			</div>
		);
	}
}
export default MainContentDashboard;