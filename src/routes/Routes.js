import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import Equipos from "../pages/Equipos/Equipos";

const routes = [
    {
        text: "Proveedores",
        path: "Proveedores"
    },
    {
        text: "Oficinas",
        path: "Oficinas"
    },
    {
        text: "Equipos",
        path: "Equipos"
    },
    {
        text: "Periféricos",
        path: "Periféricos"
    },
    {
        text: "Registros",
        path: "Registros"
    },
    {
        text: "Usuarios",
        path: "Usuarios"
    }
]

const Routes = () => {
    return (
        <Router>
            <NavBar routes={routes}/>
            <Switch>
                <Route path="/Proveedores">
                    <Equipos />
                </Route>
                <Route path="/Oficinas">
                    <Equipos />
                </Route>
                <Route path="/Equipos">
                    <Equipos />
                </Route>
                <Route path="/Periféricos">
                    <Equipos />
                </Route>
                <Route path="/Registros">
                    <Equipos />
                </Route>
                <Route path="/Usuarios">
                    <Equipos />
                </Route>
            </Switch>
        </Router>
    )
}

export default Routes
