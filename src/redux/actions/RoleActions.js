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

    HIDE_MODAL,
    HIDE_LOADING,
} from './types'

import axios from 'axios'
import { API_URL } from '../../constants'
import LOADING from './loading_key'

export function getRoles() {
    return dispatch => {
        dispatch({ type: GET_ROLES_REQUEST })

        axios.get(`${API_URL}/roles`)
            .then(response => {
                dispatch({ 
                    type: GET_ROLES_SUCCESS,
                    payload: response.data
                })
                dispatch({ 
                    type: HIDE_LOADING,
                    payload: LOADING.getRoles
                })
            })
            .catch(error => {
                dispatch({ 
                    type: GET_ROLES_ERROR,
                    payload: error
                })
                dispatch({ 
                    type: HIDE_LOADING,
                    payload: LOADING.getRoles
                })
            });
    }
}


export function createRole(value) {
    return dispatch => {
        dispatch({ type: CREATE_ROLE_REQUEST })

        axios.post(`${API_URL}/role`, value)
            .then(response => {
                dispatch({ 
                    type: HIDE_LOADING,
                    payload: LOADING.createRole
                })
                dispatch({ 
                    type: CREATE_ROLE_SUCCESS,
                    payload: response.data
                })
                vex.dialog.alert("The role has been created")
                dispatch({ type: HIDE_MODAL })
            })
            .catch(error => {
                dispatch({ 
                    type: HIDE_LOADING,
                    payload: LOADING.createRole
                })
                dispatch({ 
                    type: CREATE_ROLE_ERROR,
                    payload: error
                })
                vex.dialog.alert({ unsafeMessage: `<p class='alert-error'>Error: ${error.response.data.StatusMessage}</p>` })
            });
    }
}

export function editRole(value) {
    return dispatch => {
        dispatch({ type: EDIT_ROLE_REQUEST })

        axios.put(`${API_URL}/role`, value)
            .then(response => {
                dispatch({ 
                    type: HIDE_LOADING,
                    payload: LOADING.editRole
                })
                dispatch({ 
                    type: EDIT_ROLE_SUCCESS,
                    payload: response.data
                })
                vex.dialog.alert("The role has been edited")
                dispatch({ type: HIDE_MODAL })
            })
            .catch(error => {
                dispatch({ 
                    type: HIDE_LOADING,
                    payload: LOADING.editRole
                })
                dispatch({ 
                    type: EDIT_ROLE_ERROR,
                    payload: error
                })
                vex.dialog.alert({ unsafeMessage: `<p class='alert-error'>Error: ${error.response.data.StatusMessage}</p>` })
            });
    }
}
