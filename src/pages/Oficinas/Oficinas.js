import { useEffect, useState } from "react"
import { getAllOficinasApiCall } from "../../api/Oficinas";
import DataTable from 'react-data-table-component';
import TablePageContainer from "../../components/Containers/TablePageContainer";
import { styles } from "../../styles/Styles";
import { useHistory } from "react-router";

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
        history.push("/Oficina/"+row.OficinaId);
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

export default Oficinas