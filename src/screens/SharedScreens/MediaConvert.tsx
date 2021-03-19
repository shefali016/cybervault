import react, { useState, useEffect } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import { GradiantButton } from '../../components/Common/Button/GradiantButton'
import { ProjectAsset } from 'utils/Interface'
import { getAssets } from 'apis/assets'
import CloseButton from '../../components/Common/Button/CloseButton'
import AppModal from 'components/Common/Modal'
import { createNull } from 'typescript'

type Media = {
  format: string
  resolution: number
  ratio: {
    w: number
    h: number
  }
  fileName: string
  assetId: string
  fileHeight: number
  fileWidth: number
}

type MediaConvertProps = {
  mediaConvert: (val: Media) => void
  assetIds: Array<string>
  accountId: string
  selectedAsset: string
  mediaConversionLoading: boolean
}
const MediaConvert = ({
  mediaConvert,
  assetIds,
  accountId,
  selectedAsset,
  mediaConversionLoading
}: MediaConvertProps) => {
  const classes = useStyles()
  const [open, setOpen] = useState<any>(false)
  const [state, setState] = useState<any>({
    format: 'h.264',
    resolution: 720,
    ratio: {
      w: 9,
      h: 16
    }
  })
  const [items, setItems] = useState<any>([])
  const [error, setError] = useState('')

  const chooseSize = (type: string, value: any) => {
    setState({
      ...state,
      [type]: value
    })
  }

  const [asset, setAsset] = useState<any>({})
  const [activeAsset, setActiveAsset] = useState<any>({})

  useEffect(() => {
    if (Array.isArray(assetIds) && assetIds) {
      loadAssets(assetIds)
    }
  }, [assetIds])

  const loadAssets = async (ids: Array<string>) => {
    const assets: Array<ProjectAsset> = await getAssets(ids, accountId)
    setAsset(assets)
  }

  const add = () => {
    setOpen(true)
  }

  const resolutions = [
    {
      res: 2160,
      type: '4K',
      desc: '(3840X2160)'
    },
    {
      res: 1440,
      type: '2k',
      desc: '(2560x1440)'
    },
    {
      res: 1080,
      type: '1080p',
      desc: '(1920X1080)'
    },
    {
      res: 720,
      type: '720p',
      desc: '(1280×720)'
    }
  ]

  useEffect(() => {
    if (selectedAsset && asset.length) {
      setActiveAsset(
        asset.filter((ass: ProjectAsset, i: number) => {
          return ass.id === selectedAsset
        })[0]
      )
    }
  }, [selectedAsset, asset])

  const validate = () => {
    if (!state.resolution) {
      return 'Choose Resolution'
    } else if (!state.format) {
      return 'Choose Format'
    } else if (!state.ratio) {
      return 'Choose Aspect Ratio'
    }
  }

  const validateRepeative = (assetId: string, resolution: number) => {
    const error = validate()
    if (!error) {
      const existingItemWithSameResolution = items.filter(
        (item: any, i: number) => {
          if (item.id === assetId && item.resolution === resolution) {
            return item
          }
        }
      )
      if (existingItemWithSameResolution.length) {
        return 'Cannot choose same resolution Again'
      }
    } else {
      return error
    }
  }
  const save = () => {
    const err = validateRepeative(selectedAsset, state.resolution)
    const originalFile = activeAsset.files.filter((file: any, i: number) => {
      return file.original
    })
    if (!err) {
      setItems([
        ...items,
        {
          id: selectedAsset,
          fileName: activeAsset.fileName,
          fileHeight: originalFile[0].height,
          fileWidth: originalFile[0].width,
          ...state
        }
      ])
      onRequestClose()
    } else {
      setError(err)
    }
  }

  const onRequestClose = () => {
    setOpen(false)
  }

  const Modal = () => {
    return (
      <div className={classes.modalContent}>
        <div className={classes.section}>
          <Typography paragraph>Choose Format</Typography>
          <Grid container justify='center'>
            <Grid item sm={8} container className={classes.box}>
              <Grid
                item
                sm={6}
                className={`${classes.tab} ${
                  state.format === 'prores' && classes.selectedTab
                }`}
                onClick={() => chooseSize('format', 'prores')}>
                <Typography>Pro-Res</Typography>
                <Typography className={classes.desc}>
                  Bigger file size, for highest cinematic quality.
                </Typography>
                <Typography className={classes.subDesc}>
                  Est. File Size:5.6 GB
                </Typography>
              </Grid>
              <Grid
                item
                sm={6}
                className={`${classes.tab} ${
                  state.format === 'h.264' && classes.selectedTab
                }`}
                onClick={() => chooseSize('format', 'h.264')}>
                <Typography>H.264</Typography>
                <Typography className={classes.desc}>
                  Regular file size primarily for social media & web-usage
                </Typography>

                <Typography className={classes.subDesc}>
                  Est. File Size:300 MB
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </div>

        <div className={classes.section}>
          <Typography paragraph>Choose Resolution</Typography>
          <Grid container justify='center'>
            <Grid item sm={10} container className={classes.box}>
              {activeAsset?.files?.length &&
                resolutions.map((item, i) => {
                  const originalFile = activeAsset.files.find(
                    (file: any, i: number) => {
                      return file.original
                    }
                  )
                  return (
                    <Grid
                      item
                      sm={3}
                      className={`${classes.tab} ${
                        state.resolution === item.res && classes.selectedTab
                      }`}
                      onClick={() =>
                        originalFile.height > item.res &&
                        chooseSize('resolution', item.res)
                      }>
                      {originalFile.height > item.res ? (
                        <>
                          <Typography>{item.type}</Typography>
                          <Typography className={classes.desc}>
                            {item.desc}
                          </Typography>
                        </>
                      ) : (
                        <Typography>-</Typography>
                      )}
                    </Grid>
                  )
                })}
            </Grid>
          </Grid>
        </div>

        <div className={classes.section}>
          <Typography paragraph>Choose Aspect Ratio</Typography>
          <Grid container justify='center'>
            <Grid item sm={12} container className={classes.box}>
              <Grid
                item
                sm={3}
                className={`${classes.tab} ${
                  state?.ratio?.w === 9 &&
                  state?.ratio?.h === 16 &&
                  classes.selectedTab
                }`}
                onClick={() => chooseSize('ratio', { w: 9, h: 16 })}>
                <Typography>9:16</Typography>
                <Typography className={classes.desc}>
                  Social Media Vertical Story Post
                </Typography>
              </Grid>
              <Grid
                item
                sm={3}
                className={`${classes.tab} ${
                  state?.ratio?.w === 16 &&
                  state?.ratio?.h === 9 &&
                  classes.selectedTab
                }`}
                onClick={() => chooseSize('ratio', { w: 16, h: 9 })}>
                <Typography>16:9</Typography>
                <Typography className={classes.desc}>
                  Horizontal for websites and & Social Media
                </Typography>
              </Grid>
              <Grid
                item
                sm={3}
                className={`${classes.tab} ${
                  state?.ratio?.w === 1 &&
                  state?.ratio?.h === 1 &&
                  classes.selectedTab
                }`}
                onClick={() => chooseSize('ratio', { w: 1, h: 1 })}>
                <Typography>1:1</Typography>
                <Typography className={classes.desc}>
                  Square for blogs,websites,& Social Media
                </Typography>
              </Grid>
              <Grid
                item
                sm={3}
                className={`${classes.tab} ${
                  state?.ratio?.w === 4 &&
                  state?.ratio?.h === 5 &&
                  classes.selectedTab
                }`}
                onClick={() => chooseSize('ratio', { w: 4, h: 5 })}>
                <Typography>4:5</Typography>
                <Typography className={classes.desc}>
                  Social Media Vertical Feed Post
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </div>

        <Grid
          container
          justify='flex-end'
          direction='column'
          alignItems='flex-end'>
          {error ? (
            <Typography className={classes.errorText}>{error}</Typography>
          ) : null}
          <GradiantButton className={classes.gradiantBtn} onClick={save}>
            Save
          </GradiantButton>
        </Grid>

        <CloseButton
          onClick={onRequestClose}
          style={{
            position: 'absolute',
            top: 10,
            right: 10
          }}
        />
      </div>
    )
  }

  return (
    <>
      <div className={classes.root}>
        <GradiantButton className={classes.gradiantBtn} onClick={add}>
          Add
        </GradiantButton>

        <AppModal open={open} onRequestClose={onRequestClose}>
          <Modal />
        </AppModal>
        {items?.length
          ? items
              .filter((item: any, i: number) => {
                return item.id === selectedAsset
              })
              .map((val: any, i: number) => {
                return (
                  <div className={classes.selectedItem}>
                    <Typography>Resolution:{val.resolution}</Typography>
                    <Typography>
                      Ratio:{val.ratio.w}:{val.ratio.h}
                    </Typography>
                    <Typography>Format:{val.format}</Typography>
                  </div>
                )
              })
          : null}
      </div>

      {items.length ? (
        <GradiantButton
          className={classes.gradiantBtn}
          loading={mediaConversionLoading}
          onClick={() => mediaConvert(items)}>
          {mediaConversionLoading ? 'Loading...' : 'Convert'}
        </GradiantButton>
      ) : null}
    </>
  )
}

const useStyles = makeStyles((theme) => ({
  box: {},
  desc: {
    fontSize: '13px'
  },
  root: {
    // textAlign: 'right'
  },

  modalContent: {
    padding: '40px',
    width: '60vw',
    maxHeight: '80vh',
    backgroundColor: '#ffffff',
    outline: 'none',
    borderRadius: '20px',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'scroll',
    position: 'relative'
  },
  errorText: {
    color: 'red',
    fontSize: 15,
    padding: '0 15px'
  },
  subDesc: {
    fontSize: '13px',
    color: `${theme.palette.primary.light}`
  },
  tab: {
    border: `1px solid ${theme.palette.primary.light}`,
    // borderRadius: '20px',
    cursor: 'pointer',
    padding: '12px',
    // borderRight: `1px solid ${theme.palette.primary.light}`,
    '&:last-child': {
      borderRadius: '0 20px 20px 0'
    },
    '&:first-child': {
      borderRadius: '20px 0 0 20px'
    }
  },
  selectedTab: {
    backgroundColor: theme.palette.primary.light
  },
  section: {
    marginBottom: '30px',
    textAlign: 'center'
  },
  selectedItem: {
    marginBottom: '10px'
  },
  gradiantBtn: {
    borderRadius: 24,
    margin: '10px 0'
  }
}))

export default MediaConvert
