import request from 'app/vendor/request';

export const updateFilter = (type, value) => {
  return dispatch => {
    dispatch({
      type: 'GET_ACTIVE',
      data: {
        name: type,
        value: value
      }
    });
  }
}
