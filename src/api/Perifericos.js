import axios from "axios"

import { rootApiRoute } from "./GlobalApiConfs";

import { getToken } from "../utils/Utils";
axios.defaults.headers.common['Authorization'] = getToken();



export const getAllPerifericosApiCall = async () => {
    try {
        const response = await axios.get(rootApiRoute + "/Perifericoes");
        return response.data;
    } catch(error) {
        throw error;
    }
}

export const getPerifericoApiCall = async (perifericoId) => {
    try {
        const response = await axios.get(rootApiRoute + "/Perifericoes/" + perifericoId);
        return response.data;
    } catch(error) {
        throw error;
    }
}

export const savePerifericoApiCall = async periferico => {
    try {
        const body = {
            PerifericoId: periferico.PerifericoId,
            EquipoId: periferico.EquipoId,
            Descripcion: periferico.Descripcion
        }
        const response = await axios.put(rootApiRoute + "/Perifericoes/?id=" + periferico.PerifericoId, body);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const deletePerifericoApiCall = async perifericoId => {
    try {
        const response = await axios.delete(rootApiRoute + "/Perifericoes/?id=" + perifericoId);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const createPerifericoApiCall = async periferico => {
    try {
        const body = {
            PerifericoId: 0,
            EquipoId: periferico.EquipoId,
            Descripcion: periferico.Descripcion
        }
        const response = await axios.post(rootApiRoute + "/Perifericoes/", body);
        return response.data;
    } catch (error) {
        throw error;
    }
}