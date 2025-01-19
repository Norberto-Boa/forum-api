import { UniqueEntityID } from "../../core/entities/unique-entity-id";
import { Answer } from "../entities/answer";
import type { AnswersRepository } from "../repositories/answer-repository";

interface AnswerQuestionServiceRequest {
  questionId: string;
  content: string;
  authorId: string;
}

export class AnswerQuestionService {
  constructor(private answersRepository: AnswersRepository) {}
  async execute({
    questionId,
    content,
    authorId,
  }: AnswerQuestionServiceRequest) {
    const answer = Answer.create({
      authorId: new UniqueEntityID(authorId),
      questionId: new UniqueEntityID(questionId),
      content,
    });

    await this.answersRepository.create(answer);

    return answer;
  }
}
