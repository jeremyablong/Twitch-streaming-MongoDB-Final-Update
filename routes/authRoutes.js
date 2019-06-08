const passport = require("passport");

const development = "http://localhost:3000";


module.exports = (app) => {
	app.get("/auth/google", passport.authenticate("google", {
		scope: ["profile", "email"]
		})
	);
	app.get("/auth/google/callback", passport.authenticate("google"),
		(req, res) => {
			res.redirect(`${development}/`);
		}
	);

	app.get("/api/logout", (req, res) => {
		req.logout();
		res.redirect(`${development}/`);
	})

	app.get("/api/currentUser", (req, res) => {
		res.send(req.user);
	});
};
