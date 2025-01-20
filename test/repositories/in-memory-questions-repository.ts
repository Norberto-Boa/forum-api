import type { QuestionRepository } from '@/domain/forum/application/repositories/questions-repository';
import type { Question } from '@/domain/forum/enterprise/entities/question';

export class InMemoryQuestionsRepository implements QuestionRepository {
  public items: Question[] = [];

  async create(question: Question): Promise<void> {
    this.items.push(question);
  }

  async findBySlug(slug: string): Promise<Question | null> {
    const question = await this.items.find((item) => item.slug.value === slug);

    if (!question) {
      return null;
    }

    return question;
  }
}
