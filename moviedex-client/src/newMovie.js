import React from 'react';

function NewMovie(props){
		
		return(
			<form onSubmit= post() >
				<label>Titulo de la Peli</label>
				<input type="text" id="titulo" />
				<label>Ano de la Peli</label>
				<input type="text" id="ano" />
				<label>Rating</label>
				<input type="text" id="rating" />
				<button type="submit" id="boton" >
				Insertar
				</button>
			</form>
			)
	function post(){
		event.preventDefault();

		let titulo = document.getElementById('new').getElementById('titulo')[0].value;
		let anio = document.getElementById('new').getElementById('ano')[0].value;
		let rating = document.getElementById('new').getElementById('rating')[0].value;

		let movie = { title : titulo, ano : anio, rate : rating };

		let url = "http://localhost/api/moviedex";
   		let settings = {
      		method : "POST",
      		header : {
      			'Content-Type' : 'application/json'
      		}
      		body : JSON.stringify( movie );
    	}

	    fetch(url, settings)
	      .then(response => {
	        if(response.ok){
	          return response.json();
	        }
	      })
	      .then(responseJSON => {
	        console.log(responseJSON);
	    });
	}
}

export default NewMovie;