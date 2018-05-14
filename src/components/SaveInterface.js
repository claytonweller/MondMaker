import React from 'react'
import serverLocation from '../functions/serverLocation'

const SaveInterface = () =>{



	const compileUser = () =>{
		let first = document.getElementById('first-field').value
		let last = document.getElementById('last-field').value
		let email = document.getElementById('email-field').value
		let timecode = new Date()
		

		return {
			first:first,
			last:last,
			email:email,
			date:timecode
		}
	}

	const postUser = (user) => {

		fetch(serverLocation+'/create/', {
				method: 'post',
				headers:{'Content-Type':'application/json'},
				body: JSON.stringify({user:user})
			})
			// .then(res => res.json())
			// .then(text => console.log(text))
	}

	const createAccountClick = () =>{
		let user = compileUser()
		
		if (user.first.length > 0 && user.last.length > 0 && user.email.length > 0){
			postUser(user)	
			clearFields()
		}
		
	}

	const clearFields = () =>{
		document.getElementById('first-field').value = null
		document.getElementById('last-field').value = null
		document.getElementById('email-field').value = null
	}

	return (
		<div>
			<div className="export-row">
		   	<h1>Hello!</h1>
	      </div>
	      <div className="export-row">
		   	<input type='text' id='first-field' placeholder='first name' /> 
	      </div>
	      <div className="export-row">
		   	<input type='text' id='last-field' placeholder='last name' /> 
	      </div>
	      <div className="export-row">
		   	<input type='text' id='email-field' placeholder='email' /> 
	      </div>
	     	<div className="export-row">
		   	<button id="save-to-db" onClick={createAccountClick} > Creat Account </button>
	      </div>
		</div>
	)
}

export default SaveInterface