import React from 'react';

const BarAdder = ({mouseX, mouseY, newBar}) =>{



	return(

		<div style={{zIndex:100, backgroundColor:'lightblue', maxWidth:'100px'}}>
         <div style={{ backgroundColor:'transparent'}}>x{mouseX}, y{mouseY}</div>
         <button id='new-bar' onClick={newBar}> newBar </button>
      </div>
	)
}

export default BarAdder;