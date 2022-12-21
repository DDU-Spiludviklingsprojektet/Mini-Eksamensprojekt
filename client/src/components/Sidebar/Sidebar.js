import React from 'react';
import store from '../../store/index';
import {NavLink} from 'react-router-dom';
import './Sidebar.css';


export default class Sidebar extends React.Component {

    componentDidMount() {
        this.unsubscribe = store.subscribe(() => this.forceUpdate());
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    bgImage = () => {
        if(store.getState().user.avatar && store.getState().user.avatar.url) {
            return `url(${store.getState().user.avatar.url})`;
            
        } else {
            return `url(https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg)`;
        }
    }

    render() {
        if (store.getState().user) {
            if (store.getState().user.admin === true) {
                return (
                    <div className="sidebar-wrapper">
                        <div className="header">MitGym</div>
    
                        <div className="user">
                            <div className="avatar" style={{backgroundImage: this.bgImage()}}></div>
                            <div className="name">{store.getState().user.firstName + ' ' + store.getState().user.lastName}</div>
                        </div>
    
    
                        <div className="links">
                            <NavLink to="/dashboard"><div className="link">Forside</div></NavLink>
                            <NavLink to="/community-quizzes"><div className="link">Quizzes</div></NavLink>
                            <NavLink to="/account"><div className="link">Min profil</div></NavLink>
                            <NavLink to="/create-quiz"><div className="link">Lav en quiz</div></NavLink>
                            <NavLink to="/my-quizzes"><div className="link">Mine quizzes</div></NavLink>
                            <NavLink to="/sign-out"><div className="link">Log ud</div></NavLink>
                        </div>
                    </div>
                )
            } else {
            return (
                <div className="sidebar-wrapper">
                    <div className="header">MitGym</div>
    
                    <div className="user">
                        <div className="avatar" style={{backgroundImage: this.bgImage()}}></div>
                        <div className="name">{store.getState().user.firstName + ' ' + store.getState().user.lastName}</div>
                    </div>


                    <div className="links">
                        <NavLink to="/dashboard"><div className="link">Forside</div></NavLink>
                        <NavLink to="/community-quizzes"><div className="link">Quizzes</div></NavLink>
                        <NavLink to="/account"><div className="link">Min profil</div></NavLink>
                        <NavLink to="/sign-out"><div className="link">Log ud</div></NavLink>
                        
                    </div>
                </div>
            )
            }
        } else {
            return (
                <div>Loader</div>
            )
        }
    }
}