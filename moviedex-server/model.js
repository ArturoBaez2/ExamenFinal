let mongoose = require( 'mongoose' );
let uuid = require( 'uuid' );
let id = uuid.v4();

mongoose.Promise = global.Promise;

/* Tu código va aquí */
let movieCollection = mongoose.Schema({
	film_ID : { type : String},
	film_title : { type : String},
	year : { type : Number},
	rating : { type : Number }
});

let Movie = mongoose.model( 'movies', movieCollection );

let MovieList = {
	getAll : function(){
		Movie.find()
			.then( movies => {
				return movies;
			})
			.catch( error => {
				throw Error(error);
			});
	},
	newMovie : function( movie ){
		Movie.create( movie )
			.then( movie => {
				return movie;
			})
			.catch( error => {
				throw Error(error);
			});
	}

}

module.exports = {
    MovieList
};