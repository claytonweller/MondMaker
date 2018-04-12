import React, { Component } from 'react';
import Allbars from './components/Allbars';
import AllBoxes from './components/AllBoxes';
import './App.css';

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
    }
  }

  barMaker = () =>{
    const newBar = {barAllign:'vertical', barPosition:10, startPosition:50, endPosition:80};
    this.state.barArray.push(newBar);    
    this.setState({barArray:this.state.barArray});  
  }

  mouseTracker = (e) =>{
    let x = e.clientX
    let y = e.clientY
    this.setState({
      mouseY:y,
      mouseX:x,
    })
  }

  onMouseClick = () => {
    console.log(this.state.mouseX, this.state.mouseY)
  }

  boxBuilder = () =>{
    const {barArray} = this.state;
    const starterBoxes = [
      {
        boxId:0,
        boxLeft:0,
        boxTop:0,
        boxRight:barArray[0].barPosition,
        boxBottom:barArray[1].barPosition,
        boxColor:'blue'
      },
      {
        boxId:1,
        boxLeft:barArray[0].barPosition,
        boxTop:0,
        boxRight:100,
        boxBottom:barArray[1].barPosition,
        boxColor:'white'
      },
      {
        boxId:2,
        boxLeft:0,
        boxTop:barArray[1].barPosition,
        boxRight:barArray[0].barPosition,
        boxBottom:100,
        boxColor:'yellow'
      },
      {
        boxId:3,
        boxLeft:barArray[0].barPosition,
        boxTop:barArray[1].barPosition,
        boxRight:100,
        boxBottom:100,
        boxColor:'red'
      },
    ]
    
    this.setState({boxArray:starterBoxes})
  }

  componentDidMount(){
    this.boxBuilder();

  }

  onBoxClick = (color, id)=>{
    const {boxArray} = this.state;
    if(color === 'white'){
      boxArray[id].boxColor='red';
      this.setState(boxArray); 
    } else if (color === 'red'){
      boxArray[id].boxColor='blue';
      this.setState(boxArray);       
    } else if (color === 'blue'){
      boxArray[id].boxColor='yellow';
      this.setState(boxArray); 
    } else {
      boxArray[id].boxColor='white';
      this.setState(boxArray); 
    }
  }

  render() {
    const { mouseX, mouseY, barArray, boxArray } = this.state;
    return (
      
      <div className="App" onMouseMove={this.mouseTracker} onClick={this.onMouseClick}>

        <Allbars barArray={barArray} />
        <AllBoxes onBoxClick={this.onBoxClick} boxArray={boxArray} /> 
        <div style={{zIndex:100, backgroundColor:'transparent'}}>{mouseX}, {mouseY}</div>
      </div>
    );
  }
}

export default App;
