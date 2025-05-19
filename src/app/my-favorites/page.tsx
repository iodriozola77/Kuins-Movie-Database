"use client";

import React, { useEffect, useState } from "react";
import MovieCardList from "@/components/MovieCardList/MovieCardList";
import { getFavorites } from "@/services/accounts/getFavorites";
import { useGuestSession } from "@/providers/GetSessionContext";
import { Movie } from "@/types/Movie";

const MyFavoritesPage = () => {
    const { guestSessionId } = useGuestSession();
    const [movies, setMovies] = useState<Movie[]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    useEffect(() => {
        const fetchFavorites = async () => {
            if (!guestSessionId) return;

            try {
                const data = await getFavorites(guestSessionId, page);
                setMovies(data?.results || []);
                setTotalPages(data.total_pages);
            } catch (e) {
                console.error("Error loading favorite movies:", e);
            }
        };

        fetchFavorites();
    }, [guestSessionId, page]);

    const handlePrev = () => {
        if (page > 1) setPage((prev) => prev - 1);
    };

    const handleNext = () => {
        if (page < totalPages) setPage((prev) => prev + 1);
    };

    return (
        <div className="bg-gray-800 min-h-[calc(100vh-7rem)]">
            <h2 className="pl-7 py-6 text-3xl font-bold">My Favorite Movies</h2>
            {movies.length === 0 ? (
                <div className="text-center mt-10 text-gray-400">
                    <p className="text-xl">You don&apos;t have any favorite movies yet.</p>
                    <p className="text-sm mt-2">
                        Go to a movie&apos;s detail page and click &quot;Add to Favorites&quot; to see it here.
                    </p>
                </div>
            ) : (
                <div className="pb-6">
                    <MovieCardList movies={movies} />
                    <div className="flex justify-center items-center mt-6 gap-4">
                        <button
                            onClick={handlePrev}
                            disabled={page === 1}
                            className="px-4 py-2 text-white bg-emerald-600 rounded disabled:opacity-50"
                        >
                            Prev
                        </button>
                        <span className="text-white">Page {page} of {totalPages}</span>
                        <button
                            onClick={handleNext}
                            disabled={page === totalPages}
                            className="px-4 py-2 text-white bg-emerald-600 rounded disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyFavoritesPage;
