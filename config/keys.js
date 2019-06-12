// keys.js - figure out what set of credentials to return
// google O-auth credidentials
module.exports = {
	googleClientID: "503750425705-h9saihkgcp690d9l8jvjls2reb8i367o.apps.googleusercontent.com",
	googleClientSecret: "HtKnaNk-aeZDP1OAphEKLNxx",
	mongoURI: "mongodb+srv://jeremyablong:Jer$8246355@livestreamingcluster-ryfxs.mongodb.net/test?retryWrites=true&w=majority",
	olderMongoURI: "mongodb://jeremyablong:Jer$8246355@livestreamingcluster-shard-00-00-ryfxs.mongodb.net:27017,livestreamingcluster-shard-00-01-ryfxs.mongodb.net:27017,livestreamingcluster-shard-00-02-ryfxs.mongodb.net:27017/streamCollection?ssl=true&replicaSet=LiveStreamingCluster-shard-0&authSource=admin&retryWrites=true&w=majority",
	cookieKey: "aflijaeflaiefjaeafliajfanefneafnnnenebsn",
	stripePublishableKey: "pk_test_KceCoYqjfGRmObQ9oE81GH0T00KhClH2TA",
	stripeSecretKey: "sk_test_6EzSXCZ258zeJ60Bl9kvIXCG00tSxB8pT6",
	// sendGridKey: "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",
	// change this BEFORE deployment
	redirectDomain: "https://limitless-lowlands-82717.herokuapp.com/"
};
