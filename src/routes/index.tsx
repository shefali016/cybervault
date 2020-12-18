import React from "react";
import { Route } from "react-router-dom";
import { connect } from 'react-redux';

function RouteWrapper(props: {
  path?: string,
  exact?: boolean,
  component: any,
  isLoggedIn?: boolean,
  user?: any,
}) {

  if (!props.isLoggedIn && !props.user) {
    return <Route {...props} component={props.component} />;
  }

  if (props.isLoggedIn && props.user) {
    return <Route {...props} component={props.component} />;
  }

  return <Route {...props} component={props.component} />;
}
const mapStateToProps = (state: any) => ({
  isLoggedIn: state.auth.isLoggedIn,
  user: state.auth.user,
})

export default connect(
  mapStateToProps,
  null,
)(RouteWrapper)