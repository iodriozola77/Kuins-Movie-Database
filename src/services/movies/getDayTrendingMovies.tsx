import api from "../api";

const getDayTrendingMovies = async () => {
    try {
        const res = await api.get("/trending/movie/day", {
            params: {
                language: "en-US",
            },
        });
        return res.data;
    }
    catch(e) {
        console.error("Couldn't fetch day trending movies", e);
        throw e;
    }
}

export default getDayTrendingMovies;