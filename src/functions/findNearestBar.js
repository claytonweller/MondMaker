import edge from './edge'
import edgeSorter from './edgeSorter'

const findNearestBar = (bar, barArray) =>{
	
	console.log(bar)


	let specificBar = edgeSorter(bar)

	let possibleBars = barArray.filter(bar => bar.barAllign === specificBar.barAllign)
										.filter(bar => bar !== specificBar)
	
	if(specificBar.barAllign === 'vertical'){
		possibleBars.push(edge.left, edge.right)
	}else {
		possibleBars.push(edge.top, edge.bottom)
	}
	
	// console.log(possibleBars)

	let i = 0
	let winningDiff = 101
	let difference = 0
	let winner = {}
	while(i<possibleBars.length){
		console.log(possibleBars)
		// difference = possibleBars[i].barPosition - specificBar.barPosition
		if(difference < winningDiff){
			winningDiff = difference
			winner = possibleBars[i]
		}
		i++
		console.log(i)
	}
	console.log(winner)

}

export default findNearestBar;