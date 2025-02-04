import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import type { AnswersRepository } from '../repositories/answers-repository';
import { AnswerComment } from '../../enterprise/entities/answer-comment';
import type { AnswerCommentsRepository } from '../repositories/answer-comments-repository';

interface CommentOnAnswerServiceRequest {
  authorId: string;
  answerId: string;
  content: string;
}

interface CommentOnAnswerServiceResponse {
  answerComment: AnswerComment;
}

export class CommentOnAnswerService {
  constructor(
    private answersRepository: AnswersRepository,
    private answerCommentRepository: AnswerCommentsRepository,
  ) {}

  async execute({
    authorId,
    content,
    answerId,
  }: CommentOnAnswerServiceRequest): Promise<CommentOnAnswerServiceResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) {
      throw new Error('Answer not found');
    }

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityID(authorId),
      content,
      answerId: new UniqueEntityID(answerId),
    });

    await this.answerCommentRepository.create(answerComment);

    return { answerComment };
  }
}
