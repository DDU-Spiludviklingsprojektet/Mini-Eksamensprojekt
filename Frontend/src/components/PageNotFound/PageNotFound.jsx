import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
}
  from 'mdb-react-ui-kit';
import './PageNotFound.css';


function PageNotFound() {
  return (
    <MDBContainer fluid>

      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>

          <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '500px' }}>
            <MDBCardBody className='p-5 w-100 d-flex flex-column'>

              <MDBContainer className="p-3 d-flex flex-column">
                <h1 className="text-center">404</h1>
                <h3 className="text-center">Page Not Found</h3>
                <MDBRow className="d-flex justify-content-center">
                  
                    <MDBBtn href="/" className='g-col-6 g-col-md-4'>Gå til login</MDBBtn>
                  
                </MDBRow>
              </MDBContainer>
            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>
  );
}


export default PageNotFound;
