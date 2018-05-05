import React from 'react';
import html2canvas from 'html2canvas';
import './Nav.css'


const Nav = ({addingBar, newBar, mouseX, mouseY}) =>{

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
        <div onClick = {snapshot} > Snapshot</div>
      </div>
	)
}

export default Nav;