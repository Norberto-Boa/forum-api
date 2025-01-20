import { AnswerQuestionService } from "./answer-question";
import type { AnswersRepository } from "../repositories/answer-repository";
import type { Answer } from "../entities/answer";

const fakeAnswersRepository: AnswersRepository = {
  create: async function (answer: Answer) {
    return;
  },
};

test("create an answer", async () => {
  const answerQuestion = new AnswerQuestionService(fakeAnswersRepository);

  const answer = await answerQuestion.execute({
    questionId: "1",
    authorId: "1",
    content: "This is a sample answer",
  });

  expect(answer.content).toEqual("This is a sample answer");
});
