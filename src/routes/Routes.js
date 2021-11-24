import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import { EquipoDetail } from "../pages/Equipos/EquipoDetail";
import Equipos from "../pages/Equipos/Equipos";
import OficinaDetail from "../pages/Oficinas/OficinaDetail";
import Oficinas from "../pages/Oficinas/Oficinas";
import Perifericos from "../pages/Perifericos/Perifericos";
import PerifericoDetail from "../pages/Perifericos/PerificoDetail";
import ProveedorDetails from "../pages/Proveedores/ProveedorDetails";
import Proveedores from "../pages/Proveedores/Proveedores";
import Registros from "../pages/Registros/Registros";
import RegistroDetail from "../pages/Registros/RegistroDetail";
import Usuarios from "../pages/Usuarios/Usuarios";
import { UsuarioDetail } from "../pages/Usuarios/UsuarioDetail";
import { getToken, setToken } from "../utils/Utils";
import Login from "../pages/Login/Login";
import PrivateRoute from "./PrivateRoute";
import { token } from "../recoil/atom/atoms";
import {  useRecoilState } from 'recoil';
import { useEffect } from "react";


const routes = [
    {
        text: "Proveedores",
        path: "/Proveedores"
    },
    {
        text: "Oficinas",
        path: "/Oficinas"
    },
    {
        text: "Equipos",
        path: "/Equipos"
    },
    {
        text: "Periféricos",
        path: "/Perifericos"
    },
    {
        text: "Registros",
        path: "/Registros"
    },
    {
        text: "Usuarios",
        path: "/Usuarios"
    }
]

const Routes = () => {
    const [tokenAtom, setTokenAtom] = useRecoilState(token);
    useEffect(()=>{
        setTokenAtom( getToken() );
    }, [])
    const closeSession = ()=>{
        setTokenAtom("");
        setToken("");
    }
    return (
        <Router>
            <NavBar closeSession={closeSession} thereIsAnyToken={tokenAtom} routes={routes}/>
            <Switch>
                
                <Route exact path="/login">
                    <Login />
                </Route>


                <PrivateRoute exact path="/Proveedores">
                    <Proveedores />
                </PrivateRoute>
                <PrivateRoute exact path="/Proveedores/update/:proveedorId">
                    <ProveedorDetails />
                </PrivateRoute>
                <PrivateRoute exact path="/Proveedores/create/">
                    <ProveedorDetails isNew />
                </PrivateRoute>

                <PrivateRoute exact path="/Oficinas">
                    <Oficinas />
                </PrivateRoute>
                <PrivateRoute path="/Oficinas/update/:oficinaId">
                    <OficinaDetail />
                </PrivateRoute>
                <PrivateRoute exact path="/Oficinas/create/">
                    <OficinaDetail isNew />
                </PrivateRoute>

                <PrivateRoute exact path="/Equipos">
                    <Equipos />
                </PrivateRoute>
                <PrivateRoute path="/Equipos/update/:equipoId">
                    <EquipoDetail />
                </PrivateRoute>
                <PrivateRoute path="/Equipos/create">
                    <EquipoDetail isNew/>
                </PrivateRoute>

                <PrivateRoute exact path="/Perifericos">
                    <Perifericos />
                </PrivateRoute>
                <PrivateRoute path="/Perifericos/update/:perifericoId">
                    <PerifericoDetail />
                </PrivateRoute>
                <PrivateRoute path="/Perifericos/create">
                    <PerifericoDetail isNew/>
                </PrivateRoute>
                
                <PrivateRoute exact path="/Registros">
                    <Registros />
                </PrivateRoute>
                <PrivateRoute path="/Registros/update/:registroId">
                    <RegistroDetail />
                </PrivateRoute>
                <PrivateRoute path="/Registros/create">
                    <RegistroDetail isNew/>
                </PrivateRoute>

                <PrivateRoute exact path="/Usuarios">
                    <Usuarios />
                </PrivateRoute>
                <PrivateRoute path="/Usuarios/update/:userName">
                    <UsuarioDetail />
                </PrivateRoute>
                <PrivateRoute path="/Usuarios/create">
                    <UsuarioDetail isNew/>
                </PrivateRoute>
            </Switch>
        </Router>
    )
}

export default Routes
