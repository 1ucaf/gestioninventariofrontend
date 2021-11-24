import axios from "axios"

import { rootApiRoute } from "./GlobalApiConfs";

import { getToken } from "../utils/Utils";
axios.defaults.headers.common['Authorization'] = getToken();



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

export const saveUsuarioApiCall = async usuario => {
    try {
        const body = {
            UserName:usuario.UserName,
            Nombre: usuario.Nombre,
            Apellido: usuario.Apellido,
            Email: usuario.Email            
        }
        const response = await axios.put(rootApiRoute + "/Users/?id=" + usuario.UserName, body);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const deleteUsuarioApiCall = async userName => {
    try {
        const response = await axios.delete(rootApiRoute + "/Users/?id=" + userName);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const createUsuarioApiCall = async usuario => {
    try {
        const body = {
            UserName: usuario.UserName,
            Nombre: usuario.Nombre,
            Apellido: usuario.Apellido,
            Email: usuario.Email 
        }
        const response = await axios.post(rootApiRoute + "/Users/", body);
        return response.data;
    } catch (error) {
        throw error;
    }
}