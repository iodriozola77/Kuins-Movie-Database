import api from "../api";

const getWeekTrendingMovies = async () => {
    try {
        const res = await api.get("/trending/movie/week", {
            params: {
                language: "en-US",
            },
        });
        return res.data;
    }
    catch(e) {
        console.error("Couldn't fetch week trending movies", e);
        throw e;
    }
}

export default getWeekTrendingMovies;