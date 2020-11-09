import { renderHook, act } from '@testing-library/react-hooks'
import { usePosts } from './usePosts'
import { IPostRepository } from '../../../repository/PostRepository/IPostRepository'
import { Post } from '../../../types'

class MockPostRepositoryForTest implements IPostRepository {
  public posts: Post[] = []

  async addPost(title: string, content: string): Promise<Post> {
    const newPost = {
      id: String(this.posts.length + 1),
      title,
      content,
      createdAt: '2020/1/1 00:00:00',
    }

    this.posts = this.posts.concat(newPost)

    return newPost
  }

  async deletePost(id: string): Promise<void> {
    this.posts = this.posts.filter((post) => post.id !== id)
  }

  async listPosts(): Promise<Post[]> {
    return this.posts
  }
}

describe('initialized', () => {
  it('初期化完了後trueになる', async () => {
    const mockRepository = new MockPostRepositoryForTest()
    const initialPosts = [
      {
        id: '1',
        title: 'title1',
        content: 'content1',
        createdAt: '2020/1/1 00:00:00',
      },
    ]
    mockRepository.posts = initialPosts
    const { result, waitForNextUpdate } = renderHook(() =>
      usePosts(mockRepository)
    )

    await waitForNextUpdate()

    expect(result.current.initialized).toBe(true)
    expect(result.current.posts).toEqual(initialPosts)
  })
})

describe('addPost', () => {
  it('postsに追加される', async () => {
    const mockRepository = new MockPostRepositoryForTest()
    const initialPosts = [
      {
        id: '1',
        title: 'title1',
        content: 'content1',
        createdAt: '2020/1/1 00:00:00',
      },
      {
        id: '2',
        title: 'title2',
        content: 'content2',
        createdAt: '2020/1/2 00:00:00',
      },
    ]
    mockRepository.posts = initialPosts
    const { result, waitForNextUpdate } = renderHook(() =>
      usePosts(mockRepository)
    )

    await waitForNextUpdate()

    await act(() => result.current.addPost('title3', 'content3'))

    expect(result.current.posts).toEqual([
      ...initialPosts,
      {
        id: '3',
        title: 'title3',
        content: 'content3',
        createdAt: '2020/1/1 00:00:00',
      },
    ])
  })
})

describe('deletePost', () => {
  it('postsから削除される', async () => {
    const mockRepository = new MockPostRepositoryForTest()
    const initialPosts = [
      {
        id: '1',
        title: 'title1',
        content: 'content1',
        createdAt: '2020/1/1 00:00:00',
      },
      {
        id: '2',
        title: 'title2',
        content: 'content2',
        createdAt: '2020/1/2 00:00:00',
      },
    ]
    mockRepository.posts = initialPosts
    const { result, waitForNextUpdate } = renderHook(() =>
      usePosts(mockRepository)
    )

    await waitForNextUpdate()

    await act(() => result.current.deletePost('1'))

    expect(result.current.posts).toEqual([
      {
        id: '2',
        title: 'title2',
        content: 'content2',
        createdAt: '2020/1/2 00:00:00',
      },
    ])
  })
})
