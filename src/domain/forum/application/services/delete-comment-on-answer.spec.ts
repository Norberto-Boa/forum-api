import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository';
import { DeleteCommentOnAnswerService } from './delete-comment-on-answer';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { makeAnswerComment } from 'test/factories/make-answer-comment';

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: DeleteCommentOnAnswerService;

describe('DeleteCommentOnAnswerService', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();
    sut = new DeleteCommentOnAnswerService(inMemoryAnswerCommentsRepository);
  });

  it('should be able to delete Answer', async () => {
    const newComment = makeAnswerComment();

    await inMemoryAnswerCommentsRepository.create(newComment);

    await sut.execute({
      authorId: newComment.authorId.toString(),
      commentId: newComment.id.toString(),
    });

    expect(inMemoryAnswerCommentsRepository.items).toHaveLength(0);
  });

  it('should be not be able to delete Answer with different authorId', async () => {
    const newComment = makeAnswerComment({
      authorId: new UniqueEntityID('1'),
    });

    await inMemoryAnswerCommentsRepository.create(newComment);

    await expect(
      async () =>
        await sut.execute({
          authorId: '2',
          commentId: newComment.authorId.toString(),
        }),
    ).rejects.toBeInstanceOf(Error);

    expect(inMemoryAnswerCommentsRepository.items).toHaveLength(1);
  });
});
