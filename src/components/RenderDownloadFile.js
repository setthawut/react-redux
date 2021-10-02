import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { API_URL } from "../constants/index";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

function RenderDownloadFile({ file, isDetail, isDocRef }) {
  const renderTooltip = (props) => (
    <Tooltip id="fileTooltip" {...props}>
      {file.filename}
    </Tooltip>
  );
  return (
    <>
      {isDetail ? (
        <div>
          <Link target="_blank" to={`${API_URL}/documentfile/${file._id}`}>
            <FontAwesomeIcon
              icon={faFile}
              style={{ fontSize: 26, marginRight: 5, marginTop: 5 }}
            />
            {file.filename}
          </Link>
        </div>
      ) : (
        //  isDocRef ? (
        //   <div>
        //     <FontAwesomeIcon
        //       icon={faFile}
        //       style={{ fontSize: 26, marginRight: 5 }}
        //     />
        //     {file.filename}
        //   </div>
        // ) :
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 400 }}
          overlay={renderTooltip}
        >
          <Link target="_blank" to={`${API_URL}/documentfile/${file._id}`}>
            <FontAwesomeIcon
              icon={faFile}
              style={{ fontSize: 26, marginRight: 5, marginTop: 5 }}
            />
          </Link>
        </OverlayTrigger>
      )}
    </>
  );
}

export default RenderDownloadFile;
