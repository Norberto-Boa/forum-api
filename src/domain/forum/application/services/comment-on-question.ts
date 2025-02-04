import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import type { QuestionRepository } from '../repositories/questions-repository';
import { QuestionComment } from '../../enterprise/entities/question-comment';
import type { QuestionCommentsRepository } from '../repositories/question-comments-repository';

interface CommentOnQuestionServiceRequest {
  authorId: string;
  questionId: string;
  content: string;
}

interface CommentOnQuestionServiceResponse {
  questionComment: QuestionComment;
}

export class CommentOnQuestionService {
  constructor(
    private questionRepository: QuestionRepository,
    private questionCommentRepository: QuestionCommentsRepository,
  ) {}

  async execute({
    authorId,
    content,
    questionId,
  }: CommentOnQuestionServiceRequest): Promise<CommentOnQuestionServiceResponse> {
    const question = await this.questionRepository.findById(questionId);

    if (!question) {
      throw new Error('Question not found');
    }

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityID(authorId),
      content,
      questionId: new UniqueEntityID(questionId),
    });

    await this.questionCommentRepository.create(questionComment);

    return { questionComment };
  }
}
