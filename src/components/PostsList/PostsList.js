import React, {useContext, useEffect, useState} from "react";
import PostItem from "./PostItem";
import {MainContext} from "../../contexts/MainContext";
import {Button, CircularProgress, Grid, Paper, Typography} from "../../themes/mui/Elements";

const PostsList = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(0);
  const {posts, loadPosts, dispatch} = useContext(MainContext);
  const loadData = () => {
    loadPosts(dispatch).then(() => {
      setLoading(false);
    }).catch(error => {
      setError({message: 'Error on loading posts.'});
      setLoading(false);
    });
  };
  const componentDidMount = () => {
    loadData();
  };
  const refreshButtonPressHandler = () => {
    setError(null);
    setLoading(true);
    setRefresh(+new Date());
  };
  useEffect(componentDidMount, [refresh]);

  return (
    <>
      {loading
        ? (
          <Grid container justify={'center'}>
            <CircularProgress size={'1.5rem'} style={{marginTop: 100}}/>
          </Grid>
        )
        :
        error
          ? (
            <Grid container alignItems={'center'} justify={'center'} style={{marginTop: 100}}>
              <Typography>{error.message} &nbsp;&nbsp;&nbsp;</Typography>
              <Paper><Button onClick={() => refreshButtonPressHandler()}>Try again</Button></Paper>
            </Grid>
          )
          : (
            posts && posts.length > 0 && posts.map((post, index) => (
              <PostItem key={String(index)} post={post}/>
            ))
          )
      }
    </>
  );
};

export default PostsList;