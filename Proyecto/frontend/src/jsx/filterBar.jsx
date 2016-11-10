import React from 'react';
import ReactDOM from 'react-dom';

export default class filterBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: props.active
    }

    this.onClickHome = this.onClickHome.bind(this);
    this.onClickMovies = this.onClickMovies.bind(this);
  }

  onClickHome(e) {
    this.setState({ active: "main" }, this.changeHome);
  }

  onClickMovies(e) {
    this.setState({ active: "movies" }, this.changeMovieList);
  }

  changeHome() {
    this.props.click("main");
  }

  changeMovieList() {
    this.props.click("movies");
  }

	render() {
		return (
      <nav className="headerContainer">
        <div className="headerContent">
          <div className="headerMenu">
            <a href="" className={this.state.active == "main" ? "active" : "menuEnabled"} onClick={this.onClickHome}>Home</a>
          </div>
          <div className="headerMenu">
            <a href="#" className={this.state.active == "movies" ? "active" : "menuEnabled"} onClick={this.onClickMovies}>Movies</a>
          </div>
          <div className="headerMenu disabled">
            <a href="#" className="menuDisabled">Help</a>
          </div>
          <div className="headerMenu disabled">
            <a href="#" className="menuDisabled">About us</a>
          </div>
          <div className="headerMenu disabled">
            <a href="#" className="menuDisabled">Contact</a>
          </div>
        </div>
      </nav>
      )
  }
}