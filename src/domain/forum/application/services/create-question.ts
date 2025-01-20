import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Question } from '@/domain/forum/enterprise/entities/question';
import type { QuestionRepostory } from '../repositories/questions-repository';

interface CreateQuestionServiceRequest {
  authorId: string;
  title: string;
  content: string;
}

interface CreateQuestionServiceResponse {
  question: Question;
}

export class CreateQuestionService {
  constructor(private questionRepository: QuestionRepostory) {}

  async execute({
    authorId,
    content,
    title,
  }: CreateQuestionServiceRequest): Promise<CreateQuestionServiceResponse> {
    const question = Question.create({
      authorId: new UniqueEntityID(authorId),
      title,
      content,
    });

    await this.questionRepository.create(question);

    return { question };
  }
}
