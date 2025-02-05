import { left, right, type Either } from '@/core/either';
import type { AnswersRepository } from '../repositories/answers-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { NotAllowedError } from './errors/not-allowed-error';

interface UpdateAnswerServiceRequest {
  authorId: string;
  answerId: string;
  content: string;
}

type UpdateAnswerServiceResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  NonNullable<unknown>
>;

export class UpdateAnswerService {
  constructor(private answerRepository: AnswersRepository) {}

  async execute({
    authorId,
    answerId,
    content,
  }: UpdateAnswerServiceRequest): Promise<UpdateAnswerServiceResponse> {
    const answer = await this.answerRepository.findById(answerId.toString());

    if (!answer) {
      return left(new ResourceNotFoundError());
    }

    if (answer.authorId.toString() !== authorId) {
      return left(new NotAllowedError());
    }

    answer.content = content;

    await this.answerRepository.save(answer);

    return right({});
  }
}
