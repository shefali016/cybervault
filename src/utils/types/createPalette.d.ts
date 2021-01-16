import * as createPalette from '@material-ui/core/styles/createPalette'

declare module '@material-ui/core/styles/createPalette' {
  export interface PaletteOptions {
    success?: PaletteColorOptions
    ding?: PaletteColorOptions
    background: { default: PaletteColorOptions }
    border: string
  }

  export interface Palette {
    border: string
  }

  export interface TypeBackground {
    default: string
    secondary: string
    paper: string
  }

  export interface TypeText {
    primary: string
    secondary: string
    background: string
    disabled: string
    hint: string
    paper: string
    meta: string
  }
}
