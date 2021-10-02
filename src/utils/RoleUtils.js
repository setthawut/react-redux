import { checkIsChecked, getArrayFromCheckbox } from '../components/FormHelper'
import { pageViews, authorizeFunctions } from '../constants/roles'

export function mapCreateRoleFormToApiRequest(value) {
    Object.keys(value.authorize).map((key) => {
        Object.keys(value.authorize[key]).map((key2) => {
            if (value.authorize[key][key2] == "") {
                value.authorize[key][key2] = false
            }
        })
    })

    var apiRequest = {
        Name: value.name,
        Views: getArrayFromCheckbox(value.views),
        Authorizations: value.authorize
    }
    return apiRequest
}

export function mapEditRoleFormToApiRequest(id,value) {
    Object.keys(value.authorize).map((key) => {
        Object.keys(value.authorize[key]).map((key2) => {
            if (value.authorize[key][key2] == "") {
                value.authorize[key][key2] = false
            }
        })
    })

    var apiRequest = {
        Id: id,
        Name: value.name,
        Views: getArrayFromCheckbox(value.views),
        Authorizations: value.authorize
    }
    return apiRequest
}

export function mapRoleApiToEditForm(value) {
    var views = {}
    Object.keys(pageViews).map((key) => {
        views[key] = checkIsChecked(key,value.Views)
    })

    return {
        name: value.Name,
        views: views,
        authorize: value.Authorizations
    }
}