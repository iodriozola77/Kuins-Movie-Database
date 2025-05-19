import api from "../api";

export const getFavorites = async ( guestSessionId: string ) => {
    try {
        const { data } = await api.get(`/account/${guestSessionId}/favorite/movies?language=en-US&page=1&sort_by=created_at.asc`);
        return data;
    }
    catch (e) {
        throw e;
    }
};