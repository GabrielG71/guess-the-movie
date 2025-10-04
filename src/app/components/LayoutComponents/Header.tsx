"use client";

interface HeaderProps {
  language: string;
  onLanguageChange: (lang: string) => void;
}

export default function Header({ language, onLanguageChange }: HeaderProps) {
  return (
    <header className="border-b border-gray-200 dark:border-gray-700 py-6 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex-1"></div>
          <div className="flex items-center justify-center gap-3">
            <span className="text-4xl">🍿</span>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {language === "en" ? "Guess The Movie" : "Adivinhe o Filme"}
            </h1>
          </div>
          <div className="flex-1 flex justify-end gap-2">
            <button
              onClick={() => onLanguageChange("en")}
              className={`text-2xl transition-opacity ${
                language === "en"
                  ? "opacity-100"
                  : "opacity-40 hover:opacity-70"
              }`}
              title="English"
            >
              🇺🇸
            </button>
            <button
              onClick={() => onLanguageChange("pt")}
              className={`text-2xl transition-opacity ${
                language === "pt"
                  ? "opacity-100"
                  : "opacity-40 hover:opacity-70"
              }`}
              title="Português"
            >
              🇧🇷
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
