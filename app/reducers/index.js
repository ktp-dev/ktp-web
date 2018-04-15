import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { theme } from './theme.js';
import { userState } from './user.js';
import { configurationState } from './configuration.js';
import { adminState } from './admin.js';

const rootReducer = combineReducers({
    router: routerReducer,
    theme,
    userState,
    configurationState,
    adminState
});

export default rootReducer;
