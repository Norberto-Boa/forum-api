import { CreateQuestionService } from './create-question';
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: CreateQuestionService;

describe('CreateQuestionService', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new CreateQuestionService(inMemoryQuestionsRepository);
  });

  it('should be able to create a new Question', async () => {
    const result = await sut.execute({
      authorId: '1',
      content: 'this is an question',
      title: 'JavaScript Question',
    });

    expect(result.value?.question.content).toEqual('this is an question');
  });
});
