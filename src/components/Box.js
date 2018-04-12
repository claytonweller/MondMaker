import React from 'react';
import './Box.css'

const Box = ({onBoxClick, boxTop, boxRight, boxBottom, boxLeft, boxColor, boxId})=>{

	let boxProps = {
		position:'absolute', 
		top:`${boxTop}%`, 
		right:`${100-boxRight}%`, 
		bottom:`${100-boxBottom}%`, 
		left:`${boxLeft}%`, 
		backgroundColor:boxColor, 
		display:'block',
		zIndex:-1,
	}

	return(
		<div className='box' onClick={()=>onBoxClick(boxColor,boxId)} style={boxProps}>
		</div>

	)
};

export default Box;