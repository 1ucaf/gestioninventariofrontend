import { FormControl, Input } from "@mui/material";
import TextField from '@mui/material/TextField';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router"
import { getEquipoApiCall } from "../../api/Equipos";
import FormPageContainer from "../../components/Containers/FormPageContainer";
import Modal from '../../components/Modal/ModalComponent';

export const EquipoDetail = () => {
    const { equipoId } = useParams();
    const [equipo, setEquipo] = useState();
    const [modalProps, setModalProps] = useState({
        title: "",
        message: "",
        type: "",
        show: false,
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
        setModalProps({
            ...modalProps,
            title: "ERROR!",
            show: true,
            type: "error",
            message: e.message,
        })
    }

    useEffect(()=>{
        getEquipoApiCall(equipoId)
        .then(data=> {
            console.log(data);
            setEquipo({
                ...data, 
                Adquisicion: new Date(data.Adquisicion)
            });
        })
        .catch(e=>{
            onError(e);
        })
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

    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Modal modalProps={modalProps} onCloseModal={onCloseModal}/>
                <h1 style={{textAlign: "center"}}>Detalles de Equipo</h1>
                <FormPageContainer>
                    <FormControl>
                        <small> Descripción </small>
                        <Input onChange={onChangeDescripcion} id="my-input" aria-describedby="my-helper-text" value={equipo?.Descripcion} />
                    </FormControl>
                    <FormControl>
                        <small> Fecha de Adquisición </small>
                        <DesktopDatePicker
                            inputFormat="dd/MM/yyyy"
                            value={equipo?.Adquisicion ? equipo.Adquisicion : ""}
                            onChange={onChangeAdquisicionDate}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </FormControl>
                    <FormControl>
                        <small> Fecha de Vencimiento de Garantía: </small>
                        <DesktopDatePicker
                            inputFormat="dd/MM/yyyy"
                            value={equipo?.VencimientoGarantia ? equipo.VencimientoGarantia : ""}
                            onChange={onChangeVencimientoGarantiaDate}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </FormControl>
                </FormPageContainer>
            </LocalizationProvider>
        </>
    )
}
