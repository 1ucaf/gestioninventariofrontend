import { Button, FormControl, Input } from "@mui/material";
import FormGroup from "../../components/Containers/FormGroup";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router"
import { getRegistroApiCall, saveOficinaApiCall} from "../../api/Registros";
import FormPageContainer from "../../components/Containers/FormPageContainer";
import Modal from '../../components/Modal/ModalComponent';
import FormButtonsContainer from "../../components/Containers/FormButtonsContainer";

export const RegistroDetail = () => {
    const { registroId } = useParams();

    const history = useHistory();

    const [registro, setRegistro] = useState();
    const [equipo, setEquipo] = useState();
    
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
        getRegistroApiCall(registroId)
        .then(data=> {
            console.log("REGISTRO: ", data);
            setRegistro(data);
        })
        .catch(e=>{
            onError(e);
        });
    },[])

    useEffect(()=>{
        getEquipoApiCall(equipoId)
        .then(data=> {
            console.log("EQUIPO: ", data);
            setEquipo({
                ...data, 
                Adquisicion: new Date(data.Adquisicion)
            });
        })
        .catch(e=>{
            onError(e);
        });
    
    const onChangeDescripcion = event => {
        setRegistro({...registro, Descripcion: event.target.value});
    }
   
    const onSave = () => {
        saveRegistroApiCall(registro)
        .then( response => {
            setModalProps({
                ...modalProps,
                title: "Guardado!",
                show: true,
                type: "",
                message: "Registro guardado con éxito!",
                afterCloseModal: goBack
            })
        })
        .catch(onError);
    }

    const goBack = () => {
        history.push("/Oficinas");
    }

    return (
        <>
            <Modal modalProps={modalProps} onCloseModal={onCloseModal}/>
            <h1 style={{textAlign: "center"}}>Detalles de los Registros</h1>
            <FormPageContainer>
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

export default RegistroDetail;