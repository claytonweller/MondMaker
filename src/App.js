//Modules & CSS

import React, { Component } from 'react';
import './App.css';
import './fonts/fonts.css'

///Components

import Allbars from './components/Allbars';
import AllBoxes from './components/AllBoxes';
import AllNodes from './components/AllNodes';
import Nav from './components/Nav'
import ExportWindow from './components/ExportWindow'
import Signature from './components/Signature'

//Functions

import colorSwap from './functions/colorSwap'
import starterBoxes from './components/starterBoxes'
import edgeSorter from './functions/edgeSorter'
import interpretParentId from './functions/interpretParentId'
import convertToPercent from './functions/convertToPercent'
import barMaker from './functions/barMaker'
import boxBuilder from './functions/boxBuilder'
import compare from './functions/compare'
import midpointFinder from './functions/midpointFinder'
import appHeight from './functions/appHeight'
import findNearestBar from './functions/findNearestBar'

class App extends Component {
  constructor(){
    super();
    this.state={
      barArray:[
        {index:0, barAllign:'vertical', barPosition:70, startPosition:0, endPosition:100, startParent:'top', endParent:'bottom'},
        {index:1, barAllign:'horizontal', barPosition:80, startPosition:0, endPosition:100, startParent:'left', endParent:'right'},     
      ],
      boxArray:[],
      nodeArray:[
        {baseParent:'left', boundParents:[1, 'bottom'], baseParentOrientation:'vertical', visible:false},
        {baseParent:'left', boundParents:[1, 'top'], baseParentOrientation:'vertical', visible:false},
        {baseParent:'right', boundParents:[1, 'bottom'], baseParentOrientation:'vertical', visible:false},
        {baseParent:'right', boundParents:[1, 'top'], baseParentOrientation:'vertical', visible:false},
        {baseParent:'bottom', boundParents:[0, 'right'], baseParentOrientation:'horizontal', visible:false},
        {baseParent:'bottom', boundParents:[0, 'left'], baseParentOrientation:'horizontal', visible:false},
        {baseParent:'top', boundParents:[0, 'right'], baseParentOrientation:'horizontal', visible:false},
        {baseParent:'top', boundParents:[0, 'left'], baseParentOrientation:'horizontal', visible:false},
        {baseParent:1, boundParents:[ 0, 'left'], baseParentOrientation:'horizontal', visible:false},
        {baseParent:0, boundParents:[1, 'top'], baseParentOrientation:'vertical', visible:false},
        {baseParent:1, boundParents:[0, 'right'], baseParentOrientation:'horizontal', visible:false},
        {baseParent:0, boundParents:[1, 'bottom'], baseParentOrientation:'vertical', visible:false},

      ],
      mouseY: 0,
      mouseX: 0,
      hold:false,
      selectedBar:[],
      canSeeNodes:false,
      parentBars:[],
      selectedNodes:[],
      appHeight:0,
      addingBar:false,
      isExporting:false,
      signature:'test'
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

  getFieldValue = (id) => document.getElementById(id).value

  newBarClick = () =>{
    const { addingBar, nodeArray} = this.state
    if(addingBar === false){
      this.setState({canSeeNodes:true,addingBar:true})  
    } else {
      nodeArray.forEach(node => node.visible=false)
      this.setState({canSeeNodes:false, addingBar:false, selectedNodes:[], parentBars:[]})
    }    
  }

  constructBar = (i, bar1, bar2, barPosition) =>{
    const { barArray } = this.state;
    let newBar = barMaker(i, bar1, bar2, barPosition);
    barArray[i] = newBar
    return newBar
  }

  newBar = (edge1, edge2, position) =>{
    const {barArray} = this.state
    let bar = this.constructBar(barArray.length, edge1, edge2, position)
    let box = this.boxSelector(bar)
    this.boxSplitter(bar, box)
    this.nodeSplitter(bar)
  }


  nodeSplitter = (bar)=>{
    const {nodeArray, selectedNodes} = this.state
    let unchangedNodes = nodeArray
                .filter(node => node.boundParents !== selectedNodes[0].boundParents)
                .filter(node => node.boundParents !== selectedNodes[1].boundParents)
    let newNodes = selectedNodes.map(node =>{
      return [
          {baseParent:node.baseParent, boundParents:[node.boundParents[0], bar.index], baseParentOrientation:node.baseParentOrientation, visible:false},
          {baseParent:node.baseParent, boundParents:[node.boundParents[1], bar.index], baseParentOrientation:node.baseParentOrientation, visible:false}
        ]   
    })
    newNodes = newNodes[0].concat(newNodes[1])
    let finalNode = {baseParent:bar.index, boundParents:[bar.startParent, bar.endParent], baseParentOrientation:bar.barAllign, visible:false}
    let mostNodes = newNodes.concat(unchangedNodes)
    let allNodes = mostNodes.concat(finalNode)
    this.setState({nodeArray:allNodes})
  }

  onNodeClick = (event) =>{
    const{parentBars, nodeArray, barArray, selectedNodes} = this.state
    let parentArr =[]
    let selectNodesArr = []
    let node = event.target.id    
    let index = node.split('node')[1]
    let baseParent = nodeArray[index].baseParent
    let boundParentsIds = nodeArray[index].boundParents
    let boundParentsPositions = boundParentsIds.map(id => interpretParentId(barArray, id).barPosition )
    let boundParentsMidpoint = midpointFinder(boundParentsPositions[0], boundParentsPositions[1])

    if(parentBars[0] === undefined & parentBars[1] === undefined){
      parentArr = [baseParent]
      selectNodesArr = [nodeArray[index]]
      selectNodesArr[0].visible = 'selected'
      
      let viableParents = nodeArray
          .filter(node => node.baseParentOrientation === nodeArray[index].baseParentOrientation)
          .filter(node => node.baseParent !== nodeArray[index].baseParent)
          // .filter(node => nodeArray[index].boundParents.includes(node.boundParents[0]))
          // .filter(node => nodeArray[index].boundParents.includes(node.boundParents[1]))
      
      // findNearestBar(barArray[baseParent], barArray)
      viableParents.forEach(node => node.visible=true)
      this.setState({
        parentBars:parentArr,
        selectedNodes: selectNodesArr,
        canSeeNodes:false
      })
    } else if(parentBars[1] === undefined && selectedNodes[0] !== nodeArray[index]){
      parentArr = [parentBars[0], baseParent]
      selectedNodes.push(nodeArray[index])
      this.newBar(
        interpretParentId(barArray, parentArr[1]),
        interpretParentId(barArray, parentArr[0]),
        boundParentsMidpoint
      )
      nodeArray.forEach(node => node.visible=false)
      this.setState({
        parentBars:[],
        addingBar:false
      })
    } else {
      nodeArray[index].visible = false
      nodeArray.forEach(node => node.visible=false)
      this.setState({
        selectedNodes:[],
        parentBars:[],
        canSeeNodes:true
      })
    }
  }

  boxSelector = (bar)=>{
    const {boxArray} = this.state
    let startBoxArray = boxArray
                .filter(box => box.parents.includes(bar.startParent))
                .filter(box => box.parents.includes(bar.endParent))
    
    if(startBoxArray.length >1){
      if(bar.barAllign === 'horizontal'){
        startBoxArray = startBoxArray.filter( box => Math.abs(box.boxTop - box.boxBottom) === compare(box.boxTop, box.boxBottom, bar.barPosition))       
      } else if(bar.barAllign === 'vertical') {
        startBoxArray = startBoxArray.filter( box => Math.abs(box.boxLeft - box.boxRight) === compare(box.boxLeft, box.boxRight, bar.barPosition))
      }
    }  
    let startBox = startBoxArray[0]
    return startBox
  }

  boxSplitter = (bar, startBox) => {
    const {barArray, boxArray} = this.state
               
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
    boxBuilder(boxArray, parentsA, startBox.boxId, startBox.boxColor)
    this.newBox(parentsB)
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
        return boxBuilder(boxArray, parents, box.boxId, box.boxColor)   
      })
    }
  }

  newBox = (parents, startColor) => {
    const {boxArray}= this.state;
    let i = boxBuilder(boxArray, parents, boxArray.length)
    boxArray[i].boxColor = colorSwap.start(i)
  }

  onBoxClick = (color, id)=>{
    const {boxArray} = this.state;
    colorSwap.rotate(boxArray, id, color)
    this.setState(boxArray); 
  }

  getAppHeight = ()=>{
    let height = appHeight()
    return height
  }

  componentWillMount(){
    const {barArray} = this.state;
    let arr = starterBoxes(barArray)
    arr.map((box, i) => {
      return this.newBox(box)
    })

  }

  componentDidMount(){
    let height = appHeight();
    this.setState({appHeight:height})
  }

  exportClick = ()=>{
    if(this.state.isExporting){
      this.setState({isExporting:false})
    } else {
      this.setState({isExporting:true})
    }
  }

  onSignClick = (func)=>{
    let signatureElement = func()
    this.setState({signature: signatureElement})
  }

  render() {
    const { isExporting, mouseX, mouseY, addingBar, appHeight, barArray, boxArray, nodeArray, canSeeNodes } = this.state;
    return (
      
      <div 
        className="App" 
        onMouseMove={this.mouseTracker} 
        onMouseDown={this.grabBar} 
        onMouseUp={this.releaseBar} 
      >
        <ExportWindow
          isExporting={isExporting}
          onSignClick = {this.onSignClick}
        />
        <Nav
          newBar={this.newBarClick}
          mouseX={mouseX}
          mouseY={mouseY}
          addingBar={addingBar}
          exportClick = {this.exportClick}
        />
        <Signature
          signature = {this.state.signature}
         />
        <div style={{height:appHeight, width:'100%', position:'absolute', overflow:'hidden'}}>
          <AllNodes 
            onNodeClick = {this.onNodeClick}
            nodeArray = {nodeArray} 
            barArray = {barArray}
            canSeeNodes ={canSeeNodes}
          />
          <Allbars 
            barArray={barArray}
            barClick={this.barClick} 
          />
          <AllBoxes onBoxClick={this.onBoxClick} boxArray={boxArray} />     
          
        </div>
      
      </div>
    );
  }
}

export default App;
