const defaultData = {
  count: 0
};

const data = (state = defaultData, action) => {
  switch(action.type) {
    case 'INIT':
      return {
        count: action.count
      };
      break;
    default:
      return state;
  }
}

export default data;
