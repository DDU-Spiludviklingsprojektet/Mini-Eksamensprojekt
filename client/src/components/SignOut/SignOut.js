import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function SignOut() {
  const history = useHistory();

  useEffect(() => {
    localStorage.removeItem('_ID');
    localStorage.removeItem('JWT_PAYLOAD');
    localStorage.removeItem('ADMIN');
    history.push('/');
  }, [history]);

  return null;
}

export default SignOut;