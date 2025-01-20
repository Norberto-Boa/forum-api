import type { QuestionRepostory } from '../repositories/questions-repository'
import type { Question } from '../../enterprise/entities/question'
import { CreateQuestionService } from './create-question'

const fakeAnswersRepository: QuestionRepostory = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create: async function (question: Question) {},
}

test('create an question', async () => {
  const createQuestion = new CreateQuestionService(fakeAnswersRepository)

  const { question } = await createQuestion.execute({
    authorId: '1',
    content: 'this is an question',
    title: 'JavaScript Question',
  })

  expect(question.content).toEqual('this is an question')
})
