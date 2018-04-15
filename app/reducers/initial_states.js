const defaultState = {
    fetching: false,
    fetched: false,
    error: null
};

const arrayState = {
    fetching: false,
    fetched: false,
    error: null,
    data: []
};

const objectState = {
    fetching: false,
    fetched: false,
    error: null,
    data: {}
};

const initialUserState = {
    fetching: false,
    fetched: false,
    error: null,
    data: {
        isLoggedIn: false,
        isEmailVerified: false,
        token: null,
        email: null,
        user: {}
    }
};

export { defaultState, arrayState, objectState, initialUserState };
