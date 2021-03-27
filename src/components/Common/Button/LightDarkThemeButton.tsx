import React from 'react'
import { AppIconButton } from '../Core/AppIconButton'
import BrightnessIcon from '@material-ui/icons/Brightness4'
import { MenuItem, PopoverButton } from '../Popover/PopoverButton'
import { ColorThemes } from 'utils/enums'
import { changeColorTheme } from '../../../actions/theme'
import { ReduxState } from 'reducers/rootReducer'
import { connect } from 'react-redux'

type StateProps = {
  colorTheme: ColorThemes
}

type DispatchProps = {
  setColorTheme: (colorTheme: ColorThemes) => void
}

type Props = {
  colorTheme: ColorThemes
  style: {}
} & StateProps &
  DispatchProps

const LightDarkThemeButton = ({
  colorTheme,
  setColorTheme,
  style = {}
}: Props) => {
  const menuItems: MenuItem[] = [
    {
      title: 'Light',
      onClick: () => setColorTheme(ColorThemes.LIGHT),
      isSelected: colorTheme === ColorThemes.LIGHT
    },
    {
      title: 'Dark',
      onClick: () => setColorTheme(ColorThemes.DARK),
      isSelected: colorTheme === ColorThemes.DARK
    }
  ]

  return (
    <PopoverButton menuItems={menuItems} style={style} isSelecting={true}>
      {({ onClick, id }) => (
        <AppIconButton aria-owns={id} Icon={BrightnessIcon} onClick={onClick} />
      )}
    </PopoverButton>
  )
}

const mapState = (state: ReduxState): StateProps => ({
  colorTheme: state.theme.colorTheme
})

const mapDispatch = (dispatch: any): DispatchProps => ({
  setColorTheme: (colorTheme: ColorThemes) =>
    dispatch(changeColorTheme(colorTheme))
})

export default connect(mapState, mapDispatch)(LightDarkThemeButton)
