import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class QuestionService {
  private readonly genAI: GoogleGenerativeAI;

  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.API_KEY);
  }

  async generateTranslationPairs(originalLanguage: string, targetLanguage: string, topic: string, level: string) {
    const model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `
    You are a(n) ${originalLanguage} language teacher in a ${targetLanguage} school. 
    You want to test your students translating skills. 
    Your students speak ${originalLanguage} on a ${level} level. 
    Write 10 ${level} level ${originalLanguage} words and their translations in key-value pairs.
    The words should relate to the topic of ${topic}
    Output must be in a JSON format. 
    You might also want to upload it to an educational online game where 
    they are required to choose the correct answer from 4 options. 
    Make sure the output JSON has the translated ${originalLanguage} word, 
    the correct ${targetLanguage} translation, and the other 3 options. 
    The other 3 options must mean something different so that your students won't get confused.
    Output should not contain the code formatting beginning with the triple backticks.
    Output must follow the following JSON format:
    {
     "words" : [
      {
       "${originalLanguage}": "...",
       "${targetLanguage}": "...",
       "options": ["...", "...", "..."]
      },
      ... 9 more
     ]
    }
     `;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    return text.trim();
  }

  async generateMathQuestion(language: string, level: string, topic: string) {
    const model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `
    You are a math teacher in a ${language} school. 
    You want to test your students' math skills. 
    Your students are ${level} level students. 
    Write 10 ${level} level math questions and their answers in key-value pairs. 
    The questions should relate to the topic of ${topic}
    Output must be in a JSON format. 
    You might also want to upload it to an educational online game where 
    they are required to choose the correct answer from 4 options. 
    Make sure the output JSON has the question, the correct answer, and the other 3 options. 
    The other 3 options must be incorrect. 
    Answer language must be in ${language}.
    Output should not contain the code formatting beginning with the triple backticks.
    Output must follow the following JSON format:
    {
     "questions" : [
      {
       "question": "...",
       "answer": "...",
       "options": ["...", "...", "..."]
      },
      ... 9 more
     ]
    }
     `;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    return text.trim();
  }
}