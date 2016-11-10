import React from 'react';
import ReactDOM from 'react-dom';
import Movies from './movies.jsx';
import NewMovie from './newMovie.jsx'

export default class MoviesMainbar extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      sort: '',
      genres: [],
      search: ''
    }

    this.addGenres = this.addGenres.bind(this);
    this.filterAll = this.filterAll.bind(this);
    this.filterPopular = this.filterPopular.bind(this);
    this.filterRecent = this.filterRecent.bind(this);
    this.filterText = this.filterText.bind(this);
    this.filterInput = this.filterInput.bind(this);
    this.selectedInput = this.selectedInput.bind(this);
    this.filterChange = this.filterChange.bind(this);
    this.NewMovieModal = this.NewMovieModal.bind(this);
  }

  filterAll() {
    this.setState({ sort: "sortAll" }, this.changeContentAll);
  }

  filterPopular() {
    this.setState({ sort: "sortByPopular" }, this.changeContentPopular);
  }

  filterRecent() {
    this.setState({ sort: "sortByRecent" }, this.changeContentRecent);
  }

  changeContentAll() {
    this.props.click("sortAll");
  }

  changeContentPopular() {
    this.props.click("sortByPopular");
  }

  changeContentRecent() {
    this.props.click("sortByRecent");
  }

  NewMovieModal() {
    this.props.showModal();
  }

  filterText(event) {
    this.setState({search: event.target.value}, () => this.filterInput(this.state.search));
  }

  filterInput(input) {
    this.setState({
      search: input}, this.props.inputChange(input));
  }

  selectedInput(value) {
    this.setState({ genre: value.target.value }, () => this.filterChange(this.state.genre));
  }

  filterChange(value) {
    this.setState({ genre: value}, this.props.selectChange(value));
  }


  addGenres(data) {
    data.unshift("All");
    this.setState({genres: data});
  }

  getGenres(callback) {
    fetch("http://localhost:3000/api/genres", { method: 'GET'})
      .then(function(data){
        return data.json();
      }).then(function(json) {
        callback(json);
      });
  };

  componentWillMount() {
    this.getGenres(this.addGenres)
  }



   render() {
    return ( 
      <section className="filterContainer">
      <div className="mainBar">
        <ul>
          <li><a href="#" className={this.state.sort == "sortAll" ? "active" : ""} onClick={this.filterAll}>All</a></li>
          <li><a href="#" className={this.state.sort == "sortByPopular" ? "active" : ""} onClick={this.filterPopular}>Popular</a></li>
          <li><a href="#" className={this.state.sort == "sortByRecent" ? "active" : ""} onClick={this.filterRecent}>Recent</a></li>
          <li><a href="#" onClick={this.NewMovieModal} id="NewMovie">Add Movie</a></li>
        </ul>
        <div className="searchContent">
          <input type="text" placeholder="Title, actor or description" onChange={this.filterText}/>
          <select name="genres" id="category" onChange={this.selectedInput}>
              {this.state.genres.map((category) => <option key={category} value={category}>{category}</option>)}
            </select>
        </div>
      </div>
    </section>
    )
  }
}