import React, { ChangeEvent } from 'react'

type Props = {
  value: string
  onChange: (value: string) => void
}
export const InputComponent = (props: Props) => {
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    props.onChange(event.target.value)
  }

  return <input type="text" onChange={onChange} value={props.value} />
}
