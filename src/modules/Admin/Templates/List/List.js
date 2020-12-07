import React, {useContext, useEffect, useRef} from 'react';
import {Redirect, useHistory} from 'react-router-dom';
import {Container, MaterialTable} from 'project-elements';
import {MainContext} from '../../../../contexts/MainContext';
import useAdminTemplatesListStyle from './AdminTemplatesList.style';

export default () => {
  const classes = useAdminTemplatesListStyle();
  const {client, templates, loadTemplates, deleteTemplate, setEnabledTemplate, dispatch} = useContext(MainContext);
  const tableRef = useRef();
  const history = useHistory();

  const deleteTemplateHandler = (event, template) => {
    if(!window.confirm('Are you sure to delete this template?')) return;
    deleteTemplate(template._id, dispatch);
  }

  const setEnabledHandler = (event, template) => {
    setEnabledTemplate({id: template._id, enabled: !template.enabled}, dispatch);
  }

  const editTemplateHandler = (event, template) => {
    history.push('/admin/templates/' + template._id + '/edit');
  }

  const componentDidMount = () => {
    if (templates.length === 0) {
      loadTemplates(dispatch);
    }
  };

  useEffect(componentDidMount, []);

  const tableData = templates.map(template => ({
    ...template, users: template.users.length
  }))

  return (
    <>
      {
        client && client.role === 'admin' ? (
            <Container maxWidth={'xl'} className={classes.table}>
              <MaterialTable
                options={{
                  actionsColumnIndex: -1
                }}
                title="Manage Templates List"
                columns={[
                  {title: 'NAME', field: 'name'},
                  {title: 'CATEGORY', field: 'category'},
                  {title: 'USERS', field: 'users'},
                  {title: 'ENABLED', field: 'enabled', type: 'boolean'}
                ]}
                tableRef={tableRef}
                data={tableData}
                actions={[
                  {
                    tooltip: 'Add Template',
                    icon: 'add',
                    isFreeAction: true,
                    onClick: () => history.push('/admin/templates/new')
                  },
                  rowData => ({
                    tooltip: 'Enable',
                    icon: 'visibility',
                    disabled: rowData.enabled,
                    onClick: setEnabledHandler
                  }),
                  rowData => ({
                    tooltip: 'Disable',
                    icon: 'visibility_off',
                    disabled: !rowData.enabled,
                    onClick: setEnabledHandler
                  }),
                  {
                    tooltip: 'Update',
                    icon: 'edit',
                    onClick: editTemplateHandler
                  },
                  {
                    tooltip: 'Delete',
                    icon: 'delete',
                    onClick: deleteTemplateHandler
                  }
                ]}
              />
            </Container>
          )
          : <Redirect to='/auth'/>
      }
    </>
  );
}
