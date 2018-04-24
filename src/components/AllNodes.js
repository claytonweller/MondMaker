import React from 'react';
import Node from './Node';
import interpretParentId from '../functions/interpretParentId'

// {baseParent:0, boundParents:[1, 'bottom'], position:90}

const AllNodes = ({nodeArray, barArray}) =>{
	
	const findLowerBound = (bound1, bound2) =>{
		
		if(bound1>bound2){
			return bound2
		} else {
			return bound1
		}
	}
	
	let nodePosition = (node) =>{
		
		
		let baseParent = interpretParentId(barArray, node.baseParent)
		let boundParent1 = interpretParentId( barArray, node.boundParents[0])
		let boundParent2 = interpretParentId( barArray, node.boundParents[1])
		let basePosition = baseParent.barPosition
		let boundNudge = Math.abs(
			boundParent1.barPosition
			- boundParent2.barPosition
		)/2

		let boundPosition= boundNudge + findLowerBound(boundParent1.barPosition, boundParent2.barPosition)

		if(baseParent.barAllign === 'vertical'){
			return {x:`${basePosition}`, y:`${boundPosition}`}
		} else if( baseParent.barAllign === 'horizontal'){
			return {y:`${basePosition}`, x:`${boundPosition}`}
		}
	}

	return(
		<div>
			{nodeArray.map((node,i) => {
				return(
					<Node
						xPosition = {nodePosition(node).x}
						yPosition = {nodePosition(node).y}
						key={i}
					/>
				)
			})}
      </div>
	)
}

export default AllNodes;