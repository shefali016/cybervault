import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  listContainer: {
    background: theme.palette.background.secondary,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderStyle: 'solid',
    borderWidth: 0.5,
    borderColor: theme.palette.background.surface,
    borderTopWidth: 0,
    width: 400,
    height: 500,
    color: theme.palette.text.background,
    display: 'flex',
    flexDirection: 'column',
    zIndex: 2000,
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    }
  },
  listHeader: {
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    borderColor: theme.palette.background.surface
  },
  listTitle: { width: 300 },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    cursor: 'pointer',
    '&:hover': {}
  },
  listEmptyContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: theme.spacing(6)
  },
  listEmptyIcon: { fontSize: 60, color: theme.palette.text.meta, margin: 0 },
  listEmptyTitle: { color: theme.palette.text.meta }
}))
