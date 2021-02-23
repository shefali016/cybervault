import {
  FaCcVisa,
  FaCcMastercard,
  FaCcDiscover,
  FaCcDinersClub,
  FaCcJcb
} from 'react-icons/fa'
import { AiFillCreditCard } from 'react-icons/ai'
import { SiAmericanexpress } from 'react-icons/si'

export const getCardIcon = (cardType: string | undefined) => {
  switch (cardType) {
    case 'visa':
      return FaCcVisa
    case 'mastercard':
      return FaCcMastercard
    case 'amex':
      return SiAmericanexpress
    case 'discover':
      return FaCcDiscover
    case 'diners':
      return FaCcDinersClub
    case 'jcb':
      return FaCcJcb
    default:
      return AiFillCreditCard
  }
}
