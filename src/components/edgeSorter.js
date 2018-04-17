import edge from './edge'

const edgeSorter = (dir) =>{
 switch (dir){
   case 'right': return edge.right
   case 'left': return edge.left 
   case 'top': return edge.top
   case 'bottom': return edge.bottom
   default: return edge.top
 }
}

export default edgeSorter;