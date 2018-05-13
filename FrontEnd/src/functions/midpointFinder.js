
const midpointFinder = (position1, position2)=>{


	let distanceBetweenPositions = Math.abs(position1-position2)/2

	if(position1>position2){
		return position2+distanceBetweenPositions
	} else {
		return position1+distanceBetweenPositions
	}
}

export default midpointFinder
