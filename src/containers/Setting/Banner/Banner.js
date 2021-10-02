import React from "react";
import { connect } from "react-redux";
import { mapDispatchToProps } from "../../../redux/actions/index";
import { reduxForm } from "redux-form";
import { Container, Row, Col, Button } from "react-bootstrap";
import LOADING from "../../../redux/actions/loading_key";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TableBanner from "./Table/TableBanner";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

class Banner extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sort: "",
      columnSort: "",
      sortType: "",
    };
  }

  componentDidMount() {
    this.refreshPage();
  }

  onCreateBanner() {
    this.props.showCreateBanner();
  }

  refreshPage() {
    this.props.loading(LOADING.getBanner);
    this.props.getBanner();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.refreshPage !== this.props.refreshPage) {
      if (this.props.refreshPage) {
        this.refreshPage();
      }
    }
  }

  render() {
    const { user, banners } = this.props;
    if (!!user) {
      return (
        <Container fluid>
          <Row>
            <Col xs={12} md={8}>
              <Container fluid className="box">
                <Row style={{ marginBottom: 15 }}>
                  <Col xs={6}>
                    <h3>{"ตั้งค่า - แบนเนอร์หน้าหลัก"}</h3>
                  </Col>
                  {user.roles === "admin" ? (
                    <Col xs={6} style={{ textAlign: "right" }}>
                      <Button onClick={() => this.onCreateBanner()}>
                        <FontAwesomeIcon
                          icon={faPlus}
                          style={{ fontSize: 18, marginRight: 15 }}
                        />
                        สร้าง
                      </Button>
                    </Col>
                  ) : null}
                </Row>
                <TableBanner dataSource={banners} />
              </Container>
            </Col>
          </Row>
        </Container>
      );
    } else {
      return null;
    }
  }
}

function mapStateToProps(state) {
  return {
    banners: state.banner.banners,
    refreshPage: state.banner.refreshPage,
    user: state.login.user,
  };
}

export default reduxForm({
  form: "Banner",
})(connect(mapStateToProps, mapDispatchToProps)(Banner));
