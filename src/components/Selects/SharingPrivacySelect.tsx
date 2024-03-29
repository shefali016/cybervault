import React from 'react'
import { SharingPrivacy } from 'utils/Interface'
import AppSelect, { Item } from '../Common/Core/AppSelect'
import { SharingPrivacies } from '../../utils/enums'

const MENU_ITEMS: Array<Item> = [
  {
    value: SharingPrivacies.OPEN,
    title: 'Anyone can download and view'
  },
  {
    value: SharingPrivacies.STRICT,
    title: 'Only invited clients can download and view'
  }
]

type Props = {
  onChange: (privacy: SharingPrivacy) => void
  privacy: SharingPrivacy
  className?: string
}

const SharingPrivacySelect = ({ onChange, privacy, className }: Props) => {
  return (
    <AppSelect
      className={className}
      items={MENU_ITEMS}
      value={privacy !== undefined ? privacy : SharingPrivacies.STRICT}
      onChange={(event: any) => {
        onChange(event.target.value)
      }}
    />
  )
}

export default SharingPrivacySelect
