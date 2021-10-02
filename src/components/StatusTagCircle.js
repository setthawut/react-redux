import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

const StatusTagCircle = ({ status, size = 18 }) => (
  <FontAwesomeIcon
    icon={faCircle}
    style={{ fontSize: size, marginLeft: 10, marginRight: 10 }}
    className={
      status == "ok"
        ? "circle-success"
        : status == "warning"
        ? "circle-warning"
        : status == "error"
        ? "circle-error"
        : "circle-notfound"
    }
  />
);

export default StatusTagCircle;
