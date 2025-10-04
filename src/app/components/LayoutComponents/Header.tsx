export default function Header() {
  return (
    <header className="border-b border-gray-200 dark:border-gray-700 py-6 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-3">
          <span className="text-4xl">🍿</span>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Guess The Movie
          </h1>
        </div>
      </div>
    </header>
  );
}
