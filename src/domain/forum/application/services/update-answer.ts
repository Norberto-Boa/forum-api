import type { AnswersRepository } from '../repositories/answers-repository';

interface UpdateAnswerServiceRequest {
  authorId: string;
  answerId: string;
  content: string;
}

interface UpdateAnswerServiceResponse {}

export class UpdateAnswerService {
  constructor(private answerRepository: AnswersRepository) {}

  async execute({
    authorId,
    answerId,
    content,
  }: UpdateAnswerServiceRequest): Promise<UpdateAnswerServiceResponse> {
    const answer = await this.answerRepository.findById(answerId.toString());

    if (!answer) {
      throw new Error('Answer not found');
    }

    if (answer.authorId.toString() !== authorId) {
      throw new Error('Not allowed to update');
    }

    answer.content = content;

    await this.answerRepository.save(answer);

    return {};
  }
}
