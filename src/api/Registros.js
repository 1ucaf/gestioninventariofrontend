import axios from "axios"

const rootApiRoute = "https://gestorinventariobackendtfi.azurewebsites.net"

export const getAllRegistrosApiCall = async () => {
    try {
        const response = await axios.get(rootApiRoute + "/Registros");
        return response.data;
    } catch(error) {
        throw error;
    }
}

export const getRegistroApiCall = async (registroId) => {
    try {
        const response = await axios.get(rootApiRoute + "/Registros/" + registroId);
        return response.data;
    } catch(error) {
        throw error;
    }
}