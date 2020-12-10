var express = require("express");
var app = express();
var formidable = require("express-formidable");

app.use(formidable());

require("./cheeses.route")(app);

app.listen(3000, function() {
	console.log("Serveren er started");
});
