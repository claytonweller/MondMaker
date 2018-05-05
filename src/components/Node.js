import React from 'react';
import './Node.css'

const Node = ({visible, xPosition, yPosition, canSee, nodeIndex, onNodeClick}) =>{
	let nodeStyle = () =>{
		if (canSee === true || visible === true || visible === 'selected' ){
			return {zIndex: 100, top:`${yPosition}%`, left: `${xPosition}%`}
		}else {
			return {zIndex: -100, backgroundColor: 'transparent', top:`${yPosition}%`, left: `${xPosition}%`}
		}	
	}

	let nodeClass = () =>{
		if (visible === 'selected'){
			return 'title node selected'
		} else {
			return 'title node'
		}
	}
 

	return(
		<div 
			id={`node${nodeIndex}`} 
			className={nodeClass()}
			style={nodeStyle()} 
			onClick = {onNodeClick}
		>+
      </div>
	)
}

export default Node;