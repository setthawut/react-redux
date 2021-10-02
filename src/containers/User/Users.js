import React from "react";
import { connect } from "react-redux";
import { mapDispatchToProps } from "../../redux/actions/index";
import { reduxForm } from "redux-form";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import LOADING from "../../redux/actions/loading_key";
import UserTableAdmin from "./Table/UserTableAdmin";
import UserTableUser from "./Table/UserTableUser";
import UserFilterAdmin from "./Filter/UserFilterAdmin";
import UserFilterUser from "./Filter/UserFilterUser";

class Users extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sort: "",
      columnSort: "",
      sortType: "",
    };
  }

  componentDidMount() {
    const { user } = this.props;
    if (!!user) {
   
      if (user.roles === "admin") {
     
        this.props.loading(LOADING.getUsers);
        this.props.getUsers({ pageKey: 1 });
        this.props.getUserRoles();
      }
    }
  }

  onCreateUser() {
    this.props.showCreateUser();
  }

  renderTable() {
    const { users, user } = this.props;

    if (!!user) {
      return user.roles === "admin" ? (
        <UserTableAdmin dataSource={users} />
      ) : (
        <UserTableUser dataSource={users} />
      );
    } else {
      return null;
    }
  }

  renderFilter() {
    const { user } = this.props;

    if (!!user) {
      return user.roles === "admin" ? <UserFilterAdmin /> : <UserFilterUser />;
    } else {
      return null;
    }
  }

  refreshPage() {
    const { user } = this.props;
    if (!!user) {
      if (user.roles === "admin") {
      
        this.props.loading(LOADING.getUsers);
        this.props.getUsers({ pageKey: 1 });
        this.props.getUserRoles();
      }
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.refreshPage !== this.props.refreshPage) {
      if (this.props.refreshPage) {
        this.refreshPage();
      }
    }
  }

  render() {
    return (
      <Container fluid className="box">
        <Row>
          <Col xs={6}>
            <h3>{"ผู้ใช้งาน"}</h3>
          </Col>

          <Col xs={6} style={{ textAlign: "right" }}>
            <Button onClick={() => this.onCreateUser()}>
              <FontAwesomeIcon
                icon={faPlus}
                style={{ fontSize: 18, marginRight: 15 }}
              />
              สร้าง
            </Button>
          </Col>
        </Row>

        {this.renderFilter()}
        <Row
          xs={12}
          style={{
            borderBottom: "1px solid #dddddd",
            marginTop: "15px",
          }}
        ></Row>
        {this.renderTable()}
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.user.users,
    refreshPage: state.user.refreshPage,
    user: state.login.user,
  };
}

export default reduxForm({
  form: "Users",
})(connect(mapStateToProps, mapDispatchToProps)(Users));