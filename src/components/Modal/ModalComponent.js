import Modal from 'react-modal';

const ModalComponent = ({modalProps, onCloseModal}) => {
    return (
        <Modal
            isOpen={modalProps.show}
            onRequestClose={modalProps.onCloseModal}
        >
            <button onClick={()=>{onCloseModal(); modalProps.afterCloseModal();}}>close</button>
            <h1>{modalProps.title}</h1>
            <p>{modalProps.message}</p>
        </Modal>
    )
}

export default ModalComponent
