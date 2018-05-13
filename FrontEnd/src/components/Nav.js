import React from 'react';
import './Nav.css'
import snapshot from '../functions/snapshot'


const Nav = ({exportClick, addingBar, newBar, mouseX, mouseY}) =>{



  const newBarButtonState = () =>{
    if(addingBar === true){
      return '-'
    } else  {
      return '+'
    }
  }

	return(

		<div className="nav-bar" id="nav">
        <div className="title add" id='new-bar' onClick={newBar}>{newBarButtonState()}</div>
        <span className="title"> mondrian </span>
        <div className="export" onClick = {exportClick} > Export</div>
      </div>
	)
}

export default Nav;