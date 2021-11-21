import { Button } from '@mui/material';
import { useState } from 'react';
import Modal from 'react-modal';
import FormButtonsContainer from '../Containers/TablePageButtonsContainer';

const ModalComponent = ({modalProps, onCloseModal}) => {
    return (
        <Modal
            isOpen={modalProps.show}
            onRequestClose={modalProps.onCloseModal}
            style={{
                content: {
                    background: "black"
                }
            }}
        >
            <div style={{width: "100%", display:"flex", justifyContent: "flex-end"}}>
                <span style={{cursor: "pointer"}} onClick={()=>{onCloseModal(); modalProps.afterCloseModal();}}>X</span>
            </div>
            <h1>{modalProps.title}</h1>
            <p>{modalProps.message}</p>
            {
                modalProps.type === "delete" ? 
                <FormButtonsContainer>
                    <Button variant="outlined" size="large" onClick={()=>{onCloseModal(); modalProps.afterCloseModal();}}>Cancelar</Button>
                    <Button variant="contained" size="large" onClick={()=>{modalProps.onDelete(); modalProps.afterCloseModal();}} color="error">Eliminar</Button>
                </FormButtonsContainer>
                :
                <FormButtonsContainer>
                    <Button variant="contained" size="large" onClick={()=>{onCloseModal(); modalProps.afterCloseModal();}}>Aceptar</Button>
                </FormButtonsContainer>
            }
        </Modal>
    )
}

export default ModalComponent
