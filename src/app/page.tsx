"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "./contexts/LanguageContext";
import MovieInput from "./components/MovieInput";
import ResultModal from "./components/ResultModal";

const API_KEY = "241abcb6a8de5f1147f09a5f83b41282";
const BASE_URL = "https://api.themoviedb.org/3";

export default function Home() {
  const { language } = useLanguage();
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
        const randomPage = Math.floor(Math.random() * 3) + 1;
        const response = await fetch(
          `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=${
            language === "pt" ? "pt-BR" : "en-US"
          }&page=${randomPage}`
        );
        const data = await response.json();
        const popularMovies = data.results.filter(
          (movie) => movie.vote_count > 1000
        );
        const randomMovie =
          popularMovies[Math.floor(Math.random() * popularMovies.length)];

        const detailsResponse = await fetch(
          `${BASE_URL}/movie/${randomMovie.id}?api_key=${API_KEY}&language=${
            language === "pt" ? "pt-BR" : "en-US"
          }&append_to_response=credits`
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
  }, [language]);

  const generateHints = () => {
    if (!movie) return [];

    const releaseYear = new Date(movie.release_date).getFullYear();
    const director =
      movie.credits?.crew?.find((person) => person.job === "Director")?.name ||
      (language === "en" ? "Unknown" : "Desconhecido");
    const mainActor =
      movie.credits?.cast?.[0]?.name ||
      (language === "en" ? "Unknown" : "Desconhecido");
    const secondActor =
      movie.credits?.cast?.[1]?.name ||
      (language === "en" ? "Unknown" : "Desconhecido");
    const thirdActor =
      movie.credits?.cast?.[2]?.name ||
      (language === "en" ? "Unknown" : "Desconhecido");
    const genres =
      movie.genres?.map((g) => g.name).join(", ") ||
      (language === "en" ? "Unknown" : "Desconhecido");
    const voteAverage = movie.vote_average
      ? movie.vote_average.toFixed(1)
      : "N/A";
    const productionCountry =
      movie.production_countries?.[0]?.name ||
      (language === "en" ? "Unknown" : "Desconhecido");

    if (language === "pt") {
      return [
        `Este é um filme de ${genres} que foi produzido em ${productionCountry} e tem uma avaliação de ${voteAverage}/10 no TMDB.`,
        `Lançado na década de ${
          Math.floor(releaseYear / 10) * 10
        }, este filme foi dirigido por ${director} e tem ${
          movie.runtime
        } minutos.`,
        `O elenco principal inclui ${mainActor}, ${secondActor} e ${thirdActor}.`,
        `O slogan deste filme é: "${
          movie.tagline || "Sem slogan disponível"
        }" e foi lançado em ${releaseYear}.`,
        `Este filme começa com a letra "${
          movie.title[0]
        }" e a sinopse diz: "${movie.overview?.substring(0, 100)}..."`,
      ];
    }

    return [
      `This is a ${genres} film produced in ${productionCountry} with a ${voteAverage}/10 rating on TMDB.`,
      `Released in the ${Math.floor(releaseYear / 10) * 10}s, this ${
        movie.runtime
      }-minute film was directed by ${director}.`,
      `The main cast includes ${mainActor}, ${secondActor}, and ${thirdActor}.`,
      `The movie's tagline is: "${
        movie.tagline || "No tagline available"
      }" and it was released in ${releaseYear}.`,
      `This film starts with the letter "${
        movie.title[0]
      }" and the plot says: "${movie.overview?.substring(0, 100)}..."`,
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
      const randomPage = Math.floor(Math.random() * 5) + 1;
      const response = await fetch(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=${
          language === "pt" ? "pt-BR" : "en-US"
        }&page=${randomPage}`
      );
      const data = await response.json();
      const popularMovies = data.results.filter(
        (movie) => movie.vote_count > 1000
      );
      const randomMovie =
        popularMovies[Math.floor(Math.random() * popularMovies.length)];

      const detailsResponse = await fetch(
        `${BASE_URL}/movie/${randomMovie.id}?api_key=${API_KEY}&language=${
          language === "pt" ? "pt-BR" : "en-US"
        }&append_to_response=credits`
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
          {language === "en" ? "Loading movie..." : "Carregando filme..."}
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
              <span className="text-gray-500 dark:text-gray-400">
                {language === "en" ? "Hint:" : "Dica:"}
              </span>
              <span>{currentHint + 1}/5</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500 dark:text-gray-400">
                {language === "en" ? "Score:" : "Pontuação:"}
              </span>
              <span>{score}</span>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 min-h-[200px] flex items-center justify-center border border-gray-200 dark:border-gray-700">
            <p className="text-lg text-gray-900 dark:text-white text-center">
              {hints[currentHint] ||
                (language === "en" ? "Loading hint..." : "Carregando dica...")}
            </p>
          </div>

          <MovieInput
            value={guess}
            onChange={setGuess}
            onSubmit={handleGuess}
            onSelect={setGuess}
            language={language}
          />
        </div>
      </main>

      <ResultModal
        show={showModal}
        gameWon={gameWon}
        movie={movie}
        points={5 - currentHint}
        onNext={handleNextMovie}
        language={language}
      />
    </div>
  );
}
