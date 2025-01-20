import { AnswerQuestionService } from '@/domain/forum/application/services/answer-question'
import type { AnswersRepository } from '@/domain/forum/application/repositories/answer-repository'
import type { Answer } from '@/domain/forum/enterprise/entities/answer'

const fakeAnswersRepository: AnswersRepository = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create: async function (answer: Answer) {},
}

test('create an answer', async () => {
  const answerQuestion = new AnswerQuestionService(fakeAnswersRepository)

  const answer = await answerQuestion.execute({
    questionId: '1',
    authorId: '1',
    content: 'This is a sample answer',
  })

  expect(answer.content).toEqual('This is a sample answer')
})
