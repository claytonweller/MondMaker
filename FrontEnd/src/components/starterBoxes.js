import edge from '../functions/edge'

const starterBoxes = (barArray)=>{
	return [
  		[edge.bottom, edge.right,barArray[1], barArray[0]],
  		[edge.bottom, edge.left,barArray[1], barArray[0]],
  		[edge.top, edge.right,barArray[1], barArray[0]],
  		[edge.top, edge.left,barArray[1], barArray[0]],
	]
} 


export default starterBoxes;