import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Answer } from '@/domain/forum/enterprise/entities/answer';
import type { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository';
import { right, type Either } from '@/core/either';

interface AnswerQuestionServiceRequest {
  questionId: string;
  content: string;
  authorId: string;
}

type AnswerQuestionServiceResponse = Either<
  null,
  {
    answer: Answer;
  }
>;

export class AnswerQuestionService {
  constructor(private answersRepository: AnswersRepository) {}
  async execute({
    questionId,
    content,
    authorId,
  }: AnswerQuestionServiceRequest): Promise<AnswerQuestionServiceResponse> {
    const answer = Answer.create({
      authorId: new UniqueEntityID(authorId),
      questionId: new UniqueEntityID(questionId),
      content,
    });

    await this.answersRepository.create(answer);

    return right({ answer });
  }
}
