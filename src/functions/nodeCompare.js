
import interpretParentId from './interpretParentId'
import compare from './compare.js'

const nodeTest = (node, newBar, barArray) =>{
	let boundPosition1 = interpretParentId(barArray, node.boundParents[0]).barPosition
	
	let boundPosition2 = interpretParentId(barArray, node.boundParents[1]).barPosition
	if(Math.abs(boundPosition1 - boundPosition2) === compare(boundPosition1, boundPosition2, newBar.barPosition)){
		return true
	} else{
		return false
	}
}


const nodeCompare = (nodes, newBar, barArray)=>{
	return nodes.filter(node => nodeTest(node, newBar, barArray))
}

export default nodeCompare;