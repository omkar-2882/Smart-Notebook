import React from 'react'
import { Notes } from './Notes'


export const Home = (props) => {
 
	return (
		<div id="homec">
			<Notes showAlert={props.showAlert}/>
		</div>
	)
}
