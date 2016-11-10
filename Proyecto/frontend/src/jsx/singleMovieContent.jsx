import React, {Component} from 'react';
 
export default class singleMovieContent extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="movieText">
			<h3>{this.props.movie.title} ({this.props.movie.year})</h3>
			<img src={this.props.movie.poster}/>
			<div className="movieText">
			<p>Director: {this.props.movie.director}</p>
			<p>Actors: {this.props.movie.actors}</p>
			<p>Plot: {this.props.movie.plot}</p>
			<p>Rating: {this.props.movie.rating}</p>
			</div>
			</div>
		);
	}
}