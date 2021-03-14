import { IconButton, Typography } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import clsx from 'clsx'
import { AppButton } from 'components/Common/Core/AppButton'
import { Dot } from 'components/Common/Dot'
import { MenuItem, PopoverButton } from 'components/Common/PopoverButton'
import React, { useState } from 'react'
import { useOnChange } from 'utils/hooks'
import { Project } from 'utils/Interface'
import MenuIcon from '@material-ui/icons/Menu'
import { useStyles } from './style'
import { isWidthDown } from '@material-ui/core/withWidth'

type ProjectSelectBarProps = {
  projects: Array<Project>
  onSelect: (project: Project) => void
  selectedProject: Project | undefined
  barStyle: 'light' | 'dark'
  gradiant1: string
  gradiant2: string
  width: any
  popoverMenuItems?: Array<MenuItem>
  onShare?: () => void
}

export const ProjectSelectBar = ({
  projects,
  onSelect,
  selectedProject,
  barStyle,
  gradiant1,
  gradiant2,
  width,
  popoverMenuItems,
  onShare
}: ProjectSelectBarProps) => {
  const classes = useStyles()
  const theme = useTheme()
  const [open, setOpen] = useState(false)

  useOnChange(width, (width: any) => {
    if (!isWidthDown('sm', width) && open) {
      setOpen(false)
    }
  })

  const renderProjectButtons = ({
    showActive = true,
    style = {}
  }: {
    showActive?: boolean
    style?: {}
  }) => {
    if (!(projects && projects.length)) {
      return null
    }

    return projects.map((project: Project | any, index: number) => {
      const isSelected = selectedProject?.id === project.id
      return (
        <AppButton
          onClick={() => {
            if (open) {
              setOpen(false)
            }
            onSelect(project)
          }}
          key={index}
          className={classes.projectButton}
          style={style}>
          <Typography variant={'inherit'} noWrap={true}>
            {project.campaignName}
          </Typography>

          {isSelected && showActive && (
            <Dot
              className={classes.activeDot}
              size={7}
              color={barStyle === 'dark' ? '#ffffff55' : '#00000055'}
            />
          )}
        </AppButton>
      )
    })
  }

  const shouldRenderPopover = !!popoverMenuItems && !!popoverMenuItems.length
  const shouldRenderShare = typeof onShare === 'function'

  const renderPopover = ({ style = {} }: { style?: {} }) => {
    return (
      !!popoverMenuItems &&
      !!popoverMenuItems.length && (
        <PopoverButton
          menuItems={popoverMenuItems}
          style={style}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
        />
      )
    )
  }

  return (
    <div>
      <div
        className={classes.projectBarContainer}
        style={{
          background: `linear-gradient(to right ,${gradiant1}, ${gradiant2})`
        }}>
        <div
          className={clsx(
            classes.portfoloTabsList,
            barStyle === 'dark' ? classes.portfoloDarkTabsList : '',
            'hiddenSmDown'
          )}>
          {renderProjectButtons({ showActive: true })}
        </div>
        <div
          className={clsx(
            classes.portfoloTabsList,
            barStyle === 'dark' ? classes.portfoloDarkTabsList : '',
            'hiddenMdUp'
          )}>
          {!!selectedProject && (
            <AppButton
              onClick={() => setOpen(!open)}
              className={clsx(classes.projectButton, 'alignLeftButton')}>
              <Typography variant={'inherit'} noWrap={true}>
                {selectedProject.campaignName}
              </Typography>
            </AppButton>
          )}
        </div>

        <IconButton className={'hiddenMdUp'} onClick={() => setOpen(!open)}>
          <MenuIcon
            className={barStyle === 'dark' ? 'whiteIconLg' : 'blackIconLg'}
          />
        </IconButton>

        <div className={clsx('row', 'hiddenSmDown')}>
          {renderPopover({ style: { marginRight: theme.spacing(2) } })}
          {shouldRenderShare && (
            <AppButton onClick={onShare} className={classes.shareButton}>
              Share
            </AppButton>
          )}
        </div>
      </div>

      <div
        className={clsx(classes.projectBarCollapsed)}
        style={{
          height: open
            ? projects.length * 73 +
              (shouldRenderShare || shouldRenderPopover ? 50 : 0)
            : 0,
          paddingTop: open ? undefined : 0,
          background: `linear-gradient(to right ,${gradiant1}, ${gradiant2})`
        }}>
        {renderProjectButtons({
          showActive: false,
          style: { marginBottom: theme.spacing(1) }
        })}
        <div
          className='row'
          style={{
            position: 'relative',
            width: '100%',
            justifyContent: 'center',
            marginTop: theme.spacing(2)
          }}>
          {shouldRenderShare && (
            <AppButton className={classes.shareButton} onClick={onShare}>
              Share
            </AppButton>
          )}
          {renderPopover({
            style: { position: 'absolute', right: theme.spacing(2) }
          })}
        </div>
      </div>
    </div>
  )
}
