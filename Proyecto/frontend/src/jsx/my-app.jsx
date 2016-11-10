import React from 'react';
import ReactDOM from 'react-dom';
import Footer from './mainFooter.jsx'
import FilterBar from './filterBar.jsx'
import Home from './home.jsx'
import Movies from './movies.jsx'
import SingleMovieContent from './singleMovieContent.jsx';

export default class App extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      activeArt: "home",
      content: <Home/>
    }
    this.onClick = this.onClick.bind(this);
  }

  onClick(content) {
    if(content == "home")
      this.setState({ content: <Home/> });
    else if(content == "movies")
      this.setState({ content: <Movies/>});
  }
	  

  render() {
    return (
      <div className="container">
        <FilterBar active={this.state.activeArt} click={this.onClick}/>
       	{this.state.content}
        <Footer/>
      </div>
    );
  }
}