const passport = require("passport");

const development = "http://localhost:3000";
// util
var util = require('util');
// //mongo client
const MongoClient = require('mongodb').MongoClient;
// require keys 
const keys = require("../config/keys.js");
// require stream info model
const StreamModel = require("../models/streamInfo.js");

module.exports = (app) => {
	MongoClient.connect(keys.olderMongoURI, { useNewUrlParser: true }, function (err, db) {
		if (err) {
			console.log(err);
		} else {
			db.collection('streamCollectionName', function (err, collection) {
	        app.get("/streams", (req, res) => {
				collection.find().toArray((err, results) => {
					if (err) {
						console.log(err);
					} else {
						res.send(results);
					}
				})
			});
	    });    	
		}	
	});
};
const mongodb = require('mongodb');

module.exports = (app) => {
		MongoClient.connect(keys.olderMongoURI, { useNewUrlParser: true }, function (err, db) {
			if (err) {
				console.log(err);
			} else {
				app.delete('/streams/:id', (req, res) => {
					console.log(req.params);
				  	db.collection('streamCollectionName', function(err, collection) {
					   collection.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
					});
				})
		}
	});
}
