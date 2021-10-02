import {
    SHOW_LOADING,
    SHOW_LOADING_SMALL,
    HIDE_LOADING,
} from './types'

export function loading(key, length = 0) {
    return dispatch => {
        if (length > 0) {
            dispatch({
                type: SHOW_LOADING_SMALL,
                payload: key
            })
        } else {
            dispatch({
                type: SHOW_LOADING,
                payload: key
            })
        }
    }
}

export function hide_loading(key) {
    return dispatch => {
        dispatch({
            type: HIDE_LOADING,
            payload: key
        })
    }
}