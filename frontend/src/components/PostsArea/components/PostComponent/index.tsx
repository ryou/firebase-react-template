import React from 'react'
import { Post } from '../../../../types'
import styles from './style.module.css'
import { useSelector } from 'react-redux'
import { selectIsAuthenticated } from '../../../../store/Auth'
import { DeletePostFunction } from '../../hooks/usePosts'

type Props = {
  post: Post
  deletePost: DeletePostFunction
}
export const PostComponent = (props: Props) => {
  const isAuthenticated = useSelector(selectIsAuthenticated)

  const onClickDelete = async () => {
    await props.deletePost(props.post.id)
  }

  const DeleteButton = () => {
    return (
      <button type="button" onClick={onClickDelete}>
        削除
      </button>
    )
  }

  return (
    <div className={styles.root}>
      <h2 className={styles.title}>{props.post.title}</h2>
      <p>{props.post.content}</p>
      <p>{props.post.createdAt}</p>
      {isAuthenticated && <DeleteButton />}
    </div>
  )
}
