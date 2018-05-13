import React from 'react';
import Box from './Box';

const AllBoxes = ({ boxArray, onBoxClick })=>{

	return(
		<div >
			{
				boxArray.map((box,i) => {
					return(
						<Box
							key={i}
							boxLeft ={boxArray[i].boxLeft}
				         boxTop ={boxArray[i].boxTop}
				         boxRight ={boxArray[i].boxRight}
				         boxBottom = {boxArray[i].boxBottom}
				         boxColor ={boxArray[i].boxColor}
				         onBoxClick = {onBoxClick}
				         boxId ={boxArray[i].boxId}
						/>
					)
				})	
			}
		</div>
	)
}

export default AllBoxes;


