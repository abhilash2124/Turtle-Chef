import { GoogleGenAI } from "@google/genai";

// Create AI client (API key is picked automatically from environment)
const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export async function getRecipeFromAI(ingredientsList) {
  if (!ingredientsList || ingredientsList.length === 0) {
    return "Please provide at least one ingredient.";
  }

  const ingredientsString = ingredientsList.join(", ");

  const prompt = `
Create a recipe using these ingredients: ${ingredientsString}

Requirements:
- Give a clear title
- List ingredients with bullet points
- Provide step-by-step instructions
- Keep it simple for beginners
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Error fetching recipe:", error);
    return "Sorry, I couldn't generate a recipe right now.";
  }
}