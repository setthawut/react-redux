export function changeStatus(current, change) {
    if (change == "error") {
        return "error"
    } else if (current == "error") {
        return "error"
    } else if (current == "warning" && change == "ok") {
        return "warning"
    } else {
        return change
    }
}

export function checkUsage(type, level) {
    if (type >= level) {
        return "warning"
    } else {
        return "ok"
    }
}