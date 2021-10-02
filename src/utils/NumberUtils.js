export function isNumber(number) {
    return !!number && !!Number(number)
}

export function numberWithCommas(x) {
    if (x == "") return "0"
    
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

export function numberWithDecimal(number, decimal) {
    var decimalValue = Math.pow(10, decimal)
    return Math.round(number*decimalValue)/decimalValue
}