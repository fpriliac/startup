import React from 'react';
import ReactDOM from 'react-dom';

export default class AddMovie extends React.Component {
    constructor(props) {
    super(props);
    let date = new Date()
    let rating = this.randomRating();
    this.state = {
      title: '',
      released: date.toISOString(),
      year: date.getFullYear(),
      genre: '',
      rating: rating,
      director: '',
      actors: "",
      poster: '',
      plot: '',
      genres: []
    }

    this.insertGenres = this.insertGenres.bind(this);
    this.listMovie = this.listMovie.bind(this);
    this.setTitle = this.setTitle.bind(this);
    this.setDate = this.setDate.bind(this);
    this.setGenre = this.setGenre.bind(this);
    this.setActors = this.setActors.bind(this);
    this.setDirector = this.setDirector.bind(this);
    this.setPoster = this.setPoster.bind(this);
    this.setPlot = this.setPlot.bind(this);
  }

  getGenres(callback) {
    fetch("http://localhost:3000/api/genres", { method: 'GET'})
      .then(function(data){
        return data.json()
      }).then(function(json) {
        callback(json);
      });
  }

  insertGenres(genres) {
    this.setState({ genres: genres });
  }

  componentWillMount () {
    this.getGenres(this.insertGenres);
  }

  randomRating() {
    let rating = Math.random() * (5 - 1) + 1
    return Math.round(rating * 10) / 10
  }

  listMovie() {

    let movie = {
      title: this.state.title,
      year: this.state.year,
      released: this.state.released,
      genre: this.state.genre,
      director: this.state.director,
      actors: this.state.actors,
      plot: this.state.plot,
      poster: this.state.poster,
      rating: this.state.rating
    }
    
    fetch("http://localhost:3000/api/movies", {
      method: "POST",
      mode: "cors",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(movie)
    })
    

    this.props.hideModal();

  }

  setTitle(event) {
    this.setState({ title: event.target.value });
  }

  setDate(event) {

    let date = new Date(event.target.value)
    let dateISO = date.toISOString();
    let year = new Date(event.target.value).getFullYear()
    this.setState({ released: dateISO, year: year });
  }

  setGenre(event) {
    this.setState({ genre: event.target.value });
  }

  setActors(event) {
    this.setState({ actors: event.target.value });
  }

  setDirector(event) {
    this.setState({ director: event.target.value });
  }

  setPoster(event) {
    this.setState({ poster: event.target.value });
  }

  setPlot(event) {
    this.setState({ plot: event.target.value });
  }

  render() {
    return(
  <div className="modalContainer">
    <div className="form">
      <form >
        <a className="close" onClick={this.props.hideModal}>X</a>
        <legend>New Movie</legend>
        <div>
          <label htmlFor="title">Title: </label>
          <input type="text" id="title" required  value={this.state.title} onChange={this.setTitle}/>
        </div>
        <div>
          <label htmlFor="releaseDate">Release date: </label>
          <input type="date" id="releaseDate" value={this.state.releaseDate} onChange={this.setDate}/>
        </div>
        <div>
          <label htmlFor="directors">Director: </label>
          <input name="directors" type="text" id="directors" value={this.state.director} onChange={this.setDirector}/>
        </div>
        <div>
          <label htmlFor="actors">Actors: </label>
          <input type="text" id="actors" required value={this.state.actors} onChange={this.setActors}/>
        </div>
        <div>
          <label htmlFor="poster">Poster URL: </label>
          <input type="text" id="poster" value={this.state.poster} onChange={this.setPoster}/>
        </div>
        <div>
          <label htmlFor="genre">Genre: </label>
          <select name="genre" required  id="modalCategory" className="required" value={this.state.genre} onChange={this.setGenre}>
        {this.state.genres.map((genre) => <option key={genre} value={genre}>{genre}</option>)}
        </select>
        </div>
        <div>
          <label htmlFor="rating">Rating: </label>
          <div className="scrollable">
            <select id="rating" disabled value={this.state.rating}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          </div>
        </div>
        <div>
          <label htmlFor="plot">Plot: </label>
          <textarea name="plot" id="plot" value={this.state.plot} onChange={this.setPlot}></textarea>
        </div>
        <div>
        <input type="button" value="Submit" onClick={this.listMovie}></input>
        </div>
      </form>
    </div>
  </div>
  )
 }
}