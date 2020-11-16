import React from 'react';
import MainContextProvider from './contexts/MainContext';
import MainNavigator from "./navigator/MainNavigator";

export default () => {
  return (
    <MainContextProvider>
      <MainNavigator/>
    </MainContextProvider>
  );
};
