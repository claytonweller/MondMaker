import React from 'react';
import Bar from './Bar';

const Allbars = ({barArray, barClick}) =>{
			
	return(
		<div>
			{barArray.map((line,i) => {
				return(
					<Bar
						key={i}
						id={`bar${i}`}
						index={i}
						barAllign={barArray[i].barAllign}
						barPosition={barArray[i].barPosition}
						startPosition={barArray[i].startPosition}
						endPosition={barArray[i].endPosition}
						barClick={barClick}
					/>
				)
			})}
       </div>
	)
}

export default Allbars;

