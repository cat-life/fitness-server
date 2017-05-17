const data = (state = {list: [], pagination: {}}, action) => {
  switch(action.type) {
    case 'GET_API_LIST':
      return {
        list: action.data,
        pagination: action.pagination
      };
      break;
    default:
      return state;
  }
}

export default data;
