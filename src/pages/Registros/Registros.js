import { useEffect, useState } from "react"
import { getAllRegistrosApiCall } from "../../api/Registros";
import DataTable from 'react-data-table-component';
import TablePageContainer from "../../components/Containers/TablePageContainer";
import { styles } from "../../styles/Styles";
import { useHistory } from "react-router";
import TablePageButtonsContainer from "../../components/Containers/TablePageButtonsContainer";
import { Button } from "@mui/material";

const Registros = () => {
    const history = useHistory();
    const [data, setData] = useState([]);

    useEffect(()=>{
        getAllRegistrosApiCall()
        .then( data => {
            setData(data);
        })
    }, [])

    useEffect(()=>{
        console.log(data);
    }, [data])

    const onRowClicked = (row, event)=>{
        console.log(row);
        history.push("/Registros/update/"+row.RegistroId);
    }

    const columns = [
        {
            selector: row => row.EquipoId,
            name: 'Id de Equipo',
        },
        {
            selector: row => row.Descripcion,
            name: 'Descripción',
            width: "400px"
        },
        {
            selector: row => row.Fecha,
            name: 'Fecha de la Incidencia',
            width: "180px"
        },

    ]

    const onCreateNew = (e)=>{
        e.preventDefault();
        history.push("/registros/create")
    }

    return (
        <TablePageContainer>
            <h1 style={{textAlign: "center"}}>Registros</h1>
            <TablePageButtonsContainer>
                <Button variant="contained" size="large" onClick={onCreateNew}>Nuevo Registro</Button>
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

export default Registros