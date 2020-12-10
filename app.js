var express = require("express");
var app = express();
var formidable = require("express-formidable");

app.use(formidable());

require("./cheeses.route")(app);

app.use(function(error, request, response) {
	if (error) {
		console.log(error);
		response.status(500);
		response.json({
			statusCode: 500,
			statusText: "Internal server error"
		});
	}
});

app.listen(3000, function() {
	console.log("Serveren er started");
});
