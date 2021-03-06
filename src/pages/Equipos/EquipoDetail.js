import { Button, FormControl, Input, InputLabel, MenuItem, Select } from "@mui/material";
import FormGroup from "../../components/Containers/FormGroup";
import TextField from '@mui/material/TextField';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { useState } from "react";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router"
import { createEquipoApiCall, deleteEquipoApiCall, getEquipoApiCall, saveEquipoApiCall } from "../../api/Equipos";
import FormPageContainer from "../../components/Containers/FormPageContainer";
import Modal from '../../components/Modal/ModalComponent';
import { getAllOficinasApiCall } from "../../api/Oficinas";
import { getAllProveedoresApiCall } from "../../api/Proveedores";
import { Box } from "@mui/system";
import FormButtonsContainer from "../../components/Containers/FormButtonsContainer";
import DeleteIcon from '@mui/icons-material/Delete';

export const EquipoDetail = (props) => {
    const { equipoId } = useParams();

    const history = useHistory();

    const [equipo, setEquipo] = useState();
    const [oficinas, setOficinas] = useState();
    const [proveedores, setProveedores] = useState();

    const [modalProps, setModalProps] = useState({
        title: "",
        message: "",
        type: "",
        show: false,
        afterCloseModal: ()=>{}
    })
    
    const onCloseModal = ()=>{
        console.log("cerrar");
        setModalProps(
            {...modalProps,
                show: false,
            }
        )
    }

    const onError = e => {
        console.log(e);
        setModalProps({
            ...modalProps,
            title: "¡ERROR!",
            show: true,
            type: "error",
            message: e.message,
        })
    }

    useEffect(()=>{
        if(!props.isNew) {
            getEquipoApiCall(equipoId)
            .then(data=> {
                console.log("EQUIPO: ", data);
                setEquipo({
                    ...data, 
                    Adquisicion: new Date(data.Adquisicion)
                });
            })
            .catch(onError);
        } else {
            setEquipo({});
        }

        getAllOficinasApiCall()
        .then(data=> {
            console.log("OFICINAS: ", data);
            setOficinas(data);
        })
        .catch(e=>{
            onError(e);
        });

        getAllProveedoresApiCall()
        .then(data=> {
            console.log("PROVEEDORES: ", data);
            setProveedores(data);
        })
        .catch(e=>{
            onError(e);
        });
    },[])

    const onChangeAdquisicionDate = newValue => {
        setEquipo({...equipo, Adquisicion: newValue});
    }

    const onChangeVencimientoGarantiaDate = newValue => {
        setEquipo({...equipo, VencimientoGarantia: newValue});
    }

    const onChangeDescripcion = event => {
        setEquipo({...equipo, Descripcion: event.target.value});
    }

    const handleChangeOficina = event => {
        const oficinaSeleccionada = oficinas.find(oficina => oficina.OficinaId === event.target.value);
        console.log(oficinaSeleccionada.Nombre);
        setEquipo({...equipo,
            OficinaId: event.target.value,
            OficinaNombre: oficinaSeleccionada.Nombre,
        });
    }

    const handleChangeProveedor = event => {
        setEquipo({...equipo,
            ProveedorId: event.target.value
        });
    }

    const onSave = () => {
        if(!props.isNew) {
            saveEquipoApiCall(equipo)
            .then( response => {
                setModalProps({
                    ...modalProps,
                    title: "¡Guardado!",
                    show: true,
                    type: "",
                    message: "Equipo '" + equipo.Descripcion + "' modificado con éxito",
                    afterCloseModal: goBack
                })
            })
            .catch(onError);
        } else {
            createEquipoApiCall(equipo)
            .then( response => {
                setModalProps({
                    ...modalProps,
                    title: "¡Guardado!",
                    show: true,
                    type: "",
                    message: "Equipo '" + equipo.Descripcion + "' guardado con éxito",
                    afterCloseModal: goBack
                })
            })
            .catch(onError);
        }
    }

    const goBack = () => {
        history.push("/Equipos");
    }

    const onDelete = () => {
        deleteEquipoApiCall(equipo.EquipoId)
        .then(data => {
            console.log(data);
            setModalProps({
                ...modalProps,
                title: "¡Eliminado!",
                show: true,
                type: "",
                message: "Registro '" + equipo.Descripcion + "' eliminado con éxito",
                afterCloseModal: goBack,
            })
        })
    }

    const onConfirmDelete = () => {
        setModalProps({
            ...modalProps,
            title: "Borrar",
            show: true,
            type: "delete",
            message: "¿Está seguro que desea eliminar el equipo '" + equipo.Descripcion + "'?",
            onDelete: onDelete,
        })
    }

    const onGestionarPerifericos = () => {
        history.push("/Equipos/Perifericos/" + equipoId);
    }

    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Modal modalProps={modalProps} onCloseModal={onCloseModal}/>
                <h1 style={{textAlign: "center"}}>Detalles de Equipo</h1>
                <FormPageContainer>

                    <FormGroup>
                        <Button onClick={onConfirmDelete} variant="contained" aria-label="delete" size="large" color="error">
                            Eliminar
                            <DeleteIcon fontSize="inherit" />
                        </Button>
                        <Button onClick={onGestionarPerifericos} variant="outlined" size="large">
                            Gestionar Periféricos
                        </Button>
                    </FormGroup>

                    <FormGroup>
                        <FormControl sx={{ minWidth: "100%" }}>
                            <small> Descripción </small>
                            <Input onChange={onChangeDescripcion} id="my-input" aria-describedby="my-helper-text" value={equipo?.Descripcion} />
                        </FormControl>
                    </FormGroup>
                    <FormGroup>
                        <FormControl sx={{ minWidth: "40%" }}>
                            <small> Fecha de Adquisición </small>
                            <DesktopDatePicker
                                inputFormat="dd/MM/yyyy"
                                value={equipo?.Adquisicion ? equipo.Adquisicion : ""}
                                onChange={onChangeAdquisicionDate}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </FormControl>
                        <FormControl sx={{ minWidth: "40%" }}>
                            <small> Fecha de Vencimiento de Garantía: </small>
                            <DesktopDatePicker
                                inputFormat="dd/MM/yyyy"
                                value={equipo?.VencimientoGarantia ? equipo.VencimientoGarantia : ""}
                                onChange={onChangeVencimientoGarantiaDate}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </FormControl>
                    </FormGroup>
                    <FormGroup>
                    {
                        proveedores && equipo && oficinas ?
                        <>
                            <Box sx={{ minWidth: "40%" }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Oficina</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={equipo.OficinaId}
                                        label={equipo.OficinaNombre}
                                        onChange={handleChangeOficina}
                                    >
                                        {
                                            oficinas.map(oficina => {
                                                return <MenuItem value={oficina.OficinaId}>{oficina.Nombre}</MenuItem>
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box sx={{ minWidth: "40%" }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Proveedor</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        defaultValue={equipo.ProveedorId}
                                        value={equipo.ProveedorId}
                                        label="Proveedor"
                                        onChange={handleChangeProveedor}
                                    >
                                        {
                                            proveedores.map(proveedor => {
                                                return <MenuItem value={proveedor.ProveedorId}>{proveedor.RazonSocial}</MenuItem>
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </Box>
                        </> : <> </>
                    }
                    </FormGroup>
                    <FormButtonsContainer>
                        <Button variant="outlined" size="large" onClick={goBack}>Cancelar</Button>
                        <Button variant="contained" size="large" onClick={onSave}>Guardar</Button>
                    </FormButtonsContainer>
                </FormPageContainer>
            </LocalizationProvider>
        </>
    )
}
