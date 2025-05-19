import api from "../api";

const getPopularMovies = async(page=1) => {
    try {
        const res = await api.get("/movie/popular", {
            params: {
                language: "en-US",
                page: page,
            },
        });
        return res.data;
    }
    catch(e) {
        console.error("Couldn't fecth popular movies: ", e);
        throw e;
    }
};

export default getPopularMovies;