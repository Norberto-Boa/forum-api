import type { Answer } from '../../enterprise/entities/answer';
import type { AnswersRepository } from '../repositories/answers-repository';
import type { QuestionRepository } from '../repositories/questions-repository';

interface ChooseBestAnswerServiceRequest {
  authorId: string;
  answerId: string;
}

interface ChooseBestAnswerServiceResponse {
  answer: Answer;
}

export class ChooseBestAnswerService {
  constructor(
    private questionsRepository: QuestionRepository,
    private answersRepository: AnswersRepository,
  ) {}

  async execute({
    authorId,
    answerId,
  }: ChooseBestAnswerServiceRequest): Promise<ChooseBestAnswerServiceResponse> {
    const answer = await this.answersRepository.findById(answerId.toString());

    if (!answer) {
      throw new Error('Answer not found');
    }

    const question = await this.questionsRepository.findById(
      answer.questionId.toValue(),
    );

    if (!question) {
      throw new Error('Question not found');
    }

    if (question.authorId.toString() !== authorId) {
      throw new Error('Not allowed to update');
    }

    question.bestAnswerId = answer.id;

    await this.answersRepository.save(answer);

    return {
      answer,
    };
  }
}
