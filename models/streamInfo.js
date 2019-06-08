const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let StreamItem = new Schema({
	stream_description: {
		type: String
	},
	stream_title: {
		type: String
	}
});

module.exports = mongoose.model("Stream", StreamItem);