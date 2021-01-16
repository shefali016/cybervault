import { Typography } from '@material-ui/core'
import React from 'react'
import { InputChangeEvent, SharingPrivacy } from 'utils/types'
import AppSelect, { Item } from '../Common/Core/AppSelect'
import { SharingPrivacies } from '../../utils/enums'

const MENU_ITEMS: Array<Item> = [
  {
    value: SharingPrivacies.open,
    title: 'Anyone can download and view'
  },
  {
    value: SharingPrivacies.strict,
    title: 'Only invited clients can download and view'
  }
]

type Props = {
  onChange: (privacy: SharingPrivacy) => void
  privacy: SharingPrivacy
}

const SharingPrivacySelect = ({ onChange, privacy }: Props) => {
  return (
    <AppSelect
      items={MENU_ITEMS}
      value={privacy || SharingPrivacies.strict}
      onChange={(event: InputChangeEvent) => {
        onChange(event.target.value as SharingPrivacy)
      }}
    />
  )
}

export default SharingPrivacySelect