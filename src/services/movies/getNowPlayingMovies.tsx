import api from "../api";

const getNowPlayingMovies = async (page=1) => {
    try {
        const res = await api.get("/movie/now_playing", {
            params: {
                language: "en-US",
                page: page,
            },
        });
        return res.data;
    }
    catch(e) {
        console.error("Couldn't fetch now playing movies", e);
        throw e;
    }
}

export default getNowPlayingMovies;