import React from "react";
import { connect } from "react-redux";
import { mapDispatchToProps } from "../../redux/actions/index";
import { reduxForm } from "redux-form";
import TableNotifyAdmin from "./Table/NotifyTableAdmin";
import TableNotifyUser from "./Table/NotifyTableUser";
import FilterNotifyAdmin from "./Filter/NotifyFilterAdmin";
import FilterNotifyUser from "./Filter/NotifyFilterUser";
import {
  Container,
  Row,
  Col,
  Form,
  Table,
  Button,
  Tabs,
  Tab,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import LOADING from "../../redux/actions/loading_key";

class Notify extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sort: "",
      columnSort: "",
      sortType: "",
      isYear: false,
      isRound: false,
      stateType: "PrakatKoKoWoLo",
    };
  }

  componentDidMount() {
    this.props.loading(LOADING.getNotify);
    this.props.getNotify({ typeKey: "PrakatKoKoWoLo" });
    this.props.getNotifyType();
    this.props.getNotifyDocumentReferences("PrakatKoKoWoLo");
  }

  onCreateNotify() {
    this.props.showCreateNotify();
  }

  refreshPage(value) {
    this.props.loading(LOADING.getNotify);
    this.props.getNotify({ typeKey: value });
    this.props.getNotifyDocumentReferences(value);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { notify } = this.props;
    let findType = notify.find((item) => item.type);

    if (prevProps.refreshPage !== this.props.refreshPage) {
      if (this.props.refreshPage) {
        this.refreshPage(!!findType ? findType.type : this.state.stateType);
      }
    }
  }

  renderTable() {
    const { notify, user } = this.props;

    if (!!user) {
      return user.roles === "admin" ? (
        <TableNotifyAdmin
          dataSource={notify}
          isRound={this.state.isRound}
          isYear={this.state.isYear}
        />
      ) : (
        <TableNotifyUser
          dataSource={notify}
          isRound={this.state.isRound}
          isYear={this.state.isYear}
        />
      );
    } else {
      return null;
    }
  }

  renderFilter() {
    const { user } = this.props;
    const { stateType } = this.state;
    if (!!user) {
      if (user.roles === "admin") {
        return (
          <Tabs
            defaultActiveKey="PrakatKoKoWoLo"
            id="tab-notify"
            className="mb-3"
            onSelect={(k) => {
              k === "KhamsangKoKoWoLo"
                ? this.setState({
                    isRound: true,
                    isYear: true,
                  })
                : this.setState({
                    isRound: false,
                    isYear: false,
                  });
              this.refreshPage(k), this.setState({ stateType: k });
            }}
          >
            <Tab eventKey="PrakatKoKoWoLo" title="ประกาศ กก.วล.">
              <Col xs={12}>
                <FilterNotifyAdmin />
              </Col>
            </Tab>
            <Tab eventKey="KhamsangKoKoWoLo" title="คำสั่ง กก.วล.">
              <Col xs={12}>
                <FilterNotifyAdmin
                  isYear={true}
                  isRound={true}
                  keyType={stateType}
                />
              </Col>
            </Tab>
            <Tab eventKey="PrakatKrasuang" title="ประกาศกระทรวง">
              <Col xs={12}>
                <FilterNotifyAdmin keyType={stateType} />
              </Col>
            </Tab>
            <Tab eventKey="KotKrasuang" title="กฎกระทรวง">
              <Col xs={12}>
                <FilterNotifyAdmin keyType={stateType} />
              </Col>
            </Tab>
            <Tab eventKey="Rabiap" title="ระเบียบ">
              <Col xs={12}>
                <FilterNotifyAdmin keyType={stateType} />
              </Col>
            </Tab>
            <Tab eventKey="PrakatKhamsangUenUen" title="อื่นๆ">
              <Col xs={12}>
                <FilterNotifyAdmin keyType={stateType} />
              </Col>
            </Tab>
          </Tabs>
        );
      } else {
        return (
          <Tabs
            defaultActiveKey="PrakatKoKoWoLo"
            id="tab-notify"
            className="mb-3"
            onSelect={(k) => {
              k === "KhamsangKoKoWoLo"
                ? this.setState({
                    isRound: true,
                    isYear: true,
                  })
                : this.setState({
                    isRound: false,
                    isYear: false,
                  });
              this.refreshPage(k), this.setState({ stateType: k });
            }}
          >
            <Tab eventKey="PrakatKoKoWoLo" title="ประกาศ กก.วล.">
              <Col xs={12}>
                <FilterNotifyUser keyType={stateType} />
              </Col>
            </Tab>
            <Tab eventKey="KhamsangKoKoWoLo" title="คำสั่ง กก.วล.">
              <Col xs={12}>
                <FilterNotifyUser
                  isYear={true}
                  isRound={true}
                  keyType={stateType}
                />
              </Col>
            </Tab>
            <Tab eventKey="PrakatKrasuang" title="ประกาศกระทรวง">
              <Col xs={12}>
                <FilterNotifyUser keyType={stateType} />
              </Col>
            </Tab>
            <Tab eventKey="KotKrasuang" title="กฎกระทรวง">
              <Col xs={12}>
                <FilterNotifyUser keyType={stateType} />
              </Col>
            </Tab>
            <Tab eventKey="Rabiap" title="ระเบียบ">
              <Col xs={12}>
                <FilterNotifyUser keyType={stateType} />
              </Col>
            </Tab>
            <Tab eventKey="PrakatKhamsangUenUen" title="อื่นๆ">
              <Col xs={12}>
                <FilterNotifyUser keyType={stateType} />
              </Col>
            </Tab>
          </Tabs>
        );
      }
    }
  }
  render() {
    const { user } = this.props;
    if (!!user) {
      return (
        <Container fluid className="box">
          <Row>
            <Col xs={6}>
              <h3>{"ประกาศ / คำสั่ง"}</h3>
            </Col>
            {user.roles === "admin" ? (
              <Col xs={6} style={{ textAlign: "right" }}>
                <Button onClick={() => this.onCreateNotify()}>
                  <FontAwesomeIcon
                    icon={faPlus}
                    style={{ fontSize: 18, marginRight: 15 }}
                  />
                  สร้าง
                </Button>
              </Col>
            ) : null}
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
    } else {
      return null;
    }
  }
}
function mapStateToProps(state) {
  return {
    notify: state.notify.notify,
    refreshPage: state.notify.refreshPage,
    user: state.login.user,
  };
}

export default reduxForm({
  form: "Notify",
})(connect(mapStateToProps, mapDispatchToProps)(Notify));
