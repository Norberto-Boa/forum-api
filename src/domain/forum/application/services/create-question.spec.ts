import { UniqueEntityID } from '@/core/entities/unique-entity-id';
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
      attachmentsIds: ['1', '2'],
    });

    expect(result.value?.question.content).toEqual('this is an question');
    expect(inMemoryQuestionsRepository.items[0]).toEqual(
      result.value?.question,
    );
    expect(
      inMemoryQuestionsRepository.items[0].attachments.currentItems,
    ).toHaveLength(2);
    expect(
      inMemoryQuestionsRepository.items[0].attachments.currentItems,
    ).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityID('2') }),
    ]);
  });
});
