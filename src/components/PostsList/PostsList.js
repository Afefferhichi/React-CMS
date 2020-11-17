import React, {useContext, useEffect, useState} from "react";
import PostItem from "./PostItem";
import {MainContext} from "../../contexts/MainContext";
import {Button, CircularProgress, Grid, Paper, Typography} from "../../themes/mui/Elements";
import PostSync from "./PostSync/PostSync";
import WebPageTitle from "./WebPageTitle";

const PostsList = (props) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(0);
  const {client, posts, webpages, loadPostsByCondition, loadPostsInHome} = useContext(MainContext);
  const {listType, webpage_id} = props;

  const loadData = (loaderFn) => {
    loaderFn.then(() => {
      setLoading(false);
    }).catch(error => {
      setError({message: 'Error on loading posts.'});
      setLoading(false);
    });
  }

  const componentDidMount = () => {
    let loaderFn;
    switch (listType) {
      case 'byWebPage':
        loaderFn = loadPostsByCondition({webpage: webpage_id});
        break;
      case 'byAdmin':
        loaderFn = loadPostsByCondition({});
        break;
      case 'inHome':
        loaderFn = loadPostsInHome();
        break;
      default:
        loaderFn = loadPostsByCondition({});
    }
    loadData(loaderFn);
  };

  const refreshButtonPressHandler = () => {
    setError(null);
    setLoading(true);
    setRefresh(+new Date());
  };
  useEffect(componentDidMount, [refresh]);

  const webpage_ids = [];
  return (
    <>
      {client && client.role === 'admin' && <PostSync/>}
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
            posts && posts.length > 0 && posts.map((post, index) => {
              let needsToShowWebPageTitle = false;
              let webpage = null;
              if (listType === 'byWebPage' && webpage_ids.indexOf(post.webpage) === -1) {
                webpage_ids.push(post.webpage);
                needsToShowWebPageTitle = true;
                const existingIndex = webpages.findIndex(webpage => webpage._id)
                if (existingIndex > -1) {
                  webpage = webpages[existingIndex]._id;
                }
              }
              return (
                <>
                  {JSON.stringify(webpages.map(webpage=>webpage._id))}
                  {needsToShowWebPageTitle && webpage && <WebPageTitle name={webpage.name}/>}
                  <PostItem key={String(index)} post={post}/>
                </>
              );
            })
          )
      }
    </>
  );
};

export default PostsList;
