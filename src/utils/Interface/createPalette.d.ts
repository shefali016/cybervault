/* eslint-disable @typescript-eslint/no-unused-vars */
import * as createPalette from '@material-ui/core/styles/createPalette'
import { ColorThemes } from 'utils/enums'

declare module '@material-ui/core/styles/createPalette' {
  export interface PaletteOptions {
    success?: PaletteColorOptions
    ding?: PaletteColorOptions
    background: { default: PaletteColorOptions }
    border: string
    status: {
      inProgress: React.CSSProperties['color']
      completed: React.CSSProperties['color']
      archived: React.CSSProperties['color']
    }
  }

  export interface Palette {
    colorTheme: ColorThemes
    border: string
    status: {
      inProgress: React.CSSProperties['color']
      completed: React.CSSProperties['color']
      archived: React.CSSProperties['color']
    }
  }

  export interface TypeBackground {
    shadow: string
    default: string
    secondary: string
    paper: string
    surface: string
    surfaceHighlight: string
  }

  export interface TypeText {
    primary: string
    secondary: string
    background: string
    disabled: string
    hint: string
    paper: string
    meta: string
    placeholder: string
  }
}
