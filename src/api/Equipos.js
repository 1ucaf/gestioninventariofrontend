import axios from "axios"

const rootApiRoute = "https://gestorinventariobackendtfi.azurewebsites.net"

export const getAllEquiposApiCall = async () => {
    try {
        const response = await axios.get(rootApiRoute + "/Equipos");
        return response.data;
    } catch(error) {
        throw error;
    }
}

export const getEquipoApiCall = async (equipoId) => {
    try {
        const response = await axios.get(rootApiRoute + "/Equipos/" + equipoId);
        return response.data;
    } catch(error) {
        throw error;
    }
}