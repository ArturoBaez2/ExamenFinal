let express = require( 'express' );
let bodyParser = require( 'body-parser' );
let mongoose = require( 'mongoose' );
let uuid = require( 'uuid' );
let jsonParser = bodyParser.json();
let { DATABASE_URL, PORT } = require( './config' );
let { MovieList } = require( './model');
let app = express();

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
	res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
	if (req.method === "OPTIONS") {
		return res.send(204);
	}
	next();
});

/* Tu código va aquí */
app.get('http://localhost/api/moviedex', (req,res) =>{
	console.log("GET");
	MovieList.getAll()
		.then( movies =>{
			return res.status(200).json(movies);
		})
		.catch( error => {
			console.log(error);
			res.statusMessage=" Error en el servidor";
			return res.status(500).send();
		})
});

app.post('http://localhost/api/moviedex', jsonParser, (req,res) =>{
	console.log("POST");
	let titulo = req.body.title;
	let ano = req.body.ano;
	let rate = req.body.rate;
	let newId = uuid.v4();

	if( titulo == '' || ano == '' || rate == ''){
		res.statusMessage = "Proporcionar todos los campos";
		return res.status(406).send();
	}

	let movie = {
		film_ID : newId,
		film_title : titulo,
		year : ano,
		rating : rate
	};

	MovieList.newMovie( movie )
		.then( movies =>{
			return res.status(201).json( movie );
		})
		.catch( error => {
			console.log(error);
			res.statusMessage=" Error en el servidor";
			return res.status(500).send();
		})
});

let server;

function runServer( port, databaseUrl ){
	return new Promise( (resolve, reject ) => {
		mongoose.connect( databaseUrl,  { useNewUrlParser: true, useUnifiedTopology: true  }, response => {
			if ( response ){
				return reject( response );
			}
			else{
				server = app.listen(port, () => {
					console.log( "App is running on port " + port );
					resolve();
				})
				.on( 'error', err => {
					mongoose.disconnect();
					return reject(err);
				})
			}
		});
	});
}

function closeServer(){
	return mongoose.disconnect()
		.then( () => {
			return new Promise( (resolve, reject) => {
				console.log( 'Closing the server' );
				server.close( err => {
					if ( err ){
						return reject( err );
					}
					else{
						resolve();
					}
				});
			});
		});
}
runServer( PORT, DATABASE_URL );

module.exports = { 
    app, 
    runServer, 
    closeServer 
}