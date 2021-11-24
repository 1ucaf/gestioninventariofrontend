import axios from "axios"
import { rootApiRoute } from "./GlobalApiConfs";

import { getToken } from "../utils/Utils";
axios.defaults.headers.common['Authorization'] = getToken();

export const getAllEquiposApiCall = async () => {
    try {
        const response = await axios.get(rootApiRoute + "/Equipos");
        return response.data;
    } catch(error) {
        throw error;
    }
}

export const getEquipoApiCall = async (equipoId) => {
    try {
        const response = await axios.get(rootApiRoute + "/Equipos/" + equipoId);
        return response.data;
    } catch(error) {
        throw error;
    }
}

export const saveEquipoApiCall = async equipo => {
    try {
        const body = {
            EquipoId: equipo.EquipoId,
            Descripcion: equipo.Descripcion,
            Adquisicion: equipo.Adquisicion,
            VencimientoGarantia: equipo.VencimientoGarantia,
            ProveedorId: equipo.ProveedorId,
            OficinaId: equipo.OficinaId
        }
        const response = await axios.put(rootApiRoute + "/Equipos/?id=" + equipo.EquipoId, body);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const createEquipoApiCall = async equipo => {
    try {
        const body = {
            EquipoId: equipo.EquipoId,
            Descripcion: equipo.Descripcion,
            Adquisicion: equipo.Adquisicion,
            VencimientoGarantia: equipo.VencimientoGarantia,
            ProveedorId: equipo.ProveedorId,
            OficinaId: equipo.OficinaId
        }
        const response = await axios.post(rootApiRoute + "/Equipos/?id=" + equipo.EquipoId, body);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const deleteEquipoApiCall = async equipoId => {
    try {
        const response = await axios.delete(rootApiRoute + "/Equipos/?id=" + equipoId);
        return response.data;
    } catch (error) {
        throw error;
    }
}