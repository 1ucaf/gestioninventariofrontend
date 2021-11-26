import { useEffect, useState } from "react"
import { getAllUsuariosApiCall } from "../../api/Usuarios";
// import Table from '../../components/Table/Table';
import DataTable from 'react-data-table-component';
import TablePageContainer from "../../components/Containers/TablePageContainer";
import { styles } from "../../styles/Styles";
import { useHistory } from "react-router";
import TablePageButtonsContainer from "../../components/Containers/TablePageButtonsContainer";
import { Button } from "@mui/material";

const Usuarios = () => {
    const history = useHistory();
    const [data, setData] = useState([]);
    useEffect(()=>{
        getAllUsuariosApiCall()
        .then( data => {
            setData(data);
        })
    }, [])

    const columns = [
        {
            selector: row => row.UserName,
            name: 'Username',
            width: "90px",
            right: true,
        },
        {
            selector: row => row.Email,
            name: 'Email',
            width: "200px"
        },
        {
            selector: row => row.Equipo,
            name: 'Equipo',
            width: "130px"
        },
        {
            selector: row => row.Nombre,
            name: 'Nombre',
            width: "130px"
        },
        {
            selector: row => row.Apellido,
            name: 'Apellido',
            width: "130px"
        }
    ]

    const onRowClicked = (row, event)=>{
        console.log(row);
        history.push("/Usuarios/update/"+row.UserName);
    }

    const onCreateNew = (e)=>{
        e.preventDefault();
        history.push("/Usuarios/create")
    }

    return (
        <TablePageContainer>
            <h1 style={{textAlign: "center"}}>Usuarios</h1>
            <TablePageButtonsContainer>
            <Button variant="contained" size="large" onClick={onCreateNew}>Nuevo Usuario</Button>
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

export default Usuarios