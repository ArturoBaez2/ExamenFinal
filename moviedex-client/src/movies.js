import React from 'react';

function Movies(props){
		props.lista.map( (mov ,index ) =>{
			return (
					<div>
						<h2> {mov.film_title} </h2>
						<p> { mov.year } </p>
						<p> Rating { mov.rating } </p>
					</div>
				);

		});
}

export default Movies;