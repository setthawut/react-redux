import React from "react";
import { connect } from "react-redux";

const Spinner = ({ isShow, isShowSmall, type = "large" }) => {
  if (isShow && type == "large") {
    return (
      <div
        id="overlay"
        style={{
          width: "100%",
          height: "100%",
          top: "0",
          left: "0",
          zIndex: "1999",
          backgroundColor: "rgba(50, 50, 50, 0.3)",
          position: "fixed",
        }}
      >
        <img
          src="/imgs/app/preloader.gif"
          width="100"
          height="100"
          alt="loading"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            opacity: "1",
          }}
        />
      </div>
    );
  } else if (isShowSmall && type == "small") {
    return (
      <img
        src="/imgs/app/preloader_small.gif"
        width="30"
        height="30"
        alt="loading"
      />
    );
  } else {
    return null;
  }
};

export default connect((state) => state.loading)(Spinner);
