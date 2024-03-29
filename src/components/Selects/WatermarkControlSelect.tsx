import React from 'react'
import { WatermarkControl } from 'utils/Interface'
import AppSelect, { Item } from '../Common/Core/AppSelect'
import { WatermarkControls } from '../../utils/enums'

const MENU_ITEMS: Array<Item> = [
  {
    value: WatermarkControls.ALL,
    title: 'Invoices and portfolios'
  },
  {
    value: WatermarkControls.PORTFOLIO,
    title: 'Only portfolios'
  },
  {
    value: WatermarkControls.INVOICES,
    title: 'Only invoices'
  },
  {
    value: WatermarkControls.NONE,
    title: "Don't use watermarks"
  }
]

type Props = {
  onChange: (watermarkControl: WatermarkControl) => void
  watermarkControl: WatermarkControl
  className?: string
}

const WatermarkControlSelect = ({
  onChange,
  watermarkControl,
  className
}: Props) => {
  return (
    <AppSelect
      className={className}
      items={MENU_ITEMS}
      value={
        watermarkControl !== undefined
          ? watermarkControl
          : WatermarkControls.ALL
      }
      onChange={(event: any) => {
        onChange(event.target.value as WatermarkControl)
      }}
    />
  )
}

export default WatermarkControlSelect
