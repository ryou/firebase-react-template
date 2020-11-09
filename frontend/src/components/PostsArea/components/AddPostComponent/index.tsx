import React, { useState } from 'react'
import { InputComponent } from '../../../InputComponent'
import { ValidationError } from '../../../../shared/errors/ValidationError'
import { AddPostFunction } from '../../hooks/usePosts'

type Props = {
  addPost: AddPostFunction
}
// TODO: Form機能の共通化
export const AddPostComponent = (props: Props) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const hasError = errorMessage.length > 0

  const clearForm = () => {
    setTitle('')
    setContent('')
    setErrorMessage('')
  }

  const onChangeTitle = (value: string) => {
    setTitle(value)
  }
  const onChangeContent = (value: string) => {
    setContent(value)
  }
  const onClickSubmit = async () => {
    try {
      await props.addPost(title, content)
      clearForm()
    } catch (error) {
      if (error instanceof ValidationError) {
        setErrorMessage('不正な入力です')
      } else {
        throw error
      }
    }
  }

  const ErrorMessage = () => {
    return <div>{errorMessage}</div>
  }

  return (
    <div>
      {hasError && <ErrorMessage />}
      <div>
        title:
        <InputComponent value={title} onChange={onChangeTitle} />
      </div>
      <div>
        content:
        <InputComponent value={content} onChange={onChangeContent} />
      </div>
      <div>
        <button type="button" onClick={onClickSubmit}>
          追加
        </button>
      </div>
    </div>
  )
}
