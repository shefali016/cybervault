import React from 'react'

type Props = { size?: number; color?: string; style?: {} }

export const Dot = ({ size = 4, color = '#000', style = {} }: Props) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        borderRadius: size / 2,
        ...style
      }}
    />
  )
}
