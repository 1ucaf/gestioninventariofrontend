import axios from "axios"

const rootApiRoute = "https://gestorinventariobackendtfi.azurewebsites.net"
// const rootApiRoute = "http://localhost:54156"

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
