import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository';
import { CommentOnQuestionService } from './comment-on-question';
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { makeQuestion } from 'test/factories/make-question';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: CommentOnQuestionService;

describe('CommentOnQuestionService', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository();
    sut = new CommentOnQuestionService(
      inMemoryQuestionsRepository,
      inMemoryQuestionCommentsRepository,
    );
  });

  it('should be able to comment on Question', async () => {
    inMemoryQuestionsRepository.create(
      makeQuestion({}, new UniqueEntityID('question-1')),
    );

    const result = await sut.execute({
      authorId: '1',
      questionId: 'question-1',
      content: 'this is a comment',
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value?.questionComment.content).toEqual('this is a comment');
  });
});
