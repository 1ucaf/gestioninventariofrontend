import { useParams } from "react-router"

export const UsuarioDetail = () => {
    const { usuarioId } = useParams();
    console.log("ID DE EQUIPO: ", usuarioId);
    return (
        <div>
            
        </div>
    )
}
