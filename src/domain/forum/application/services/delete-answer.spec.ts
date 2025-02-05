import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';
import { DeleteAnswerService } from './delete-answer';
import { makeAnswer } from 'test/factories/make-answer';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: DeleteAnswerService;

describe('DeleteAnswerService', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new DeleteAnswerService(inMemoryAnswersRepository);
  });

  it('should be able to delete Answer', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('1'),
      },
      new UniqueEntityID('answer-1'),
    );

    await inMemoryAnswersRepository.create(newAnswer);

    await sut.execute({
      authorId: '1',
      answerId: 'answer-1',
    });

    expect(inMemoryAnswersRepository.items).toHaveLength(0);
  });

  it('should be not be able to delete Answer with different authorId', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('1'),
      },
      new UniqueEntityID('answer-1'),
    );

    await inMemoryAnswersRepository.create(newAnswer);

    const result = await sut.execute({
      authorId: '2',
      answerId: 'answer-1',
    });

    expect(result.isLeft()).toBeTruthy();
    expect(inMemoryAnswersRepository.items).toHaveLength(1);
  });
});
