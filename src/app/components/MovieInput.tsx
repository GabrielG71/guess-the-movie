"use client";

import { useState, useEffect } from "react";

const API_KEY = "241abcb6a8de5f1147f09a5f83b41282";
const BASE_URL = "https://api.themoviedb.org/3";

interface MovieInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onSelect: (title: string) => void;
}

export default function MovieInput({
  value,
  onChange,
  onSubmit,
  onSelect,
}: MovieInputProps) {
  const [suggestions, setSuggestions] = useState<any[]>([]);
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

  const handleSelect = (movie: any) => {
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
