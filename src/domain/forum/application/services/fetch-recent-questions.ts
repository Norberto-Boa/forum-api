import type { QuestionRepository } from '../repositories/questions-repository';
import { Question } from '../../enterprise/entities/question';

interface FetchRecentQuestionsServiceRequest {
  page: number;
}

interface FetchRecentQuestionsServiceResponse {
  questions: Question[];
}

export class FetchRecentQuestionsService {
  constructor(private questionsRepository: QuestionRepository) {}
  async execute({
    page,
  }: FetchRecentQuestionsServiceRequest): Promise<FetchRecentQuestionsServiceResponse> {
    const questions = await this.questionsRepository.findManyRecent({
      page,
    });

    return { questions };
  }
}
