import { Button, FormControl, Input, InputLabel, MenuItem, Select } from "@mui/material";
import FormGroup from "../../components/Containers/FormGroup";
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { useState } from "react";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router"
import { createUsuarioApiCall, deleteUsuarioApiCall, getUsuarioApiCall, saveUsuarioApiCall } from "../../api/Usuarios";
import FormPageContainer from "../../components/Containers/FormPageContainer";
import Modal from '../../components/Modal/ModalComponent';
import { getAllEquiposApiCall } from "../../api/Equipos";
import { Box } from "@mui/system";
import FormButtonsContainer from "../../components/Containers/FormButtonsContainer";
//import { Box } from "@mui/system";
import DeleteIcon from '@mui/icons-material/Delete';

export const UsuarioDetail = (props) => {
    const { userName } = useParams();

    const history = useHistory();

    const [usuario, setUsuario] = useState();
    const [equipos, setEquipos] = useState();
    const [passwordConfirm, setPasswordConfirm] = useState("");
    
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

        getAllEquiposApiCall()
        .then(data=> {
            console.log("EQUIPOS: ", data);
            setEquipos(data);
        })
        .catch(e=>{
            onError(e);
        }); 

        if(props.isNew) {
            setUsuario({});
        } else {
            getUsuarioApiCall(userName)
            .then(data=> {
                console.log("USUARIO: ", data);
                setUsuario(data);
            })
            .catch(e=>{
                onError(e);
            });
        }     
    },[]);

    const onChangeUserName = e => {
        setUsuario({...usuario, UserName: e.target.value});
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

    const onChangePass = e => {
        setUsuario({...usuario, Password: e.target.value});
    }

    const onChangeConfirmPass = e => {
        setPasswordConfirm(e.target.value);
    }

    const handleChangeEquipo = event => {
        const equipoSeleccionado = equipos.find(equipo => equipo.EquipoId === event.target.value);
        console.log(event.target.value);
        setUsuario({...usuario,
            EquipoId: event.target.value,            
        });
    }
    
    
    const onSave = () => {
        if(props.isNew) {
            console.log(usuario);
            if(usuario.Password === passwordConfirm) {
                createUsuarioApiCall(usuario)
                .then( response => {
                    setModalProps({
                        ...modalProps,
                        title: "¡Guardado!",
                        show: true,
                        type: "",
                        message: "Usuario '" + usuario.UserName + "' guardado con éxito",
                        afterCloseModal: goBack
                    })
                })
                .catch(onError);
            } else {  
                setModalProps({
                    ...modalProps,
                    title: "¡ERROR!",
                    show: true,
                    type: "error",
                    message: "La contraseña no coincide",
                })
            }
        }
        else {
            console.log(usuario);
            saveUsuarioApiCall(usuario)
            .then( response => {
                setModalProps({
                    ...modalProps,
                    title: "¡Guardado!",
                    show: true,
                    type: "",
                    message: "Usuario '" + usuario.UserName + "' guardado con éxito",
                    afterCloseModal: goBack
                })
            })
            .catch(onError);
        }
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
                title: "¡Eliminado!",
                show: true,
                type: "",
                message: "Usuario '" + usuario.UserName + "' eliminado con éxito",
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
            message: "¿Está seguro que desea eliminar el usuario '" + usuario.UserName + "'?",
            onDelete: onDelete,
        })
    }

    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Modal modalProps={modalProps} onCloseModal={onCloseModal}/>
                <h1 style={{textAlign: "center"}}>{props.isNew ? "Agregar Nuevo Usuario" : "Detalles de Usuario"}</h1>
                <FormPageContainer>

                    <FormGroup>
                        {
                            props.isNew ? <></> :
                            <Button onClick={onConfirmDelete} variant="contained" aria-label="delete" size="large" color="error">
                                Eliminar
                                <DeleteIcon fontSize="inherit" />
                            </Button>
                        }
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
                        {
                            props.isNew ? <>
                            <FormControl sx={{ minWidth: "100%" }}>
                                <small> Identificador de Usuario </small>
                                <Input onChange={onChangeUserName} id="my-input" aria-describedby="my-helper-text" value={usuario?.UserName} />
                            </FormControl>
                            <FormControl sx={{ minWidth: "100%" }}>
                                <small> Contraseña </small>
                                <Input onChange={onChangePass} id="my-input" type="password" aria-describedby="my-helper-text" value={usuario?.Password} />
                            </FormControl>
                            <FormControl sx={{ minWidth: "100%" }}>
                                <small> Confirmar Contraseña </small>
                                <Input onChange={onChangeConfirmPass} id="my-input" type="password" aria-describedby="my-helper-text" value={passwordConfirm} />
                            </FormControl> </> : <></>
                        }
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