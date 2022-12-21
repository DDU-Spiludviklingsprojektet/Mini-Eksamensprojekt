import React from 'react';
import {MDBTabsContent, MDBBtn, MDBInput, MDBCheckbox} from 'mdb-react-ui-kit';

export default class Signup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        email: '',
        password: '',
    }
}

  render() {
    return (
      <MDBTabsContent>

          <MDBInput wrapperClass='mb-4' label='Email adresse' id='form1' type='email' value={this.state.email} onChange={ e => this.setState({ email: e.target.value }) }/>
          <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' value={this.state.password} onChange={e => this.setState({ password: e.target.value })}/>

          <div className="d-flex justify-content-between mx-4 mb-4">
            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
          </div>

          <MDBBtn className="mb-4 w-100" onClick={() => this.props.signIn(this.state.email, this.state.password)}>Log på</MDBBtn>
      </MDBTabsContent>
        );
}
}
