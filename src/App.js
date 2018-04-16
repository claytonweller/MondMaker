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
          this.constructBar(i+2, barArray[bar.startParent], this.edgeSorter(bar.endParent))
        }else if(!Number.isInteger(bar.startParent)){
          this.constructBar(i+2, this.edgeSorter(bar.startParent), barArray[bar.endParent]) 
        } else {
          this.constructBar(i+2, barArray[bar.startParent], barArray[bar.endParent])
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
    // this.boxBuilder(updatedBoxes(barArray, boxArray))
  }

  grabBar = () => this.setState({hold:true})
  releaseBar = () => this.setState({hold:false, selectedBar:[]})
  
  constructBar = (i, bar1, bar2) =>{
    const { barArray } = this.state;
    let newBar = barMaker(i, bar1, bar2);
    barArray[i] = newBar
    
  }

  barClick = (event) =>{
    const {selectedBar} = this.state
    let index = event.target.id;
    index = index.slice(3)
    selectedBar[0] = index
  }

  newBar = () =>{
    const {barArray } = this.state
    this.constructBar(barArray.length, barArray[1], edge.top)
  }

  convertToPercent = (x,y) => {
    let xPercent = x/window.innerWidth * 100
    let yPercent = y/window.innerHeight * 100
    return {x:xPercent, y:yPercent}
  }

  boxBuilder = (parents) =>{
    const {boxArray} = this.state
    
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
    let color = colorSwap.start(boxArray.length)
    console.log(color)

    let box ={
      boxId:boxArray.length,
      boxLeft:left.barPosition,
      boxTop:top.barPosition,
      boxRight:right.barPosition,
      boxBottom:bottom.barPosition,
      boxColor:color
    }
    // console.log(box)
    
    boxArray.splice(box.boxId,1, box)
    
    // this.setState({boxArray:arr})
  }

  componentDidMount(){
    const {barArray} = this.state;
    
    this.boxBuilder([edge.bottom, barArray[1], edge.right, edge.left])
    this.boxBuilder([  edge.left, edge.top, barArray[1],  edge.right,])
    this.boxBuilder([  barArray[0], edge.top, barArray[1],  edge.right,])
    this.boxBuilder([edge.bottom, barArray[1], barArray[0], edge.left])
    // this.boxBuilder(starterBoxes(barArray));

  }

  onBoxClick = (color, id)=>{
    const {boxArray} = this.state;
    colorSwap.rotate(boxArray, id, color)
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
