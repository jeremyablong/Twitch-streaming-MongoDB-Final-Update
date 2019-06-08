const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin.js");
const requireCredits = require("../middlewares/requireCredits.js");
const Mailer = require("../services/mailer.js");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate.js");
const _ = require("lodash");
const { Path } = require("path-parser");
const { URL } = require("url");

const Survey = mongoose.model("surveys");

module.exports = (app) => {
	app.get("/api/surveys", requireLogin, async (req, res) => {
		const surveys = await Survey.find({ _user: req.user.id })
			.select({ 
				recipients: false 
			});

		res.send(surveys);
	});
	app.get("/api/surveys/:surveyId/:choice", (req, res) => {
		res.send("Thanks for voting!")
	})
	app.get("/api/surveys/thanks", (req, res) => {
		res.send("Thanks for voting!");
	});
	app.post("/api/surveys/webhooks", (req, res) => {
		const events = _.map(req.body, (event) => {
			const pathname = new URL(event.url).pathname;

			const p = new Path("/api/surveys/:surveyId/:choice");

			const match = p.test(pathname);
			console.log(match)
			if (match) {
				return {
					email: event.email, surveyId: match.surveyId, choice: match.choice
				}
			}
		});

		const compactEvents = _.compact(events);

		const uniqueEvents = _.uniqBy(compactEvents, "email", "surveyId");

		console.log(uniqueEvents);

		res.send({});
	});
	app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
		const { title, subject, body, recipients } = req.body;
		const survey = new Survey({
			title,
			subject,
			body,
			recipients: req.body.emails.split(',').map((email) => ({ 
				email: email.trim() 
			})),
			_user: req.user.id,
			dateSent: Date.now()
		})

		// MAILER - send an email
		// try {
			const mailer = new Mailer(survey, surveyTemplate(survey));
			await mailer.send();
			req.user.credits -= 1;
			const user = await req.user.save();

			res.send(user);
		// } catch (err) {
		// 	res.status(422).send(err);
		// }
	});

}