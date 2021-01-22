/* eslint-disable @typescript-eslint/no-unused-vars */
import * as Typography from '@material-ui/core/Typography/Typography'

declare module '@material-ui/core/Typography/Typography' {
  interface TypographyTypeMap {
    props: P & {
      align?: PropTypes.Alignment
      /**
       * The content of the component.
       */
      children?: React.ReactNode
      color?:
        | 'initial'
        | 'inherit'
        | 'primary'
        | 'secondary'
        | 'textPrimary'
        | 'textSecondary'
        | 'error'
        | 'background'
        | 'paper'
      display?: 'initial' | 'block' | 'inline'
      gutterBottom?: boolean
      noWrap?: boolean
      paragraph?: boolean
      variant?: Variant | 'inherit'
      variantMapping?: Partial<Record<Variant, string>>
    }
    defaultComponent: D
    classKey: TypographyClassKey
  }
}
