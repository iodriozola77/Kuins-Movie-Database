"use client";

import MovieCardList from "@/components/MovieCardList/MovieCardList";
import { Movie } from "@/types/Movie";
import getTopRatedMovies from "@/services/movies/getTopRatedMovies";
import { useEffect, useState } from "react";

const TopRatedMoviesPage = () => {

    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const fetchTopRatedMovies = async () => {
            try {
                const data = await getTopRatedMovies();
                setMovies(data.results);
            }
            catch (e) {
                console.error("Couldn't load movies: ", e);
            }
        };

        fetchTopRatedMovies();

    }, []);

    return(
        <div className="bg-gray-800">
            <h2 className="pl-7 py-6 text-3xl font-bold">Top Rated Movies</h2>
            <MovieCardList movies={movies}/>
        </div>
    );
};

export default TopRatedMoviesPage;