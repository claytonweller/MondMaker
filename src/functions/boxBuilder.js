  const boxBuilder = (boxArray, parents, index, color) =>{
    
    let horizontal = parents.filter(bar => bar.barAllign === 'horizontal')
    let top = horizontal[1]
    let bottom = horizontal[0]
    if (horizontal[1].barPosition>horizontal[0].barPosition){
      top = horizontal[0]
      bottom = horizontal[1]
    } 

    let vertical = parents.filter(bar => bar.barAllign === 'vertical')
    let left = vertical[0]
    let right = vertical[1]
    if (vertical[0].barPosition>vertical[1].barPosition){
      left = vertical[1]
      right = vertical[0]
    }

    let box = {
      boxId:index,
      boxLeft:left.barPosition,
      boxTop:top.barPosition,
      boxRight:right.barPosition,
      boxBottom:bottom.barPosition,
      parents:[ top.index, bottom.index, left.index, right.index],
      boxColor:color
    }
    boxArray.splice(box.boxId, 1, box)
    return box.boxId
  }

  export default boxBuilder