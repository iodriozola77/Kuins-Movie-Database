"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { getMovieById } from "@/services/movies/getMovieById";
import { Movie } from "@/types/Movie";
import Image from "next/image";
import Config from "@/config";
import ScoreBar from "@/components/ScoreBar/ScoreBar";
import { useGuestSession } from "@/providers/GetSessionContext";
import { markAsFavorite } from "@/services/accounts/markAsFavorite";
import getRecommendedMovies from "@/services/movies/getRecommendedMovies";
import MovieCardCarrousel from "@/components/MovieCardCarrousel/MovieCardCarrousel";
import { useMediaQuery } from "react-responsive";

const MovieDetailPage = () => {
    const { id } = useParams();
    const searchParams = useSearchParams();
    const from = searchParams.get("from");
    console.log(from);

    const isMobile = useMediaQuery({ maxWidth: 767 });

    const [movie, setMovie] = useState<Movie>();
    const [isFavorite, setIsFavorite] = useState(false);
    const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);

    const { guestSessionId } = useGuestSession();

    useEffect(() => {
        if(!id || typeof id !== "string") return;

        const fetchMovie = async () => {
            try {
                const data = await getMovieById(id);
                setMovie(data);
            }
            catch(e) {
                console.log("Couldn't load movie: ", e);
                throw e;
            }
        };

        fetchMovie();

    }, [id]);

    useEffect(() => {
        if (!id || typeof id !== "string") return;

        const storedFavorites = localStorage.getItem("favoriteMovieIds");
        const favoriteIds: number[] = storedFavorites ? JSON.parse(storedFavorites) : [];

        setIsFavorite(favoriteIds.includes(Number(id)));

    }, [id]);

    useEffect(() => {
        if (!id || typeof id !== "string") return;

        const fetchRecommendedMovies = async () => {
            try {
                const data = await getRecommendedMovies(id);
                setRecommendedMovies(data);
            }
            catch(e) {
                console.log("Couldn't load movie: ", e);
                throw e;
            }
        };

        fetchRecommendedMovies();

    }, [id]);

    const handleToggleFavorite = async () => {

        if (!guestSessionId || !movie) return;

        const newFavoriteState = !isFavorite;

        try {
            await markAsFavorite(movie.id, newFavoriteState, guestSessionId);
            setIsFavorite(newFavoriteState);
            const storedFavorites = localStorage.getItem("favoriteMovieIds");

            const favoriteIds: number[] = storedFavorites ? JSON.parse(storedFavorites) : [];

            const updatedFavorites = newFavoriteState ? [...new Set([...favoriteIds, movie.id])] 
            : favoriteIds.filter((id) => id !== movie.id);

            localStorage.setItem(
                "favoriteMovieIds",
                JSON.stringify(updatedFavorites)
            );
        }
        catch (e) {
            console.error("Failed to update favorite:", e);
        }
    };

    if(!movie) return <div>No movie found</div>;

    const photo = Config.IMAGE_SOURCE + movie.poster_path;

    if(isMobile) {
        return(
            <div className="bg-gray-800 min-h-[calc(100vh-7rem)]">
                <div className="justify-between pt-13">
                    <Image
                        src={photo}
                        width="300"
                        height="550"
                        alt={movie.title}
                        className="object-cover px-10 w-auto h-[60vh]"
                    />
                    <div className="min-w-[90%] max-w-[90%] pt-6 pl-12.5">
                        <div className="w-[100%] items-center pb-6">
                            <h1 className=" pb-5 text-2xl font-bold">{movie.title}</h1>
                            <div
                                onClick={handleToggleFavorite}
                                className="rounded-xl border border-emerald-500 hover:-translate-y-0.5 text-emerald-500 
                                flex items-center justify-center h-6 px-2 text-xs cursor-pointer transition"
                            >
                                {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                            </div>
                        </div>
                        <div className="pb-2 w-[100%]">
                            <strong>Genres:</strong>{" "}
                            {movie.genres.map((genre) => genre.name).join(", ")}
                        </div>
                        <div className="pb-2 w-[100%]">
                            <strong>Original Language:</strong> {movie.original_language.toUpperCase()}
                        </div>
                        <div className="pb-2 w-[100%]">
                            <strong>Spoken Languages:</strong>{" "}
                            {movie.spoken_languages.map((lang) => lang.english_name).join(", ")}
                        </div>
                        <div className="pb-6 w-[100%]">
                            <strong>Production Companies:</strong>{" "}
                            {movie.production_companies.map((comp) => comp.name).join(", ")}
                        </div>
                        <strong className="">Overview</strong>
                        <p className="w-[100%] pt-2">{movie.overview}</p>
                        <div className="flex pt-11 w-[100%]">
                            <ScoreBar value={parseFloat((movie.vote_average * 10).toFixed(1))}/>
                        </div>
                        <div className="w-[100%] pt-8 space-y-2 text-white text-sm"></div>
                    </div>
                </div>
                <div className="overflow-hidden px-2 pb-6 pt-8">
                        <h2 className="pl-7 pb-1 text-2xl font-bold">Recommended Movies</h2>
                        {recommendedMovies.length === 0 ? 
                            (
                                <div className="text-center mt-10 text-gray-400 pb-6">
                                    <p className="text-xl">There aren&apos;t any recommended movies.</p>
                                </div>
                            ) : (     
                                <div className="">
                                    <MovieCardCarrousel movies={recommendedMovies}/>
                                </div>
                            )
                        }
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-800 min-h-[calc(100vh-7rem)]">
            <div className="flex justify-between pt-13">
                <Image
                    src={photo}
                    width="300"
                    height="550"
                    alt={movie.title}
                    className="object-cover px-10 w-auto h-[60vh]"
                />
                <div className="min-w-[70%] max-w-[70%]">
                    <div className="w-[90%] flex items-center pb-6">
                        <h1 className="pr-3 text-3xl font-bold">{movie.title}</h1>
                        <div
                            onClick={handleToggleFavorite}
                            className="rounded-xl border border-emerald-500 hover:-translate-y-0.5 text-emerald-500 
                            flex items-center justify-center h-6 px-2 text-xs cursor-pointer transition"
                        >
                            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                        </div>
                    </div>
                    <div className="pb-2 w-[90%]">
                        <strong>Genres:</strong>{" "}
                        {movie.genres.map((genre) => genre.name).join(", ")}
                    </div>
                    <div className="pb-2 w-[90%]">
                        <strong>Original Language:</strong> {movie.original_language.toUpperCase()}
                    </div>
                    <div className="pb-2 w-[90%]">
                        <strong>Spoken Languages:</strong>{" "}
                        {movie.spoken_languages.map((lang) => lang.english_name).join(", ")}
                    </div>
                    <div className="pb-6 w-[90%]">
                        <strong>Production Companies:</strong>{" "}
                        {movie.production_companies.map((comp) => comp.name).join(", ")}
                    </div>
                    <strong className="">Overview</strong>
                    <p className="w-[90%] pt-2">{movie.overview}</p>
                    <div className="flex pt-11 w-[90%]">
                        <ScoreBar value={parseFloat((movie.vote_average * 10).toFixed(1))}/>
                    </div>
                    <div className="w-[90%] pt-8 space-y-2 text-white text-sm"></div>
                </div>
            </div>
            <div className="overflow-hidden px-4 pb-6 pt-8">
                    <h2 className="pl-7 pb-1 text-2xl font-bold">Recommended Movies</h2>
                    {recommendedMovies.length === 0 ? 
                        (
                            <div className="text-center mt-10 text-gray-400 pb-6">
                                <p className="text-xl">There aren&apos;t any recommended movies.</p>
                            </div>
                        ) : (     
                            <div className="">
                                <MovieCardCarrousel movies={recommendedMovies}/>
                            </div>
                        )
                    }
            </div>
        </div>
    );
};

export default MovieDetailPage;