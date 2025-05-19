"use client";

import MovieCardCarrousel from '@/components/MovieCardCarrousel/MovieCardCarrousel';
import { useState, useEffect } from 'react';
import { Movie } from '@/types/Movie';
import getDayTrendingMovies from '@/services/movies/getDayTrendingMovies';
import getWeekTrendingMovies from '@/services/movies/getWeekTrendingMovies';
import getUpcomingMovies from '@/services/movies/getUpcomingMovies';

const Home = () => {

    const [dayTrendingMovies, setDayTrendingMovies] = useState<Movie[]>([]);
    const [weekTrendingMovies, setWeekTrendingMovies] = useState<Movie[]>([]);
    const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const fetchDayTrendingMovies = async () => {
            try {
                const data = await getDayTrendingMovies();
                setDayTrendingMovies(data.results);
            }
            catch (e) {
                console.error("Couldn't load movies: ", e);
            }
        };

        fetchDayTrendingMovies();

    }, []);

    useEffect(() => {
        const fetchWeekTrendingMovies = async () => {
            try {
                const data = await getWeekTrendingMovies();
                setWeekTrendingMovies(data.results);
            }
            catch (e) {
                console.error("Couldn't load movies: ", e);
            }
        };

        fetchWeekTrendingMovies();

    }, []);

    useEffect(() => {
        const fetchUpcomingMovies = async () => {
            try {
                const data = await getUpcomingMovies();
                setUpcomingMovies(data.results);
            }
            catch(e) {
                console.error("Couldn't load movies: ", e)
                throw e;
            }
        };

        fetchUpcomingMovies();

    }, []);

    return (
        <div className="bg-gray-800 min-h-[calc(100vh-7rem)]">
            <div>
                <h2 className="pl-7 pt-6 text-3xl font-bold">Trending Today</h2>
                <MovieCardCarrousel movies={dayTrendingMovies}/>
            </div>
            <div>
                <h2 className="pl-7 py-6 text-3xl font-bold">Trending This Week</h2>
                <MovieCardCarrousel movies={weekTrendingMovies}/>
            </div>
            <div className='pb-8'>
                <h2 className="pl-7 py-6 text-3xl font-bold">Upcoming</h2>
                <MovieCardCarrousel movies={upcomingMovies}/>
            </div>
        </div>
    );
}

export default Home;