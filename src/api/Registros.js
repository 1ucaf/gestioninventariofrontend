import axios from "axios"

import { rootApiRoute } from "./GlobalApiConfs";

export const getAllRegistrosApiCall = async () => {
    try {
        const response = await axios.get(rootApiRoute + "/Registroes");
        return response.data;
    } catch(error) {
        throw error;
    }
}

export const getRegistroApiCall = async (registroId) => {
    try {
        const response = await axios.get(rootApiRoute + "/Registroes/" + registroId);
        return response.data;
    } catch(error) {
        throw error;
    }
}


export const saveRegistroApiCall = async registro => {
    try {
        const body = {
            RegistroId: registro.RegistroId,
            Descripcion: registro.Descripcion,
            Fecha: registro.Fecha,
            EquipoId: registro.EquipoId,
        }
        const response = await axios.put(rootApiRoute + "/Registroes/?id=" + registro.RegistroId, body);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const createRegistroApiCall = async registro => {
    try {
        const body = {
            RegistroId: 0,
            Descripcion: registro.Descripcion,
            Fecha: registro.Fecha,
            EquipoId: registro.EquipoId,
        }
        const response = await axios.post(rootApiRoute + "/Registroes/", body);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const deleteRegistroApiCall = async registroId => {
    try {
        const response = await axios.delete(rootApiRoute + "/Registroes/?id=" + registroId);
        return response.data;
    } catch (error) {
        throw error;
    }
}
