import React, { Component } from 'react';
import Allbars from './components/Allbars';
import AllBoxes from './components/AllBoxes';
import BarAdder from './components/BarAdder';
import './App.css';

import colorSwap from './functions/colorSwap'
import starterBoxes from './components/starterBoxes'
import edgeSorter from './functions/edgeSorter'
import convertToPercent from './functions/convertToPercent'
import barMaker from './functions/barMaker'
import evalDist from './functions/evalDist'



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

  mouseTracker = (e) =>{
    let x = e.clientX
    let y = e.clientY
    this.setState({
      mouseY:y,
      mouseX:x,
    })

    this.updateBars()   
    this.moveBar()
    this.updateBoxes()
  }

  moveBar = () =>{
    let {barArray, selectedBar, mouseY, mouseX, hold} = this.state
    if(hold === true){
      let mousePosition = convertToPercent(mouseX, mouseY)
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
          return this.constructBar(i+2, barArray[bar.startParent], edgeSorter(bar.endParent), bar.barPosition)
        }else if(!Number.isInteger(bar.startParent)){
          return this.constructBar(i+2, edgeSorter(bar.startParent), barArray[bar.endParent], bar.barPosition) 
        } else {
          return this.constructBar(i+2, barArray[bar.startParent], barArray[bar.endParent], bar.barPosition)
        }
        
      })
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

  interpretParentId = (value) =>{
    const {barArray} = this.state
    let int = parseInt(value, 10)
    if(!Number.isInteger(int)){
      return edgeSorter(value)
    } else { 
      return barArray[value]
    }
  }

  getFieldValue = (id) => document.getElementById(id).value

  newBarClick = () =>{
    this.newBar(
      this.interpretParentId(this.getFieldValue('edge1')),
      this.interpretParentId(this.getFieldValue('edge2')),
      this.getFieldValue('new-bar-position')
    )
  }

  newBar = (edge1, edge2, position) =>{
    const {barArray} = this.state
    let bar = this.constructBar(barArray.length, edge1, edge2, position)
    let box = this.boxSelector(bar)
    this.boxSplitter(bar, box)
    
  }

  boxSelector = (bar)=>{
    const {boxArray} = this.state
    let startBoxArray = boxArray
                .filter(box => box.parents.includes(bar.startParent))
                .filter(box => box.parents.includes(bar.endParent))
    
    if(startBoxArray.length >1){
      if(bar.barAllign === 'horizontal'){
        startBoxArray = startBoxArray.filter( box => Math.abs(box.boxTop - box.boxBottom) === evalDist(box.boxTop, box.boxBottom, bar.barPosition))       
      } else if(bar.barAllign === 'vertical') {
        startBoxArray = startBoxArray.filter( box => Math.abs(box.boxLeft - box.boxRight) === evalDist(box.boxLeft, box.boxRight, bar.barPosition))
      }
    }  
    let startBox = startBoxArray[0]
    return startBox

  }

  boxSplitter = (bar, startBox) => {
    const {barArray} = this.state
               
    let definiteParents = [bar.startParent, bar.endParent]
    let partialParents = startBox.parents.filter(parent => parent !== bar.startParent).filter(parent => parent !==bar.endParent)
    let pIndexA = definiteParents.concat(bar.index, partialParents[0])
    let pIndexB = definiteParents.concat(bar.index, partialParents[1])
    let parentsA = pIndexA.map(index => {
      if (Number.isInteger(index)){
        return barArray[index]
      } else {
        return edgeSorter(index)
      }
    })
    let parentsB = pIndexB.map(index => {
      if (Number.isInteger(index)){
        return barArray[index]
      } else {
        return edgeSorter(index)
      }
    })

    this.boxBuilder(parentsA, startBox.boxId, startBox.boxColor)
    this.newBox(parentsB)

  }
  
  constructBar = (i, bar1, bar2, barPosition) =>{
    const { barArray } = this.state;
    let newBar = barMaker(i, bar1, bar2, barPosition);
    barArray[i] = newBar
    return newBar
    
  }

  updateBoxes = () =>{
    const {barArray, boxArray} = this.state
    let arr = boxArray.map(box => box)
    if (arr.length > 0){
      arr.map((box,i) => {
        let parents = box.parents.map(parent =>{
          if(!Number.isInteger(parent)){
            return edgeSorter(parent)
          } else {
            return barArray[parent]
          }
        })
        return this.boxBuilder(parents, box.boxId, box.boxColor)
        
      })
    }

  }

  boxBuilder = (parents, index, color) =>{
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

  newBox = (parents, startColor) => {
    const {boxArray}= this.state;
    let i = this.boxBuilder(parents, boxArray.length)
    boxArray[i].boxColor = colorSwap.start(i)
  }

  componentWillMount(){
    const {barArray} = this.state;
    let arr = starterBoxes(barArray)
    arr.map((box, i) => {
      return this.newBox(box)

    })

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
        <BarAdder
          mouseX={mouseX}
          mouseY={mouseY}
          newBar={this.newBarClick}
        />
      </div>
    );
  }
}

export default App;
