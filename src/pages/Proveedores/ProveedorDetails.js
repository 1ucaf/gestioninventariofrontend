import { Button, FormControl, Input } from "@mui/material";
import FormGroup from "../../components/Containers/FormGroup";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router"
import { getProveedorApiCall, saveProveedorApiCall} from "../../api/Proveedores";
import FormPageContainer from "../../components/Containers/FormPageContainer";
import Modal from '../../components/Modal/ModalComponent';
import FormButtonsContainer from "../../components/Containers/FormButtonsContainer";

export const ProveedorDetail = () => {
    const { proveedorId } = useParams();

    const history = useHistory();

    const [proveedor, setProveedor] = useState();
    
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
        getProveedorApiCall(proveedorId)
        .then(data=> {
            console.log("PROVEEDOR: ", data);
            setProveedor(data);
        })
        .catch(e=>{
            onError(e);
        });
    },[])

    
    const onChangeRazonSocial = event => {
        setProveedor({...proveedor, RazonSocial: event.target.value});
    }
   
    const onSave = () => {
        saveProveedorApiCall(proveedor)
        .then( response => {
            setModalProps({
                ...modalProps,
                title: "Guardado!",
                show: true,
                type: "",
                message: "Proveedor guardado con éxito!",
                afterCloseModal: goBack
            })
        })
        .catch(onError);
    }

    const goBack = () => {        
        history.push("/Proveedores");
    }

    /*<Modal modalProps={modalProps} onCloseModal={onCloseModal}/>*/
    return (
        <>
            <h1 style={{textAlign: "center"}}>Detalles de los Proveedores</h1>
            <FormPageContainer>
                <FormGroup>
                    <FormControl sx={{ minWidth: "100%" }}>
                        <small> Razon Social </small>
                        <Input onChange={onChangeRazonSocial} id="my-input" aria-describedby="my-helper-text" value={proveedor? proveedor.RazonSocial : ""} />
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

export default ProveedorDetail;
