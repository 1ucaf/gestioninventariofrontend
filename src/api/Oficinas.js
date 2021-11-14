import axios from "axios"

const rootApiRoute = "https://gestorinventariobackendtfi.azurewebsites.net"

export const getAllOficinasApiCall = async () => {
    try {
        const response = await axios.get(rootApiRoute + "/Oficinas");
        return response.data;
    } catch(error) {
        throw error;
    }
}

export const getOficinaApiCall = async (oficinaId) => {
    try {
        const response = await axios.get(rootApiRoute + "/Oficinas/" + oficinaId);
        return response.data;
    } catch(error) {
        throw error;
    }
}