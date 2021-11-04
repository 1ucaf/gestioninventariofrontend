import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from "react"
import { getAllEquiposApiCall } from "../../api/Equipos";
// import Table from '../../components/Table/Table';

const Equipos = () => {
    const [data, setData] = useState([]);

    useEffect(()=>{
        getAllEquiposApiCall()
        .then( data => {
            setData(data.map(elemento => {
                return {...elemento, id: elemento.EquipoId}
            }));
        })
    }, [])

    useEffect(()=>{
        console.log(data.toString());
    }, [data])

    useEffect(()=>{
        console.log(data.toString());
    }, [])

    const columns = [
        {
            field: 'EquipoId',
            headerName: 'EquipoId',
        },
        {
            field: 'Descripcion',
            headerName: 'Descripcion',
        },
        {
            field: 'Adquisicion',
            headerName: 'Fecha de Adquisición',
        },
        {
            field: 'OficinaId',
            headerName: 'Número de Oficina',
        },
        {
            field: 'ProveedorId',
            headerName: 'Id de Proveedor',
        },
        {
            field: 'VencimientoGarantia',
            headerName: 'Vencimiento de Garantia',
        },
    ]
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={ data }
                columns={columns}
            />
        </div>
    )
}

export default Equipos
