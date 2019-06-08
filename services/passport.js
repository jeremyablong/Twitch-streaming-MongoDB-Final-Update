// import express 
const express = require("express");
// create app
const app = express();
// passport
const passport = require("passport");
// google o-auth strategy keys
const GoogleStrategy = require("passport-google-oauth20").Strategy;
// confidential keys
const keys = require("../config/keys.js");
// require mongoose lib
const mongoose = require("mongoose");
// user model import
const User = mongoose.model("users");


// serialize user
passport.serializeUser((user, done) => {
	done(null, user.id);
});
// deserialize user
passport.deserializeUser((id, done) => {
	User.findById(id).then((user) => {
		done(null, user);
	});
})
// tell passport to use cookies to manage data



passport.use(new GoogleStrategy({
	clientID: keys.googleClientID,
	clientSecret: keys.googleClientSecret,
	////////////////////////////////////////////////
	// edit this to https://peaceful-eyrie-82759.herokuapp.com/auth/google/callback after production build
	////////////////////////////////////////////////
	callbackURL: "http://localhost:5000/auth/google/callback",
	proxy: true
}, async (accessToken, refreshToken, profile, done) => {
	const existingUser = await User.findOne({ googleID: profile.id })
		if (existingUser) {
			// we already have a record with the profile id
				done(null, existingUser);
		} else {
			// create a new user - no user record make a new record
			const user = await new User({ googleID: profile.id }).save();
			dont(null, user);
		}

	// console.log("Access token", accessToken);
	// console.log("Refresh token", refreshToken);
	// console.log("Profile", profile);
}));

