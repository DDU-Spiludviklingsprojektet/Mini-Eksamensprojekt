import React from 'react';
import Signup from './Signup';
import Signin from './Signin';
import axios from 'axios';
import store from '../../store/index';
import Toast from '../Toast/Toast';
import './Auth.css';
import {MDBContainer, MDBTabs, MDBTabsItem, MDBTabsLink} from 'mdb-react-ui-kit';


export default class Auth extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tab: 'signin',
            showToast: false
        }
    }

    signIn = (email, password) => {
        axios.post('/api/users/login', { email, password }).then(res => {
            if (res.data.success) {
                store.dispatch({
                    type: 'login',
                    _id: res.data.user._id,
                    user: res.data.user,
                    token: res.data.token,
                    admin: res.data.user.admin
                });
                this.props.history.push('/dashboard');
            } else {
                this.setState({
                    showToast: true
                });
                setTimeout(() => {
                    this.setState({ showToast: false })
                }, 3000);
            }
        }).catch(er => {
            this.setState({
                showToast: true
            });
            setTimeout(() => {
                this.setState({ showToast: false })
            }, 3000);
        })
    }

    signUp = ({ firstName, lastName, email, password }) => {
        axios.post('/api/users/register', { firstName, lastName, email, password }).then(res => {
            if (res.data.success) {
                this.setState({ tab: 'signin' });
            }
        }).catch(er => {
            console.log(er);
        })
    }

    changeTab = () => {
        this.setState({
            tab: this.state.tab === 'signup' ? 'signin' : 'signup'
        });
    }

    render() {
        let page = this.state.tab === 'signin' ? <Signin signIn={this.signIn} /> : <Signup signUp={this.signUp} />
        if (localStorage.getItem('JWT_PAYLOAD')) {
            this.props.history.push('/dashboard');
        }
        return (
            <div className="auth-wrapper">
                <Toast model={this.state.showToast} message="Forkert password eller email" backgroundColor="#FF4539" />
                <div className="left">
                    <img src="https://res.cloudinary.com/ddu-mini/image/upload/v1671553548/logo/Unavngivet_fn0dy4.png" alt="our logo" />
                </div>

                <div className="right">
                    <div className="header">MitGym</div>
                    <div className="sub-header">Velkommen til MitGym</div>
                    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
                    <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
                        <MDBTabsItem>
                            <MDBTabsLink onClick={this.changeTab} active={this.state.tab === 'signin'}>
                                Log på
                            </MDBTabsLink>
                        </MDBTabsItem>
                        <MDBTabsItem>
                            <MDBTabsLink onClick={this.changeTab} active={this.state.tab === 'signup'}>
                                Registrer
                            </MDBTabsLink>
                        </MDBTabsItem>
                    </MDBTabs>
                    {page}
                    </MDBContainer>
                </div>
            </div>
        )
    }
}