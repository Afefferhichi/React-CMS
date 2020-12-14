import React, {useContext, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {Box, Container, Tab, Tabs} from 'project-elements';
import PostsList from "../../../components/PostsList";
import PostSync from "../../../components/PostsList/PostSync/PostSync";
import {MainContext} from "../../../contexts/MainContext";
import PropTypes from 'prop-types';

const POSTS_LIST_TYPE = [
  'new-posts',
  'approved',
  'not-approved'
];

function TabPanel(props) {
  const {children, value, index, ...other} = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={1}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const getTypeIndexFromProps = (props) => {
  if (props.location.search) {
    const SEARCH_TOKEN = 'type=';
    const type = props.location.search.substr(props.location.search.indexOf(SEARCH_TOKEN) + SEARCH_TOKEN.length);
    return (POSTS_LIST_TYPE.indexOf(type));
  }
  return 0;
}

export default (props) => {
  const history = useHistory();
  const {client} = useContext(MainContext);
  const [value, setValue] = React.useState(getTypeIndexFromProps(props));

  const handleChange = (event, index) => {
    history.push('/admin/posts?type=' + POSTS_LIST_TYPE[index]);
  };

  useEffect(() => {
    if(!props.location.search) {
      window.location.replace('/admin/posts?type='+POSTS_LIST_TYPE[0]);
      return;
    }
    setValue(getTypeIndexFromProps(props));
  }, [props]);

  return (
    <Container maxWidth='lg'>
      {client && client.role === 'admin' && <PostSync style={{float: 'right', marginRight: 5,}}/>}
      <Tabs value={value} onChange={handleChange}>
        <Tab label="New Posts" {...a11yProps(0)} />
        <Tab label="Approved" hidden {...a11yProps(1)} />
        <Tab label="Not Approved" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <PostsList listType={'byAdmin'} adminListCondition={{visible: null}}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PostsList listType={'byAdmin'} adminListCondition={{visible: true}}/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <PostsList listType={'byAdmin'} adminListCondition={{visible: false}}/>
      </TabPanel>
    </Container>
  );
}
