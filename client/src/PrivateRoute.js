import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = ({ isLogged}) => {
    return isLogged ? <Outlet /> : <Navigate to='/auth' />;
}

export default PrivateRoute