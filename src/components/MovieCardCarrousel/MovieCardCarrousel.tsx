"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Link from "next/link";
import MovieCard from "../MovieCard/MovieCard";
import { Movie } from "@/types/Movie";
import { useRef } from "react";

interface MovieCardCarrouselInterface {
    movies: Movie[];
}

const MovieCardCarrousel: React.FC<MovieCardCarrouselInterface> = ({ movies }) => {
    const sliderRef = useRef<HTMLDivElement | null>(null);
    const [sliderInstanceRef, slider] = useKeenSlider<HTMLDivElement>({
        loop: true,
        drag: true,
        slides: {
            perView: 5,
            spacing: 5,
        }
    });

    return (
        <div className="relative px-4 pt-6 pl-5 overflow-hidden">
            <div ref={(el) => {
                    sliderRef.current = el;
                    sliderInstanceRef(el);
                }} 
                className="keen-slider"
            >
            {movies.map((movie) => (
                <div key={movie.id} className="keen-slider__slide">
                    <Link
                        href={{
                            pathname: `/movie/${movie.id}`,
                            query: { from: window.location.pathname },
                        }}
                    >
                        <MovieCard
                            title={movie.title}
                            score={parseFloat((movie.vote_average * 10).toFixed(1))}
                            photoPath={movie.poster_path}
                            year={new Date(movie.release_date).getFullYear()}
                            size="small"
                        />
                    </Link>
                </div>
            ))}
            </div>

            <button
                onClick={() => slider.current?.prev()}
                className="absolute top-1/2 left-0 transform -translate-y-1/2 text-white bg-black/50 px-3 py-2 rounded-l hover:bg-black"
            >
                ◀
            </button>
            <button
                onClick={() => slider.current?.next()}
                className="absolute top-1/2 right-0 transform -translate-y-1/2 text-white bg-black/50 px-3 py-2 rounded-r hover:bg-black"
            >
                ▶
            </button>
        </div>
  );
};

export default MovieCardCarrousel;
