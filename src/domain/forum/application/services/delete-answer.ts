import { left, right, type Either } from '@/core/either';
import type { AnswersRepository } from '../repositories/answers-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { NotAllowedError } from './errors/not-allowed-error';

interface DeleteAnswerServiceRequest {
  authorId: string;
  answerId: string;
}

type DeleteAnswerServiceResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  NonNullable<unknown>
>;

export class DeleteAnswerService {
  constructor(private answerRepository: AnswersRepository) {}

  async execute({
    authorId,
    answerId,
  }: DeleteAnswerServiceRequest): Promise<DeleteAnswerServiceResponse> {
    const answer = await this.answerRepository.findById(answerId.toString());

    if (!answer) {
      return left(new ResourceNotFoundError());
    }

    if (answer.authorId.toString() !== authorId) {
      return left(new NotAllowedError());
    }

    await this.answerRepository.delete(answer);

    return right({});
  }
}
