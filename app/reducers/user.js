import { actions } from '../actions';
import { initialUserState } from './initial_states.js';

export function userState(state = initialUserState, action) {
    switch (action.type) {
        // Handled separately as we optimistically update
        case actions.LOGOUT_REQUEST:
            return initialUserState;

        case actions.REGISTER_REQUEST:
        case actions.LOGIN_REQUEST:
            return {
                ...state,
                fetching: true,
                fetched: false,
                error: null
            };

        case actions.REGISTER_ERROR:
        case actions.LOGIN_ERROR:
            return {
                ...state,
                fetching: false,
                fetched: false,
                error: action.error,
                message: action.message
            };

        case actions.REGISTER_SUCCESS:
        case actions.LOGIN_SUCCESS:
            return {
                ...state,
                fetching: false,
                fetched: true,
                data: {
                    ...state.data,
                    ...action.data
                },
                message: action.message
            };

        case actions.LOAD_PROFILE_REQUEST:
            return {
                ...state,
                fetching: true,
                fetched: false,
                error: null
            };

        case actions.LOAD_PROFILE_ERROR:
            return {
                ...state,
                fetching: false,
                fetched: false,
                error: action.error,
                message: action.message
            };

        case actions.LOAD_PROFILE_SUCCESS:
            return {
                ...state,
                fetching: false,
                fetched: true,
                data: {
                    ...state.data,
                    ...action.data
                },
                message: action.message
            };

        case actions.UPDATE_PROFILE_REQUEST:
            return {
                ...state,
                fetching: true,
                fetched: false,
                error: null
            };

        case actions.UPDATE_PROFILE_ERROR:
            return {
                ...state,
                fetching: false,
                fetched: false,
                error: action.error,
                message: action.message
            };

        case actions.UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                fetching: false,
                fetched: true,
                data: {
                    ...state.data,
                    user: {
                        ...state.data.user,
                        ...action.data.user
                    }
                },
                message: action.message
            };
        default:
            return state;
    }
}
