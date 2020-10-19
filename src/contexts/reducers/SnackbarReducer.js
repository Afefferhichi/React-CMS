export const OPEN_CLOSE_SNACKBAR = 'OPEN_CLOSE_SNACKBAR';

const SnackbarReducer = (state, {type, payload}) => {
  switch (type) {
    case OPEN_CLOSE_SNACKBAR:
      return {
        ...state,
        snackbar: payload
      }
    default:
      return state;
  }
};

export default SnackbarReducer;