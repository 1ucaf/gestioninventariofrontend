import { useParams } from "react-router"

const RegistroDetail = () => {
    const { RegistroId } = useParams();
    console.log("ID DE REGISTRO: ", RegistroId);
    return (
        <div>
            
        </div>
    )
}

export default RegistroDetail
