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
            selector: row => row.RegistroId,
            name: 'Id de Registro',
        },
        {
            selector: row => row.Descripcion,
            name: 'Descripción',
            width: "150px"
        },
        {
            selector: row => row.Fecha,
            name: 'Fecha Del Registro',
            width: "180px"
        },

    ]

    const onCreateNew = (e)=>{
        e.preventDefault();
        history.push("/registros/create")
    }

    return (
        <TablePageContainer>
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