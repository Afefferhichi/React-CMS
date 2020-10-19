import React, {useContext} from "react";
import {useHistory} from 'react-router-dom';

import {MainContext} from "../../../contexts/MainContext";
import {useFormik} from "formik";
import Logo from "../../../assets/logo.png";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import {GoogleLogin} from "react-google-login";


const LoginForm = () => {
  const {login, signUp, dispatch} = useContext(MainContext);
  const history = useHistory();

  const responseFacebook = async response => {
    try {
      await signUp(response.name.split(' ')[0], response.name.split(' ')[1], response.email, '12345678', '12345678', 'fsdfsd', 'fsdfdsf', '12345678');
      history.push('/home');
    } catch (err) {
      if (err.message === `this account ${response.email} exist`) {
        try {
          await login({email: response.email, password: '12345678'}, dispatch);
          history.push('/home');
        } catch (err) {
          alert(err.message);
        }
      } else {
        alert(err.message);
      }
    }
  }

  const responseGoogle = async (response) => {
    try {
      if (!response.error) {
        await login({email: 'tests@tests.com', password: '12345678'});
        history.push('/home');
      }
    } catch (err) {
      alert(err.message);
    }
  }

  const form = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: async ({email, password}) => {
      try {
        await login({email, password}, dispatch);
        history.push('/home');
      } catch (err) {
        alert(err.message);
      }
    }
  });

  return (
    <form className="base-container base-container-login" onSubmit={form.handleSubmit}>
      <div className="header"/>
      <div className="content row">
        <div className="image">
          <img src={Logo} alt=''/>
        </div>
        <div className="form col-md-10 offset-1">
          <div className="form-row2">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" className="form-control" value={form.values.email}
                   onChange={form.handleChange} onBlur={form.handleBlur}/>
            <div className="clearfix"/>
          </div>
          <div className="form-row2">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" className="form-control" value={form.values.password}
                   onChange={form.handleChange} onBlur={form.handleBlur}/>
            <div className="clearfix"/>
          </div>
        </div>
      </div>
      <div className="footer col-md-10 offset-1">
        <button type="submit" className="btn login-button">Login</button>
        <div className="Social">
          <FacebookLogin
            appId="749223212598224"
            fields="name,email,picture"
            callback={responseFacebook}
            render={renderProps => (
              <button
                type="button"
                className="btn-social fb"
                onClick={renderProps.onClick}
              >
                <i className="fab fa-facebook-square"/> Facebook
              </button>
            )}
          />
          {(
            <GoogleLogin
              clientId="1064033641087-gfmkc3nqhut5uptufhgf04o544l2eaba.apps.googleusercontent.com"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
              autoLoad={false}
              accessType={"online"}
              isSignedIn={false}
              buttonText='Login'
              render={renderProps => (
                <button
                  type="button"
                  className="btn-social fb"
                  onClick={renderProps.onClick}
                >
                  <i className="fab fa-google"/> Google
                </button>
              )}
            />
          )}
        </div>
      </div>
    </form>

  )
};

export default LoginForm;