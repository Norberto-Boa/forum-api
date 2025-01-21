import type { AnswersRepository } from '../repositories/answers-repository';

interface DeleteAnswerServiceRequest {
  authorId: string;
  answerId: string;
}

interface DeleteAnswerServiceResponse {}

export class DeleteAnswerService {
  constructor(private answerRepository: AnswersRepository) {}

  async execute({
    authorId,
    answerId,
  }: DeleteAnswerServiceRequest): Promise<DeleteAnswerServiceResponse> {
    const answer = await this.answerRepository.findById(answerId.toString());

    if (!answer) {
      throw new Error('Answer not found');
    }

    if (answer.authorId.toString() !== authorId) {
      throw new Error('You are not authorized to delete this answer');
    }

    await this.answerRepository.delete(answer);

    return {};
  }
}
