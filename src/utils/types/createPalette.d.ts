import * as createPalette from '@material-ui/core/styles/createPalette'

declare module '@material-ui/core/styles/createPalette' {
  interface PaletteOptions {
    success?: PaletteColorOptions
    ding?: PaletteColorOptions
    background: { default: PaletteColorOptions }
  }

  interface TypeBackground {
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
  }
}
