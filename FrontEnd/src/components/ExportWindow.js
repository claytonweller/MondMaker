import React, { Component } from 'react'
import './ExportWindow.css'

let signatureStyles = [
	'title-font',
	'cursive',
	'blocky',
	'print',
	'ridiculous'
]

class ExportWindow extends Component {
	constructor(){
		super();
		this.state = {
			signature:'Your signature',
			styleIndex: 0
		}
	}

	isVisible = ()=>{
		if (this.props.isExporting){
			return {backgroundColor: '#95edff', color:'black' }
		} else {
			return {transform:'scale(.8)', zIndex:'-300'}
		}
	}

	onSigFieldChange = (event) =>{
		let currentSig = event.target.value
		if(currentSig !== ''){
			this.setState({signature:currentSig})	
		} else {
			this.setState({signature:'Sign Below'})
		}
	}

	styleChange = () =>{
		let newStyleIndex = this.state.styleIndex + 1
		if (newStyleIndex< signatureStyles.length){
			this.setState({styleIndex:newStyleIndex})	
		} else {
			this.setState({styleIndex:0})
		}		
	}

	signatureElement = () =>{
		return <div className={signatureStyles[this.state.styleIndex]}> {this.state.signature} </div>
	}

	exportSignatureElement = ()=>{
		this.props.onSignClick(this.signatureElement)
	}

	render(){
      return(
	      <div className="export-container">
				<div style={this.isVisible()} className="export-window">
		        <div className="export-row">
			        <h1> Sign Your Painting </h1> 
		        </div>
		        <div className="export-row">
			    		{this.signatureElement()}     
		        </div>
		        <div className="export-row">
			        <input type="text" id="sig-field" onChange={this.onSigFieldChange}/>
		        </div>
		        <div className="export-row">
				      <button id="style-button" onClick={this.styleChange}>Change Style </button>
		        		<button id="sig-button" onClick={this.exportSignatureElement}>Sign</button>
		        </div>
		      </div>
			</div>

      )
		
	}
}

export default ExportWindow;