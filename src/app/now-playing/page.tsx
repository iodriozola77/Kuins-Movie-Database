"use client";

import MovieCardList from "@/components/MovieCardList/MovieCardList";
import getNowPlayingMovies from "@/services/movies/getNowPlayingMovies";
import { Movie } from "@/types/Movie";
import { useEffect, useState } from "react";

const NowPlayingPage = () => {

    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const fetchNowPlayingMovies = async () => {
            try {
                const data = await getNowPlayingMovies();
                setMovies(data.results);
            }
            catch(e) {
                console.error("Couldn't load movies: ", e)
                throw e;
            }
        };

        fetchNowPlayingMovies();

    }, []);

    return (
        <div className="bg-gray-800">
            <h2 className="pl-7 py-6 text-3xl font-bold">Now Playing Movies</h2>
            <MovieCardList movies={movies}/>
        </div>
    );
};

export default NowPlayingPage;


