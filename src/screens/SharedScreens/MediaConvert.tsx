import react, { useState, useEffect } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import { GradiantButton } from '../../components/Common/Button/GradiantButton'
import { ProjectAsset } from 'utils/Interface'
import { getAssets } from 'apis/assets'
import { createNonNullChain } from 'typescript'

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
}
const MediaConvert = ({
  mediaConvert,
  assetIds,
  accountId,
  selectedAsset
}: MediaConvertProps) => {
  const classes = useStyles()
  const [state, setState] = useState<any>([])
  // {
  //   format: '',
  //   resolution: 0,
  //   ratio: {
  //     w: 0,
  //     h: 0
  //   }
  // }

  const chooseSize = (type: string, value: any) => {
    
  }

  const [assets, setAssets] = useState<Array<ProjectAsset>>([])

  useEffect(() => {
    if (Array.isArray(assetIds) && assetIds) {
      loadAssets(assetIds)
    }
  }, [assetIds])

  const loadAssets = async (ids: Array<string>) => {
    const assets: Array<ProjectAsset> = await getAssets(ids, accountId)
    setAssets(assets)
  }

  console.log(assets, 'assetssss')
  const add = () => {}

  const resolutions = [
    {
      res: 2160,
      type: '4K',
      desc: '(3840X2160)'
    },
    {
      res: 2040,
      type: '2k',
      desc: '(2040X1080)'
    },
    {
      res: 1080,
      type: '1080p',
      desc: '(1920X1080)'
    },
    {
      res: 720,
      type: '720p',
      desc: '720'
    }
  ]

  // useEffect(()=>{

  // },[selectedAsset])

  const save = () => {}

  return (
    <>
      <div className={classes.root}>
        {
          <GradiantButton className={classes.gradiantBtn} onClick={add}>
            Add
          </GradiantButton>
        }

        {
          <GradiantButton className={classes.gradiantBtn} onClick={save}>
            Save
          </GradiantButton>
        }

        {
          <>
            <div className={classes.section}>
              <Typography paragraph>Choose Format</Typography>
              <Grid container justify='center'>
                <Grid item sm={8} container className={classes.box}>
                  <Grid
                    item
                    sm={6}
                    className={classes.tab}
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
                    className={classes.tab}
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
                  {resolutions.map((item, i) => {
                    return (
                      <Grid
                        item
                        sm={3}
                        className={classes.tab}
                        onClick={() => chooseSize('resolution', item.res)}>
                        <Typography>{item.type}</Typography>
                        <Typography className={classes.desc}>
                          {item.desc}
                        </Typography>
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
                    className={classes.tab}
                    onClick={() => chooseSize('ratio', { w: 9, h: 16 })}>
                    <Typography>9:16</Typography>
                    <Typography className={classes.desc}>
                      Social Media Vertical Story Post
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    sm={3}
                    className={classes.tab}
                    onClick={() => chooseSize('ratio', { w: 16, h: 9 })}>
                    <Typography>16:9</Typography>
                    <Typography className={classes.desc}>
                      Horizontal for websites and & Social Media
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    sm={3}
                    className={classes.tab}
                    onClick={() => chooseSize('ratio', { w: 1, h: 1 })}>
                    <Typography>1:1</Typography>
                    <Typography className={classes.desc}>
                      Square for blogs,websites,& Social Media
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    sm={3}
                    className={classes.tab}
                    onClick={() => chooseSize('ratio', { w: 4, h: 5 })}>
                    <Typography>4:5</Typography>
                    <Typography className={classes.desc}>
                      Social Media Vertical Feed Post
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </>
        }
      </div>

      <GradiantButton
        className={classes.gradiantBtn}
        onClick={() =>
          mediaConvert({
            ...state,
            container: 'MP4',
            fileName: assets[0].fileName,
            fileWidth: assets[0].files[0].height,
            fileHeight: assets[0].files[0].width,
            assetId: assets[0].files[0].id
          })
        }>
        Convert
      </GradiantButton>
    </>
  )
}

const useStyles = makeStyles((theme) => ({
  box: {
    border: `1px solid ${theme.palette.primary.light}`,
    borderRadius: '20px',
    padding: '20px'
  },
  desc: {
    fontSize: '13px'
  },
  root: {
    textAlign: 'center'
  },
  subDesc: {
    fontSize: '13px',
    color: `${theme.palette.primary.light}`
  },
  tab: {
    cursor: 'pointer',
    padding: '0 10px',
    borderRight: `1px solid ${theme.palette.primary.light}`,
    '&:last-child': {
      border: 'none'
    }
  },
  section: {
    marginBottom: '30px'
  },
  gradiantBtn: {
    borderRadius: 24,
    marginTop: 20
  }
}))

export default MediaConvert
