import api from "../api";

const getRecommendedMovies = async(movieId: string) => {
    try {
        const res = await api.get(`/movie/${movieId}/recommendations?language=en-US`);
        console.log(res.data);
        return res.data.results;
    }
    catch(e) {
        console.error("Couldn't fetch recommended movies: ", e);
        throw e;
    }
};

export default getRecommendedMovies;