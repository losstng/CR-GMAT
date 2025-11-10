
import { GoogleGenAI, Type } from "@google/genai";
import type { CRAnalysis } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const analysisSchema = {
  type: Type.OBJECT,
  properties: {
    conclusion: { type: Type.STRING, description: 'The main conclusion of the argument.' },
    premises: { type: Type.ARRAY, items: { type: Type.STRING }, description: 'The key premises supporting the conclusion.' },
    assumption: { type: Type.STRING, description: 'The most critical unstated assumption.' },
    questionType: { type: Type.STRING, description: 'The type of question (e.g., Strengthen, Weaken, Assumption, Main Point, etc.).' },
    correctAnswer: { type: Type.STRING, description: 'The letter of the correct answer choice (A, B, C, D, or E).' },
    answerAnalyses: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          choice: { type: Type.STRING, description: 'The letter of the answer choice.' },
          text: { type: Type.STRING, description: 'The full text of the answer choice.' },
          isCorrect: { type: Type.BOOLEAN, description: 'Whether this choice is the correct answer.' },
          explanation: { type: Type.STRING, description: 'A detailed explanation of why this answer is correct or incorrect.' },
          commonPitfall: { type: Type.STRING, description: 'For incorrect answers, a description of the common logical trap or reason a test-taker might mistakenly choose it.' },
        },
        required: ['choice', 'text', 'isCorrect', 'explanation'],
      },
    },
  },
  required: ['conclusion', 'premises', 'assumption', 'questionType', 'correctAnswer', 'answerAnalyses'],
};

const systemInstruction = `You are an expert GMAT Critical Reasoning tutor. Your goal is to provide a comprehensive breakdown of a GMAT CR problem, including the passage and all five answer choices. Your analysis must be structured, insightful, and strictly follow the requested JSON format.

**Analysis Steps:**

1.  **Read the entire input**: This includes the stimulus (passage), the question, and all five answer choices (A, B, C, D, E).

2.  **Analyze the Stimulus (Argument)**:
    *   Deconstruct the argument into its core components based on GMAT methodology.
    *   **Conclusion**: Identify the single main conclusion. This is the primary claim the author is trying to prove. Look for keywords like 'thus', 'therefore', 'hence', 'consequently'.
    *   **Premises**: Identify all key pieces of evidence or reasons provided to support the conclusion. Look for keywords like 'because', 'since', 'for'.
    *   **Assumption**: Identify the most critical unstated premise. An assumption is a necessary piece of evidence not explicitly stated that connects the premises to the conclusion.

3.  **Identify the Question Type**:
    *   Based on the question stem, classify the question into one of the common GMAT CR types (e.g., "Must be true", "Main point", "Assumption", "Strengthen", "Weaken", "Resolve Paradox", "Flaw in Reasoning", "Evaluate the Argument", "Parallel Reasoning").

4.  **Analyze Each Answer Choice (A-E)**:
    *   For each of the five answer choices:
        *   Extract the full text of the choice.
        *   Determine if it is the correct answer.
        *   **Provide a detailed Explanation**:
            *   **For the correct answer**: Explain precisely why it is correct, linking it back to the stimulus, question type, and argument structure.
            *   **For incorrect answers**: Explain the specific flaw. Common flaws include being "Out of Scope," "Reversing the Logic," making an "Extreme Generalization," being a "Shell Game" (using similar words but changing the meaning), or directly contradicting the premises.
        *   **Identify the Common Pitfall (for incorrect answers only)**: Describe the likely reason a test-taker would mistakenly choose this option. For example, "This is a tempting trap because it addresses a topic from the passage, but it doesn't actually impact the central assumption of the argument." or "This choice strengthens the argument, but the question asks for a necessary assumption, which is a stricter requirement."

5.  **Determine the Correct Answer**:
    *   State the single correct letter ('A', 'B', 'C', 'D', or 'E').

**Output Format:**
*   Your entire response MUST be a single JSON object that conforms to the provided schema.
*   Do not include any conversational text, greetings, or explanations outside of the JSON structure.
*   Be concise but thorough in your explanations.`;


export const analyzePassage = async (passage: string): Promise<CRAnalysis> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Analyze the following GMAT Critical Reasoning passage, question, and answer choices.
      ---
      ${passage}
      ---
      `,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
      },
    });

    const jsonText = response.text.trim();
    const analysis: CRAnalysis = JSON.parse(jsonText);
    
    // Ensure the array is sorted by choice A-E for consistent display
    if (analysis.answerAnalyses) {
        analysis.answerAnalyses.sort((a, b) => a.choice.localeCompare(b.choice));
    }

    return analysis;

  } catch (error) {
    console.error("Error analyzing passage with Gemini API:", error);
    if (error instanceof SyntaxError) {
       throw new Error("Failed to parse AI response. The response was not valid JSON.");
    }
    throw new Error("Failed to get analysis from AI. Please check the console for details.");
  }
};
