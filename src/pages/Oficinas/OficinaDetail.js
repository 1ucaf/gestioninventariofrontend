import { Button, FormControl, Input } from "@mui/material";
import FormGroup from "../../components/Containers/FormGroup";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router"
import { getOficinaApiCall, saveOficinaApiCall} from "../../api/Oficinas";
import FormPageContainer from "../../components/Containers/FormPageContainer";
import Modal from '../../components/Modal/ModalComponent';
import FormButtonsContainer from "../../components/Containers/FormButtonsContainer";

export const OficinaDetail = () => {
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
            title: "ERROR!",
            show: true,
            type: "error",
            message: e.message,
        })
    }

    useEffect(()=>{
        getOficinaApiCall(oficinaId)
        .then(data=> {
            console.log("OFCINA: ", data);
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
        saveOficinaApiCall(oficina)
        .then( response => {
            setModalProps({
                ...modalProps,
                title: "Guardado!",
                show: true,
                type: "",
                message: "Oficina guardada con éxito!",
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
            <h1 style={{textAlign: "center"}}>Detalles de las Oficina</h1>
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

export default OficinaDetail;