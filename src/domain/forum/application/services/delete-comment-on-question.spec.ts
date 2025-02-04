import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository';
import { DeleteCommentOnQuestionService } from './delete-comment-on-question';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { makeQuestionComment } from 'test/factories/make-comment';

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let sut: DeleteCommentOnQuestionService;

describe('DeleteCommentOnQuestionService', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository();
    sut = new DeleteCommentOnQuestionService(
      inMemoryQuestionCommentsRepository,
    );
  });

  it('should be able to delete Question', async () => {
    const newComment = makeQuestionComment();

    await inMemoryQuestionCommentsRepository.create(newComment);

    await sut.execute({
      authorId: newComment.authorId.toString(),
      commentId: newComment.id.toString(),
    });

    expect(inMemoryQuestionCommentsRepository.items).toHaveLength(0);
  });

  it('should be not be able to delete Question with different authorId', async () => {
    const newComment = makeQuestionComment({
      authorId: new UniqueEntityID('1'),
    });

    await inMemoryQuestionCommentsRepository.create(newComment);

    await expect(
      async () =>
        await sut.execute({
          authorId: '2',
          commentId: newComment.authorId.toString(),
        }),
    ).rejects.toBeInstanceOf(Error);

    expect(inMemoryQuestionCommentsRepository.items).toHaveLength(1);
  });
});
