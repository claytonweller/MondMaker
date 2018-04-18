import React from 'react';
import './Box.css'

const Box = ({ onBoxClick, boxTop, boxRight, boxBottom, boxLeft, boxColor, boxId})=>{

	let zIndex = boxId-100

	let boxProps = {
		position:'absolute', 
		top:`${boxTop}%`, 
		right:`${100-boxRight}%`, 
		bottom:`${100-boxBottom}%`, 
		left:`${boxLeft}%`, 
		backgroundColor:boxColor, 
		display:'block',
		zIndex: zIndex,
	}

	return(
		<div className='box' onClick={()=>onBoxClick(boxColor,boxId)} style={boxProps}>
		</div>

	)
};

export default Box;