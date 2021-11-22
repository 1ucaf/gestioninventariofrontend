import axios from "axios"

const rootApiRoute = "https://gestorinventariobackendtfi.azurewebsites.net"

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