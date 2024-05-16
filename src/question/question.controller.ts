import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { QuestionService } from './question.service';

@Controller('questions')
export class QuestionController {
  constructor(private questionService: QuestionService) {}

  @UseGuards(JwtAuthGuard)
  @Get('translation-pairs')
  async generateTranslationPairs(
    @Query('original') originalLanguage: string,
    @Query('target') targetLanguage: string,
    @Query('topic') topic: string,
    @Query('level') level: string,
  ) {
    return this.questionService.generateTranslationPairs(originalLanguage, targetLanguage, topic, level);
  }

  @UseGuards(JwtAuthGuard)
  @Get('math-question')
  async generateMathQuestion(
    @Query('language') language: string,
    @Query('level') level: string,
    @Query('topic') topic: string,
  ) {
    return this.questionService.generateMathQuestion(language, level, topic);
  }
}