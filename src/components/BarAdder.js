import React from 'react';

const BarAdder = ({mouseX, mouseY, newBar}) =>{



	return(

		<div style={{zIndex:100, backgroundColor:'lightblue', maxWidth:'100px'}}>
         <div style={{ backgroundColor:'transparent'}}>x{mouseX}, y{mouseY}</div>
         <button id='new-bar' onClick={newBar}> newBar </button>
         <input id='edge1' type='text' placeholder='edge 1' />
         <input id='edge2' type='text' placeholder='edge 2'/>
         <input id='new-bar-position' type='text' placeholder='position'/>
      </div>
	)
}

export default BarAdder;