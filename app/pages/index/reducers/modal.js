const data = (state = {editInfo: {}, show: false}, action) => {
  switch(action.type) {
    case 'OPEN_EDITOR':
      return {
        editInfo: action.data.editInfo,
        show: action.data.show
      };
      break;
    case 'UPDATE_EDITOR':
      state.editInfo[action.data.name] = action.data.value;
      return Object.assign({}, state);
      break;
    default:
      return state;
  }
}

export default data;
