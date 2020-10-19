import React from "react";
import {AttachmentIcon} from 'project-elements'
import constants from "../../config/constants";

const DownloadLinkItem = props => {
  const {showOnly, attachment} = props;
  const {originalname, _id} = attachment;
  const token = localStorage.getItem('token');
  const url = constants.API_SERVER + 'attachments/' + _id + '?token=' + token + '&v1';
  return (
    <div style={{float: 'left', marginRight: 20,}}>
      <AttachmentIcon style={{fontSize: 20, color: '#505050', marginRight: 5}}/>
      {showOnly === true ? <>{originalname}</> : <a href={url}>{originalname}</a>}
    </div>
  );
};

export default DownloadLinkItem;