import React from "react";

import {Link} from 'react-router-dom';
import Logo from "../../../assets/logo.png";
import useTitleBarStyle from "./TitleBar.styles";

const TitleBar = props => {
  const styles = useTitleBarStyle();
  return (
    <>
      <Link to={'/home'}>
        <img src={Logo} alt='logo' className={styles.logo}/>
      </Link>
      <div className={styles.title}/>
    </>
  )
};

export default TitleBar;

