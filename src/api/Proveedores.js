import axios from "axios"

const rootApiRoute = "https://gestorinventariobackendtfi.azurewebsites.net"

export const getAllProveedoresApiCall = async () => {
    try {
        const response = await axios.get(rootApiRoute + "/Proveedors");
        return response.data;
    } catch(error) {
        throw error;
    }
}

export const getProveedorApiCall = async (proveedorId) => {
    try {
        const response = await axios.get(rootApiRoute + "/Proveedors/" + proveedorId);
        return response.data;
    } catch(error) {
        throw error;
    }
}