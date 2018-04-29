import React from 'react';
import BarAdder from './BarAdder';
import html2canvas from 'html2canvas';
import './Nav.css'


const Nav = ({mouseX, mouseY, newBar}) =>{

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

		<div className="nav-bar">
        <BarAdder
          mouseX={mouseX}
          mouseY={mouseY}
          newBar={newBar}
        />
        <button onClick = {snapshot} > Snapshot</button>
        <span> Mondrian </span>
      </div>
	)
}

export default Nav;