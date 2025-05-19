import api from "../api"

const getTopRatedMovies = async (page=1) => {
    try {
        const res = await api.get("/movie/top_rated", {
            params: {
                language: "en-US",
                page: page,
            },
        });
        return res.data;
    }
    catch (e) {
        console.error("Couldn't fetch top rated movies", e);
        throw e;
    }
}

export default getTopRatedMovies;