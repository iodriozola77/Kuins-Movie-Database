import api from "../api";

export const getFavorites = async (guestSessionId: string, page: number = 1) => {
    try {
        const { data } = await api.get(`/account/${guestSessionId}/favorite/movies`, {
            params: {
                language: "en-US",
                sort_by: "created_at.asc",
                page: page,
            },
        });
        return data;
    } catch (e) {
        throw e;
    }
};
