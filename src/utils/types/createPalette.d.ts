import * as createPalette from '@material-ui/core/styles/createPalette'

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
    border: string
    status: {
      inProgress: React.CSSProperties['color']
      completed: React.CSSProperties['color']
      archived: React.CSSProperties['color']
    }
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
