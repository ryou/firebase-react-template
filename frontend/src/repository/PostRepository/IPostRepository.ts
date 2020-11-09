import { Post } from '../../types'

export interface IPostRepository {
  addPost(title: string, content: string): Promise<Post>

  deletePost(id: string): Promise<void>

  listPosts(): Promise<Post[]>
}
