import { useState } from 'react';
import Modal from 'react-modal';

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
        </Modal>
    )
}

export default ModalComponent
