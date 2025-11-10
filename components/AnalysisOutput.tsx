import React from 'react';
import type { CRAnalysis, AnswerChoiceAnalysis } from '../types';

interface AnalysisOutputProps {
  analysis: CRAnalysis | null;
  isLoading: boolean;
  error: string | null;
  onClear: () => void;
  isClearable: boolean;
}

const LoadingSkeleton: React.FC = () => (
    <div className="space-y-6 animate-pulse">
        <div className="space-y-2">
            <div className="h-6 bg-gray-600 rounded w-1/3"></div>
            <div className="h-4 bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-700 rounded w-5/6"></div>
        </div>
        <div className="space-y-2">
            <div className="h-6 bg-gray-600 rounded w-1/4"></div>
            <div className="h-4 bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-700 rounded w-2/3"></div>
        </div>
        <div className="space-y-2">
            <div className="h-6 bg-gray-600 rounded w-1/3"></div>
            <div className="h-4 bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-700 rounded w-4/5"></div>
        </div>
    </div>
);

const AnalysisCard: React.FC<{ title: string; children: React.ReactNode; icon: React.ReactNode; }> = ({ title, children, icon }) => (
    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
        <div className="flex items-center mb-3">
            {icon}
            <h3 className="text-lg font-semibold text-blue-300 ml-2">{title}</h3>
        </div>
        <div className="text-gray-300 leading-relaxed">{children}</div>
    </div>
);

const ConclusionIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const PremiseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" /></svg>;
const AssumptionIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const QuestionTypeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>;
const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const CrossIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const PitfallIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>;


const AnswerAnalysisCard: React.FC<{ answer: AnswerChoiceAnalysis }> = ({ answer }) => (
  <div className={`p-4 rounded-lg border ${answer.isCorrect ? 'border-green-500 bg-green-900/20' : 'border-gray-700 bg-gray-800/50'}`}>
    <div className="flex items-center mb-3">
      {answer.isCorrect ? <CheckIcon /> : <CrossIcon />}
      <h4 className="text-xl font-bold ml-3">{`Choice ${answer.choice}`}</h4>
    </div>
    <p className="italic text-gray-400 mb-3">"{answer.text}"</p>
    <p className="text-gray-200 mb-4">{answer.explanation}</p>
    {answer.commonPitfall && (
      <div className="mt-3 p-3 bg-yellow-900/30 border-l-4 border-yellow-500 rounded-r-lg">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <PitfallIcon />
          </div>
          <div className="ml-3">
            <h5 className="font-semibold text-yellow-300">Common Pitfall</h5>
            <p className="text-yellow-200 text-sm">{answer.commonPitfall}</p>
          </div>
        </div>
      </div>
    )}
  </div>
);

export const AnalysisOutput: React.FC<AnalysisOutputProps> = ({ analysis, isLoading, error, onClear, isClearable }) => {
  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-lg min-h-[400px] flex flex-col max-h-[calc(100vh-10rem)]">
      <div className="flex justify-between items-center p-6 pb-4 flex-shrink-0">
        <h2 className="text-xl font-semibold text-teal-300">AI Analysis</h2>
        {isClearable && (
          <button
            onClick={onClear}
            className="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-medium py-1 px-3 rounded-md bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
            aria-label="Clear all"
          >
            Clear
          </button>
        )}
      </div>
      <div className="overflow-y-auto px-6 pb-6 h-full">
        {isLoading && <LoadingSkeleton />}
        {error && <div className="text-red-400 bg-red-900/50 p-4 rounded-lg">{error}</div>}
        {!isLoading && !error && analysis && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-blue-200 mb-3 border-b border-gray-600 pb-2">Argument Breakdown</h3>
              <div className="space-y-4">
                 <AnalysisCard title="Question Type" icon={<QuestionTypeIcon />}>
                  <p className="font-semibold">{analysis.questionType}</p>
                </AnalysisCard>
                <AnalysisCard title="Conclusion" icon={<ConclusionIcon />}>
                  <p>{analysis.conclusion}</p>
                </AnalysisCard>
                <AnalysisCard title="Premises / Evidence" icon={<PremiseIcon />}>
                  <ul className="list-disc list-inside space-y-2">
                    {analysis.premises.map((premise, index) => (
                      <li key={index}>{premise}</li>
                    ))}
                  </ul>
                </AnalysisCard>
                <AnalysisCard title="Key Assumption" icon={<AssumptionIcon />}>
                  <p>{analysis.assumption}</p>
                </AnalysisCard>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-blue-200 my-3 border-b border-gray-600 pb-2">Answer Choices Analysis</h3>
              <div className="space-y-4">
                {analysis.answerAnalyses.map(ans => <AnswerAnalysisCard key={ans.choice} answer={ans} />)}
              </div>
            </div>
          </div>
        )}
        {!isLoading && !error && !analysis && (
          <div className="flex items-center justify-center h-full text-center text-gray-500">
            <div>
              <p className="text-lg">Your GMAT passage analysis will appear here.</p>
              <p className="text-sm mt-2">Ready to sharpen your reasoning skills?</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};