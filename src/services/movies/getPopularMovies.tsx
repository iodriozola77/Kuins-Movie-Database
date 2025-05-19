import api from "../api";

const getPopularMovies = async() => {
    try {
        const res = await api.get("/movie/popular?language=en-US");
        return res.data;
    }
    catch(e) {
        console.error("Couldn't fecth popular movies: ", e);
        throw e;
    }
};

export default getPopularMovies;