

const updatedBoxes = (barArray, boxArray)=>{
	return [
		{
		  boxId:0,
		  boxLeft:0,
		  boxTop:0,
		  boxRight:barArray[0].barPosition,
		  boxBottom:barArray[1].barPosition,
		  boxColor:boxArray[0].boxColor
		},
		{
		  boxId:1,
		  boxLeft:barArray[0].barPosition,
		  boxTop:0,
		  boxRight:100,
		  boxBottom:barArray[1].barPosition,
		  boxColor:boxArray[1].boxColor
		},
		{
		  boxId:2,
		  boxLeft:0,
		  boxTop:barArray[1].barPosition,
		  boxRight:barArray[0].barPosition,
		  boxBottom:100,
		  boxColor:boxArray[2].boxColor
		},
		{
		  boxId:3,
		  boxLeft:barArray[0].barPosition,
		  boxTop:barArray[1].barPosition,
		  boxRight:100,
		  boxBottom:100,
		  boxColor:boxArray[3].boxColor
		},
	]
} 


export default updatedBoxes;