import React, { useEffect } from "react";
import "../../App.css";
import { connect } from 'react-redux';
import Layout from '../../components/Common/Layout';

export const ProjectsScreen = (props: any) => {

  return (
    <div className="background">
      <Layout {...props} headerTitle={'Projects'}>
          <div className="dashboardContainer" >
          </div>
      </Layout>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
})

const mapDispatchToProps = (dispatch: any) => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectsScreen)
