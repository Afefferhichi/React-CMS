import React, {useState} from 'react';
import {Button, CircularProgress} from "project-elements";
import CallServer from "../../../utils/CallServer";

const PostSync = (props) => {
  const {style} = props;
  const [processing, setProcessing] = useState(false);
  const syncPostsHandler = async () => {
    setProcessing(true);
    await CallServer.get('/posts/synchronize');
    setProcessing(false);
  };
  return (
    <Button style={style} variant={'outlined'} onClick={syncPostsHandler}>
      {processing
        ? (<CircularProgress size={'1.2rem'}/>)
        : "Synchronize posts"
      }
    </Button>
  );
};

export default PostSync;
