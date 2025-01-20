import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { GetQuestionBySlugService } from './get-question-by-slug';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Slug } from '../../enterprise/entities/value-objects/slug';
import { Question } from '../../enterprise/entities/question';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: GetQuestionBySlugService;

describe('GetQuestionBySlugService', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new GetQuestionBySlugService(inMemoryQuestionsRepository);
  });

  it('should be able to create a new Question', async () => {
    const newQuestion = Question.create({
      authorId: new UniqueEntityID(),
      title: 'Example Question',
      content: 'Example Content',
      slug: Slug.create('example-question'),
    });

    await inMemoryQuestionsRepository.create(newQuestion);

    const { question } = await sut.execute({
      slug: 'example-question',
    });

    expect(question.title).toEqual(newQuestion.title);
  });
});
