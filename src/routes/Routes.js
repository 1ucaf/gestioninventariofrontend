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
                    <Equipos />
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
                <Route exact path="/Periféricos">
                    <Equipos />
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
