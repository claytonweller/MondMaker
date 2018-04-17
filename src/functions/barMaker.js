import edge from '../functions/edge'

const barMaker = (i, bar1, bar2, barPosition) =>{
  
  let start = bar1
  let end = bar2
  if(bar2.barPosition<bar1.barPosition){
    start = bar2
    end = bar1
  }

  let orientation = 'vertical'
  let startPosition = 0;
  let endPosition = 100;
  let startParent = edge.left
  let endParent = edge.right

  if (start.barAllign === 'vertical'){
    orientation = 'horizontal'
    startParent = edge.top
    endParent = edge.bottom
  }
  if (start.barPosition !== undefined){
    startPosition = start.barPosition
    startParent = start.index
  } 
  if (end.barPosition !== undefined){
    endPosition = end.barPosition
    endParent = end.index
  }
  return {
    index:i, 
    barAllign:orientation, 
    startPosition:startPosition, 
    endPosition:endPosition,
    barPosition:barPosition, 
    startParent:startParent,
    endParent:endParent,
  }
}

export default barMaker;