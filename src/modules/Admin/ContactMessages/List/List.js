import React, {useContext, useEffect, useRef} from 'react';
import {Redirect} from 'react-router-dom';
import {Container, MaterialTable} from 'project-elements';
import {MainContext} from '../../../../contexts/MainContext';
import useContactMessagesListStyle from './AdminContactMessagesList.style';

export default () => {
  const classes = useContactMessagesListStyle();
  const {
    client, contact_messages, loadContactMessages, deleteContactMessage,
    forceUpdateContext, markContactMessageAsSeen, dispatch
  } = useContext(MainContext);
  const tableRef = useRef();

  const deleteContactMessageHandler = (event, message) => {
    if (!window.confirm('Are you sure to delete this message?')) return;
    deleteContactMessage(message._id, dispatch);
  }

  const markAsSeenPressHandler = async (event, contact_message) => {
    await markContactMessageAsSeen(
      contact_message._id,
      !contact_message.seen ? 'markAsSeen' : 'markAsUnSeen'
    )
    await forceUpdateContext();
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
                  {title: 'Title', field: 'title', align: 'left', width: 200,},
                  {title: 'Email', field: 'email', width: 150,},
                  {title: 'Content', field: 'content', align: 'left', width: 800},
                ]}
                tableRef={tableRef}
                data={tableData}
                actions={[
                  rowData => ({
                    tooltip: !rowData.seen ? 'Mark as read' : 'Mark as unread',
                    icon: !rowData.seen ? 'mail_outline' : 'drafts_outline',
                    onClick: markAsSeenPressHandler
                  }),
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
