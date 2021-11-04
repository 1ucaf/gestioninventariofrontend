import axios from "axios"

export const getAllEquiposApiCall = async () => {
    try {
        const response = await axios.get("http://localhost:54156/Equipos");
        return response.data;
    } catch(error) {
        throw error;
    }
}

export const getEquipoApiCall = async (equipoId) => {
    try {
        const response = await axios.get("http://localhost:54156/Equipos/" + equipoId);
        return response.data;
    } catch(error) {
        throw error;
    }
}