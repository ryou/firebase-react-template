import { IPostRepository } from './IPostRepository'
import { Post } from '../../types'
import { dummyDelay } from '../../shared/dummyDelay'
import { getRandomString } from '../../shared/getRandomString'

export class MockPostRepositoryRepository implements IPostRepository {
  async addPost(title: string, content: string): Promise<Post> {
    await dummyDelay()

    return {
      id: getRandomString(10),
      title,
      content,
      createdAt: '2020/01/01 00:00:00',
    }
  }

  async deletePost(id: string): Promise<void> {
    await dummyDelay()
  }

  async listPosts(): Promise<Post[]> {
    await dummyDelay()

    return [
      {
        id: '1',
        title: 'post01',
        content: 'post01',
        createdAt: '2020/01/01 00:00:00',
      },
      {
        id: '2',
        title: 'post02',
        content: 'post02',
        createdAt: '2020/01/01 00:00:00',
      },
    ]
  }
}
