import React, { useEffect } from "react";
import "../../App.css";
import { connect } from 'react-redux';
import { Typography } from "@material-ui/core";
import Layout from '../../components/Common/Layout';
import ProjectDescriptionWithButtons from '../../components/Cards/ProjectDescriptionWithButtons';
import { makeStyles } from '@material-ui/core/styles';
import ProjectCard from "../../components/Cards/ProjectDescriptionCard";
import { AUTO, COLUMN, FLEX } from "utils/constants/stringConstants";

export const ProjectsScreen = (props: any) => {
  const classes = useStyles();
  const projectData = [1, 2, 23, 5];
  return (
    <div className="background">
      <Layout {...props} headerTitle={'Projects'}>
        <div className="dashboardContainer" >
          <Typography variant={"body2"} className={classes.generalMarginLeft}>
            Recent Projects {'>'}
          </Typography>
          <div className={classes.topCardsWrapper} >
            <ProjectDescriptionWithButtons />
            {projectData && projectData.length > 0 ?
              projectData.map((project: any) => {
                return (
                  <ProjectCard projectDetails={project} />
                )
              }) : <Typography>No Projects found</Typography>
            }
          </div>
          <Typography variant={"body2"} className={classes.generalMarginLeft}>
            Projects Archives {'>'}
          </Typography>
        </div>
      </Layout>
    </div>
  );
};
const useStyles = makeStyles((theme) => ({
  generalMarginLeft: {
    marginLeft: 10,
  },
  topCardsWrapper: {
    overflow: AUTO,
    marginLeft: 10,
    marginTop: 20,
    display: FLEX,
    flexDirection: "row"
  },
}));
const mapStateToProps = (state: any) => ({
})

const mapDispatchToProps = (dispatch: any) => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectsScreen)
