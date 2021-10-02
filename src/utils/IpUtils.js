export function checkIpList(list) {
  var error = false;
  Object.keys(list).map((key) => {
    let ip = list[key];
    if (!validateIpAddressWithSubnet(ip)) {
      error = true;
      return true;
    }
  });
  return !error;
}

export function checkIpLength(list) {
  var count = 0;
  Object.keys(list).map((key) => {
    let ip = list[key];
    if (ip != null) {
      count++;
    }
  });
  return count > 0;
}

export function validateIpAddressWithSubnet(ipaddress) {
  if (
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\/(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
      ipaddress,
    )
  ) {
    return true;
  }
  return false;
}

export function validateIpAddress(ipaddress) {
  if (
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
      ipaddress,
    )
  ) {
    return true;
  }
  return false;
}

export function validatePort(input) {
  var num = +input;

  if (Number.isInteger(num)) {
    return numberInRangePort(num);
  } else {
    if (/^\d+-\d+$/.test(input)) {
      let error = false;
      let split = input.split("-");
      return (
        numberInRangePort(split[0]) &&
        numberInRangePort(split[1]) &&
        parseInt(split[0]) < parseInt(split[1])
      );
    } else {
      return false;
    }
  }
}

export function validateInterface(input) {
  var num = +input;

  if (Number.isInteger(num)) {
    return numberInRangeInterface(num);
  } else {
    if (/^\d+-\d+$/.test(input)) {
      let error = false;
      let split = input.split("-");
      return (
        numberInRangeInterface(split[0]) &&
        numberInRangeInterface(split[1]) &&
        parseInt(split[0]) < parseInt(split[1])
      );
    } else {
      return false;
    }
  }
}

export function numberInRangePort(input) {
  let max = 65535;
  let min = 0;
  return numberInRang(input, max, min);
}

export function numberInRangeInterface(input) {
  let max = 48;
  let min = 1;
  return numberInRang(input, max, min);
}

export function numberInRang(input, max, min) {
  var num = +input;
  return num >= min && num <= max && input + "" === num.toString();
}
