import { Button, FormControl, Input, InputLabel, MenuItem, Select } from "@mui/material";
import FormGroup from "../../components/Containers/FormGroup";
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { useState } from "react";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router"
import { getPerifericoApiCall, savePerifericoApiCall } from "../../api/Perifericos";
import FormPageContainer from "../../components/Containers/FormPageContainer";
import Modal from '../../components/Modal/ModalComponent';
import { getAllEquiposApiCall } from "../../api/Equipos";
import { Box } from "@mui/system";
import FormButtonsContainer from "../../components/Containers/FormButtonsContainer";

export const PerificoDetail = () => {
    const { perifericoId } = useParams();

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
            title: "ERROR!",
            show: true,
            type: "error",
            message: e.message,
        })
    }

    useEffect(()=>{
        getPerifericoApiCall(perifericoId)
        .then(data=> {
            console.log("PERIFERICO: ", data);
            setPeriferico(data);
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
        setPeriferico({...periferico, EquipoId: event.target.value});
    }

    const onChangeDescripcion = event => {
        setPeriferico({...periferico, Descripcion: event.target.value});
    }    

    const handleChangeEquipo = event => {
        const equipoSeleccionado = equipos.find(equipo => equipo.EquipoId === event.target.value);
        console.log(equipoSeleccionado.Nombre);
        setPeriferico({...periferico,
            PerifericoId: event.target.value,            
        });
    }
    
    
    const onSave = () => {
        savePerifericoApiCall(periferico)
        .then( response => {
            setModalProps({
                ...modalProps,
                title: "Guardado!",
                show: true,
                type: "",
                message: "Periferico guardado con éxito!",
                afterCloseModal: goBack
            })
        })
        .catch(onError);
    }

    const goBack = () => {
        history.push("/Perifericos");
    }

    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Modal modalProps={modalProps} onCloseModal={onCloseModal}/>
                <h1 style={{textAlign: "center"}}>Detalles de Perifericos</h1>
                <FormPageContainer>
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
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={periferico.EquipoId}                                        
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