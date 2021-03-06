import { Button, FormControl, Input, InputLabel, MenuItem, Select } from "@mui/material";
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import TextField from '@mui/material/TextField';
import FormGroup from "../../components/Containers/FormGroup";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router"
import { createRegistroApiCall, deleteRegistroApiCall, getRegistroApiCall, saveRegistroApiCall} from "../../api/Registros";
import FormPageContainer from "../../components/Containers/FormPageContainer";
import Modal from '../../components/Modal/ModalComponent';
import FormButtonsContainer from "../../components/Containers/FormButtonsContainer";
import { getAllEquiposApiCall } from "../../api/Equipos";
import { Box } from "@mui/system";
import DeleteIcon from '@mui/icons-material/Delete';

export const RegistroDetail = (props) => {
    const { registroId } = useParams();

    const history = useHistory();

    const [registro, setRegistro] = useState();
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
        getAllEquiposApiCall()
        .then(data=> {
            console.log("EQUIPOS: ", data);
            setEquipos(data);
        })
        .catch(onError);
        if(!props.isNew) {
            getRegistroApiCall(registroId)
            .then(data=> {
                console.log("REGISTRO: ", data);
                setRegistro(data);
            })
            .catch(onError);
        } else {
            setRegistro({});
        }
    },[])
    
    const onChangeDescripcion = event => {
        setRegistro({...registro, Descripcion: event.target.value});
    }

    const onChangeFecha = newValue => {
        setRegistro({...registro, Fecha: newValue});
    }
   
    const handleChangeEquipo = event => {
        setRegistro({...registro,
            EquipoId: event.target.value
        });
    }

    const onSave = () => {
        if(props.isNew) {
            createRegistroApiCall(registro)
            .then( response => {
                setModalProps({
                    ...modalProps,
                    title: "Guardado!",
                    show: true,
                    type: "",
                    message: "Registro guardado con ??xito!",
                    afterCloseModal: goBack
                })
            })
            .catch(onError);
        }
        else{
            saveRegistroApiCall(registro)
            .then( response => {
                setModalProps({
                    ...modalProps,
                    title: "Guardado!",
                    show: true,
                    type: "",
                    message: "Registro guardado con ??xito!",
                    afterCloseModal: goBack
                })
            })
            .catch(onError);
        }
    }

    const goBack = () => {
        history.push("/registros");
    }

    const onDelete = () => {
        deleteRegistroApiCall(registro.RegistroId)
        .then(data => {
            console.log(data);
            setModalProps({
                ...modalProps,
                title: "Eliminado!",
                show: true,
                type: "",
                message: "Registro Eliminado con ??xito!!!",
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
            message: "Est?? seguro que desea eliminar el registro?",
            onDelete: onDelete,
        })
    }

    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Modal modalProps={modalProps} onCloseModal={onCloseModal}/>
                <h1 style={{textAlign: "center"}}>Detalles de los Registros</h1>
                <FormPageContainer>

                    <FormGroup>
                        <Button onClick={onConfirmDelete} variant="contained" aria-label="delete" size="large" color="error">
                            Eliminar
                            <DeleteIcon fontSize="inherit" />
                        </Button>
                    </FormGroup>

                    <FormGroup>
                        <FormControl sx={{ minWidth: "100%" }}>
                            <small> Descripci??n </small>
                            <Input onChange={onChangeDescripcion} id="my-input" aria-describedby="my-helper-text" value={registro? registro.Descripcion : ""} />
                        </FormControl>
                    </FormGroup>
                    <FormGroup>
                    {
                        equipos && registro ?
                        <Box sx={{ minWidth: "40%" }}>
                            <FormControl fullWidth>
                                <small> Equipo </small>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    defaultValue={registro.EquipoId}
                                    value={registro.EquipoId}
                                    label="Equipo"
                                    onChange={handleChangeEquipo}
                                >
                                    {
                                        equipos.map(equipo => {
                                            return <MenuItem value={equipo.EquipoId}>{equipo.Descripcion}</MenuItem>
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </Box> : <></>
                    }
                    <FormControl sx={{ minWidth: "40%" }}>
                        <small> Fecha de la Incidencia: </small>
                        <DesktopDatePicker
                            inputFormat="dd/MM/yyyy"
                            value={registro?.Fecha ? registro.Fecha : ""}
                            onChange={onChangeFecha}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </FormControl>
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

export default RegistroDetail;