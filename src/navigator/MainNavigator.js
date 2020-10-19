import React from "react";
import {Route, Switch} from 'react-router-dom';
import {ThemeProvider} from "@material-ui/core";
import routes from "../config/routes";
import MuiTheme from '../themes/mui';
import NavBar from "./NavBar";

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
  </ThemeProvider>
);
export default MainNavigator;