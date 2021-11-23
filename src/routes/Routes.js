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
    setToken("token");
    return (
        <Router>
            <NavBar routes={routes}/>
            <Switch>
                
                <Route exact path="/login">
                    <Login />
                </Route>


                <Route exact path="/Proveedores">
                    <Proveedores />
                </Route>
                <Route exact path="/Proveedores/update/:proveedorId">
                    <ProveedorDetails />
                </Route>
                <Route exact path="/Proveedores/create/">
                    <ProveedorDetails isNew />
                </Route>

                <Route exact path="/Oficinas">
                    <Oficinas />
                </Route>
                <Route path="/Oficinas/:oficinaId">
                    <OficinaDetail />
                </Route>

                <Route exact path="/Equipos">
                    <Equipos />
                </Route>
                <Route path="/Equipos/update/:equipoId">
                    <EquipoDetail />
                </Route>
                <Route path="/Equipos/create">
                    <EquipoDetail isNew/>
                </Route>

                <Route exact path="/Perifericos">
                    <Perifericos />
                </Route>
                <Route path="/Perifericos/:perifericoId">
                    <PerifericoDetail />
                </Route>
                <Route path="/Perifericos/update/:perifericoId">
                    <RegistroDetail />
                </Route>
                <Route exact path="/Registros">
                    <Registros />
                </Route>
                <Route path="/Registros/update/:registroId">
                    <RegistroDetail />
                </Route>
                <Route path="/Registros/create">
                    <RegistroDetail isNew/>
                </Route>

                <Route exact path="/Usuarios">
                    <Usuarios />
                </Route>
                <Route path="/Usuarios/update/:userName">
                    <UsuarioDetail />
                </Route>
                <Route path="/Usuarios/create">
                    <UsuarioDetail isNew/>
                </Route>
            </Switch>
        </Router>
    )
}

export default Routes
