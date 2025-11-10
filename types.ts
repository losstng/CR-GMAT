
export type AnswerChoice = 'A' | 'B' | 'C' | 'D' | 'E';

export interface AnswerChoiceAnalysis {
  choice: AnswerChoice;
  text: string;
  isCorrect: boolean;
  explanation: string;
  commonPitfall?: string;
}

export interface CRAnalysis {
  conclusion: string;
  premises: string[];
  assumption: string;
  questionType: string;
  answerAnalyses: AnswerChoiceAnalysis[];
  correctAnswer: AnswerChoice;
}
