import axios from "axios"

const rootApiRoute = "https://gestorinventariobackendtfi.azurewebsites.net"

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