import React from 'react';
import {MDBTabsContent, MDBBtn, MDBInput, MDBCheckbox} from 'mdb-react-ui-kit';

export default class Signup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: ''
        }
    }

  render() {
    return (
<MDBTabsContent>
          <MDBInput wrapperClass='mb-4' label='Navn' id='form1' type='text' value={this.state.firstName} onChange={ e => this.setState({ firstName: e.target.value }) }/>
          <MDBInput wrapperClass='mb-4' label='Efternavn' id='form1' type='text' value={this.state.lastName} onChange={e => this.setState({ lastName: e.target.value })}/>
          <MDBInput wrapperClass='mb-4' label='Email adresse' id='form1' type='email' value={this.state.email} onChange={ e => this.setState({ email: e.target.value }) }/>
          <MDBInput wrapperClass='mb-4' label='Password' id='form1' type='password' value={this.state.password} onChange={e => this.setState({ password: e.target.value })}/>

          <div className='d-flex justify-content-center mb-4'>
            <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='Har du læst og accepteret vores betingelser?' />
          </div>

          <MDBBtn className="mb-4 w-100" onClick={() => this.props.signUp({...this.state})}>Registrer</MDBBtn>
        </MDBTabsContent>
        );
}
}
