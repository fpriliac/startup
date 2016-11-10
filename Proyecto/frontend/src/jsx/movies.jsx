import React from 'react';
import ReactDOM from 'react-dom';
import SearchFilters from './searchFilters.jsx'
import MovieList from './movieList.jsx'
import SingleMovie from './singleMovie.jsx'
import NewMovie from './newMovie.jsx'

export default class movies extends React.Component {
    constructor(props) {
    super(props)
    this.state = {
      movies: [],
      sort: '',
      search: '',
      genre: 'All',
      content: '',
      modal: ''
    }

    this.newMovie = this.newMovie.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.listMovies = this.listMovies.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.showSingleMovie = this.showSingleMovie.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  newMovie(data) {
    this.setState({ movies: data, content: data.map((movie) => <MovieList movie={movie} key={movie.id} showSingleMovie={this.showSingleMovie}/>)});
  }

  showSingleMovie(id) {
    this.setState({ content: <SingleMovie movieId={id}/> });
  } 

  getAllMovies(callback) {
    fetch("http://localhost:3000/api/movies",{ method: "GET"})
      .then(function(data) {
        return data.json();
      }).then(function(json) {
        callback(json);
      });
  }


  getByPopular(callback) {
   fetch("http://localhost:3000/api/movies?order=rating", { method: "GET" })     
     .then(function(data) {    
       return data.json();
     }).then(function(json) {    
        callback(json);   
     });  
  }

  getByRecent(callback) {
   fetch("http://localhost:3000/api/movies?order=released", { method: "GET" })
     .then(function(data) {    
      return data.json();   
      }).then(function(json) {    
       callback(json);   
      });   
  }

  getBySearch(callback) {
    let url = "http://localhost:3000/api/movies"

    if (this.state.genre == "All")
      url += "?search=" + this.state.search
    if (this.state.genre != "All")
      url += "?genre=" + this.state.genre + "&search=" + this.state.search

    fetch(url, {method: "GET" })
      .then(function(data) {
        return data.json();
      }).then(function(json) {
        callback(json);
      });

  }

  listMovies() {

      switch(this.state.sort) {
        case "sortAll": 
        this.getAllMovies(this.newMovie);
          break;  
        case "sortByPopular":
        this.getByPopular(this.newMovie); 
          break;
        case "sortByRecent":
        this.getByRecent(this.newMovie); 
          break; 
      }
  
  }

  listFilteredMovies() {
    this.getBySearch(this.newMovie);   
  }

  onClick(sort) {
    this.setState({ sort: sort }, this.listMovies);
  }

  onChange(search) {
    this.setState({ search: search }, this.listFilteredMovies);
  }

  onSelect(value) {
    this.setState({ genre : value }, this.listFilteredMovies);
  }

  componentWillMount() {
    this.getAllMovies(this.newMovie);
  }

  showModal() {
    this.setState({ modal: <NewMovie hideModal={this.hideModal}/>});
  }

  hideModal() {
    this.setState({ modal: ''});
  }


  render() {
    console.log(this.state.search)
    return (
      <div>
      {this.state.modal}
      <div className="moviesContainer">
      <SearchFilters sort={this.state.sort} click={this.onClick} inputChange={this.onChange} selectChange={this.onSelect} showModal={this.showModal}/>
       <div className="movie-row-content">
        {this.state.content}
       </div>
       </div>
       </div>
      )
  }
}