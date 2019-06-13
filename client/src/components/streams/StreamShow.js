import React, { Component } from "react"; 
import { connect } from "react-redux";
import { fetchStream, streamInformation } from "../../actions/index.js";
import flv from "flv.js";
import NavbarHome from "../navbar/navbar.js";
import "./streams-css/index.css";
import {
	DOCUMENT_ID
} from "../../actions/types.js";
import store from "../../store/store.js";
import "./streams-css/index.css";
import axios from "axios";
import Chat from "../chat/chat.js";
import {
	STREAM_TITLE,
	STREAM_DESCRIPTION
} from "../../actions/types.js";


class StreamShow extends Component {
constructor (props) {
	super(props);

	this.state = {
		title: "",
		description: ""
	}

	this.videoRef = React.createRef();
}
	componentDidMount () {
		
		this.setState({
			title: store.getState().streams.Title,
			description: store.getState().streams.Description
		})
		const id = this.props.match.params;

		console.log(id);

		this.props.fetchStream(id);

		this.buildPlayer();
		const config = {
		  headers: {
		    'Content-Type': 'application/json',
		    'accept':'application/json'
		  },
		};
		axios.get("/streams", config).then((res) => {
			let obj = res.data;
			for (let i in obj) {
				this.setState({
					streamsTitle: obj[i].title,
				// 	id: obj[i]._id
				});
			}
		})

		console.log(this.state);
	}
	componentDidUpdate () {
		// return (
		// 	store.dispatch({ type: STREAM_TITLE, payload: this.state.title }), store.dispatch({ type: STREAM_DESCRIPTION, payload: this.state.description })
		// );
		this.buildPlayer();
	}
	
	buildPlayer = () => {
		if (this.player || !this.props.stream) {
			return;
		}
		const { id } = this.props.match.params;

		this.flvPlayer = flv.createPlayer({
			type: "flv",
			url: `http://localhost:8000/live/${id}.flv`
		});
		this.flvPlayer.attachMediaElement(this.videoRef.current);
		this.flvPlayer.load();
	}


	render () {
		if (!this.props.stream) {
			return <h1 className="text-center loading"> Loading... </h1>
		}
			for (let i in this.props.stream) {
				return (
				<div>
				<NavbarHome />
					<div className="col-md-6">
					<video  
						className="video_tag"
						ref={this.videoRef} 
						controls={true}
						autoPlay
					/>
				{/* match up stream ids below to display correct data */}
						<h1 className="text-center live_stream_title">Title: {store.getState().streams.Title}</h1>
						<h4 className="text-center live_stream_description">Description: {store.getState().streams.Description} </h4>
					</div>
					<div className="col-md-6">
						<Chat />
					</div>
				</div>
			);
		}
	}
}


const mapStateToProps = (state, ownProps) => {
	return  {
		stream: state.streams[ownProps.match.params.id]
	}
}

export default connect(mapStateToProps, { fetchStream, streamInformation })(StreamShow);