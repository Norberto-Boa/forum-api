import { left, right, type Either } from '@/core/either';
import type { QuestionRepository } from '../repositories/questions-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { NotAllowedError } from './errors/not-allowed-error';

interface UpdateQuestionServiceRequest {
  authorId: string;
  questionId: string;
  title: string;
  content: string;
}

type UpdateQuestionServiceResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  NonNullable<unknown>
>;

export class UpdateQuestionService {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    authorId,
    questionId,
    title,
    content,
  }: UpdateQuestionServiceRequest): Promise<UpdateQuestionServiceResponse> {
    const question = await this.questionRepository.findById(
      questionId.toString(),
    );

    if (!question) {
      return left(new ResourceNotFoundError());
    }

    if (question.authorId.toString() !== authorId) {
      return left(new NotAllowedError());
    }

    question.title = title;
    question.content = content;

    await this.questionRepository.save(question);

    return right({});
  }
}
