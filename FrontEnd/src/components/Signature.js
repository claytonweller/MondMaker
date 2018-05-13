import './Signature.css'
import React, { Component } from 'react'

class Signature extends Component {
	constructor(props){
		super(props);
		this.state ={
			sigHold: false,
			sigX: 20,
			sigY:80,
		}
	}

 	updateSigPosition = (x, y)=>{

 		if(this.state.sigHold === true){
 			return {top:y-this.state.offsetY, left:x-this.state.offsetX}
 		} else {
 			return {top:this.state.sigY, left:this.state.sigX}
 		}
 	}

 	grabSignature = () => this.setState({
 		sigHold:true, 
 		offsetY:this.props.mouseY-this.state.sigY,
 		offsetX:this.props.mouseX-this.state.sigX,
 	})
 	
 	releaseSignature = () => {
 		this.setState({
 			sigHold:false, 
 			sigY:this.props.mouseY-this.state.offsetY, 
 			sigX:this.props.mouseX-this.state.offsetX,
 		})

 	}	

	signatureElement = ()=>{
		if(this.props.signature !== 'test'){
			return this.props.signature
		}
	}


	render(){
		return(
			<div 
				style={this.updateSigPosition(this.props.mouseX, this.props.mouseY)}
				className='signature' 
				onMouseMove={this.mouseTracker}
				onMouseDown={this.grabSignature}
				onMouseUp={this.releaseSignature}
			>
				<div className='border'>
					{this.signatureElement()}
				</div>
			</div>

		)
	}
}

export default Signature