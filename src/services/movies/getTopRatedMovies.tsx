import api from "../api"

const getTopRatedMovies = async () => {
    try {
        const res = await api.get("/movie/top_rated?language=en-US");
        return res.data;
    }
    catch (e) {
        console.error("Couldn't fetch top rated movies", e);
        throw e;
    }
}

export default getTopRatedMovies;