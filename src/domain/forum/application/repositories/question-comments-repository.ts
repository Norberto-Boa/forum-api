import type { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment';

export interface QuestionCommentsRepository {
  create(question: QuestionComment): Promise<void>;
  findById(id: string): Promise<QuestionComment | null>;
  delete(comment: QuestionComment): Promise<void>;
}
