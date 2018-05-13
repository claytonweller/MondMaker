import React from 'react';
import './Bar.css'

const Bar = ({startPosition, endPosition, barAllign, barPosition, index, barClick}) =>{

	const indBarAllign = ()=>{
		if(barAllign === 'vertical'){
			return `bar vertical`;
		}else if(barAllign === 'horizontal'){
			return 'bar horizontal';
		};
	};

	const indBarPosition = ()=>{
		if(barAllign === 'vertical'){
			return {left:`${barPosition}%`, top:`${startPosition}%`, bottom:`${100-endPosition}%`};
		}else if(barAllign === 'horizontal'){

			return {top:`${barPosition}%`, left:`${startPosition}%`, right:`${100-endPosition}%`};
		};
	};

	return(

			<div id={`bar${index}`} style={indBarPosition()} className={indBarAllign()} onMouseDown={barClick} ></div>
	)
}

export default Bar;
