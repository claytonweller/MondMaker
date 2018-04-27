const compare = (edgeA, edgeB, newEdge)=>{
	return Math.abs(edgeA - newEdge) + Math.abs(edgeB - newEdge)
}

export default compare;