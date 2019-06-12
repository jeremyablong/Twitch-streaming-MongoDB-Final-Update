// bring in express
const express = require("express");
// bring in mongoose
const mongoose = require("mongoose");
// cookie session npm
const cookieSession = require("cookie-session");
// require passport 
const passport = require("passport");
// parser
const bodyParser = require("body-parser");
// require keys 
const keys = require("./config/keys.js");
// require path
const path = require("path");
// require mongodb
const mongodb = require("mongodb");
// router
const router = express.Router();
// //mongo client
const MongoClient = require('mongodb').MongoClient;
// mongoose connection
const db = mongoose.connection;
// express
const app = express();
// util
var util = require('util');
// require cors
const cors = require("cors");
// require http
const httpProxy = require("http-proxy");
// use cors
app.use(cors());
// cors options
app.options('*', cors());
// require model user configurations and collection
require("./models/user.js");
// model survey
require("./models/survey.js");
// passport from services
require("./services/passport.js");
// require streamInfo
require("./models/streamInfo.js");

const streamModel = require("./models/streamInfo.js");
// body parser
app.use(bodyParser.json());
// form routes
require("./routes/submitForm.js")(app);
// body parser
app.use(bodyParser.urlencoded({
   extended: false
}));

const submitFormRoute = require("./routes/submitForm.js")(app);

// development link
const development = "http://localhost:3000";
// production 
const production = "https://limitless-lowlands-82717.herokuapp.com/";
// connect mongoDB to mongoose
mongoose.connect(keys.olderMongoURI, {
	useNewUrlParser: true
}).then(() => {
	console.log("Connected to database");
}).catch((error) => {
	console.log("NOT connected to the database", error);
});

httpProxy.createProxyServer({
    target: 'https://limitless-lowlands-82717.herokuapp.com/',
    toProxy: true,
    changeOrigin: true,
    xfwd: true
});

app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey]
	})
);
app.use(passport.initialize());
app.use(passport.session());
// billing routes
require("./routes/billingRoutes.js")(app);
// auth routes
require("./routes/authRoutes.js")(app);
// survey routes
require("./routes/surveyRoutes.js")(app);
if (process.env.NODE_ENV === "production") {
	// Express will serve up production files
	app.use(express.static("client/build"));
	// serve up index.html file if it doenst recognize the route
	app.get("/*", cors(), (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	})
} 

MongoClient.connect(keys.olderMongoURI, { useNewUrlParser: true }, function (err, db) {
	if (err) {
		console.log(err);
	} else {
		console.log("Connected to live mongodb database");
		db.collection('streamCollectionName', function (err, collection) {
        app.post("/streams", (req, res) => {
			let title = req.body.title;
			let description = req.body.description;
			let googleID = req.user.googleID;
			console.log("Title: " + title, "Description: " + description)
			collection.insert({ title: title, description: description, googleID: googleID });
			
		});
    });    	
    // PUT MORE STUFF IN HERE IF I WANT IT TO RUN SERVER SIDE
    app.get("/streams", (req, res) => {
		db.collection("streamCollectionName", (err, collection) => {
			collection.find().toArray((err, results) => {
				if (err) {
					console.log(err);
				} else {
					res.send(results);
				}
			})
		})
	})
    app.get("/streams/:id", (req, res) => {
		db.collection("streamCollectionName", (err, collection) => {
			collection.find().toArray((err, results) => {
				if (err) {
					console.log(err);
				} else {
					res.send(results);
				}
			})
		})
	})
	}
	const port = process.env.PORT || 5000;

	app.listen(port, () => {
		console.log(`Server is running at port ${port}`);
	}); 	
});


