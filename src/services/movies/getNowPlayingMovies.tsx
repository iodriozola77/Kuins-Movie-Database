import api from "../api";

const getNowPlayingMovies = async () => {
    try {
        const res = await api.get("/movie/now_playing?language=en-US");
        return res.data;
    }
    catch(e) {
        console.error("Couldn't fetch now playing movies", e);
        throw e;
    }
}

export default getNowPlayingMovies;