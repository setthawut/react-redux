import {
    GET_ROLES_REQUEST,
    GET_ROLES_SUCCESS,
    GET_ROLES_ERROR,

    CREATE_ROLE_REQUEST,
    CREATE_ROLE_SUCCESS,
    CREATE_ROLE_ERROR,

    EDIT_ROLE_REQUEST,
    EDIT_ROLE_SUCCESS,
    EDIT_ROLE_ERROR,
    
    OPEN_VIEW_ROLE_MODAL,
    OPEN_EDIT_ROLE_MODAL,
} from '../actions/types'

const INITIAL_STATE = {
    roles: [],
    getRolesRequesting: false,
    getRolesError: '',

    createRequesting: false,
    createError: '',

    viewRole: {},

    editRole: {},
    editRequesting: false,
    editError: '',

    deleteRequesting: false,
    deleteError: '',
    
    refreshPage: false,

}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_ROLES_REQUEST:
            return { ...state, getRolesRequesting: true, getRolesError: '', refreshPage: false }
        case GET_ROLES_SUCCESS:
            return { ...state, getRolesRequesting: false, getRolesError: '',
                roles: action.payload.Roles,
            }
        case GET_ROLES_ERROR:
            return { ...state, getRolesRequesting: false, getRolesError: action.payload }

        // Create
        case CREATE_ROLE_REQUEST:
            return { ...state, createRequesting: true, createError: '' }
        case CREATE_ROLE_SUCCESS:
            return { ...state, createRequesting: false, refreshPage: true }
        case CREATE_ROLE_ERROR:
            return { ...state, createError: 'Create Role error.', createRequesting: false }

        // Edit
        case EDIT_ROLE_REQUEST:
            return { ...state, editRequesting: true, editError: '' }
        case EDIT_ROLE_SUCCESS:
            return { ...state, editRequesting: false, refreshPage: true }
        case EDIT_ROLE_ERROR:
            return { ...state, editError: 'Edit Role error.', editRequesting: false }

        case OPEN_VIEW_ROLE_MODAL:
            return { ...state, viewRole: action.payload }
        case OPEN_EDIT_ROLE_MODAL:
            return { ...state, editRole: action.payload }

        default:
            return state
    }
}

