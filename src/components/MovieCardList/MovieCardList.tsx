import Link from "next/link";
import MovieCard from "../MovieCard/MovieCard";
import { Movie } from "@/types/Movie";

interface MovieCardListInterface {
    movies: Movie[];
}

const MovieCardList: React.FC<MovieCardListInterface> = ({ movies }) => {
    return (
        <div className="grid md:grid-cols-4">
            {movies.map((movie) => (
                <Link key={movie.id} href={{
                    pathname: `/movie/${movie.id}`,
                    query: { from: window.location.pathname }
                }}>
                    <MovieCard
                        title = {movie.title}
                        score = {parseFloat((movie.vote_average * 10).toFixed(1))}
                        photoPath = {movie.poster_path}
                        year = {new Date(movie.release_date).getFullYear()}
                    />
                </Link>
            ))}
        </div>
    );
};

export default MovieCardList;