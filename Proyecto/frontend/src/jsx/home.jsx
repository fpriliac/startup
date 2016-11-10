import React from 'react';
import ReactDOM from 'react-dom';
import MainMovieContent from './mainMovieContent.jsx'
import SingleMovie from './singleMovie.jsx'


export default class Main extends React.Component {
    constructor(props) {
    super(props)
    this.state = {
      movies: [],
      content: ''
    }

    this.NewMovie = this.NewMovie.bind(this);
    this.showSingleMovie = this.showSingleMovie.bind(this);
  }

  NewMovie(data) {
    this.setState({ movies: data, content: data.map((movie) => <MainMovieContent movie={movie} key={movie.id} showSingleMovie={this.showSingleMovie}/>)});
  }

  showSingleMovie(id) {
    this.setState({ content: <SingleMovie movieId={id}/> });
  } 


  getLastestMovies(callback) {
    fetch("http://localhost:3000/api/movies?order=released&limit=3",{ method: "GET"})
      .then(function(data) {
        return data.json();
      }).then(function(json) {
        callback(json);
      });
  }


  componentWillMount() {
    this.getLastestMovies(this.NewMovie);
  }

	render() {
		return (
      <section className="mainContainer">
        <div className="row">
          <div className="mainMovies">
            <div className="mainMoviesContainer">
            {this.state.content}
            </div>
            <div className="row">
              <p className="movieText">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </div>
          <aside className="adContainer">
            <a href="http://las.leagueoflegends.com/"><img src="./src/img/publicidad.jpg" alt="League of Legend Adv" key='advertisement'/></a>
          </aside>
        </div>
      </section>
      )
  }
}