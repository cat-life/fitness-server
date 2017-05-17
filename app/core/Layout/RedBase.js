import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleWare from 'redux-thunk';
import createLogger from 'redux-logger';

const loggerMiddleWare = createLogger({ collapsed: true });

// 备注：正式环境下需要隐藏部分打印，这种逻辑发布正式环境前需要添加上
const Index = function (App, info) {
  let store = createStore(
    info.reducers,
    applyMiddleware(
      thunkMiddleWare, // lets us dispatch() functions
      loggerMiddleWare // neat middleware that logs actions
    )
  );

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('app')
  );
};

export default Index;
