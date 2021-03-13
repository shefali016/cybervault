import React from 'react'

type Props = { size?: number; color?: string; style?: {}; className?: string }

export const Dot = ({
  size = 4,
  color = '#000',
  style = {},
  className
}: Props) => {
  return (
    <div
      className={className}
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
