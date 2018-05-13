import './Signature.css'
import React, { Component } from 'react'

class Signature extends Component {
	constructor(){
		super()
	}

	signatureElement = ()=>{
		if(this.props.signature !== 'test'){
			return this.props.signature
		}
	}


	render(){
		return(
			<div className='signature'>
				{this.signatureElement()}
			</div>

		)
	}
}

export default Signature