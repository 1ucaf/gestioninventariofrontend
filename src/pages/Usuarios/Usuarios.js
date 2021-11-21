import { useEffect, useState } from "react"
import { getAllUsuariosApiCall } from "../../api/Usuarios";
// import Table from '../../components/Table/Table';
import DataTable from 'react-data-table-component';
import TablePageContainer from "../../components/Containers/TablePageContainer";
import { styles } from "../../styles/Styles";
import { useHistory } from "react-router";

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
            width: "90px"
        },
        {
            selector: row => row.Equipo,
            name: 'Equipo',
            width: "90px"
        },
        {
            selector: row => row.Nombre,
            name: 'Nombre',
            width: "90px"
        },
        {
            selector: row => row.Apellido,
            name: 'Apellido',
            width: "90px"
        }
    ]

    const onRowClicked = (row, event)=>{
        console.log(row);
        history.push("/Usuarios/"+row.UserName);
    }

    return (
        <TablePageContainer>
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