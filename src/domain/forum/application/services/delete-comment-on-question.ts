import { left, right, type Either } from '@/core/either';
import type { QuestionCommentsRepository } from '../repositories/question-comments-repository';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error';

interface DeleteCommentOnQuestionServiceRequest {
  authorId: string;
  commentId: string;
}

type DeleteCommentOnQuestionServiceResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  NonNullable<unknown>
>;

export class DeleteCommentOnQuestionService {
  constructor(private questionRepository: QuestionCommentsRepository) {}

  async execute({
    authorId,
    commentId,
  }: DeleteCommentOnQuestionServiceRequest): Promise<DeleteCommentOnQuestionServiceResponse> {
    const comment = await this.questionRepository.findById(commentId);

    if (!comment) {
      return left(new ResourceNotFoundError());
    }

    if (comment.authorId.toString() !== authorId) {
      return left(new NotAllowedError());
    }

    await this.questionRepository.delete(comment);

    return right({});
  }
}
