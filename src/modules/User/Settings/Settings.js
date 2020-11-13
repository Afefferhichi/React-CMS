import React, {useContext} from 'react';
import {Redirect} from 'react-router-dom';
import {Container} from 'project-elements';
import {MainContext} from '../../../contexts/MainContext';
import SettingsItems from "../../../components/SettingsItems";
import PageTitle from "../../../components/PageTitle";
import SettingsItem from "../../../components/SettingsItems/SettingsItem";
import UpdateAvatar from "../../../components/SettingsItems/UpdateAvatar";
import UpdateEmail from "../../../components/SettingsItems/UpdateEmail";
import UpdatePassword from "../../../components/SettingsItems/UpdatePassword";


export default () => {
  const {client} = useContext(MainContext);
  return client
    ? (
      <Container>
        <PageTitle>Settings</PageTitle>
        <SettingsItems>
          <SettingsItem title={'Update Email'} component={<UpdateEmail />} expanded={true}/>
          <SettingsItem title={'Update Password'} component={<UpdatePassword />}/>
          <SettingsItem title={'Update Avatar'} component={<UpdateAvatar />}/>
        </SettingsItems>
      </Container>
    )
    : <Redirect to='/auth'/>;
}
