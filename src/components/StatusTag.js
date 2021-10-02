import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

const StatusTag = ({ status }) =>
  status != null ? (
    status == "ok" ? (
      <div>
        <FontAwesomeIcon
          icon={faCircle}
          style={{ color: "green", fontSize: 20 }}
        />
      </div>
    ) : (
      <div>
        <FontAwesomeIcon
          icon={faCircle}
          style={{ color: "red", fontSize: 20 }}
        />
      </div>
    )
  ) : (
    <div>
      <FontAwesomeIcon icon={faCircle} style={{ color: "red" }} /> No Data
    </div>
  );

export default StatusTag;
