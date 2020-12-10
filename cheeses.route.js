const { createConnection } = require("mysql2/promise");
var connection = require("./database");

module.exports = function(app) {
	// opret en ost
	app.post("/api/v1/cheeses", function(request, response, next) {
		var sql = `INSERT INTO cheeses
							SET name = :name, price = :price, weight = :weight,
							strength = (SELECT strengths.id FROM strengths WHERE name = :strength),
							brand = (SELECT brands.id FROM brands WHERE name = :brand)`;

		var placeholders = {
			name: request.fields.name,
			price: request.fields.price,
			weight: request.fields.weight,
			strength: request.fields.strength,
			brand: request.fields.brand
		};

		connection.execute(sql, placeholders, function(err, result) {
			if (err) return next(err);

			// result.insertId
			//response.json(result); // this is not the final form
			var sql = `SELECT * FROM cheeses WHERE id = :id`;
			var placeholders = { id: result.insertId };
			connection.execute(sql, placeholders, function(err, result) {
				if (err) return next(err);

				response.json(result);
			});
		});
	});

	// hent alle oste
	app.get("/api/v1/cheeses", function(request, response, next) {
		var sql = `SELECT cheeses.id, cheeses.name, cheeses.price, cheeses.weight,
							 brands.name AS brand, strengths.name AS strength FROM cheeses
							 INNER JOIN brands
								 ON brands.id = cheeses.brand
							 INNER JOIN strengths
								 ON strengths.id = cheeses.strength`;
									
		connection.query(sql, function(err, result) {
			if (err) return next(err);
	
			response.json(result);
		});
	});


	// hent en enkelt ost ud fra id
	app.get("/api/v1/cheeses/:id", function(request, response, next) {
		var sql = `SELECT cheeses.id, cheeses.name, cheeses.price, cheeses.weight,
							 brands.name AS brand, strengths.name AS strength FROM cheeses
							 INNER JOIN brands
								 ON brands.id = cheeses.brand
							 INNER JOIN strengths
								 ON strengths.id = cheeses.strength
							 WHERE cheeses.id = :id`;

		var placeholders = { id: request.params.id };
									
		connection.query(sql, placeholders, function(err, result) {
			if (err) return next(err);
	
			if (!result.length) {
				response.status(404);
				response.end(); // response.send("") response.json()
				return;
			}
			response.json(result[0]);
		});
	});

	// slet en ost ud fra id
	app.delete("/api/v1/cheeses/:id", function(request, response, next) {
		var sql = `DELETE FROM cheeses WHERE id = :id`;
		var placeholders = { id: request.params.id };

		connection.execute(sql, placeholders, function(err, result) {
			if (err) return next(err);

			// result.affectedRows
			if (result.affectedRows != 1) {
				response.status(404);
				response.end();
				return;
			}
			
			response.status(204);
			response.end();
		});
	});

	// opdater en enkelt ost
	app.patch("/api/v1/cheeses/:id", function(request, response, next) {
		var sql = `UPDATE cheeses
		SET name = :name, price = :price, weight = :weight,
		strength = :strength, brand = :brand
		WHERE id = :id`;

		var placeholders = {
			name: request.fields.name,
			price: request.fields.price,
			weight: request.fields.weight,
			strength: request.fields.strength,
			brand: request.fields.brand,
			id: request.params.id
		};

		connection.execute(sql, placeholders, function(err, result) {
			if (err) return next(err);

			if (result.affectedRows != 1) {
				response.status(404);
				response.end();
				return;
			}

			var sql = `SELECT * FROM cheeses WHERE id = :id`;
			var placeholders = { id: request.params.id };
			connection.execute(sql, placeholders, function(err, result) {
				if (err) return next(err);

				response.json(result[0]);
			});
		});
	});
};
