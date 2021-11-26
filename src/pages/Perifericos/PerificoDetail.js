import { Button, FormControl, Input, InputLabel, MenuItem, Select } from "@mui/material";
import FormGroup from "../../components/Containers/FormGroup";
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { useState } from "react";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router"
import { createPerifericoApiCall, deletePerifericoApiCall, getPerifericoApiCall, savePerifericoApiCall } from "../../api/Perifericos";
import FormPageContainer from "../../components/Containers/FormPageContainer";
import Modal from '../../components/Modal/ModalComponent';
import { getAllEquiposApiCall } from "../../api/Equipos";
import { Box } from "@mui/system";
import FormButtonsContainer from "../../components/Containers/FormButtonsContainer";
//import { Box } from "@mui/system";
import DeleteIcon from '@mui/icons-material/Delete';


export const PerificoDetail = (props) => {
    const { perifericoId, equipoIdUrlParam } = useParams();

    const history = useHistory();

    const [periferico, setPeriferico] = useState();
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
            title: "¡ERROR!",
            show: true,
            type: "error",
            message: e.message,
        })
    }

    useEffect(()=>{
        if(props.isNew) {
            setPeriferico({});
        } else {
            getPerifericoApiCall(perifericoId)
            .then(data=> {
                console.log("PERIFERICO: ", data);
                setPeriferico(data);
            })
            .catch(onError);
        }

        getAllEquiposApiCall()
        .then(data=> {
            console.log("EQUIPOS: ", data);
            setEquipos(data);
        })
        .catch(e=>{
            onError(e);
        });      
    },[])


    const onChangeDescripcion = event => {
        setPeriferico({...periferico, Descripcion: event.target.value});
    }    

    const handleChangeEquipo = event => {
        setPeriferico({...periferico,
            EquipoId: event.target.value,
        });
    }
    
    
    const onSave = () => {
        if(props.isNew) {
            createPerifericoApiCall({...periferico,
                EquipoId: equipoIdUrlParam,
            })
            .then( response => {
                console.log(response);
                setModalProps({
                    ...modalProps,
                    title: "¡Guardado!",
                    show: true,
                    type: "",
                    message: "Periferico '" + response.PerifericoId + "' guardado con éxito",
                    afterCloseModal: goBack
                })
            })
            .catch(onError);
        }
        else {
            console.log(periferico);
            savePerifericoApiCall(periferico)
            .then( response => {
                setModalProps({
                    ...modalProps,
                    title: "¡Guardado!",
                    show: true,
                    type: "",
                    message: "Periferico '" + periferico.PerifericoId + "' modificado con éxito",
                    afterCloseModal: goBack
                })
            })
            .catch(onError);
        }
    }

    const goBack = () => {
        if(props.isAssociate) {
            history.push("/Equipos/Perifericos/"+equipoIdUrlParam);
        } else {
            history.push("/Perifericos");
        }
    }

    const onDelete = () => {
        deletePerifericoApiCall(periferico.PerifericoId)
        .then(data => {
            console.log(data);
            setModalProps({
                ...modalProps,
                title: "¡Eliminado!",
                show: true,
                type: "",
                message: "Periferico '" + periferico.PerifericoId + "' eliminado con éxito",
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
            message: "¿Está seguro que desea eliminar el periferico '" + periferico.PerifericoId + "'?",
            onDelete: onDelete,
        })
    }

    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Modal modalProps={modalProps} onCloseModal={onCloseModal}/>
                {
                    props.isAssociate ? 
                        <h1 style={{textAlign: "center"}}>Agregar Nuevo Periferico al Equipo</h1>
                        : props.isNew ?
                        <h1 style={{textAlign: "center"}}>Nuevo Periférico</h1>
                        :
                        <h1 style={{textAlign: "center"}}>Detalles del Periferico</h1>
                }
                <FormPageContainer>

                    {!props.isNew ?
                        <FormGroup>
                            <Button onClick={onConfirmDelete} variant="contained" aria-label="delete" size="large" color="error">
                                Eliminar
                                <DeleteIcon fontSize="inherit" />
                            </Button>
                        </FormGroup>
                        : <></>
                    }

                    <FormGroup>
                        <FormControl sx={{ minWidth: "100%" }}>
                            <small> Descripción </small>
                            <Input onChange={onChangeDescripcion} id="my-input" aria-describedby="my-helper-text" value={periferico?.Descripcion} />
                        </FormControl>
                    </FormGroup>                   
                    <FormGroup>
                    {
                        periferico && equipos ?
                        <>
                            <Box sx={{ minWidth: "40%" }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Equipo</InputLabel>
                                    <Select
                                        disabled={props.isAssociate}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={ props.isAssociate ? equipoIdUrlParam : periferico.EquipoId}
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

export default PerificoDetail;