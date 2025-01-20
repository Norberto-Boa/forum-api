import type { Question } from '@/domain/forum/enterprise/entities/question';

export interface QuestionRepository {
  create(question: Question): Promise<void>;
  findBySlug(slug: string): Promise<Question | null>;
}
