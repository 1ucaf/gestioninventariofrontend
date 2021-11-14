import axios from "axios"

const rootApiRoute = "http://localhost:54156"

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