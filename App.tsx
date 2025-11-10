
import React, { useState, useCallback } from 'react';
import { PassageInput } from './components/PassageInput';
import { AnalysisOutput } from './components/AnalysisOutput';
import { Timer } from './components/Timer';
import { Header } from './components/Header';
import { analyzePassage } from './services/geminiService';
import type { CRAnalysis, AnswerChoice } from './types';
import { AnswerPicker } from './components/AnswerPicker';

const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
);
const EyeOffIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
    </svg>
);


const App: React.FC = () => {
  const [passage, setPassage] = useState<string>('');
  const [analysis, setAnalysis] = useState<CRAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const [timerKey, setTimerKey] = useState<number>(0);

  // New state for enhanced functionality
  const [showAnswerChoices, setShowAnswerChoices] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<AnswerChoice | null>(null);
  const [correctAnswer, setCorrectAnswer] = useState<AnswerChoice | null>(null);
  const [isAnalysisVisible, setIsAnalysisVisible] = useState<boolean>(false);
  const [isTimerVisible, setIsTimerVisible] = useState<boolean>(true);

  const handleAnalyze = useCallback(async () => {
    if (!passage.trim()) {
      setError('Please enter a passage and its answer choices to analyze.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysis(null);
    setSelectedAnswer(null);
    setCorrectAnswer(null);
    setShowAnswerChoices(false);
    setIsAnalysisVisible(false);

    setTimerKey(prevKey => prevKey + 1);
    setIsTimerActive(true);
    setIsTimerVisible(true);
    setShowAnswerChoices(true);

    try {
      const result = await analyzePassage(passage);
      setAnalysis(result);
      setCorrectAnswer(result.correctAnswer);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      setShowAnswerChoices(false);
    } finally {
      setIsLoading(false);
    }
  }, [passage]);

  const handleSelectAnswer = useCallback((choice: AnswerChoice) => {
    setSelectedAnswer(choice);
    setIsTimerActive(false); // Stop the timer on selection
  }, []);
  
  const handleRevealAnalysis = () => {
    setIsAnalysisVisible(true);
  };
  
  const handleToggleTimerVisibility = () => {
    setIsTimerVisible(prev => !prev);
  }

  const handleTimeUp = useCallback(() => {
    setIsTimerActive(false);
  }, []);

  const handleClear = useCallback(() => {
    setPassage('');
    setAnalysis(null);
    setError(null);
    setIsTimerActive(false);
    setTimerKey(prevKey => prevKey + 1);
    setShowAnswerChoices(false);
    setSelectedAnswer(null);
    setCorrectAnswer(null);
    setIsAnalysisVisible(false);
  }, []);

  const isClearable = passage.trim() !== '' || analysis !== null || error !== null;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="text-center mb-8">
          <p className="text-gray-400 max-w-2xl mx-auto">
            Paste your GMAT CR passage, question, and all 5 answer choices. Click "Break It Down" to start the timer, select your answer, and then review the AI analysis.
          </p>
        </div>
        
        {showAnswerChoices && (
           <div className="fixed top-4 right-4 md:top-8 md:right-8 z-10 flex items-center gap-2">
            {isTimerVisible && (
              <Timer
                key={timerKey}
                isActive={isTimerActive}
                onTimeUp={handleTimeUp}
              />
            )}
            <button 
              onClick={handleToggleTimerVisibility}
              className="bg-gray-700/80 backdrop-blur-sm border border-gray-600 rounded-full p-2 text-gray-300 hover:text-white hover:bg-gray-600 transition-all"
              aria-label={isTimerVisible ? "Hide timer" : "Show timer"}
            >
             {isTimerVisible ? <EyeOffIcon /> : <EyeIcon />}
            </button>
        </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col gap-8">
            <PassageInput
              passage={passage}
              setPassage={setPassage}
              onAnalyze={handleAnalyze}
              isLoading={isLoading}
            />
            {showAnswerChoices && !isLoading && !error && (
              <AnswerPicker
                onSelectAnswer={handleSelectAnswer}
                selectedAnswer={selectedAnswer}
                correctAnswer={correctAnswer}
              />
            )}
          </div>
          <div>
            {selectedAnswer && analysis && !isAnalysisVisible ? (
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg min-h-[400px] flex flex-col items-center justify-center text-center">
                <h2 className="text-2xl font-bold mb-4">Ready for the breakdown?</h2>
                <p className="text-gray-400 mb-6">See the full AI analysis of the argument and answer choices.</p>
                <button
                  onClick={handleRevealAnalysis}
                  className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
                >
                  Reveal Analysis
                </button>
              </div>
            ) : (
               <AnalysisOutput
                analysis={isAnalysisVisible ? analysis : null}
                isLoading={isLoading}
                error={error}
                onClear={handleClear}
                isClearable={isClearable}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
