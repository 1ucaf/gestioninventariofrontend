import axios from "axios"

const rootApiRoute = "https://gestorinventariobackendtfi.azurewebsites.net"

export const getAllUsuariosApiCall = async () => {
    try {
        const response = await axios.get(rootApiRoute + "/Users");
        return response.data;
    } catch(error) {
        throw error;
    }
}

export const getUsuarioApiCall = async (userId) => {
    try {
        const response = await axios.get(rootApiRoute + "/Users/" + userId);
        return response.data;
    } catch(error) {
        throw error;
    }
}