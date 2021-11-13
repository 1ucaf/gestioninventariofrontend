import axios from "axios"

const rootApiRoute = "http://localhost:54156"

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