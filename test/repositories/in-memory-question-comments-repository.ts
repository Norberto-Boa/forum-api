import type { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository';
import type { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment';

export class InMemoryQuestionCommentsRepository
  implements QuestionCommentsRepository
{
  public items: QuestionComment[] = [];

  async create(questionComment: QuestionComment): Promise<void> {
    this.items.push(questionComment);
  }

  async findById(id: string): Promise<QuestionComment | null> {
    const item = await this.items.find((item) => item.id.toValue() === id);

    if (!item) {
      return null;
    }

    return item;
  }

  async delete(comment: QuestionComment): Promise<void> {
    const itemIndex = await this.items.findIndex(
      (item) => item.id.toString() === comment.id.toString(),
    );

    this.items.splice(itemIndex, 1);
  }
}
