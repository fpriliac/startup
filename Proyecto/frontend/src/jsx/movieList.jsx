import React from 'react';
import ReactDOM from 'react-dom';

export default class MoviesContent extends React.Component {

  constructor(props) {
		super(props);
		this.state = {
			movie: props.movie
		}

	this.onClick = this.onClick.bind(this);
   }

	onClick() {
		this.props.showSingleMovie(this.state.movie.id);
  	}	

  render() {
    return (
      <div id={this.props.movie.id}>
      <a onClick={this.onClick} key='movie-poster'><img src={this.props.movie.poster} /></a>
      <div className='movie-text'><p className="movieText">{this.props.movie.title} ({this.props.movie.year})</p></div>
      </div>
    )
  }
}