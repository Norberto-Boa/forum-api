import type { QuestionRepository } from '../repositories/questions-repository';

interface UpdateQuestionServiceRequest {
  authorId: string;
  questionId: string;
  title: string;
  content: string;
}

interface UpdateQuestionServiceResponse {}

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
      throw new Error('Question not found');
    }

    if (question.authorId.toString() !== authorId) {
      throw new Error('Not allowed to update');
    }

    question.title = title;
    question.content = content;

    await this.questionRepository.save(question);

    return {};
  }
}
