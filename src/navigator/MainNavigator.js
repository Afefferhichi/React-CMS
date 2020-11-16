import React from "react";
import MuiTheme from '../themes/mui';
import {Route, Switch} from 'react-router-dom';
import {ThemeProvider} from "@material-ui/core";
import routes from "../config/routes";
import NavBar from "./NavBar";
import SnackBar from "../components/SnackBar";
import Dialog2 from "../components/Dialog2";

const MainNavigator = props => (
  <ThemeProvider theme={MuiTheme}>
    <NavBar/>
    <Switch>
      {routes.map(({path, component, exact}, index) => (
        <Route exact={exact} key={String(index)} path={path} component={component}/>
      ))}
      <Route path='*' exact>
        <h2>404 Page Not Found</h2>
      </Route>
    </Switch>
    <SnackBar/>
    <Dialog2/>
  </ThemeProvider>
);
export default MainNavigator;
