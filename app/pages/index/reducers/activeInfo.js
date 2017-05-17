const data = (state = {project: {}, version: {}, api: {}, query: '', offset: '' }, action) => {
  switch(action.type) {
    case 'GET_ACTIVE':
      return Object.assign({}, state, {
        [`${action.data.name}`]: action.data.value
      });
      break;
    default:
      return state;
  }
}

export default data;
