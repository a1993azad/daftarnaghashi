/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components

import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";
import dashboardRoutes from "routes/dashboard.jsx";



const switchRoutes = (
  <Switch>
    {dashboardRoutes.map((prop, key) => {
      if (prop.redirect)
        return <Redirect from={prop.path} to={prop.to} key={key} />;
      return <Route path={prop.path} component={prop.component} key={key} />;
    })}
  </Switch>
);

class App extends React.Component {
  state = {
    mobileOpen: false
  };
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  getRoute() {
    return this.props.location.pathname !== "/maps";
  }
    isLogin(){
    return true;
    }
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      const ps = new PerfectScrollbar(this.refs.mainPanel);
    }
  }
  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.refs.mainPanel.scrollTop = 0;
      if(this.state.mobileOpen){
        this.setState({mobileOpen: false});
      }
    }
  }
  render() {
    const { classes, ...rest } = this.props;
    return (
      <div >

            <div ref="mainPanel">
                {this.isLogin()?(
                  /* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */
                  this.getRoute() ? (
                    <div className={classes.content}>
                      <div className={classes.container}>{switchRoutes}</div>
                    </div>
                  ) : (
                    <div className={classes.map}>{switchRoutes}</div>
                  )
                ):(
                <Redirect to='/login' />
                )}
            </div>

      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default  withStyles(dashboardStyle)(App);
