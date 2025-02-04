import type { QuestionCommentsRepository } from '../repositories/question-comments-repository';

interface DeleteCommentOnQuestionServiceRequest {
  authorId: string;
  commentId: string;
}

interface DeleteCommentOnQuestionServiceResponse {}

export class DeleteCommentOnQuestionService {
  constructor(private questionRepository: QuestionCommentsRepository) {}

  async execute({
    authorId,
    commentId,
  }: DeleteCommentOnQuestionServiceRequest): Promise<DeleteCommentOnQuestionServiceResponse> {
    const comment = await this.questionRepository.findById(commentId);

    if (!comment) {
      throw new Error('comment not found');
    }

    if (comment.authorId.toString() !== authorId) {
      throw new Error('You are not authorized to delete this question');
    }

    await this.questionRepository.delete(comment);

    return {};
  }
}
