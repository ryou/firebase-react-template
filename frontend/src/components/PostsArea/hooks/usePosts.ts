import { useComponentDidMount } from '../../../shared/hooks/useComponentDidMount'
import { useState } from 'react'
import { Post } from '../../../types'
import { IPostRepository } from '../../../repository/PostRepository/IPostRepository'

// TODO: ~Functionって名前微妙
export type AddPostFunction = (title: string, content: string) => Promise<void>
export type DeletePostFunction = (id: string) => Promise<void>

export const usePosts = (postRepository: IPostRepository) => {
  const [initialized, setInitialized] = useState(false)
  const [posts, setPosts] = useState<Post[]>([])

  useComponentDidMount(() => {
    ;(async () => {
      const posts = await postRepository.listPosts()

      setPosts(posts)
      setInitialized(true)
    })()
  })

  const addPost: AddPostFunction = async (title: string, content: string) => {
    const post = await postRepository.addPost(title, content)

    setPosts(posts.concat(post))
  }
  const deletePost = async (id: string) => {
    await postRepository.deletePost(id)

    setPosts(posts.filter((post) => post.id !== id))
  }

  return {
    initialized,
    posts,
    addPost,
    deletePost,
  }
}
