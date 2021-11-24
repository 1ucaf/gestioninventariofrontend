import axios from "axios"

import { rootApiRoute } from "./GlobalApiConfs";


export const loginApiCall = async (userName, password) => {
    try {
        const body = {
            UserName: userName,
            Password: password,
        }
        const response = await axios.post(rootApiRoute + "/Login/", body);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const renewTokenApiCall = async (token) => {
    try {
        const body = {
            Token: token,
        }
        const response = await axios.post(rootApiRoute + "/RenewToken/", body);
        return response.data;
    } catch (error) {
        throw error;
    }
}