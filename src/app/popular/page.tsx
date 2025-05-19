"use client";

import { useEffect, useState } from "react";
import MovieCardList from "@/components/MovieCardList/MovieCardList";
import { Movie } from "@/types/Movie";
import getPopularMovies from "@/services/movies/getPopularMovies";

const PopularMoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPopularMovies = async (page: number) => {
    try {
      const data = await getPopularMovies(page);
      setMovies(data.results);
      setTotalPages(data.total_pages);
    } catch (e) {
      console.error("Couldn't load popular movies:", e);
    }
  };

  useEffect(() => {
    fetchPopularMovies(currentPage);
  }, [currentPage]);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="bg-gray-800 min-h-screen">
      <h2 className="pl-7 py-6 text-3xl font-bold">Popular Movies</h2>

      <MovieCardList movies={movies} />

      <div className="flex justify-center items-center gap-4 py-6">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-emerald-500 text-white rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-white">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-emerald-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PopularMoviesPage;
