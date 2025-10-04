"use client";

import { useState, useEffect, useRef } from "react";
import { useLanguage } from "./contexts/LanguageContext";
import MovieInput from "./components/MovieInput";
import ResultModal from "./components/ResultModal";

const API_KEY = "241abcb6a8de5f1147f09a5f83b41282";
const BASE_URL = "https://api.themoviedb.org/3";

interface CrewMember {
  job: string;
  name: string;
}

interface CastMember {
  name: string;
}

interface Genre {
  name: string;
}

interface ProductionCountry {
  name: string;
}

interface Movie {
  id: number;
  title: string;
  release_date: string;
  runtime?: number;
  tagline?: string;
  vote_average?: number;
  budget?: number;
  revenue?: number;
  overview?: string;
  original_language?: string;
  genres?: Genre[];
  production_countries?: ProductionCountry[];
  credits?: {
    cast?: CastMember[];
    crew?: CrewMember[];
  };
}

export default function Home() {
  const { language } = useLanguage();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [currentHint, setCurrentHint] = useState(0);
  const [score, setScore] = useState(0);
  const [guess, setGuess] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hints, setHints] = useState<string[]>([]);
  const movieFetched = useRef(false);

  const fetchRandomMovie = async () => {
    try {
      setLoading(true);
      const randomPage = Math.floor(Math.random() * 3) + 1;
      const response = await fetch(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=${
          language === "pt" ? "pt-BR" : "en-US"
        }&page=${randomPage}`
      );
      const data = await response.json();
      const popularMovies = data.results.filter(
        (movie: any) => movie.vote_count > 1000
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
      movieFetched.current = true;
    } catch (error) {
      console.error("Error fetching movie:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!movieFetched.current) fetchRandomMovie();
  }, []);

  useEffect(() => {
    if (movie) setHints(generateHints(movie));
  }, [movie]);

  const generateHints = (movie: Movie): string[] => {
    const releaseYear = new Date(movie.release_date).getFullYear();
    const decade = Math.floor(releaseYear / 10) * 10;
    const director = movie.credits?.crew?.find(
      (person) => person.job === "Director"
    )?.name;
    const cast = movie.credits?.cast || [];
    const mainActor = cast[0]?.name;
    const secondActor = cast[1]?.name;
    const thirdActor = cast[2]?.name;
    const genres = movie.genres || [];
    const voteAverage = movie.vote_average
      ? movie.vote_average.toFixed(1)
      : null;
    const country = movie.production_countries?.[0]?.name;
    const budget = movie.budget ?? 0;
    const revenue = movie.revenue ?? 0;

    const allHints: string[] = [];

    if (language === "pt") {
      if (genres.length > 0)
        allHints.push(
          `Este é um filme de ${genres.map((g) => g.name).join(" e ")}.`
        );
      if (country) allHints.push(`Foi produzido em ${country}.`);
      if (voteAverage)
        allHints.push(`Tem uma avaliação de ${voteAverage}/10 no TMDB.`);
      if (movie.runtime)
        allHints.push(`A duração do filme é de ${movie.runtime} minutos.`);
      allHints.push(`Foi lançado na década de ${decade}.`);
      if (director) allHints.push(`O diretor deste filme é ${director}.`);
      if (mainActor) allHints.push(`${mainActor} atua neste filme.`);
      if (secondActor && thirdActor)
        allHints.push(
          `${secondActor} e ${thirdActor} também fazem parte do elenco.`
        );
      if (movie.tagline) allHints.push(`O slogan é: "${movie.tagline}"`);
      if (budget > 0)
        allHints.push(
          `Teve um orçamento de aproximadamente ${(budget / 1_000_000).toFixed(
            0
          )} milhões.`
        );
      if (revenue > 0)
        allHints.push(
          `Arrecadou cerca de ${(revenue / 1_000_000).toFixed(
            0
          )} milhões nas bilheterias.`
        );
      allHints.push(`Foi lançado especificamente em ${releaseYear}.`);
      if (movie.overview)
        allHints.push(
          `A sinopse menciona: "${movie.overview.substring(0, 80)}..."`
        );
      allHints.push(`O título começa com a letra "${movie.title[0]}".`);
      if (movie.original_language !== "pt")
        allHints.push(
          `O idioma original do filme é ${movie.original_language?.toUpperCase()}.`
        );
    } else {
      if (genres.length > 0)
        allHints.push(
          `This is a ${genres.map((g) => g.name).join(" and ")} film.`
        );
      if (country) allHints.push(`It was produced in ${country}.`);
      if (voteAverage)
        allHints.push(`It has a ${voteAverage}/10 rating on TMDB.`);
      if (movie.runtime)
        allHints.push(`The runtime is ${movie.runtime} minutes.`);
      allHints.push(`It was released in the ${decade}s.`);
      if (director) allHints.push(`The director of this film is ${director}.`);
      if (mainActor) allHints.push(`${mainActor} stars in this movie.`);
      if (secondActor && thirdActor)
        allHints.push(
          `${secondActor} and ${thirdActor} are also part of the cast.`
        );
      if (movie.tagline) allHints.push(`The tagline is: "${movie.tagline}"`);
      if (budget > 0)
        allHints.push(
          `It had a budget of approximately ${(budget / 1_000_000).toFixed(
            0
          )} million.`
        );
      if (revenue > 0)
        allHints.push(
          `It grossed about ${(revenue / 1_000_000).toFixed(
            0
          )} million at the box office.`
        );
      allHints.push(`It was released specifically in ${releaseYear}.`);
      if (movie.overview)
        allHints.push(
          `The plot mentions: "${movie.overview.substring(0, 80)}..."`
        );
      allHints.push(`The title starts with the letter "${movie.title[0]}".`);
      if (movie.original_language !== "en")
        allHints.push(
          `The original language of the film is ${movie.original_language?.toUpperCase()}.`
        );
    }

    return allHints.sort(() => Math.random() - 0.5).slice(0, 5);
  };

  const normalizeString = (str: string) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]/g, "");

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
    setHints([]);
    await fetchRandomMovie();
  };

  if (loading || !movie || hints.length === 0) {
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
