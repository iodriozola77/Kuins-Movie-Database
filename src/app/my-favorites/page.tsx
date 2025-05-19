"use client";

import React, { useEffect, useState } from "react";
import MovieCardList from "@/components/MovieCardList/MovieCardList";
import { getFavorites } from "@/services/accounts/getFavorites";
import { useGuestSession } from "@/providers/GetSessionContext";
import { Movie } from "@/types/Movie";

const MyFavoritesPage = () => {

    const { guestSessionId } = useGuestSession();
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const fetchFavorites = async () => {
        if (!guestSessionId) return;

        try {
            const data = await getFavorites(guestSessionId);
            setMovies(data?.results || []);
        }
        catch (e) {
            console.error("Error loading favorite movies:", e);
        }
        };

        fetchFavorites();

    }, [guestSessionId]);

    return (
        <div className="bg-gray-800 min-h-[calc(100vh-7rem)]">
            <h2 className="pl-7 py-6 text-3xl font-bold">My Favorite Movies</h2>
            {movies.length === 0 ? 
                (
                    <div className="text-center mt-10 text-gray-400">
                        <p className="text-xl">You don't have any favorite movies yet.</p>
                        <p className="text-sm mt-2">
                            Go to a movie's detail page and click "Add to Favorites" to see it here.
                        </p>
                    </div>
                ) : (     
                    <div className="pb-6">
                        <MovieCardList movies={movies}/>
                    </div>
                )
            }
        </div>
    );
};

export default MyFavoritesPage;