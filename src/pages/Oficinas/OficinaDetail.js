import { Button, FormControl, Input } from "@mui/material";
import FormGroup from "../../components/Containers/FormGroup";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router"
import { createOficinaApiCall, deleteOficinaApiCall, getOficinaApiCall, saveOficinaApiCall} from "../../api/Oficinas";
import FormPageContainer from "../../components/Containers/FormPageContainer";
import Modal from '../../components/Modal/ModalComponent';
import FormButtonsContainer from "../../components/Containers/FormButtonsContainer";
import { Box } from "@mui/system";
import DeleteIcon from '@mui/icons-material/Delete';

export const OficinaDetail = (props) => {
    const { oficinaId } = useParams();

    const history = useHistory();

    const [oficina, setOficina] = useState();
    
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
            setOficina({});
        } else 
        getOficinaApiCall(oficinaId)
        .then(data=> {
            console.log("OFICINA: ", data);
            setOficina(data);
        })
        .catch(e=>{
            onError(e);
        });
    },[])

    
    const onChangeNombre = event => {
        setOficina({...oficina, Nombre: event.target.value});
    }
   
    const onSave = () => {
        if(props.isNew) {
            createOficinaApiCall(oficina)
            .then( response => {
                setModalProps({
                    ...modalProps,
                    title: "¡Guardado!",
                    show: true,
                    type: "",
                    message: "Oficina '" + oficina.Nombre + "' guardado con éxito",
                    afterCloseModal: goBack
                })
            })
            .catch(onError);
        }
        else {
        console.log(oficina);
        saveOficinaApiCall(oficina)
        .then( response => {
            setModalProps({
                ...modalProps,
                title: "¡Guardado!",
                show: true,
                type: "",
                message: "Oficina '" + oficina.Nombre + "' modificada con éxito",
                afterCloseModal: goBack
            })
        })
        .catch(onError);
        }
    }

    const goBack = () => {
        history.push("/Oficinas");
    }

    const onDelete = () => {
        deleteOficinaApiCall(oficina.OficinaId)
        .then(data => {
            console.log(data);
            setModalProps({
                ...modalProps,
                title: "¡Eliminada!",
                show: true,
                type: "",
                message: "Oficina '" + oficina.Nombre + "' eliminada con éxito",
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
            message: "¿Está seguro que desea eliminar la oficina '" + oficina.Nombre + "'?",
            onDelete: onDelete,
        })
    }

    return (
        <>
            <Modal modalProps={modalProps} onCloseModal={onCloseModal}/>
            <h1 style={{textAlign: "center"}}>Detalles de las Oficina</h1>
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
                        <Input onChange={onChangeNombre} id="my-input" aria-describedby="my-helper-text" value={oficina? oficina.Nombre : ""} />
                    </FormControl>
                </FormGroup>
                                    
                <FormButtonsContainer>
                    <Button variant="outlined" size="large" onClick={goBack}>Cancelar</Button>
                    <Button variant="contained" size="large" onClick={onSave}>Guardar</Button>
                </FormButtonsContainer>
            </FormPageContainer>
        </>
    )
}

export default OficinaDetail;