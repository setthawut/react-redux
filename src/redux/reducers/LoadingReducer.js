import {
    SHOW_LOADING,
    SHOW_LOADING_SMALL,
    HIDE_LOADING,
} from '../actions/types'

const INITIAL_STATE = {
    loading: [],
    loadingSmall: [],

    isShow: false,
    isShowSmall: false
}

export default (state = INITIAL_STATE, action) => {
    var loading = state.loading;
    var loadingSmall = state.loadingSmall;
    switch (action.type) {
        case SHOW_LOADING:
            var index = loading.indexOf(action.payload)
            if (index == -1) {
                loading.push(action.payload)
            }
            return { ...state, isShow: true, loading: loading }
            
        case SHOW_LOADING_SMALL:
            var index = loadingSmall.indexOf(action.payload)
            if (index == -1) {
                loadingSmall.push(action.payload)
            }
            return { ...state, isShowSmall: true, loadingSmall: loadingSmall }

        case HIDE_LOADING:
            var index = loading.indexOf(action.payload)
            if (index > -1) {
                loading.splice(loading.indexOf(index), 1);
            }

            index = loadingSmall.indexOf(action.payload)
            if (index > -1) {
                loadingSmall.splice(loadingSmall.indexOf(index), 1);
            }

            return { ...state,
                isShow: loading.length, loading: loading,
                isShowSmall: loadingSmall.length, loadingSmall: loadingSmall
            }
        default:
            return state
    }
}