import React from 'react';

function NewMovie(props){
		return(
			<form >
				<label>Titulo de la Peli</label>
				<input type="text" id="titulo" />
				<label>Ano de la Peli</label>
				<input type="text" id="ano" />
				<label>Rating</label>
				<input type="text" id="titulo" />
				<button type="submit" id="boton" >
				Insertar
				</button>
			</form>
			)
}

export default NewMovie;