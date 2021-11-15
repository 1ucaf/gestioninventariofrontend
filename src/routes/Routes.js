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
import PerifericoDetail from "../pages/Perifericos/PerifericoDetails";
import ProveedorDetails from "../pages/Proveedores/ProveedorDetails";
import Proveedores from "../pages/Proveedores/Proveedores";
import Registros from "../pages/Registros/Registros";
import RegistroDetail from "../pages/Registros/RegistroDetail";
import Usuarios from "../pages/Usuarios/Usuarios";
import { UsuarioDetail } from "../pages/Usuarios/UsuarioDetail";

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
        path: "/Periféricos"
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
    return (
        <Router>
            <NavBar routes={routes}/>
            <Switch>


                
                <Route exact path="/Proveedores">
                    <Proveedores />
                </Route>
                <Route exact path="/Proveedores/:ProveedorId">
                    <ProveedorDetails />
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
                <Route path="/Equipos/:equipoId">
                    <EquipoDetail />
                </Route>

                

                






                <Route exact path="/Perifericos">
                    <Perifericos />
                </Route>
                <Route path="/Perifericos/:perifericoId">
                    <PerifericoDetail />
                </Route>

                <Route exact path="/Registros">
                    <Registros />
                </Route>
                <Route exact path="/Registros/:registrosId">
                    <RegistroDetail />
                </Route>

                <Route exact path="/Usuarios">
                    <Usuarios />
                </Route>
                <Route path="/Usuarios/:usuarioId">
                    <UsuarioDetail />
                </Route>
            </Switch>
        </Router>
    )
}

export default Routes
