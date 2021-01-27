import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../../actions/authActions'
import { createNewProjectRequest } from '../../actions/projectActions'
import { useTheme } from '@material-ui/core/styles'
import ProjectCard from '../../components/Cards/ProjectDescriptionCard'
import ProjectArchives from '../../components/Cards/ProjectArchives'
import Widget from '../../components/Common/Widget'
import { useTabletLayout } from '../../utils/hooks'
import * as Types from '../../utils/types'

const PROJECT_DATA = [
  {
    campaignName: 'Nike Summer Campaign',
    description: 'Doc 2016 campaign with audi Q6',
    campaignDate: '2020-01-01',
    campaignBudget: 10000
  },
  {
    campaignName: 'Nike Summer Campaign',
    description: 'Doc 2016 campaign with audi Q6',
    campaignDate: '2020-01-01',
    campaignBudget: 10000
  },
  {
    campaignName: 'Nike Summer Campaign',
    description: 'Doc 2016 campaign with audi Q6',
    campaignDate: '2020-01-01',
    campaignBudget: 10000
  },
  {
    campaignName: 'Nike Summer Campaign',
    description: 'Doc 2016 campaign with audi Q6',
    campaignDate: '2020-01-01',
    campaignBudget: 10000
  }
]
const ARCHIVE_DATA = [
  {
    name: 'Nike Summer Campaign',
    description: 'Doc 2016 campaign with audi Q6'
  },
  {
    name: 'Nike Summer Campaign',
    description: 'Doc 2016 campaign with audi Q6'
  },
  {
    name: 'Nike Summer Campaign',
    description: 'Doc 2016 campaign with audi Q6'
  },
  {
    name: 'Nike Summer Campaign',
    description: 'Doc 2016 campaign with audi Q6'
  }
]

export const ProjectsScreen = (props: any) => {
  const isTablet = useTabletLayout()
  const theme = useTheme()
  return (
    <div>
      <Widget
        title={'Recent Projects'}
        data={PROJECT_DATA}
        renderItem={(item) => (
          <ProjectCard
            account={props.userData.account} //added as Project card is expecting account data
            project={item}
            style={{ paddingRight: theme.spacing(3) }}
          />
        )}
        emptyMessage={'No Projects found'}
      />
      <Widget
        title={'Projects Archives'}
        data={ARCHIVE_DATA}
        renderItem={(item) => (
          <ProjectArchives
            projectDetails={item}
            style={{
              paddingRight: theme.spacing(3),
              marginBottom: isTablet ? theme.spacing(3) : 0
            }}
          />
        )}
        emptyMessage={'No Projects found'}
        tabletColumn={true}
      />
    </div>
  )
}

const mapStateToProps = (state: any) => ({
  projects: state.project
})

export default connect(mapStateToProps)(ProjectsScreen)
