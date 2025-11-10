
import React from 'react';

interface PassageInputProps {
  passage: string;
  setPassage: (passage: string) => void;
  onAnalyze: () => void;
  isLoading: boolean;
}

export const PassageInput: React.FC<PassageInputProps> = ({ passage, setPassage, onAnalyze, isLoading }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg flex flex-col h-full">
      <h2 className="text-xl font-semibold mb-4 text-blue-300">CR Problem Input</h2>
      <textarea
        value={passage}
        onChange={(e) => setPassage(e.target.value)}
        placeholder="Paste your GMAT critical reasoning passage here, including the question and all five answer choices (A, B, C, D, E)..."
        className="w-full h-full flex-grow bg-gray-900 border border-gray-600 rounded-lg p-4 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200 min-h-[300px] resize-none"
        disabled={isLoading}
      />
      <div className="mt-6">
          <button
            onClick={onAnalyze}
            disabled={isLoading || !passage.trim()}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing...
              </>
            ) : (
              'Break It Down!'
            )}
          </button>
      </div>
    </div>
  );
};
