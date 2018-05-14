import React, { Component } from 'react'
import SignatureInterface from './SignatureInterface'
import SaveInterface from './SaveInterface'
import serverLocation from '../functions/serverLocation'
import './ExportWindow.css'

class ExportWindow extends Component {
	constructor(){
		super();
		this.state = {
			mode:'sig',
		}
	}

	servertest = () => {
		fetch(serverLocation)
			.then(res => res.json())
			.then(text => console.log(text))
	}

	isVisible = ()=>{
		if (this.props.isExporting){
			return {backgroundColor: '#95edff', color:'black' }
		} else {
			return {transform:'scale(.8)', zIndex:'-300'}
		}
	}

	exportStage = ()=>{
		if(this.state.mode === 'sig'){
			return <SignatureInterface onSignClick = {this.props.onSignClick} />
		} else if (this.state.mode === 'save'){
			return <SaveInterface />
		}
	}
	
	saveButtonClick = ()=>{
		if (this.state.mode === 'sig'){
			this.setState({mode:'save'})
		} else {
			this.setState({mode:'sig'})
		}
	}



	render(){
      return(
	      <div className="export-container">
				<div style={this.isVisible()} className="export-window">
					{this.exportStage()}
			      <button id="test-button" onClick={this.servertest} > TEST </button>
		     		<button id="save-button" onClick={this.saveButtonClick}> Save </button>
		      </div>
			</div>

      )
		
	}
}

export default ExportWindow;