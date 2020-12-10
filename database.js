var mysql = require("mysql2");

var connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	database: "ostebiks",
	password: "root", // <-- kun Mac/linux brugere + Mads
	namedPlaceholders: true,
	// port: 8889 <-- kun Mac-brugere
});

module.exports = connection;
