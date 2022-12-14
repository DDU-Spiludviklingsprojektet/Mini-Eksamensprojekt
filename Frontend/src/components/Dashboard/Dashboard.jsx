import React from 'react';
import { MDBSwitch } from 'mdb-react-ui-kit';

export default function Dashboard() {
  return (
    <>
      <MDBSwitch id='flexSwitchCheckDefault' label='Default switch checkbox input' />
      <br />
      <MDBSwitch defaultChecked id='flexSwitchCheckChecked' label='Checked switch checkbox input' />
      <br />
      <MDBSwitch disabled id='flexSwitchCheckDisabled' label='Disabled switch checkbox input' />
      <br />
      <MDBSwitch
        defaultChecked
        disabled
        id='flexSwitchCheckCheckedDisabled'
        label='Disabled checked switch checkbox input'
      />
    </>
  );
}