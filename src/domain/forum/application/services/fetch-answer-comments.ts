import type { AnswerComment } from '../../enterprise/entities/answer-comment';
import type { AnswerCommentsRepository } from '../repositories/answer-comments-repository';

interface FetchAnswerCommentsServiceRequest {
  answerId: string;
  page: number;
}

interface FetchAnswerCommentsServiceResponse {
  answersComments: AnswerComment[];
}

export class FetchAnswerCommentsService {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}
  async execute({
    answerId,
    page,
  }: FetchAnswerCommentsServiceRequest): Promise<FetchAnswerCommentsServiceResponse> {
    const answersComments = await this.answerCommentsRepository.fetchManyRecent(
      {
        page,
      },
      answerId,
    );

    return { answersComments };
  }
}
