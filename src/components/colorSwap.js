 
const colorSwap= {

	rotate: (boxArray, id, color)=>{
	  if(color === 'white'){
	    return boxArray[id].boxColor='red';
	  } else if (color === 'red'){
	    return boxArray[id].boxColor='blue';
	  } else if (color === 'blue'){
	    return boxArray[id].boxColor='yellow';
	  } else {
	    return boxArray[id].boxColor='white';
	  }
	},
	start: (id)=>{
		let idSort = id%4
		console.log(id)
		switch (idSort){
			case 0 : return 'white'
			case 1 : return 'blue'
			case 2 : return 'red'
			case 3 : return 'yellow'
			default : return 'white'	
		}
	}
}

export default colorSwap;