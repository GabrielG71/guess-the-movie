"use client";

import { useState, useEffect } from "react";

const API_KEY = "241abcb6a8de5f1147f09a5f83b41282";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

function MovieInput({ value, onChange, onSubmit, onSelect }) {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (value.length < 2) {
        setSuggestions([]);
        return;
      }

      try {
        const response = await fetch(
          `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
            value
          )}&page=1`
        );
        const data = await response.json();
        setSuggestions(data.results.slice(0, 5));
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    const timer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timer);
  }, [value]);

  const handleSelect = (movie) => {
    onSelect(movie.title);
    setShowSuggestions(false);
  };

  return (
    <div className="relative space-y-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Type the movie name..."
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setShowSuggestions(true);
          }}
          onKeyPress={(e) => e.key === "Enter" && onSubmit()}
          onFocus={() => setShowSuggestions(true)}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
        />

        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {suggestions.map((movie) => (
              <button
                key={movie.id}
                onClick={() => handleSelect(movie)}
                className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white transition-colors"
              >
                <div className="font-medium">{movie.title}</div>
                {movie.release_date && (
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(movie.release_date).getFullYear()}
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={onSubmit}
        className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium py-3 rounded-lg transition-colors"
      >
        Submit Guess
      </button>
    </div>
  );
}

function ResultModal({ show, gameWon, movie, points, onNext }) {
  if (!show || !movie) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 space-y-4">
          <h2
            className={`text-2xl font-bold ${
              gameWon
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            {gameWon ? "🎉 Congratulations!" : "😞 Game Over!"}
          </h2>

          <div className="flex gap-4">
            {movie.poster_path && (
              <img
                src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
                className="w-32 h-48 object-cover rounded-lg"
              />
            )}
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {movie.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {new Date(movie.release_date).getFullYear()}
              </p>
              {gameWon && (
                <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                  +{points} points!
                </p>
              )}
            </div>
          </div>

          <p className="text-gray-700 dark:text-gray-300">{movie.overview}</p>

          <button
            onClick={onNext}
            className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium py-3 rounded-lg transition-colors"
          >
            Next Movie
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [movie, setMovie] = useState(null);
  const [currentHint, setCurrentHint] = useState(0);
  const [score, setScore] = useState(0);
  const [guess, setGuess] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRandomMovie = async () => {
      try {
        const randomPage = Math.floor(Math.random() * 20) + 1;
        const response = await fetch(
          `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${randomPage}`
        );
        const data = await response.json();
        const randomMovie =
          data.results[Math.floor(Math.random() * data.results.length)];

        const detailsResponse = await fetch(
          `${BASE_URL}/movie/${randomMovie.id}?api_key=${API_KEY}&language=en-US&append_to_response=credits`
        );
        const movieDetails = await detailsResponse.json();

        setMovie(movieDetails);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie:", error);
        setLoading(false);
      }
    };

    fetchRandomMovie();
  }, []);

  const generateHints = () => {
    if (!movie) return [];

    const releaseYear = new Date(movie.release_date).getFullYear();
    const director =
      movie.credits?.crew?.find((person) => person.job === "Director")?.name ||
      "Unknown";
    const mainActor = movie.credits?.cast?.[0]?.name || "Unknown";
    const genres = movie.genres?.map((g) => g.name).join(", ") || "Unknown";

    return [
      `This movie was released in the ${
        Math.floor(releaseYear / 10) * 10
      }s and belongs to the ${genres} genre(s).`,
      `The film has a runtime of approximately ${movie.runtime} minutes and was directed by ${director}.`,
      `One of the main stars of this movie is ${mainActor}.`,
      `The movie's tagline is: "${movie.tagline || "No tagline available"}"`,
      `This film was released in ${releaseYear} and starts with the letter "${movie.title[0]}".`,
    ];
  };

  const hints = movie ? generateHints() : [];

  const normalizeString = (str) => {
    return str
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]/g, "");
  };

  const handleGuess = () => {
    if (!guess.trim() || !movie) return;

    const normalizedGuess = normalizeString(guess);
    const normalizedTitle = normalizeString(movie.title);

    if (normalizedGuess === normalizedTitle) {
      const points = 5 - currentHint;
      setScore(score + points);
      setGameWon(true);
      setShowModal(true);
    } else if (currentHint === 4) {
      setGameWon(false);
      setShowModal(true);
    } else {
      setCurrentHint(currentHint + 1);
      setGuess("");
    }
  };

  const handleNextMovie = async () => {
    setShowModal(false);
    setCurrentHint(0);
    setGuess("");
    setLoading(true);

    try {
      const randomPage = Math.floor(Math.random() * 20) + 1;
      const response = await fetch(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${randomPage}`
      );
      const data = await response.json();
      const randomMovie =
        data.results[Math.floor(Math.random() * data.results.length)];

      const detailsResponse = await fetch(
        `${BASE_URL}/movie/${randomMovie.id}?api_key=${API_KEY}&language=en-US&append_to_response=credits`
      );
      const movieDetails = await detailsResponse.json();

      setMovie(movieDetails);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching movie:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <p className="text-lg text-gray-900 dark:text-white">
          Loading movie...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-2xl space-y-8">
          <div className="flex items-center justify-between text-sm font-medium text-gray-700 dark:text-gray-300">
            <div className="flex items-center gap-2">
              <span className="text-gray-500 dark:text-gray-400">Hint:</span>
              <span>{currentHint + 1}/5</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500 dark:text-gray-400">Score:</span>
              <span>{score}</span>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 min-h-[200px] flex items-center justify-center border border-gray-200 dark:border-gray-700">
            <p className="text-lg text-gray-900 dark:text-white text-center">
              {hints[currentHint] || "Loading hint..."}
            </p>
          </div>

          <MovieInput
            value={guess}
            onChange={setGuess}
            onSubmit={handleGuess}
            onSelect={setGuess}
          />
        </div>
      </main>

      <ResultModal
        show={showModal}
        gameWon={gameWon}
        movie={movie}
        points={5 - currentHint}
        onNext={handleNextMovie}
      />
    </div>
  );
}
