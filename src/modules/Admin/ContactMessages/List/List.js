import React, {useContext, useEffect, useRef} from 'react';
import {Redirect} from 'react-router-dom';
import {Container, MaterialTable} from 'project-elements';
import {MainContext} from '../../../../contexts/MainContext';
import useContactMessagesListStyle from './AdminContactMessagesList.style';

export default () => {
  const classes = useContactMessagesListStyle();
  const {client, contact_messages, loadContactMessages, deleteContactMessage, getContactMessage, dispatch} = useContext(MainContext);
  const tableRef = useRef();

  const deleteContactMessageHandler = (event, message) => {
    if (!window.confirm('Are you sure to delete this message?')) return;
    deleteContactMessage(message._id, dispatch);
  }

  const showContactMessageHandler = async (event, contact_message) => {
    const got_message = await getContactMessage(contact_message._id);
    console.log('got_message', got_message);
  }

  const componentDidMount = () => {
    loadContactMessages();
  };

  useEffect(componentDidMount, []);

  const tableData = contact_messages && contact_messages.map(contact_message => ({
    ...contact_message
  }))

  return (
    <>
      {
        client && client.role === 'admin' ? (
            <Container maxWidth={'md'} className={classes.table}>
              <MaterialTable
                options={{
                  actionsColumnIndex: -1,
                }}
                title="Contact Messages List"
                columns={[
                  {title: 'Title', field: 'title', align: 'left'},
                  {title: 'Email', field: 'email'},
                  {title: 'Content', field: 'content', align: 'left'},
                ]}
                tableRef={tableRef}
                data={tableData}
                actions={[
                  {
                    tooltip: 'Show contact message',
                    icon: 'visibility',
                    isFreeAction: true,
                    onClick: showContactMessageHandler
                  },
                  {
                    tooltip: 'Delete',
                    icon: 'delete',
                    onClick: deleteContactMessageHandler
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
