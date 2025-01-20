import type { QuestionRepository } from '../repositories/questions-repository';

interface DeleteQuestionServiceRequest {
  authorId: string;
  questionId: string;
}

interface DeleteQuestionServiceResponse {}

export class DeleteQuestionService {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    authorId,
    questionId,
  }: DeleteQuestionServiceRequest): Promise<DeleteQuestionServiceResponse> {
    const question = await this.questionRepository.findById(
      questionId.toString(),
    );

    if (!question) {
      throw new Error('Question not found');
    }

    if (question.authorId.toString() !== authorId) {
      throw new Error('You are not authorized to delete this question');
    }

    await this.questionRepository.delete(question);

    return {};
  }
}
