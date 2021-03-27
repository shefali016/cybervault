import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'
import { ColorThemes } from 'utils/enums'

const commonPalette = {
  status: {
    inProgress: '#ffea00',
    completed: '#4caf50',
    archived: '#f44336'
  },
  info: { main: '#000' }
}

const darkPalette = {
  // action: { hoverOpacity: 0.3 },
  ...commonPalette,
  colorTheme: ColorThemes.DARK,
  primary: { main: '#0773FF', light: '#5ea5fc', dark: '#3462fc' },
  background: {
    shadow: '#2f2f2f',
    default: '#181818',
    secondary: '#202020',
    surface: '#272726',
    surfaceHighlight: '#40403f',
    paper: '#ffffff'
  },
  text: {
    primary: '#24262b',
    secondary: '#e3e3e3',
    background: '#ffffff',
    paper: '#24262b',
    meta: '#828487',
    placeholder: '#878888'
  },
  border: '#40403f'
}

const lightPalette = {
  // action: { hoverOpacity: 0.3 },
  ...commonPalette,
  colorTheme: ColorThemes.LIGHT,
  primary: { main: '#0773FF', light: '#5ea5fc', dark: '#3462fc' },
  background: {
    shadow: '#CCCCCC',
    default: '#F9F9F8',
    secondary: '#FFFFFF',
    surface: '#F2F2F2',
    surfaceHighlight: '#E5E5E5',
    paper: '#ffffff'
  },
  text: {
    primary: '#030302',
    secondary: '#606060',
    background: '#030302',
    paper: '#030302',
    meta: '#606060',
    placeholder: '#878888'
  },
  border: '#CCCCCC'
}

export const createTheme = (colorTheme: ColorThemes) => {
  const theme = createMuiTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 500,
        md: 770,
        lg: 1280,
        xl: 1920
      }
    },
    palette: colorTheme === ColorThemes.DARK ? darkPalette : lightPalette,
    shape: { borderRadius: 12 },
    typography: {
      body1: { fontSize: 18 },
      caption: { fontSize: 13 }
    }
  })
  return responsiveFontSizes(theme)
}
