import React from 'react';
import './Node.css'

const Node = ({xPosition, yPosition}) =>{
			
	return(
		<div className='node' style={{backgroundColor: 'green', top:`${yPosition}%`, left: `${xPosition}%`}}>
      </div>
	)
}

export default Node;