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

export const saveProveedorApiCall = async proveedor => {
    try {
        const body = {
            ProveedorId: proveedor.ProveedorId,
            RazonSocial: proveedor.RazonSocial,
            CUIT: proveedor.CUIT,
        }
        const response = await axios.put(rootApiRoute + "/Proveedors/?id=" + proveedor.ProveedorId , body);
        return response.data;
    } catch (error) {
        throw error;
    }
}