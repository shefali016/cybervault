import React, { useEffect } from "react";
import "../App.css";
import { connect } from 'react-redux';
import { logout } from "../actions/authActions";
import { Button, Typography } from "@material-ui/core";
import ProjectCard from "../components/Cards/ProjectDescriptionCard";
import UnpaidInvoices from "../components/Cards/UnpaidInvoices";
import PendingInvoices from "../components/Cards/PendingInvoices";
import IncomeThisMonth from "../components/Cards/IncomeThisMonth";
import ProjectCount from "../components/Cards/ProjectCount";
import ProfitsExpenses from "../components/Cards/ProfitsExpenses";
import Layout from '../components/Common/Layout';

export const HomeScreen = (props: any) => {

  useEffect(() => {
    if (!props.isLoggedIn && !props.user) {
      loggedOut(props);
    }
  }, [props.isLoggedIn]);

  const loggedOut = (props: any) => {
    props.history.push("/");
  }

  const handleLogout = () => {
    props.logout();
  };
  const projectData = [1, 2, 23, 5];
  return (
    <div className="background">
      <Layout {...props}>
      <div className="dashboardContainer">
        <Button
          variant="contained"
          onClick={handleLogout}
          color="primary"
          style={{
            width: "100%",
            maxWidth: 170,
            position: "absolute", right: 15, top: 90
          }}
        >
          Logout
      </Button>
        <div>
          <Typography variant={"body2"} style={{ marginLeft: 10 }}>
            Active Projects {'>'}
          </Typography>
          <div style={{ overflow: "auto", marginLeft: 10, marginTop: 20 }} >
            {projectData && projectData.length > 0 ?
              projectData.map((project: any, index: number) => {
                return (
                  <ProjectCard projectDetails={project} />
                )
              }) : <Typography>No Projects found</Typography>
            }
          </div>
        </div>
        <div>
          <Typography variant={"body2"} style={{ marginTop: 30, marginLeft: 10 }}>
            Invoicing and Analytics {'>'}
          </Typography>
          <div style={{ overflow: "auto", marginLeft: 20, marginTop: 20, display: "flex" }} >
            <PendingInvoices />
            <ProfitsExpenses />
            <ProjectCount />
            <IncomeThisMonth />
          </div>
        </div>
        <div>
        <Typography variant={"body2"} style={{ marginTop: 30, marginLeft: 10 }}>
          Unpaid Invoices {'>'}
        </Typography>
        <div style={{ marginLeft: 10, marginTop: 10, paddingBottom: 20 }} >
          {projectData && projectData.length > 0 ?
            projectData.map((project: any, index: number) => {
              return (
                <UnpaidInvoices projectDetails={project} />
              )
            }) : <Typography>No Projects found</Typography>
          }
        </div>
        </div>
      </div>
      </Layout>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  isLoggedIn: state.auth.isLoggedIn,
  //projectData : state.projects.projectData
})

const mapDispatchToProps = (dispatch: any) => ({
  logout: () => {
    return dispatch(logout());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen)
