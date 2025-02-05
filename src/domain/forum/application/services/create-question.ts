import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Question } from '@/domain/forum/enterprise/entities/question';
import type { QuestionRepository } from '../repositories/questions-repository';
import { right, type Either } from '@/core/either';

interface CreateQuestionServiceRequest {
  authorId: string;
  title: string;
  content: string;
}

type CreateQuestionServiceResponse = Either<
  null,
  {
    question: Question;
  }
>;

export class CreateQuestionService {
  constructor(private questionRepository: QuestionRepository) {}

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

    return right({ question });
  }
}
