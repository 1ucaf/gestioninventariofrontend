import { useEffect, useState } from "react"
import { getAllEquiposApiCall } from "../../api/Equipos";
import TablePageButtonsContainer from "../../components/Containers/TablePageButtonsContainer";
import DataTable from 'react-data-table-component';
import TablePageContainer from "../../components/Containers/TablePageContainer";
import { styles } from "../../styles/Styles";
import { useHistory } from "react-router";
import { Button } from "@mui/material";

const Equipos = () => {
    const history = useHistory();
    const [data, setData] = useState([]);
    useEffect(()=>{
        getAllEquiposApiCall()
        .then( data => {
            setData(data.map(elemento => {
                return {...elemento,
                    id: elemento.EquipoId,
                    VencimientoGarantia: elemento.VencimientoGarantia.split("T")[0],
                    Adquisicion: elemento.Adquisicion.split("T")[0]
                }
            }));
        })
    }, [])

    const columns = [
        {
            selector: row => row.EquipoId,
            name: 'EquipoId',
            width: "90px",
            right: true,
        },
        {
            selector: row => row.Descripcion,
            name: 'Descripcion',
            width: "100px"
        },
        {
            selector: row => row.Adquisicion,
            name: 'Fecha de Adquisición',
            width: "160px",
            center: true,
        },
        {
            selector: row => row.OficinaId,
            name: 'Número de Oficina',
            width: "150px",
            right: true,
        },
        {
            selector: row => row.ProveedorId,
            name: 'Id de Proveedor',
            right: true,
        },
        {
            selector: row => row.VencimientoGarantia,
            name: 'Vencimiento de Garantia',
            width: "180px",
            center: true,
        },
    ]

    const onRowClicked = (row, event)=>{
        console.log(row);
        history.push("/Equipos/update/"+row.EquipoId);
    }

    const onCreateNew = (e)=>{
        e.preventDefault();
        history.push("/equipos/create")
    }

    return (
        <TablePageContainer>
            <TablePageButtonsContainer>
                <Button variant="contained" size="large" onClick={onCreateNew}>Nuevo Equipo</Button>
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

export default Equipos