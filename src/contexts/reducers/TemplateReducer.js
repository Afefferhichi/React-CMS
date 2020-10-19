export const LOAD_TEMPLATES = 'LOAD_TEMPLATES';
export const ADD_TEMPLATE = 'ADD_TEMPLATE';
export const ENABLE_TEMPLATE = 'ENABLE_TEMPLATE';
export const DISABLE_TEMPLATE = 'DISABLE_TEMPLATE';
export const UPDATE_TEMPLATE = 'UPDATE_TEMPLATE';
export const DELETE_TEMPLATE = 'DELETE_TEMPLATE';

const TemplateReducer = (state, {type, payload}) => {
  switch (type) {
    case LOAD_TEMPLATES:
      return {
        ...state,
        templates: payload
      }
    case ADD_TEMPLATE:
      return {
        ...state,
        templates: state.templates.concat(payload)
      }
    case ENABLE_TEMPLATE:
      return {
        ...state,
        templates: state.templates.map(template => {
          if (template._id === payload) return {...template, enabled: true};
          return template;
        })
      }
    case DISABLE_TEMPLATE:
      return {
        ...state,
        templates: state.templates.map(template => {
          if (template._id === payload) return {...template, enabled: false};
          return template;
        })
      }
    case UPDATE_TEMPLATE:
      return {
        ...state,
        templates: state.templates.map(template => {
          if (template._id === payload._id) return payload;
          return template;
        })
      }
    case DELETE_TEMPLATE:
      return {
        ...state,
        templates: state.templates.filter(template => template._id !== payload)
      }
    default:
      return state;
  }
};

export default TemplateReducer;
