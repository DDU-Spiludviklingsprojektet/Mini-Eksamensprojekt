import React from "react";
import { NavLink } from "react-router-dom";
import { MDBBtn, MDBIcon } from 'mdb-react-ui-kit';



function Navigation() {
  return (
    <div className="navigation">
      <nav className="navbar navbar-expand navbar-light bg-light">
        <div className="container">
          <div>
            <ul className="navbar-nav">
              <li className="nav-item">
                <MDBIcon icon="book-open" />
              </li>
              <li className="nav-item"  >
                MitGym
              </li>
            </ul>
          </div>
          <div>
            <ul className="navbar-nav ml-auto" >
              <li className="nav-item">
                <MDBBtn rippleColor='dark' href="/Login">
                  Login
                </MDBBtn>
              </li>
              <li className="nav-item">
                <MDBBtn rippleColor='dark' href="/Signup" color='secondary'>
                  Signup
                </MDBBtn>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;
