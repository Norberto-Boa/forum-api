import { Answer } from "../entities/answer";

interface AnswerQuestionServiceRequest {
  questionId: string;
  content: string;
  authorId: string;
}

export class AnswerQuestionService {
  execute({ questionId, content, authorId }: AnswerQuestionServiceRequest) {
    const answer = new Answer({
      authorId,
      questionId,
      content,
    });

    return answer;
  }
}
