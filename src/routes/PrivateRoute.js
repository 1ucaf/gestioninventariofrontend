import { useEffect, useState } from 'react';
import {
    Route,
    Redirect
} from 'react-router-dom';
import { renewTokenApiCall } from '../api/Session';
import { getToken, setToken } from '../utils/Utils';
  
function PrivateRoute({ children, ...rest }) {

    const [isAuthenticated, setIsAuthenticated] = useState();

    useEffect(()=>{
        setIsAuthenticated(undefined);
        const token = getToken();
        renewTokenApiCall(token)
        .then(response => {
            setToken(response);
            setIsAuthenticated(true);
        })
        .catch(err => {
            setIsAuthenticated(false);
        })
    }, [children]);

    return (
        <Route
            {...rest}
            render={
            ({ location }) => (
                isAuthenticated === true
                ? (
                    children
                ) : isAuthenticated === false ? (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: location }
                        }}
                    />
                ) : <h1>Cargando...</h1>)
            }
        />
    );
}
export default PrivateRoute;