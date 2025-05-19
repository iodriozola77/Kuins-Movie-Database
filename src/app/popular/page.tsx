"use client";

import MovieCardList from "@/components/MovieCardList/MovieCardList";
import { Movie } from "@/types/Movie";
import getPopularMovies from "@/services/movies/getPopularMovies";
import { useEffect, useState } from "react";

const PopularMoviesPage = () => {

    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const fetchPopularMovies = async () => {
            try {
                const data = await getPopularMovies();
                setMovies(data.results);
            }
            catch (e) {
                console.error("Couldn't load movies: ", e);
            }
        };

        fetchPopularMovies();

    }, []);

    return(
        <div className="bg-gray-800">
            <h2 className="pl-7 py-6 text-3xl font-bold">Popular Movies</h2>
            <MovieCardList movies={movies}/>
        </div>
    );
};

export default PopularMoviesPage;