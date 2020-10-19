export const OPEN_CLOSE_DIALOG2 = 'OPEN_CLOSE_DIALOG2';

const Dialog2Reducer = (state, {type, payload}) => {
  switch (type) {
    case OPEN_CLOSE_DIALOG2:
      return {
        ...state,
        dialog2: payload
      }
    default:
      return state;
  }
};

export default Dialog2Reducer;