import React from 'react'
import Layout from "../../../Layout"

const FormUpdateUser = (props) => (
	<Layout>
		<form onSubmit={props.updateUserProfile}>
			<div className="form-group">
				<label>Coloca tu nombre completo</label>
				<input type="text" className="form-control" onChange={this.handleNewNameInput}/>
			</div>
			<div className="form-group">
				<label>Coloca el link de tu foto de perfil</label>
				<input type="text" className="form-control" onChange={this.handleNewUrlPhotoInput}/>
			</div>
			<input type="submit" className="btn btn-info" value="send"/>
		</form>
	</Layout>

)

export default FormUpdateUser