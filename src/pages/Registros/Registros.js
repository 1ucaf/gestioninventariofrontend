import { useEffect, useState } from "react"
import { getAllRegistrosApiCall } from "../../api/Registros";
import DataTable from 'react-data-table-component';
import TablePageContainer from "../../components/Containers/TablePageContainer";
import { styles } from "../../styles/Styles";
import { useHistory } from "react-router";

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
        history.push("/Registro/"+row.RegistroId);
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

export default Registros