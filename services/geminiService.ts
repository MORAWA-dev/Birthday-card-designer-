
import { GoogleGenAI } from "@google/genai";
import { BirthdayCardRequest, BirthdayCardResult } from "../types";

export const generateBirthdayMessage = async (req: BirthdayCardRequest): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const systemInstruction = `You are a professional comedy writer for greeting cards. 
  Your goal is to write a short, funny, and highly personalized birthday message. 
  The tone should be: ${req.tone}. 
  If 'funny', use observational humor. 
  If 'savage', use gentle but sharp roasting about their age or hobby. 
  If 'punny', use as many wordplays related to their hobby as possible.
  If 'wholesome', keep it sweet but with a tiny witty wink.
  Keep it under 60 words. No emojis unless they are perfectly placed.`;

  const prompt = `Name: ${req.name}, Age: ${req.age}, Hobby: ${req.hobby}. 
  Write a hilarious birthday card message that incorporates these details.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.8,
      },
    });

    return response.text || "Happy Birthday! Hope your day is as awesome as you are (and that's saying a lot!).";
  } catch (error) {
    console.error("Error generating message:", error);
    throw new Error("Failed to generate birthday humor. The AI might be having a mid-life crisis.");
  }
};

export const generateBirthdayImage = async (req: BirthdayCardRequest): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `A funny, vibrant, and stylized 3D digital illustration for a birthday card cover. 
  The image features a character (or a conceptual representation) that relates to the hobby: ${req.hobby}. 
  The style should be modern, colorful, and whimsical. 
  Include visual elements that represent the age ${req.age} in a clever way. 
  Avoid text inside the image. High quality, detailed lighting.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }]
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        }
      }
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No image data found in response");
  } catch (error) {
    console.error("Error generating image:", error);
    return "https://picsum.photos/seed/birthday/800/800"; // Fallback
  }
};
