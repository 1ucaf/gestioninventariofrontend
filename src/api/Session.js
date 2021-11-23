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