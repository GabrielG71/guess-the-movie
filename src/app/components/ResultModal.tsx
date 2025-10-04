"use client";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

interface ResultModalProps {
  show: boolean;
  gameWon: boolean;
  movie: any;
  points: number;
  onNext: () => void;
  language: string;
}

export default function ResultModal({
  show,
  gameWon,
  movie,
  points,
  onNext,
  language,
}: ResultModalProps) {
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
            {gameWon
              ? language === "en"
                ? "🎉 Congratulations!"
                : "🎉 Parabéns!"
              : language === "en"
              ? "😞 Game Over!"
              : "😞 Fim de Jogo!"}
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
                  +{points} {language === "en" ? "points!" : "pontos!"}
                </p>
              )}
            </div>
          </div>

          <p className="text-gray-700 dark:text-gray-300">{movie.overview}</p>

          <button
            onClick={onNext}
            className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium py-3 rounded-lg transition-colors"
          >
            {language === "en" ? "Next Movie" : "Próximo Filme"}
          </button>
        </div>
      </div>
    </div>
  );
}
