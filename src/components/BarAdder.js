import React from 'react';

const BarAdder = ({mouseX, mouseY, newBar}) =>{



	return(

		<div style={{zIndex:100, backgroundColor:'lightblue', maxWidth:'100px'}}>
         <div style={{ backgroundColor:'transparent'}}>x{mouseX}, y{mouseY}</div>
         <button id='new-bar' onClick={newBar}> newBar </button>
         <input id='edge1' type='text' />
         <input id='edge2' type='text' />
      </div>
	)
}

export default BarAdder;