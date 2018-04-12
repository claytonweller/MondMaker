import React, { Component } from 'react';
import Allbars from './components/Allbars';
import AllBoxes from './components/AllBoxes';
import './App.css';

import colorSwap from './components/colorSwap'
import starterBoxes from './components/starterBoxes'

class App extends Component {
  constructor(){
    super();
    this.state={
      barArray:[
        {barAllign:'vertical', barPosition:30, startPosition:0, endPosition:100},
        {barAllign:'horizontal', barPosition:80, startPosition:0, endPosition:100},
        // {barAllign:'vertical', barPosition:80, startPosition:50, endPosition:100},
        // {barAllign:'horizontal', barPosition:80, startPosition:0, endPosition:30},
        // {barAllign:'vertical', barPosition:10, startPosition:50, endPosition:80}      
      ],
      boxArray:[],
      mouseY: 0,
      mouseX: 0,
      hold:false,
      selectedBar:[],
    }
  }

  mouseTracker = (e) =>{
    let {barArray, selectedBar, mouseY, mouseX, hold} = this.state

    let x = e.clientX
    let y = e.clientY
    this.setState({
      mouseY:y,
      mouseX:x,
    })
    if(hold === true){
      let mousePosition = this.convertToPercent(mouseX - 10, mouseY-10)
      if (barArray[selectedBar[0]] === undefined){
      } else if (barArray[selectedBar[0]].barAllign === 'vertical'){
        barArray[selectedBar[0]].barPosition = mousePosition.x        
      } else if (barArray[selectedBar[0]].barAllign === 'horizontal'){
        barArray[selectedBar[0]].barPosition = mousePosition.y
      }
      this.boxBuilder(starterBoxes(barArray))
    }
  }

  grabBar = () => this.setState({hold:true})
  releaseBar = () => this.setState({hold:false, selectedBar:[]})
  

  barClick = (event) =>{
    const {selectedBar} = this.state
    let index = event.target.id;
    index = index.slice(3)
    selectedBar[0] = index
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
        <div style={{zIndex:100, backgroundColor:'transparent'}}>{mouseX}, {mouseY}</div>
      </div>
    );
  }
}

export default App;
