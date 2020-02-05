import React from 'react';
import './App.css';
import Movies from './movies.js';
import NewMovie from './newMovie.js';

class App extends React.Component {

  constructor( props ){
    super( props );
    this.state = {
      peliculas : [

      ]
    }
  }

  masMovies(movies){
    let pelis = [...this.state.peliculas, movies];

    this.state.setState({
      movies : pelis
    });
  }

  componentDidMount(){
   let url = " http://localhost/api/moviedex";
   let settings = {
      method : "GET"
    }

    fetch(url, settings)
      .then(response => {
        if(response.ok){
          return response.json();
        }
      })
      .then(responseJSON => {
        masMovies(responseJSON);
    });
      console.log("ALGO");
  }

  render(){
    return (
      <div>
        <h1>MOVIEDEX</h1>
        <div>
          <Movies lista={this.state.peliculas} />
        </div>
        <div>
          <NewMovie />
        </div>
      </div>
    );
  }
}

export default App;
