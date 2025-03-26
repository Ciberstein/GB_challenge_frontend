import { Outlet } from 'react-router-dom';
import { PosAuthLayout } from '../../../layouts/PosAuthLayout';
import { useContext } from 'react';
import AuthContext from '../../../../context/AuthContext';
import { LoginPage } from '../../auth/login/LoginPage';

export const ProtectedRoutes = () => {

    const { auth } = useContext(AuthContext);
  
    if (auth)
      return (
        <PosAuthLayout>
          <Outlet />
        </PosAuthLayout>
      );
  
    return <LoginPage />;
  };