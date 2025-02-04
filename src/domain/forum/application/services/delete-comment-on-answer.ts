import type { AnswerCommentsRepository } from '../repositories/answer-comments-repository';

interface DeleteCommentOnAnswerServiceRequest {
  authorId: string;
  commentId: string;
}

interface DeleteCommentOnAnswerServiceResponse {}

export class DeleteCommentOnAnswerService {
  constructor(private answerRepository: AnswerCommentsRepository) {}

  async execute({
    authorId,
    commentId,
  }: DeleteCommentOnAnswerServiceRequest): Promise<DeleteCommentOnAnswerServiceResponse> {
    const comment = await this.answerRepository.findById(commentId);

    if (!comment) {
      throw new Error('comment not found');
    }

    if (comment.authorId.toString() !== authorId) {
      throw new Error('You are not authorized to delete this answer');
    }

    await this.answerRepository.delete(comment);

    return {};
  }
}
