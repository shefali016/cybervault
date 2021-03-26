import { CHANGE_COLOR_THEME } from 'actions/actionTypes'
import { ColorThemes } from '../utils/enums'

export type Action = {
  type: string
  colorTheme: ColorThemes
}

export type State = {
  colorTheme: ColorThemes
}

const initialState = {
  colorTheme: ColorThemes.DARK
}

const theme = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case CHANGE_COLOR_THEME:
      return { ...state, colorTheme: action.colorTheme }
    default:
      return state
  }
}

export default theme
