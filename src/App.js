import React from 'react';
import MainContextProvider from './contexts/MainContext';
import MainNavigator from "./navigator/MainNavigator";
import SnackBar from "./components/SnackBar";
import Dialog2 from "./components/Dialog2";

export default () => {
  return (
    <MainContextProvider>
      <MainNavigator/>
      <SnackBar/>
      <Dialog2/>
    </MainContextProvider>
  );
};