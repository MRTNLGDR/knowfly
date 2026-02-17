import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    // Correct initialization: always use named parameter for apiKey and reference process.env.API_KEY directly.
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  /**
   * General chat assistant functionality.
   */
  async ask(prompt: string, history: any[] = []): Promise<string> {
    try {
      // Use 'gemini-3-pro-preview' for complex text tasks like coding and reasoning.
      const response: GenerateContentResponse = await this.ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: history.length > 0 ? history : prompt,
        config: {
          systemInstruction: 'Você é o Nexus AI Tutor, um especialista em Engenharia de Software e IA. Ajude o aluno a entender os conceitos da aula atual de forma técnica porém acessível. Use Markdown.'
        }
      });
      // Correct property access for text output (not a function).
      return response.text || "Desculpe, não consegui processar sua resposta.";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Ocorreu um erro ao conectar com o tutor de IA.";
    }
  }

  /**
   * Multimodal analysis functionality.
   */
  async analyzeImage(base64Image: string, prompt: string): Promise<string> {
    try {
      const imagePart = {
        inlineData: {
          mimeType: 'image/png',
          data: base64Image,
        },
      };
      // For general summarization and simple vision tasks, 'gemini-3-flash-preview' is recommended.
      const response: GenerateContentResponse = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: { parts: [imagePart, { text: prompt }] },
      });
      return response.text || "Análise concluída.";
    } catch (error) {
      console.error("Gemini Vision Error:", error);
      return "Erro ao analisar a imagem.";
    }
  }

  /**
   * Specialized reasoning functionality with thinking budget.
   */
  async generateThinkingResponse(prompt: string): Promise<string> {
    try {
      // Thinking config is only supported on Gemini 3 and 2.5 series models.
      const response = await this.ai.models.generateContent({
        model: "gemini-3-pro-preview",
        contents: prompt,
        config: {
          // Providing a thinking budget allows the model to process complex steps before answering.
          thinkingConfig: { thinkingBudget: 32768 }
        },
      });
      return response.text || "";
    } catch (error) {
      console.error("Thinking Mode Error:", error);
      return "Erro no processamento complexo.";
    }
  }
}

export const gemini = new GeminiService();