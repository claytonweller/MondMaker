import React from 'react';
import Bar from './Bar';

const Allbars = ({barArray}) =>{
			
	return(
		<div>
			{barArray.map((line,i) => {
				return(
					<Bar
						key={i}
						index={i}
						barAllign={barArray[i].barAllign}
						barPosition={barArray[i].barPosition}
						startPosition={barArray[i].startPosition}
						endPosition={barArray[i].endPosition}
					/>
				)
			})}
       </div>
	)
}

export default Allbars;

