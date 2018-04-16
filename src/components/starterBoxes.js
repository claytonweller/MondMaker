import edge from './edge'

const starterBoxes = (barArray)=>{
	return [
  		[edge.bottom, barArray[1], edge.right, edge.left],
    	[ edge.left, edge.top, barArray[1],  edge.right,],
    	[ barArray[0], edge.top, barArray[1],  edge.right,],
    	[edge.bottom, barArray[1], barArray[0], edge.left],
	]
} 


export default starterBoxes;