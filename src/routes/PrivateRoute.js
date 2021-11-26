import { useEffect, useState } from 'react';
import {
    Route,
    Redirect
} from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { getUserNameApiCall, renewTokenApiCall } from '../api/Session';
import { userName } from '../recoil/atom/atoms';
import { getToken, setToken } from '../utils/Utils';
  
function PrivateRoute({ children, ...rest }) {
    const [, setUserName] = useRecoilState(userName);

    const [isAuthenticated, setIsAuthenticated] = useState();

    useEffect(()=>{
        setIsAuthenticated(undefined);
        const token = getToken();
        getUserNameApiCall(token)
        .then(response => {
            setUserName(response);
        })
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