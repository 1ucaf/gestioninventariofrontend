import { useEffect, useState } from "react"
import { getAllOficinasApiCall } from "../../api/Oficinas";
import DataTable from 'react-data-table-component';
import TablePageContainer from "../../components/Containers/TablePageContainer";
import { styles } from "../../styles/Styles";
import { useHistory } from "react-router";
import TablePageButtonsContainer from "../../components/Containers/TablePageButtonsContainer";
import { Button } from "@mui/material";

const Oficinas = () => {
    const history = useHistory();
    const [data, setData] = useState([]);

    useEffect(()=>{
        getAllOficinasApiCall()
        .then( data => {
            setData(data);
        })
    }, [])

    useEffect(()=>{
        console.log(data);
    }, [data])

    const onRowClicked = (row, event)=>{
        console.log(row);
        history.push("/Oficinas/update/"+row.OficinaId);
    }

    const columns = [
        {
            selector: row => row.OficinaId,
            name: 'Id de Oficina',
        },
        {
            selector: row => row.Nombre,
            name: 'Nombre de Oficina',
            width: "150px"
        },
        {
            selector: row => row.PromAntEquipos,
            name: 'Promedio de Antigüead en días ',
            width: "400px"
        },
    ]

    const onCreateNew = (e)=>{
        e.preventDefault();
        history.push("/Oficinas/create")
    }

    return (
        <TablePageContainer>
            <TablePageButtonsContainer>
            <Button variant="contained" size="large" onClick={onCreateNew}>Nueva Oficina</Button>
            </TablePageButtonsContainer>
            <DataTable
                data={ data }
                columns={columns}
                customStyles={styles}
                onRowClicked={onRowClicked}
                pointerOnHover
            />
            {
                (new Date()).toLocaleString()
            }
        </TablePageContainer>
    )
}

export default Oficinas