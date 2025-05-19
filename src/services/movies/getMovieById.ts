import api from "../api";

export const getMovieById = async (id: string) => {
    try {
        const { data } = await api.get(`movie/${id}`);
        return data;
    }
    catch(e) {
        console.error("Couldn't fetch movie with id: ", e);
        throw e;
    }
};