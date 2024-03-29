import React from 'react'
import { WatermarkStyle } from 'utils/Interface'
import AppSelect, { Item } from '../Common/Core/AppSelect'
import { WatermarkStyles } from '../../utils/enums'

const MENU_ITEMS: Array<Item> = [
  {
    value: WatermarkStyles.SINGLE,
    title: 'Single center'
  },
  {
    value: WatermarkStyles.REPEAT,
    title: 'Repeated across image'
  }
]

type Props = {
  onChange: (watermarkStyle: WatermarkStyle) => void
  watermarkStyle: WatermarkStyle
  className?: string
}

const WatermarkStyleSelect = ({
  onChange,
  watermarkStyle,
  className
}: Props) => {
  return (
    <AppSelect
      className={className}
      items={MENU_ITEMS}
      value={
        watermarkStyle !== undefined ? watermarkStyle : WatermarkStyles.SINGLE
      }
      onChange={(event: any) => {
        onChange(event.target.value as WatermarkStyle)
      }}
    />
  )
}

export default WatermarkStyleSelect
