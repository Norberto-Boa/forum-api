import type { QuestionComment } from '../../enterprise/entities/question-comment';
import type { QuestionCommentsRepository } from '../repositories/question-comments-repository';

interface FetchQuestionCommentsServiceRequest {
  questionId: string;
  page: number;
}

interface FetchQuestionCommentsServiceResponse {
  questionsComments: QuestionComment[];
}

export class FetchQuestionCommentsService {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}
  async execute({
    questionId,
    page,
  }: FetchQuestionCommentsServiceRequest): Promise<FetchQuestionCommentsServiceResponse> {
    const questionsComments =
      await this.questionCommentsRepository.findManyRecent(
        {
          page,
        },
        questionId,
      );

    return { questionsComments };
  }
}
