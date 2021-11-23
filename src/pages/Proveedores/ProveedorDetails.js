import { Button, FormControl, Input } from "@mui/material";
import FormGroup from "../../components/Containers/FormGroup";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router"
import { createProveedorApiCall, deleteProveedorApiCall, getProveedorApiCall, saveProveedorApiCall} from "../../api/Proveedores";
import FormPageContainer from "../../components/Containers/FormPageContainer";
import Modal from '../../components/Modal/ModalComponent';
import FormButtonsContainer from "../../components/Containers/FormButtonsContainer";
import DeleteIcon from '@mui/icons-material/Delete';

export const ProveedorDetail = (props) => {
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
        if(props.isNew) {
            setProveedor({});
        } else {
            getProveedorApiCall(proveedorId)
            .then(data=> {
                console.log("PROVEEDOR: ", data);
                setProveedor(data);
            })
            .catch(e=>{
                onError(e);
            });
        }
    },[])

    
    const onChangeRazonSocial = event => {
        setProveedor({...proveedor, RazonSocial: event.target.value});
    }
    const onChangeCUIT = event => {
        setProveedor({...proveedor, CUIT: event.target.value});
    }
   
    const onSave = () => {
        if(props.isNew) {
            createProveedorApiCall(proveedor)
            .then( response => {
                setModalProps({
                    ...modalProps,
                    title: "¡Guardado!",
                    show: true,
                    type: "",
                    message: "Proveedor '" + proveedor.RazonSocial + "' guardado con éxito",
                    afterCloseModal: goBack
                })
            })
            .catch(onError);
        }
        else {
        console.log(proveedor);
        saveProveedorApiCall(proveedor)
        .then( response => {
            setModalProps({
                ...modalProps,
                title: "¡Guardado!",
                show: true,
                type: "",
                message: "Proveedor '" + proveedor.RazonSocial + "' guardado con éxito",
                afterCloseModal: goBack
            })
        })
        .catch(onError);
        }
    }

    const goBack = () => {        
        history.push("/Proveedores");
    }

    const onDelete = () => {
        deleteProveedorApiCall(proveedor.ProveedorId)
        .then(data => {
            console.log(data);
            setModalProps({
                ...modalProps,
                title: "¡Eliminado!",
                show: true,
                type: "",
                message: "Proveedor '" + proveedor.RazonSocial + "' eliminado con éxito",
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
            message: "¿Está seguro que desea eliminar el proveedor '" + proveedor.RazonSocial + "' ?",
            onDelete: onDelete,
        })
    }


    return (
        <>
            <Modal modalProps={modalProps} onCloseModal={onCloseModal}/>
            <h1 style={{textAlign: "center"}}>Detalles de los Proveedores</h1>
            <FormPageContainer>

            <FormGroup>
                        <Button onClick={onConfirmDelete} variant="contained" aria-label="delete" size="large" color="error">
                            Eliminar
                            <DeleteIcon fontSize="inherit" />
                        </Button>
                    </FormGroup>

                <FormGroup>
                    <FormControl sx={{ minWidth: "100%" }}>
                        <small> Razon Social </small>
                        <Input onChange={onChangeRazonSocial} id="my-input" aria-describedby="my-helper-text" value={proveedor? proveedor.RazonSocial : ""} />
                    </FormControl>
                </FormGroup>
                <FormGroup>
                    <FormControl sx={{ minWidth: "100%" }}>
                        <small> CUIT </small>
                        <Input onChange={onChangeCUIT} id="my-input" aria-describedby="my-helper-text" value={proveedor? proveedor.CUIT : ""} />
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
