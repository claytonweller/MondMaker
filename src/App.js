import React, { Component } from 'react';
import Allbars from './components/Allbars';
import AllBoxes from './components/AllBoxes';
import './App.css';

import colorSwap from './components/colorSwap'
import starterBoxes from './components/starterBoxes'
import updatedBoxes from './components/updatedBoxes'
import edge from './components/edge'
import barMaker from './components/barMaker'

class App extends Component {
  constructor(){
    super();
    this.state={
      barArray:[
        {index:0, barAllign:'vertical', barPosition:30, startPosition:0, endPosition:100},
        {index:1, barAllign:'horizontal', barPosition:80, startPosition:0, endPosition:100},     
      ],
      boxArray:[],
      mouseY: 0,
      mouseX: 0,
      hold:false,
      selectedBar:[],
    }
  }

  edgeSorter = (dir) =>{
    switch (dir){
      case 'right': return edge.right
      case 'left': return edge.left 
      case 'top': return edge.top
      case 'bottom': return edge.bottom
      default: return edge.top
    }
  }

  moveBar = () =>{
    let {barArray, selectedBar, mouseY, mouseX, hold} = this.state
    if(hold === true){
      let mousePosition = this.convertToPercent(mouseX, mouseY)
      if (barArray[selectedBar[0]] === undefined){
      } else if (barArray[selectedBar[0]].barAllign === 'vertical'){
        barArray[selectedBar[0]].barPosition = mousePosition.x        
      } else if (barArray[selectedBar[0]].barAllign === 'horizontal'){
        barArray[selectedBar[0]].barPosition = mousePosition.y
      }
    }
  }

  updateBars = () =>{
    const {barArray} = this.state
    let arr = barArray.map(bar => bar)
    arr.splice(0,2)

    if (arr.length >0){
      arr.map((bar,i) => {

        if(!Number.isInteger(bar.endParent)){
          this.barMaker(i+2, barArray[bar.startParent], this.edgeSorter(bar.endParent))
        }else if(!Number.isInteger(bar.startParent)){
          this.barMaker(i+2, this.edgeSorter(bar.startParent), barArray[bar.endParent]) 
        } else {
          this.barMaker(i+2, barArray[bar.startParent], barArray[bar.endParent])
        }
        return 'nothing'
      })
    }
  }

  mouseTracker = (e) =>{
    let {barArray, boxArray} = this.state

    let x = e.clientX
    let y = e.clientY
    this.setState({
      mouseY:y,
      mouseX:x,
    })

    this.updateBars()   
    this.moveBar()
    this.boxBuilder(updatedBoxes(barArray, boxArray))
  }

  grabBar = () => this.setState({hold:true})
  releaseBar = () => this.setState({hold:false, selectedBar:[]})
  
  // barMaker = (i, bar1, bar2) =>{
  //   const { barArray } = this.state;
  //   let start = bar1
  //   let end = bar2
  //   if(bar2.barPosition<bar1.barPosition){
  //     start = bar2
  //     end = bar1
  //   }

  //   let orientation = 'vertical'
  //   let startPosition = 0;
  //   let endPosition = 100;
  //   let startParent = edge.left
  //   let endParent = edge.right

  //   if (start.barAllign === 'vertical'){
  //     orientation = 'horizontal'
  //     startParent = edge.top
  //     endParent = edge.bottom
  //   }
  //   if (start.barPosition !== undefined){
  //     startPosition = start.barPosition
  //     startParent = start.index
  //   } 
  //   if (end.barPosition !== undefined){
  //     endPosition = end.barPosition
  //     endParent = end.index
  //   }
  //   barArray[i] = {
  //     index:i, 
  //     barAllign:orientation, 
  //     startPosition:startPosition, 
  //     endPosition:endPosition, 
  //     startParent:startParent,
  //     endParent:endParent,
  //   }
  // }

  barClick = (event) =>{
    const {selectedBar} = this.state
    let index = event.target.id;
    index = index.slice(3)
    selectedBar[0] = index
  }

  newBar = () =>{
    const {barArray } = this.state
    this.barMaker(barArray.length, barArray[1], edge.top)
  }

  convertToPercent = (x,y) => {
    let xPercent = x/window.innerWidth * 100
    let yPercent = y/window.innerHeight * 100
    return {x:xPercent, y:yPercent}
  }

  boxBuilder = (arr) =>{
    this.setState({boxArray:arr})
  }

  componentDidMount(){
    const {barArray} = this.state;
    this.boxBuilder(starterBoxes(barArray));

  }

  onBoxClick = (color, id)=>{
    const {boxArray} = this.state;
    colorSwap(boxArray, id, color)
    this.setState(boxArray); 
  }

  render() {
    const { mouseX, mouseY, barArray, boxArray } = this.state;
    return (
      
      <div 
        className="App" 
        onMouseMove={this.mouseTracker} 
        onMouseDown={this.grabBar} 
        onMouseUp={this.releaseBar} 
        onClick={this.onMouseClick}
      >

        <Allbars 
          barArray={barArray}
          barClick={this.barClick} 
        />
        <AllBoxes onBoxClick={this.onBoxClick} boxArray={boxArray} /> 
        <div style={{zIndex:100, backgroundColor:'lightblue', maxWidth:'100px'}}>
          <div style={{ backgroundColor:'transparent'}}>x{mouseX}, y{mouseY}</div>
          <button id='new-bar' onClick={this.newBar}> newBar </button>
        </div>
      </div>
    );
  }
}

export default App;
