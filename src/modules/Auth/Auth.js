import React from 'react';
import {Redirect} from 'react-router-dom';
import {MainContext} from '../../contexts/MainContext';

import '../../themes/mui/scss/Auth.scss';

import LoginForm from "./_Components/LoginForm";
import RegisterForm from "./_Components/RegisterForm";
import RightSide from './_Components/RightSide';

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogginActive: true
    };
  }

  componentDidMount() {
    if (this.rightSide) this.rightSide.classList.add("right");
  }

  changeState() {
    const {isLogginActive} = this.state;

    if (isLogginActive) {
      this.rightSide.classList.remove("right");
      this.rightSide.classList.add("left");
    } else {
      this.rightSide.classList.remove("left");
      this.rightSide.classList.add("right");
    }
    this.setState(prevState => ({isLogginActive: !prevState.isLogginActive}));
  }

  render() {
    const {isLogginActive} = this.state;
    const current = isLogginActive ? "Sign up" : "Sign In";
    const currentActive = isLogginActive ? "sign In" : "Sign up";
    return (
      <MainContext.Consumer>
        {({client}) => (
          <>
            {
              !client
                ? (
                  <div className="App row">
                    <div className="login col-md-5">
                      <div className="container" ref={ref => (this.container = ref)}>
                        {isLogginActive
                          ? <LoginForm containerRef={ref => (this.current = ref)}/>
                          : <RegisterForm containerRef={ref => (this.current = ref)}/>
                        }
                      </div>
                      <RightSide
                        current={current}
                        currentActive={currentActive}
                        containerRef={ref => (this.rightSide = ref)}
                        onClick={this.changeState.bind(this)}
                      />
                    </div>
                  </div>
                ) : <Redirect to='/home'/>
            }
          </>
        )}
      </MainContext.Consumer>
    );
  }
}

export default Auth;