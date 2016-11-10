import React from 'react';
import ReactDOM from 'react-dom';

export default class Footer extends React.Component {
	render() {
		return (
			    <footer className="footerContainer">
        			<div className="footerContent">
          				<ul>
            				<li><img src="./src/img/youtube.png" alt="Youtube" className="icon"/> FKMovies</li>
            				<li><img src="./src/img/facebook.png" alt="Facebook" className="icon"/> FKMovies</li>
            				<li><img src="./src/img/twitter.png" alt="Twitter" className="icon"/> FKMovies</li>
          				</ul>
        			</div>
        			<div className="footerContent">
          				<ul>
            				<li className="sponsor"> Sponsors</li>
            				<li> Globant</li>
            				<li> Bootcamp</li>
          				</ul>
        			</div>
        			<div className="footerContent">
          				<ul>
            				<li className="sponsor"> Sponsors</li>
            				<li> Chacarita FC</li>
            				<li> Basquet Union</li>
          				</ul>
        			</div>
        			<div className="footerContent copyrightContainer">
          				<p className="copyrightContent">Copyright 2016 Globant</p>
        			</div>
      			</footer>
		)
	}
}

