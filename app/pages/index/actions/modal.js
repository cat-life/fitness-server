import request from 'app/vendor/request';
import { fetchList, createUrl } from './list';
import { message } from 'antd';

export function openEditor(info) {
  return dispatch => {
    dispatch({
      type: 'OPEN_EDITOR',
      data: {
        editInfo: info,
        show: true
      }
    })
  }
}

export function closeEditor(info) {
  return dispatch => {
    dispatch({
      type: 'OPEN_EDITOR',
      data: {
        editInfo: {},
        show: false
      }
    });
  }
}

export function updateEditor(info) {
  return dispatch => {
    dispatch({
      type: 'UPDATE_EDITOR',
      data: info
    });
  }
}

export function confirmEditor(modelType, info) {
  let url = createUrl(modelType, info, false);
  let method = info.id ? 'put' : 'post';

  return dispatch => {
      request[method](url)
      .query(info)
      .promiseify()
      .then((res) => {
        if (res.body.errors) {
          message.warning(res.body.message);
          return;
        }
        fetchList(modelType, {
          id: info.id,
          versionId: info.versionId,
          projectId: info.projectId,
          offset: info.offset,
          limit: info.limit
        })(dispatch);
        closeEditor()(dispatch);
      }, (err) => {
        console.log(err);
        message.warning(err);
        closeEditor();
      });
  }
}
