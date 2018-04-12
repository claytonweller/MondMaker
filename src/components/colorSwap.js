 
const colorSwap = (boxArray, id, color)=>{
  if(color === 'white'){
    return boxArray[id].boxColor='red';
  } else if (color === 'red'){
    return boxArray[id].boxColor='blue';
  } else if (color === 'blue'){
    return boxArray[id].boxColor='yellow';
  } else {
    return boxArray[id].boxColor='white';
  }
}

export default colorSwap;