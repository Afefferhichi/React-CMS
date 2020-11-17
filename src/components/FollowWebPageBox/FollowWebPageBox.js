import React, {useContext, useState} from "react";
import {Button, Paper} from 'project-elements';
import {MainContext} from "../../contexts/MainContext";

const FollowWebPageBox = (props) => {
  const {followWebPage, openSnackBar} = useContext(MainContext);
  const [processing, setProcessing] = useState(false);
  const {followers, follower_id, webpage_id} = props;
  const already_followed = followers.indexOf(follower_id) > -1;

  const followPressHandler = async () => {
    try {
      setProcessing(true);
      await followWebPage(webpage_id, already_followed ? 'unfollow' : 'follow');
      setProcessing(false);
    } catch (followError) {
      if (followError.error_code === 'ACCESS_DENIED') {
        openSnackBar({message: followError.message, severity: 'error'});
      } else {
        openSnackBar({message: "Unknown error occurred when following. Try again later.", severity: 'error'});
      }
    }
  };

  return (
    <Paper elevation={3} variant={'outlined'}
           style={{paddingLeft: 10, paddingRight: 10, float: 'left', textAlign: 'center'}}>
      {followers.length}
      <Button color='primary' onClick={followPressHandler} disabled={processing}>
        {already_followed ? 'Unfollow' : 'Follow'}
      </Button>
    </Paper>
  );
};

export default FollowWebPageBox;
