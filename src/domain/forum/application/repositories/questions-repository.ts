import type { Question } from '@/domain/forum/enterprise/entities/question'

export interface QuestionRepostory {
  create(question: Question): Promise<void>
}
