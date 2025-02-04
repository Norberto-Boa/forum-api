import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository';
import { CommentOnAnswerService } from './comment-on-answer';
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';
import { makeAnswer } from 'test/factories/make-answer';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: CommentOnAnswerService;

describe('CommentOnAnswerService', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();
    sut = new CommentOnAnswerService(
      inMemoryAnswersRepository,
      inMemoryAnswerCommentsRepository,
    );
  });

  it('should be able to comment on Answer', async () => {
    inMemoryAnswersRepository.create(
      makeAnswer({}, new UniqueEntityID('answer-1')),
    );

    const { answerComment } = await sut.execute({
      authorId: '1',
      answerId: 'answer-1',
      content: 'this is a comment',
    });

    expect(answerComment.content).toEqual('this is a comment');
    expect(answerComment.answerId.toString()).toEqual('answer-1');
  });
});
