web API RESTful

API = Application Programming Interface = En brugergrænseflade, som programmører bruger til at lave en applikation.

JavaScript = API (fx fetch, fx DOM-manipulation, window, document).

--------------

Web-API = En brugergrænseflade, som programmer bruger til at
					hente og sende og manipulere data til programmets applikation.
					Web-APIer er platform agnostiske = sproget er ligegyldigt

						Klient								-->						web-API        -->        Database
			* Computer / browser      request                       query       finder noget data
																																		<-- sender data tilbage til APIet
																									
																								tager imode data fra databasen

																								<--
																								sender et response
																								tilbage til klienten
																								indeholder typisk JSON / XML


RESTful

REpresentational Stateless Transfer

REpresentational = repræsentativ = det data, som bliver præsenteret, IKKE er selve dataen - det er en repræsentation
									 af dataen.

Stateless = uden tilstand = fx at man ikke være logget ind på et Web-API
														Arbejder med access tokens og authorization tokens

RESTful API er en kontrakt mellem klienten og APIet. APIet må aldrig være destruktivt,
Dvs. at APIet må ikke fjerne allerede eksisterende funktionaliteter.


=============================
Hvad er der i et web-API?

Endpoints -> resurser

/v1/people/1
/v2/humans
/starships
/starships/43

/cheeses/42
/cheeses/42/statistics

/books
/books/alice-in-wonderland

/users
/users/34210987234598g
/users/34210987234598g/profile


