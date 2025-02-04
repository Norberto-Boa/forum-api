import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository';
import { DeleteCommentOnQuestionService } from './delete-comment-on-question';
import { makeQuestion } from 'test/factories/make-question';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { makeQuestionComment } from 'test/factories/make-comment';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let sut: DeleteCommentOnQuestionService;

describe('DeleteCommentOnQuestionService', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository();
    sut = new DeleteCommentOnQuestionService(
      inMemoryQuestionCommentsRepository,
    );
  });

  it('should be able to delete Question', async () => {
    const newQuestion = makeQuestion({}, new UniqueEntityID('question-1'));
    const newComment = makeQuestionComment();

    await inMemoryQuestionsRepository.create(newQuestion);
    await inMemoryQuestionCommentsRepository.create(newComment);

    await sut.execute({
      authorId: newComment.authorId.toString(),
      commentId: newComment.id.toString(),
    });

    expect(inMemoryQuestionCommentsRepository.items).toHaveLength(0);
  });

  it('should be not be able to delete Question with different authorId', async () => {
    const newQuestion = makeQuestion();
    const newComment = makeQuestionComment({
      authorId: new UniqueEntityID('1'),
    });

    await inMemoryQuestionsRepository.create(newQuestion);
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
