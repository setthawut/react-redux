import { AppContainer } from "react-hot-loader";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import "../public/sass/main.scss";
import App from "./App";
import configureStore, { history } from "./configureStore";
import "./i18n";
// import "antd/dist/antd.css"; /// <--import css ของ antd
// import "./app.less";
// import "./index.css";

const store = configureStore();
const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <App history={history} />
      </Provider>
    </AppContainer>,
    document.getElementById("react-root"),
  );
};

render();

// Hot reloading
if (module.hot) {
  // Reload components
  module.hot.accept("./App", () => {
    render();
  });
}
