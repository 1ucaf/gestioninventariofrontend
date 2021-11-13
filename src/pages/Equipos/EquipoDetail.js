import { useParams } from "react-router"

export const EquipoDetail = () => {
    const { equipoId } = useParams();
    console.log("ID DE EQUIPO: ", equipoId);
    return (
        <div>
            
        </div>
    )
}
