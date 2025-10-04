"use client";

interface FooterProps {
  language: string;
  onLanguageChange: (lang: string) => void;
}

export default function Footer({ language, onLanguageChange }: FooterProps) {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 py-6 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex-1"></div>
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            <p>
              © 2025{" "}
              {language === "en" ? "Guess The Movie" : "Adivinhe o Filme"}.{" "}
              {language === "en"
                ? "All rights reserved"
                : "Todos os direitos reservados"}
              .
            </p>
            <p className="mt-1">
              {language === "en" ? "Made with" : "Feito com"}{" "}
              <span className="text-red-500">❤️</span>{" "}
              {language === "en" ? "by" : "por"} Gabriel Gonçalves
            </p>
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
    </footer>
  );
}
