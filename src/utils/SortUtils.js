import { compose } from "redux";

export function dynamicSort(property, isStatus = false) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = 0
        if (isStatus) {
            if (a[property] == "" && (b[property] == "ok" || b[property] == "warning" || b[property] == "error")) {
                result = -1
            } else if (a[property] == "ok" && (b[property] == "")) {
                result = 1
            } else if (a[property] == "ok" && (b[property] == "warning" || b[property] == "error")) {
                result = -1
            } else if (a[property] == "warning" && (b[property] == "ok" || b[property] == "")) {
                result = 1
            } else if (a[property] == "warning" && (b[property] == "error")) {
                result = -1
            } else if (a[property] == "error" && (b[property] == "" || b[property] == "warning" || b[property] == "ok")) {
                result = 1
            } else {
                result = 0
            }
        } else {
            result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        }
        return result * sortOrder;
    }
}