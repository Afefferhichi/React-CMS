import React, {useContext} from "react";
import {useHistory} from 'react-router-dom';

import {MainContext} from "../../../contexts/MainContext";
import {useFormik} from "formik";
import Logo from "../../../assets/logo.png";


const RegisterForm = () => {
  const history = useHistory();
  const {signUp, dispatch} = useContext(MainContext);

  const form = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      address: '',
      password: '',
      cnfPassword: '',
      organisation: '',
      telephone: ''
    },
    onSubmit: async (formData) => {
      try {
        await signUp(formData, dispatch);
        history.push('/home');
      } catch (err) {
        alert(err.message);
      }
    }
  });

  return (
    <form className="base-container" onSubmit={form.handleSubmit}>
      <div className="header"/>
      <div className="content">
        <div className="image">
          <img src={Logo} alt=''/>
        </div>
        <div className="form">
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="firstname">Firstname</label>
              <input className="form-control" type="text" name="firstname" placeholder="firstname"
                     value={form.values.firstname} onChange={form.handleChange} onBlur={form.handleBlur}/>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="firstname">Lastname</label>
              <input className="form-control" type="text" name="lastname" placeholder="lastname"
                     value={form.values.lastname} onChange={form.handleChange} onBlur={form.handleBlur}/>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" className='form-control' placeholder="email" value={form.values.email}
                     onChange={form.handleChange} onBlur={form.handleBlur}/>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="address">Address</label>
              <input type="text" name="address" className='form-control' placeholder="address"
                     value={form.values.address} onChange={form.handleChange} onBlur={form.handleBlur}/>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" className='form-control' placeholder="password"
                     value={form.values.password} onChange={form.handleChange} onBlur={form.handleBlur}/>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="phone">Confirm Password</label>
              <input type="password" name="cnfPassword" className='form-control' placeholder="Confirm Password"
                     value={form.values.cnfPassword} onChange={form.handleChange} onBlur={form.handleBlur}/>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="organisation">Organisation</label>
              <input type="text" name="organisation" className='form-control' placeholder="organisation"
                     value={form.values.organisation} onChange={form.handleChange} onBlur={form.handleBlur}/>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="phone">Phone</label>
              <input type="phone" name="telephone" className='form-control' placeholder="Telephone"
                     value={form.values.telephone} onChange={form.handleChange} onBlur={form.handleBlur}/>
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        <button type="submit" className="btn signup-button">Sign Up</button>
      </div>
    </form>
  );
};

export default RegisterForm;