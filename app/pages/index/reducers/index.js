import { combineReducers } from 'redux';
import testData from './testData';
import project from './project';
import version from './version';
import api from './api';
import activeInfo from './activeInfo';
import modal from './modal';

const App = combineReducers({
  testData,
  project,
  version,
  api,
  activeInfo,
  modal
});

export default App;
