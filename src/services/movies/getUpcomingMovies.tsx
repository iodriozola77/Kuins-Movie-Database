import api from "../api";

const getUpcomingMovies = async () => {
    try {
        const res = await api.get("/movie/upcoming", {
            params: {
                language: "en-US",
            },
        });
        return res.data;
    }
    catch(e) {
        console.error("Couldn't fetch upcoming movies", e);
        throw e;
    }
}

export default getUpcomingMovies;