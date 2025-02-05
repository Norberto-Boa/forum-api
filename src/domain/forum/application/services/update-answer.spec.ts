import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';
import { UpdateAnswerService } from './update-answer';
import { makeAnswer } from 'test/factories/make-answer';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: UpdateAnswerService;

describe('UpdateAnswerService', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new UpdateAnswerService(inMemoryAnswersRepository);
  });

  it('should be able to update Answer', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('1'),
      },
      new UniqueEntityID('answer-1'),
    );

    await inMemoryAnswersRepository.create(newAnswer);

    await sut.execute({
      authorId: '1',
      answerId: newAnswer.id.toValue(),
      content: 'answer',
    });

    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: 'answer',
    });
  });

  it('should be not be able to update Answer with different authorId', async () => {
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
      content: 'answer',
    });

    expect(result.isLeft()).toBeTruthy();
  });
});
