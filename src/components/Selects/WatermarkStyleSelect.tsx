import React from 'react'
import { InputChangeEvent, WatermarkStyle } from 'utils/types'
import AppSelect, { Item } from '../Common/Core/AppSelect'
import { WatermarkStyles } from '../../utils/enums'

const MENU_ITEMS: Array<Item> = [
  {
    value: WatermarkStyles.single,
    title: 'Single center'
  },
  {
    value: WatermarkStyles.repeat,
    title: 'Repeated across image'
  }
]

type Props = {
  onChange: (watermarkStyle: WatermarkStyle) => void
  watermarkStyle: WatermarkStyle
}

const WatermarkStyleSelect = ({ onChange, watermarkStyle }: Props) => {
  return (
    <AppSelect
      items={MENU_ITEMS}
      value={watermarkStyle || WatermarkStyles.single}
      onChange={(event: InputChangeEvent) => {
        onChange(event.target.value as WatermarkStyle)
      }}
    />
  )
}

export default WatermarkStyleSelect