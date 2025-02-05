import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { DeleteQuestionService } from './delete-question';
import { makeQuestion } from 'test/factories/make-question';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: DeleteQuestionService;

describe('DeleteQuestionService', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new DeleteQuestionService(inMemoryQuestionsRepository);
  });

  it('should be able to delete Question', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('1'),
      },
      new UniqueEntityID('question-1'),
    );

    await inMemoryQuestionsRepository.create(newQuestion);

    await sut.execute({
      authorId: '1',
      questionId: 'question-1',
    });

    expect(inMemoryQuestionsRepository.items).toHaveLength(0);
  });

  it('should be not be able to delete Question with different authorId', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('1'),
      },
      new UniqueEntityID('question-1'),
    );

    await inMemoryQuestionsRepository.create(newQuestion);

    const result = await sut.execute({
      authorId: '2',
      questionId: 'question-1',
    });

    expect(result.isLeft()).toBeTruthy();
    expect(inMemoryQuestionsRepository.items).toHaveLength(1);
  });
});
