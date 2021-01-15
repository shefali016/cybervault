import React from 'react'
import { InputChangeEvent, WatermarkControl } from 'utils/types'
import AppSelect, { Item } from '../Common/Core/AppSelect'
import { WatermarkControls } from '../../utils/enums'

const MENU_ITEMS: Array<Item> = [
  {
    value: WatermarkControls.all,
    title: 'Invoices and portfolios'
  },
  {
    value: WatermarkControls.portfolios,
    title: 'Only portfolios'
  },
  {
    value: WatermarkControls.invoices,
    title: 'Only invoices'
  },
  {
    value: WatermarkControls.none,
    title: "Don't use watermarks"
  }
]

type Props = {
  onChange: (watermarkControl: WatermarkControl) => void
  watermarkControl: WatermarkControl
}

const WatermarkControlSelect = ({ onChange, watermarkControl }: Props) => {
  return (
    <AppSelect
      items={MENU_ITEMS}
      value={watermarkControl || WatermarkControls.all}
      onChange={(event: InputChangeEvent) => {
        onChange(event.target.value as WatermarkControl)
      }}
    />
  )
}

export default WatermarkControlSelect
