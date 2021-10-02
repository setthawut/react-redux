import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { mapDispatchToProps } from "../redux/actions";
import { Route, Switch } from "react-router";
import axios from "axios";

import NoMatch from "../containers/NoMatch";
import Header from "../containers/Header";
import Footer from "../containers/Footer";

import Dashboard from "../containers/Dashboard/Dashboard";

import Login from "../containers/Login/Login";

import Meeting from "../containers/Meeting/Meeting";
import Notify from "../containers/Notify/Notify";
import Appeal from "../containers/Appeal/Appeal";
import Law from "../containers/Law/Law";
import History from "../containers/History/History";
import Users from "../containers/User/Users";

import News from "../containers/News/News";
import QualifiedPerson from "../containers/QualifiedPerson/QualifiedPerson";
import Defendant from "../containers/Defendant/Defendant";
import ResetPasswordMe from "../containers/ResetPasswordMe/ResetPasswordMe";
import Banner from "../containers/Setting/Banner/Banner";
import Address from "../containers/Setting/Address/Address";
import Propose from "../containers/Setting/Propose/Propose";
import Configuration from "../containers/Setting/Configuration/Configuration";
import AboutUs from "../containers/Setting/AboutUs/AboutUs";
import OfficeOfQualification from "../containers/Setting/OfficeOfQualification/OfficeOfQualification";
import PublicFile from "../containers/Setting/PublicFile/PublicFile";
import ModalRoot from "../containers/ModalRoot";
import Spinner from "../containers/Spinner";

class Routes extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.isLogin();

    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response.status == 401) {
          console.log("401");
          this.props.logoutUser();
        } else if (error.response.status == 410) {
          console.log("410");
          vex.dialog.alert("Expired: Please contact developer team.");
          this.props.logoutUser();
        }
        return Promise.reject(error);
      },
    );
  }

  render() {
    return (
      <div id="app-container">
        <Header key="Header" />
        <div id="body">
          <Switch>
            <Route exact path="/login" component={Login} />

            <Route exact path="/" component={Dashboard} />
            <Route exact path="/dashboard" component={Dashboard} />

            <Route exact path="/meeting" component={Meeting} />
            <Route exact path="/notify" component={Notify} />
            <Route exact path="/appeal" component={Appeal} />

            <Route exact path="/law" component={Law} />
            <Route exact path="/setting/history" component={History} />
            <Route exact path="/setting/users" component={Users} />

            <Route exact path="/news" component={News} />
            <Route exact path="/qualifiedperson" component={QualifiedPerson} />
            <Route
              exact
              path="/setting/resetpasswordme"
              component={ResetPasswordMe}
            />
            <Route exact path="/defendant" component={Defendant} />

            <Route
              exact
              path="/setting/officeOfQualification"
              component={OfficeOfQualification}
            />

            <Route exact path="/setting/publicFile" component={PublicFile} />
            <Route
              exact
              path="/setting/configuration"
              component={Configuration}
            />
            <Route exact path="/setting/banner" component={Banner} />
            <Route exact path="/setting/address" component={Address} />

            <Route exact path="/setting/propose" component={Propose} />
            <Route exact path="/setting/aboutus" component={AboutUs} />

            <Route component={NoMatch} />
          </Switch>
        </div>
        <Footer />
        <ModalRoot />
        <Spinner />
      </div>
    );
  }
}

Routes.propTypes = {
  logoutUser: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
