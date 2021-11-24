import axios from "axios"

import { rootApiRoute } from "./GlobalApiConfs";

import { getToken } from "../utils/Utils";
axios.defaults.headers.common['Authorization'] = getToken();



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

export const deleteProveedorApiCall = async proveedorId => {
    try {
        const response = await axios.delete(rootApiRoute + "/Proveedors/?id=" + proveedorId);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const createProveedorApiCall = async proveedor => {
    try {
        const body = {
            ProveedorId: 0,
            RazonSocial: proveedor.RazonSocial,
            CUIT: proveedor.CUIT,
        }
        const response = await axios.post(rootApiRoute + "/Proveedors/", body);
        return response.data;
    } catch (error) {
        throw error;
    }
}