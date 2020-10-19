import React from "react";

import Logo from "../../../assets/logo.png";
import useTitleBarStyle from "./TitleBar.styles";

const TitleBar = props => {
  const styles = useTitleBarStyle();
  return (
    <>
      <img src={Logo} alt='logo' className={styles.logo}/>
      <div className={styles.title}/>
    </>
  )
};

export default TitleBar;

