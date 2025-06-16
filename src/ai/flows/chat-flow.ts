
'use server';
/**
 * @fileOverview A Genkit flow for simple chat with Gemini.
 *
 * - chatWithGemini - A function that sends a user message to Gemini and gets a response.
 * - ChatInput - The input type for the chatWithGemini function.
 * - ChatOutput - The return type for the chatWithGemini function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatInputSchema = z.object({
  message: z.string().describe('The user message to send to the chat model.'),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

const ChatOutputSchema = z.object({
  response: z.string().describe("The model's response to the user's message."),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;

export async function chatWithGemini(input: ChatInput): Promise<ChatOutput> {
  return geminiChatFlow(input);
}

const chatPrompt = ai.definePrompt({
  name: 'geminiChatPrompt',
  input: {schema: ChatInputSchema},
  output: {schema: ChatOutputSchema},
  prompt: `You are a helpful assistant. Respond to the user's message. Keep your responses concise and helpful.
User: {{{message}}}
Assistant:`,
});

const geminiChatFlow = ai.defineFlow(
  {
    name: 'geminiChatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async (input) => {
    const {output} = await chatPrompt(input);
    if (!output) {
        throw new Error("No output from Gemini chat flow");
    }
    return output;
  }
);

