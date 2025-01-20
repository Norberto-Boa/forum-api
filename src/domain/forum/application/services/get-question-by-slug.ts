import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import type { QuestionRepository } from '../repositories/questions-repository';
import { Question } from '../../enterprise/entities/question';

interface GetQuestionBySlugServiceRequest {
  slug: string;
}

interface GetQuestionBySlugServiceResponse {
  question: Question;
}

export class GetQuestionBySlugService {
  constructor(private answersRepository: QuestionRepository) {}
  async execute({
    slug,
  }: GetQuestionBySlugServiceRequest): Promise<GetQuestionBySlugServiceResponse> {
    const question = await this.answersRepository.findBySlug(slug);

    if (!question) {
      throw new Error('Question not found');
    }

    return { question };
  }
}
