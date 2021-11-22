import { Button, FormControl, Input, InputLabel, MenuItem, Select } from "@mui/material";
import FormGroup from "../../components/Containers/FormGroup";
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { useState } from "react";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router"
import { deleteUsuarioApiCall, getUsuarioApiCall, saveUsuarioApiCall } from "../../api/Usuarios";
import FormPageContainer from "../../components/Containers/FormPageContainer";
import Modal from '../../components/Modal/ModalComponent';
import { getAllEquiposApiCall } from "../../api/Equipos";
import { Box } from "@mui/system";
import FormButtonsContainer from "../../components/Containers/FormButtonsContainer";
//import { Box } from "@mui/system";
import DeleteIcon from '@mui/icons-material/Delete';

export const UsuarioDetail = () => {
    const { userName } = useParams();

    const history = useHistory();

    const [usuario, setUsuario] = useState();
    const [equipos, setEquipos] = useState();
    
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
            title: "ERROR!",
            show: true,
            type: "error",
            message: e.message,
        })
    }

    useEffect(()=>{
        getUsuarioApiCall(userName)
        .then(data=> {
            console.log("USUARIOS: ", data);
            setUsuario(data);
        })
        .catch(e=>{
            onError(e);
        });

        getAllEquiposApiCall()
        .then(data=> {
            console.log("EQUIPOS: ", data);
            setEquipos(data);
        })
        .catch(e=>{
            onError(e);
        });      
    },[])

    const onChangeEquipo = event => {
        setUsuario({...usuario, EquipoId: event.target.value});
    }

    const onChangeNombre = event => {
        setUsuario({...usuario, Nombre: event.target.value});
    }
    
    const onChangeApellido = event => {
        setUsuario({...usuario, Apellido: event.target.value});
    }

    const onChangeEmail = event => {
        setUsuario({...usuario, Email: event.target.value});
    }

    const handleChangeEquipo = event => {
        const equipoSeleccionado = equipos.find(equipo => equipo.EquipoId === event.target.value);
        console.log(equipoSeleccionado.Nombre);
        setUsuario({...usuario,
            UserName: event.target.value,            
        });
    }
    
    
    const onSave = () => {
        saveUsuarioApiCall(usuario)
        .then( response => {
            setModalProps({
                ...modalProps,
                title: "¡Guardado!",
                show: true,
                type: "",
                message: "Usuario guardado con éxito!",
                afterCloseModal: goBack
            })
        })
        .catch(onError);
    }

    const goBack = () => {
        history.push("/Usuarios");
    }



  const onDelete = () => {
        deleteUsuarioApiCall(usuario.UserName)
        .then(data => {
            console.log(data);
            setModalProps({
                ...modalProps,
                title: "Eliminado!",
                show: true,
                type: "",
                message: "Usuario Eliminado con éxito!!!",
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
            message: "Está seguro que desea eliminar el usuario?",
            onDelete: onDelete,
        })
    }

    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Modal modalProps={modalProps} onCloseModal={onCloseModal}/>
                <h1 style={{textAlign: "center"}}>Detalles de Usuarios</h1>
                <FormPageContainer>

                    <FormGroup>
                        <Button onClick={onConfirmDelete} variant="contained" aria-label="delete" size="large" color="error">
                            Eliminar
                            <DeleteIcon fontSize="inherit" />
                        </Button>
                    </FormGroup>

                    <FormGroup>
                    <FormControl sx={{ minWidth: "100%" }}>
                            <small> Nombre </small>
                            <Input onChange={onChangeNombre} id="my-input" aria-describedby="my-helper-text" value={usuario?.Nombre} />
                        </FormControl>
                        <FormControl sx={{ minWidth: "100%" }}>
                            <small> Apellido </small>
                            <Input onChange={onChangeApellido} id="my-input" aria-describedby="my-helper-text" value={usuario?.Apellido} />
                        </FormControl>
                        <FormControl sx={{ minWidth: "100%" }}>
                            <small> Email </small>
                            <Input onChange={onChangeEmail} id="my-input" aria-describedby="my-helper-text" value={usuario?.Email} />
                        </FormControl>                        
                    </FormGroup>
                    <FormGroup>
                    {
                        usuario && equipos ?
                        <>
                            <Box sx={{ minWidth: "40%" }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Equipo</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={usuario.EquipoId}                                        
                                        onChange={handleChangeEquipo}
                                    >
                                        {
                                            equipos.map(equipo => {
                                                return <MenuItem value={equipo.EquipoId}>{equipo.Descripcion}</MenuItem>
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

export default UsuarioDetail;