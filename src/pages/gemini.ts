
interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
  error?: {
    message: string;
  };
}

/**
 * Sends a message to the Gemini API.
 * @param apiKey The Google Gemini API key.
 * @param message The message to send to the AI.
 * @returns The AI's response text.
 */
export const sendMessage = async (apiKey: string, message: string): Promise<string> => {
  if (!apiKey) {
    throw new Error("Gemini API key was not provided.");
  }
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;

  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contents: [{ parts: [{ text: message }] }] }),
  });

  const data: GeminiResponse = await response.json();

  if (data.error) throw new Error(`API Error: ${data.error.message}`);

  return data.candidates[0]?.content.parts[0]?.text || "No response from AI.";
};