export function repairDateFormat(date) {
  if (date.length == 24) {
    return date;
  } else if (date.length == 20) {
    return [date.slice(0, 19), ".000", date.slice(19)].join("");
  } else {
    return date;
  }
}

export function getDayDateFromStringDate(strDate) {
  if (parseInt(strDate) < 0) {
    return "";
  } else if (strDate == "") {
    return "-";
  } else {
    var date = new Date(Date.parse(strDate));
    if (parseInt(strDate) > 0) {
      date = new Date(strDate);
    }
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear() + 543;
    var weekDay = date.getDay();
    var days = ["อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."];
    day = ("0" + day).slice(-2);
    month = ("0" + month).slice(-2);

    return days[weekDay] + " " + day + "/" + month + "/" + year;
  }
}

export function getDateFromStringDate(strDate) {
  if (parseInt(strDate) < 0) {
    return "";
  } else if (strDate == "") {
    return "-";
  } else {
    var date = new Date(Date.parse(strDate));
    if (parseInt(strDate) > 0) {
      date = new Date(strDate);
    }
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear() + 543;

    return day + "/" + month + "/" + year;
  }
}

export function getDateTimeFromStringDate(strDate) {
  if (parseInt(strDate) < 0) {
    return "";
  } else if (strDate == "") {
    return "-";
  } else {
    var date = new Date(Date.parse(strDate));
    if (parseInt(strDate) > 0) {
      date = new Date(strDate);
    }
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear() + 543;

    let hour = date.getHours();
    let minutes = date.getMinutes();
    let second = date.getSeconds();
    minutes = ("0" + minutes).slice(-2);
    second = ("0" + second).slice(-2);

    return (
      day + "/" + month + "/" + year + " " + hour + ":" + minutes + ":" + second
    );
  }
}

export function getDateTimeWithoutSecondFromStringDate(strDate) {
  if (parseInt(strDate) < 0) {
    return "";
  } else if (strDate == "") {
    return "-";
  } else {
    var date = new Date(Date.parse(strDate));
    if (parseInt(strDate) > 0) {
      date = new Date(strDate);
    }
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let hour = date.getHours();
    let minutes = date.getMinutes();
    let second = date.getSeconds();
    minutes = ("0" + minutes).slice(-2);
    second = ("0" + second).slice(-2);

    return day + "/" + month + "/" + year + " " + hour + ":" + minutes;
  }
}

export function getTimeFromStringDate(strDate) {
  if (parseInt(strDate) < 0) {
    return "";
  } else if (strDate == "") {
    return "-";
  } else {
    var date = new Date(Date.parse(strDate));
    if (parseInt(strDate) > 0) {
      date = new Date(strDate);
    }
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let second = date.getSeconds();
    minutes = ("0" + minutes).slice(-2);
    second = ("0" + second).slice(-2);

    return hour + ":" + minutes + ":" + second;
  }
}

export function getDateTimeForQuery() {
  // 2018-07-24-13:30:00
  var date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  let hour = date.getHours();
  let minutes = date.getMinutes();
  let second = date.getSeconds();
  minutes = ("0" + minutes).slice(-2);
  second = ("0" + second).slice(-2);

  return `${year}-${month}-${day}-${hour}:${minutes}:${second}`;
}

export function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function getTotalDayTimeFromSecond(second) {
  return second / 60 / 60 / 24;
}

export const validateDatePicker = (date) => {
  if (
    /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/.test(
      date,
    )
  ) {
    return true;
  }
  return false;
};
