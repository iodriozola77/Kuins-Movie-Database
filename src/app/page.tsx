"use client";

import MovieCardCarrousel from '@/components/MovieCardCarrousel/MovieCardCarrousel';
import { useState, useEffect } from 'react';
import { Movie } from '@/types/Movie';
import getPopularMovies from '@/services/movies/getPopularMovies';
import getTopRatedMovies from '@/services/movies/getTopRatedMovies';
import getNowPlayingMovies from '@/services/movies/getNowPlayingMovies';
import { useGuestSession } from '@/providers/GetSessionContext';
import { getFavorites } from '@/services/accounts/getFavorites';

const Home = () => {

    const { guestSessionId } = useGuestSession();

    const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
    const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
    const [nowPlayingMovies, setNowPlayingMovies] = useState<Movie[]>([]);
    const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const fetchPopularMovies = async () => {
            try {
                const data = await getPopularMovies();
                setPopularMovies(data.results);
            }
            catch (e) {
                console.error("Couldn't load movies: ", e);
            }
        };

        fetchPopularMovies();

    }, []);

    useEffect(() => {
        const fetchTopRatedMovies = async () => {
            try {
                const data = await getTopRatedMovies();
                setTopRatedMovies(data.results);
            }
            catch (e) {
                console.error("Couldn't load movies: ", e);
            }
        };

        fetchTopRatedMovies();

    }, []);

    useEffect(() => {
        const fetchNowPlayingMovies = async () => {
            try {
                const data = await getNowPlayingMovies();
                setNowPlayingMovies(data.results);
            }
            catch(e) {
                console.error("Couldn't load movies: ", e)
                throw e;
            }
        };

        fetchNowPlayingMovies();

    }, []);

    useEffect(() => {
            const fetchFavorites = async () => {
            if (!guestSessionId) return;
    
            try {
                const data = await getFavorites(guestSessionId);
                setFavoriteMovies(data?.results || []);
            }
            catch (e) {
                console.error("Error loading favorite movies:", e);
            }
            };
    
            fetchFavorites();
    
    }, [guestSessionId]);

    return (
        <div className="bg-gray-800 min-h-[calc(100vh-7rem)]">
            <div>
                <h2 className="pl-7 pt-6 text-3xl font-bold">Popular Movies</h2>
                <MovieCardCarrousel movies={popularMovies}/>
            </div>
            <div>
                <h2 className="pl-7 py-6 text-3xl font-bold">Top Rated Movies</h2>
                <MovieCardCarrousel movies={topRatedMovies}/>
            </div>
            <div>
                <h2 className="pl-7 py-6 text-3xl font-bold">Now Playing Movies</h2>
                <MovieCardCarrousel movies={nowPlayingMovies}/>
            </div>
            <div className='pb-8'>
                <h2 className="pl-7 py-6 text-3xl font-bold">My Favorite Movies</h2>
                    {favoriteMovies.length === 0 ? 
                (
                    <div className="text-center mt-10 text-gray-400">
                        <p className="text-xl">You don't have any favorite movies yet.</p>
                        <p className="text-sm mt-2 pb-18">
                            Go to a movie's detail page and click "Add to Favorites" to see it here.
                        </p>
                    </div>
                ) : (
                    <MovieCardCarrousel movies={favoriteMovies}/>
                )
            }
            </div>
        </div>
    );
}

export default Home;