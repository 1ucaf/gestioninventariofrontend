import axios from "axios"

import { rootApiRoute } from "./GlobalApiConfs";

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

export const saveOficinaApiCall = async oficina => {
    try {
        const body = {
            OficinaId: oficina.OficinaId,
            Nombre: oficina.Nombre,
        }
        const response = await axios.put(rootApiRoute + "/Oficinas/?id=" + oficina.OficinaId, body);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const deleteOficinaApiCall = async oficinaId => {
    try {
        const response = await axios.delete(rootApiRoute + "/Oficinas/?id=" + oficinaId);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const createOficinaApiCall = async oficina => {
    try {
        const body = {
            OficinaId: oficina.OficinaId,
            Nombre: oficina.Nombre,
        }
        const response = await axios.post(rootApiRoute + "/Oficinas/", body);
        return response.data;
    } catch (error) {
        throw error;
    }
}