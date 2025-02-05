import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';
import { AnswerQuestionService } from './answer-question';

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: AnswerQuestionService;

describe('CreateQuestionService', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new AnswerQuestionService(inMemoryAnswersRepository);
  });

  it('should be able to create a new Question', async () => {
    const result = await sut.execute({
      authorId: '1',
      questionId: '1',
      content: 'this is an question',
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryAnswersRepository.items[0]).toEqual(result.value?.answer);
  });
});
