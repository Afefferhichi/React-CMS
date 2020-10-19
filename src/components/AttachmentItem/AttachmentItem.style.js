import {makeStyles} from 'project-elements';

export default makeStyles({
  float: {
    float: 'left'
  },
  attachmentIcon: {
    width: '100%',
    color: '#505050',
  },
  fileContainer: {
    width: 50,
    height: '2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  attachedItemContainer: {
    minHeight: '2rem',
    marginRight: 10,
    marginBottom: 6,
    padding: '2px 5px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ellipse: true,
  },
});