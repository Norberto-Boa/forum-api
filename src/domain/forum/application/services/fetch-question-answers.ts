import type { Answer } from '../../enterprise/entities/answer';
import type { AnswersRepository } from '../repositories/answers-repository';

interface FetchQuestionAnswersServiceRequest {
  questionId: string;
  page: number;
}

interface FetchQuestionAnswersServiceResponse {
  answers: Answer[];
}

export class FetchQuestionAnswersService {
  constructor(private answersRepository: AnswersRepository) {}
  async execute({
    page,
    questionId,
  }: FetchQuestionAnswersServiceRequest): Promise<FetchQuestionAnswersServiceResponse> {
    const answers = await this.answersRepository.findManyByQuestion(
      { page },
      questionId,
    );

    return { answers };
  }
}
