import { useEffect, useState } from "react"
import { getAllPerifericosApiCall } from "../../api/Perifericos";
// import Table from '../../components/Table/Table';
import DataTable from 'react-data-table-component';
import TablePageContainer from "../../components/Containers/TablePageContainer";
import { styles } from "../../styles/Styles";
import { useHistory, useParams } from "react-router";
import TablePageButtonsContainer from "../../components/Containers/TablePageButtonsContainer";
import { Button } from "@mui/material";
import { getEquipoApiCall, getPerifericosOfEquipoApiCall } from "../../api/Equipos";

const Perifericos = (props) => {
    const {equipoIdUrlParam} = useParams();

    const history = useHistory();
    const [data, setData] = useState([]);
    const [equipo, setEquipo] = useState({});

    useEffect(()=>{
        if(props.isEquipoPerifericos) {
            getPerifericosOfEquipoApiCall(equipoIdUrlParam)
            .then(data => {
                console.log("PERIFÉRICOS: ", data);
                setData(data);
            });
            getEquipoApiCall(equipoIdUrlParam)
            .then(data => {
                setEquipo(data);
            })
        } else {
            getAllPerifericosApiCall()
            .then( data => {
                setData(data);
            })
        }
    }, [])

    const columns = [
        {
            selector: row => row.PerifericoId,
            name: 'Id de Periférico',
            width: "120px",
            right: true,
        },
        {
            selector: row => row.Descripcion,
            name: 'Descripción',
            width: "450px"
        },
    ]

    const onCreateNew = (e)=>{
        e.preventDefault();
        if(props.isEquipoPerifericos) {
            history.push("/Perifericos/associate/" + equipoIdUrlParam);
        }
        else {
            history.push("/Perifericos/create");
        }
    }

    const onRowClicked = (row, event)=>{
        console.log(row);
        history.push("/Perifericos/update/" + row.PerifericoId);
    }

    return (
        <TablePageContainer>
            {props.isEquipoPerifericos ?
                <h1 style={{textAlign: "center"}}>Perifericos del Equipo: {equipo.Descripcion}</h1> :
                <h1 style={{textAlign: "center"}}>Perifericos</h1>
            }
            <TablePageButtonsContainer>
            <Button variant="contained" size="large" onClick={onCreateNew}>Nuevo Periferico</Button>
            </TablePageButtonsContainer>
            <DataTable
                data={ data }
                columns={columns}
                customStyles={styles}
                onRowClicked={onRowClicked}
                pointerOnHover
            />
        </TablePageContainer>
    )
}

export default Perifericos