import edgeSorter from './edgeSorter';

const interpretParentId = (barArray, parentId) =>{
	let int = parseInt(parentId, 10)
	if(!Number.isInteger(int)){
     return edgeSorter(parentId)
   } else { 
     return barArray[parentId]
   }
}

export default interpretParentId