import {CHANGE_COLOR_THEME} from "./actionTypes"
import {ColorThemes} from "../utils/enums";

export const changeColorTheme = (colorTheme: ColorThemes) => ({type: CHANGE_COLOR_THEME, colorTheme})
