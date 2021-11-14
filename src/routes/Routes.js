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
                    <Equipos />
                </Route>
                <Route exact path="/Usuarios">
                    <Equipos />
                </Route>
            </Switch>
        </Router>
    )
}

export default Routes
