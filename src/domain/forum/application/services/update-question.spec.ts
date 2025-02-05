import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { UpdateQuestionService } from './update-question';
import { makeQuestion } from 'test/factories/make-question';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: UpdateQuestionService;

describe('UpdateQuestionService', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new UpdateQuestionService(inMemoryQuestionsRepository);
  });

  it('should be able to update Question', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('1'),
      },
      new UniqueEntityID('question-1'),
    );

    await inMemoryQuestionsRepository.create(newQuestion);

    await sut.execute({
      authorId: '1',
      questionId: newQuestion.id.toValue(),
      content: 'question',
      title: 'Minha questao',
    });

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: 'Minha questao',
      content: 'question',
    });
  });

  it('should be not be able to update Question with different authorId', async () => {
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
      content: 'question',
      title: 'Minha questao',
    });

    expect(result.isLeft()).toBeTruthy();
  });
});
