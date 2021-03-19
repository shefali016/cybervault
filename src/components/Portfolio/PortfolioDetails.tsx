import React, { Fragment } from 'react'
import { Account, Project } from 'utils/Interface'
import { useTheme } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import { RenderCampaignDetails } from 'components/Common/Widget/CampaignDetailsWidget'
import { Details } from 'components/ProjectInfoDisplay/Details'
import { AssetUploadDisplay } from 'components/Assets/UploadMedia'
import { FeatureAssetUpload } from 'components/Assets/FeatureAssetUpload'
import { AppDivider } from 'components/Common/Core/AppDivider'
import { useStyles } from './style'
import clsx from 'clsx'

type Props = {
  project: Project | null | undefined
  account: Account
}

export const PortfolioProjectDetails = ({ project, account }: Props) => {
  const theme = useTheme()
  const classes = useStyles()

  if (!project) return null

  const { videos, images } = project || {
    videos: [] as any,
    images: [] as any
  }

  const hasAssets = !!videos.length || !!images.length

  return (
    <Fragment>
      <div style={{ marginBottom: theme.spacing(6) }}>
        <Typography
          variant={'h4'}
          className={clsx('bold', classes.projectName)}>
          {project.campaignName}
        </Typography>
      </div>

      {hasAssets && (
        <div className={classes.assetsOuter}>
          <div className={classes.assetsInner}>
            {!!videos.length && (
              <AssetUploadDisplay
                {...{
                  assetIds: videos,
                  accountId: account ? account.id : '',
                  isVideo: true,
                  disableUpload: true
                }}
              />
            )}

            {!!videos.length && <AppDivider className={classes.assetDivider} />}

            {!!images.length && (
              <FeatureAssetUpload
                {...{
                  assetIds: images,
                  accountId: account ? account.id : '',
                  featuredAsset: project.featuredImage,
                  disableUpload: true
                }}
              />
            )}
          </div>
        </div>
      )}

      <RenderCampaignDetails
        projectData={project}
        titleClassName={classes.campaignTitle}
      />

      {!!(project.campaignObjective || project.description) && (
        <Typography variant={'h5'} style={{ marginBottom: 15 }}>
          Project Details
        </Typography>
      )}
      <Details
        label={'Campaign Objective:'}
        value={project.campaignObjective}
      />
      <Details label={'Project Summary:'} value={project.description} />
    </Fragment>
  )
}
