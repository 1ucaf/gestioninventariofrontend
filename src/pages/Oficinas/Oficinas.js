import { useEffect, useState } from "react"
import { getAllEquiposApiCall, getAllOficinasApiCall } from "../../api/Oficinas";
import DataTable from 'react-data-table-component';
import TablePageContainer from "../../components/Containers/TablePageContainer";
import { styles } from "../../styles/Styles";

const Oficinas = () => {
    const [data, setData] = useState([]);
    useEffect(()=>{
        getAllOficinasApiCall()
        .then( data => {
            setData(data.map(elemento => {
                return {...elemento,
                    // id: elemento.EquipoId,
                    // VencimientoGarantia: elemento.VencimientoGarantia.split("T")[0],
                    // Adquisicion: elemento.Adquisicion.split("T")[0]
                }
            }));
        })
    }, [])

    useEffect(()=>{
        console.log(data);
    }, [data])

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
                onRowClicked={(row, event)=>{console.log(row);}}
                pointerOnHover
            />
        </TablePageContainer>
    )
}

export default Oficinas