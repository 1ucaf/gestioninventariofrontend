import { useEffect, useState } from "react"
import { getAllPerifericosApiCall } from "../../api/Perifericos";
// import Table from '../../components/Table/Table';
import DataTable from 'react-data-table-component';
import TablePageContainer from "../../components/Containers/TablePageContainer";
import { styles } from "../../styles/Styles";
import { useHistory } from "react-router";

const Perifericos = () => {
    const history = useHistory();
    const [data, setData] = useState([]);
    useEffect(()=>{
        getAllPerifericosApiCall()
        .then( data => {
            setData(data);
        })
    }, [])

    const columns = [
        {
            selector: row => row.PerifericoId,
            name: 'Id de Periférico',
            width: "90px",
            right: true,
        },
        {
            selector: row => row.Descripcion,
            name: 'Descripción',
            width: "500px"
        },
    ]

    const onRowClicked = (row, event)=>{
        console.log(row);
        history.push("/Perifericos/"+row.PerifericoId);
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

export default Perifericos