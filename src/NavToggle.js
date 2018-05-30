import React from 'react';

const NavToggle = (props) => (
	<a onClick={() => props.toggleNav()} className="menu-icon-holder">
		<div className="bar1"></div>
		<div className="bar2"></div>
		<div className="bar3"></div>
  </a>
)

export default NavToggle;