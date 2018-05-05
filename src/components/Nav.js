import React from 'react';
import html2canvas from 'html2canvas';
import './Nav.css'


const Nav = ({newBar, mouseX, mouseY}) =>{

  const snapshot = () =>{
    html2canvas(document.body).then(canvas => {
      let dataURL = canvas.toDataURL()
      let link = document.createElement('a')
      link.download = 'test'
      link.href = dataURL
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    });
  }



	return(

		<div className="nav-bar" id="nav">
        <div className="title add" id='new-bar' onClick={newBar}>+</div>
        <span className="title"> mondrian </span>
        <div onClick = {snapshot} > Snapshot</div>
      </div>
	)
}

export default Nav;