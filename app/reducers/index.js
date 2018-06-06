import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { theme } from './theme';
import { userState } from './user';
import { configurationState } from './configuration';

const rootReducer = combineReducers({
  router: routerReducer,
  theme,
  userState,
  configurationState,
});

export default rootReducer;
