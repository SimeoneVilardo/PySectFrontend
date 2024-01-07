import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom'
import { AuthContext } from '../App';

const PublicRoutes = () => {
    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error("AuthContext is undefined");
    }
    const { user } = authContext;
    return (
        !user ? <Outlet /> : <Navigate to="/" />
    )
}

export default PublicRoutes