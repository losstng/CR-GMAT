
import React from 'react';
import type { AnswerChoice } from '../types';

interface AnswerPickerProps {
  onSelectAnswer: (choice: AnswerChoice) => void;
  selectedAnswer: AnswerChoice | null;
  correctAnswer: AnswerChoice | null;
}

export const AnswerPicker: React.FC<AnswerPickerProps> = ({ onSelectAnswer, selectedAnswer, correctAnswer }) => {
  const choices: AnswerChoice[] = ['A', 'B', 'C', 'D', 'E'];

  const getButtonClass = (choice: AnswerChoice) => {
    if (!selectedAnswer) {
      return "bg-gray-700 hover:bg-blue-600";
    }

    const isSelected = selectedAnswer === choice;
    const isCorrect = choice === correctAnswer;

    if (isSelected && isCorrect) return "bg-green-600 scale-110 ring-2 ring-white";
    if (isSelected && !isCorrect) return "bg-red-600 scale-110 ring-2 ring-white";
    if (isCorrect) return "bg-green-600";
    
    return "bg-gray-600 opacity-60 cursor-not-allowed";
  };

  return (
    <div className="bg-gray-800 p-4 rounded-xl border border-gray-700 shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-center text-blue-300">Choose Your Answer</h2>
      <div className="flex justify-center items-center space-x-2 md:space-x-4">
        {choices.map((choice) => (
          <button
            key={choice}
            onClick={() => onSelectAnswer(choice)}
            disabled={!!selectedAnswer}
            className={`w-14 h-14 md:w-16 md:h-16 text-2xl font-bold text-white rounded-full transition-all duration-300 ease-in-out focus:outline-none flex items-center justify-center ${getButtonClass(choice)}`}
            aria-label={`Select answer ${choice}`}
          >
            {choice}
          </button>
        ))}
      </div>
    </div>
  );
};
