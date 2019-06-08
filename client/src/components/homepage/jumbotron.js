import React, { Component } from 'react';
import "./homepage.css";
import axios from "axios";


class Jumbotron extends Component {
	// // THIS GETS THE DATA FROM - ROUTES -  SUBMITFORM.JS
	// gatherStreams = () => {
	// 	axios.get('/streams',{ headers: { 'crossDomain': true, 'Content-Type': 'application/json' } })
	// 	    .then((res) => {
	// 	        console.log(JSON.stringify(res));
	// 	      })
 //    	)	
	// }

	render() {
		return (
			<div>
				{/*<button style={{ marginTop: "40px" }} className="btn btn-danger" type="submit" value="submit" onClick={this.gatherStreams}>Submit</button>*/}
			</div>
		);
	}
}
export default Jumbotron;