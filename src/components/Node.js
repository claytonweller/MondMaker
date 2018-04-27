import React from 'react';
import './Node.css'

const Node = ({xPosition, yPosition, canSee, nodeIndex, onNodeClick}) =>{
	let nodeStyle = () =>{
		if(canSee === true){
			return {zIndex: 100, backgroundColor: 'green', top:`${yPosition}%`, left: `${xPosition}%`}
		}else {
			return {zIndex: -100, backgroundColor: 'transparent', top:`${yPosition}%`, left: `${xPosition}%`}
		}	
	}
			
	

	return(
		<div 
			id={`node${nodeIndex}`} 
			className='node' 
			style={nodeStyle()} 
			onClick = {onNodeClick}
		>
      </div>
	)
}

export default Node;