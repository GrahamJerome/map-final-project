import React from 'react';

const NavToggle = (props) => (
	<div>
		<button
			onClick={() => props.toggleNav()}
			className="menu-icon-holder"
			aria-describedby="nav-toggle-tip"
			tabIndex="1"
		>
			<div className="bar1" tabIndex="-1"></div>
			<div className="bar2" tabIndex="-1"></div>
			<div className="bar3" tabIndex="-1"></div>
	  </button>
	  <div role="tooltip" id="nav-toggle-tip">Click to toggle the navigation bar</div>
 	</div>
)

export default NavToggle;