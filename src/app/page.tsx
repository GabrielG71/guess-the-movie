export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-8">
        <div className="flex items-center justify-between text-sm font-medium text-gray-700 dark:text-gray-300">
          <div className="flex items-center gap-2">
            <span className="text-gray-500 dark:text-gray-400">Hint:</span>
            <span>1/5</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-500 dark:text-gray-400">Score:</span>
            <span>0</span>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 min-h-[200px] flex items-center justify-center border border-gray-200 dark:border-gray-700">
          <p className="text-lg text-gray-900 dark:text-white text-center">
            Your hint will appear here
          </p>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Type the movie name..."
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          />
          <button className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium py-3 rounded-lg transition-colors">
            Submit Guess
          </button>
        </div>
      </div>
    </div>
  );
}
