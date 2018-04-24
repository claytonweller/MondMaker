const edgeSorter = require('./edgeSorter.js')


const evalDist = {
	interpretParentId : (barArray, parentId) =>{
		let int = parseInt(parentId, 10)
		if(!Number.isInteger(int)){
	     return edgeSorter(parentId)
	   } else { 
	     return barArray[parentId]
	   }
	},
	compare: (edgeA, edgeB, newEdge)=> Math.abs(edgeA - newEdge) + Math.abs(edgeB - newEdge),
	node:(nodes, newBar, barArray)=>{
		return nodes.filter(node => {
      	
			
      	let boundPosition1 = this.interpretParentId(barArray, node.boundParents[0])
      	console.log(boundPosition1)

      	let boundPosition2 = barArray[node.boundParents[0]].barPosition
      	console.log(node)
      	Math.abs(boundPosition1 - boundPosition2) === this.compare(boundPosition1, boundPosition2, newBar.barPosition)
    	})
   } 	
}

export default evalDist;