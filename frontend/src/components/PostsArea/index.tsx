import { useSelector } from 'react-redux'
import { selectIsAuthenticated } from '../../store/Auth'
import styles from './style.module.css'
import { AddPostComponent } from './components/AddPostComponent'
import React from 'react'
import { usePosts } from './hooks/usePosts'
import { PostComponent } from './components/PostComponent'
import { postRepository } from '../../singletonFactory'

export const PostsArea = () => {
  const { initialized, posts, addPost, deletePost } = usePosts(postRepository)
  const isAuthenticated = useSelector(selectIsAuthenticated)

  const AddPostArea = () => {
    return (
      <div className={styles.addPostArea}>
        <AddPostComponent addPost={addPost} />
      </div>
    )
  }

  return (
    <div>
      {initialized && (
        <React.Fragment>
          {isAuthenticated && <AddPostArea />}
          <div>
            <div className={styles.list}>
              {posts.map((post) => (
                <div className={styles.item} key={post.id}>
                  <PostComponent post={post} deletePost={deletePost} />
                </div>
              ))}
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  )
}
