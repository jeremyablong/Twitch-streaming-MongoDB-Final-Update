import React, { Component } from "react"; 
import { fetchStreams, fetchStream } from "../../actions/index.js";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import flv from "flv.js";
// import NavbarHome from "../navbar/navbar.js";
import axios from "axios";
import "./streams-css/index.css";
import store from "../../store/store.js";
import {
	STREAM_TITLE,
	STREAM_DESCRIPTION
} from "../../actions/types.js";
import { matchPath } from "react-router-dom";


class StreamList extends Component {
constructor (props) {
	super(props);

	this.state = {
		streams: [],
		id: null
	}

	console.log(this.props)
	this.videoRef = React.createRef();
}
	componentDidMount () {

		this.props.fetchStreams();
		console.log(this.props.match.params)
		const { id } = this.props.match.params;

		this.buildPlayer();

		axios.get("/streams").then((res) => {
			let obj = res.data;
			
			for (let i in obj) {
				this.setState({
					streams: obj,
				// 	id: obj[i]._id
				// }, () => {
				// 	console.log(this.state);
				});
			}
		})
		// this.props.fetchStream(this.state.id);
	};
	componentDidUpdate () {
		this.buildPlayer();
	}
	renderAdmin = (stream) => {
		// store.dispatch({ type: "STREAM_TITLE", payload: stream.title })
		if (stream.googleID === this.props.isSignedIn.googleID) {
			return ( 
		
				<div className="cont_buttons">
					<div className="sub_buttons">
					<Link to={`/streams/edit/${stream._id}`}>
						<button className="btn btn-primary"> EDIT </button> 
					</Link>
					<Link to={`/streams/delete/${stream._id}`}> <button className="btn btn-danger"> DELETE </button></Link>
					</div>
				</div> 

			);
		} 
	};
	buildPlayer = () => {
		if (this.player || !this.props.stream) {
			return;
		}
		
		const { id } = this.props.match.params;
		
		///////////// MAY NEED TO ADJUST LOCAL HOST BELOW ////////////
		///////////// MAY NEED TO ADJUST LOCAL HOST BELOW ///////////
		///////////// MAY NEED TO ADJUST LOCAL HOST BELOW ////////////
		///////////// MAY NEED TO ADJUST LOCAL HOST BELOW ////////////
		

		this.flvPlayer = flv.createPlayer({
			type: "flv",
			url: `ws://localhost:8000/live/${id}.flv`
		});
		// this.flvPlayer.attachMediaElement(this.videoRef.current);
		// this.flvPlayer.load();
	};

	renderList = () => {
		console.log(this.state);
		return this.state.streams.map((stream, index) => {
				return (
					<div className="container_card" key={index}>
						<div className="card outline_box col-lg-2 col-md-4 col-12">
							<img className="card_image" src={require("../../liveStream.jpg")} id="card_images" />
							<div className="row">
							<div className="col-md-12">
								<Link to={`/streams/show/${stream._id}`}>
									<h3 onClick={() => {
										return store.dispatch({ type: STREAM_TITLE, payload: stream.title }), store.dispatch({ type: STREAM_DESCRIPTION, payload: stream.description })
									}} id="title" className="stream_title"> {stream.title.length > 16 ? stream.title.substring(0, 16) + "..." : stream.title} </h3>
								</Link>
								<h6 className="sub_title_two"> {stream.description.length > 30 ? stream.description.substring(0, 30) + "..." : stream.description } </h6>
							</div>
							</div>
							<div className="col-md-12">
								<div className="button_container">{this.renderAdmin(stream)} </div>
							</div>
					</div>
				</div>

			);
		})
	};

	renderCreate = () => {
		if (this.props.isSignedIn) {
			return (
				<div style={{ textAlign: "right" }}> 
					<Link to="/streams/new" className="btn btn-success long_button">
						Create Stream
					</Link>
				</div>
			);
		}
	};
	render () {
		// if (this.props.stream) {
		// 	return <h1 className="text-center loading"> Loading... </h1>
		// }
		return (
		<div className="container-fluid">
		<div className="row">
			<div className="col-md-9">
				<h1 className="text-center stream_header"> Please log in via google to gain complete access to website and features! </h1>
			</div>
			<div className="col-md-3">
				<div> {this.renderCreate()} </div>
			</div>
		</div>
			<div> {this.renderList()} </div>
				
		</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		streams: [state.streams.streams],
		currentUserId: state.auth.userId,
		isSignedIn: state.auth,
		stream: state.streams[ownProps.match.params.id],
		ID: state.streams.streams

	}
}
export default connect(mapStateToProps, { fetchStreams, fetchStream })(StreamList);