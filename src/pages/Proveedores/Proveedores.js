import { useEffect, useState } from "react"
import { getAllProveedoresApiCall } from "../../api/Proveedores";
// import Table from '../../components/Table/Table';
import DataTable from 'react-data-table-component';
import TablePageContainer from "../../components/Containers/TablePageContainer";
import { styles } from "../../styles/Styles";
import { useHistory } from "react-router";

const Proveedores = () => {
    const history = useHistory();
    const [data, setData] = useState([]);
    useEffect(()=>{
        getAllProveedoresApiCall()
        .then( data => {
            setData(data.map(elemento => {
                return {...elemento,
                }
            }));
        })
    }, [])
    
    useEffect(()=>{
        console.log(data);
    }, [data])

    const columns = [
        {
            selector: row => row.ProveedorId,
            name: 'Id de Proveedor',
        },
        {
            selector: row => row.CUIT,
            name: 'CUIT',
        },
        {
            selector: row => row.RazonSocial,
            name: 'Razon Social',
            width: "500px"
        },
    ]

    const onRowClicked = (row, event)=>{
        console.log(row);
        history.push("/Proveedores/" + row.ProveedorId);
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

export default Proveedores
