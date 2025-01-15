import { expect, test } from "vitest";
import { AnswerQuestionService } from "./answer-question";

test("create an answer", () => {
  const answerQuestion = new AnswerQuestionService();

  const answer = answerQuestion.execute({
    questionId: "1",
    authorId: "1",
    content: "This is a sample answer",
  });

  expect(answer.content).toEqual("This is a sample answer");
});
