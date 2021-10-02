import React from "react";
import { connect } from "react-redux";
import { mapDispatchToProps } from "../../redux/actions/index";
import { reduxForm } from "redux-form";
import { Container, Row, Col, Button } from "react-bootstrap";
import LOADING from "../../redux/actions/loading_key";
import TableLawAdmin from "./Table/LawTableAdmin";
import TableLawUser from "./Table/LawTableUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const validate = (values) => {
  const errors = {};

  return errors;
};

class Law extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sort: "",
      columnSort: "",
      sortType: "",
    };
  }

  componentDidMount() {
    this.props.loading(LOADING.getLaw);
    this.props.getLawType();
    this.props.getLaw({ typeKey: "KotmaiThiKiaokhong" });
  }

  onCreateLaw() {
    this.props.showCreateLaw();
  }

  renderTable() {
    const { law, user } = this.props;

    if (!!user) {
      return user.roles === "admin" ? (
        <TableLawAdmin dataSource={law} />
      ) : (
        <TableLawUser dataSource={law} />
      );
    } else {
      return null;
    }
  }

  refreshPage() {
    this.props.loading(LOADING.getLaw);
    this.props.getLaw({ typeKey: "KotmaiThiKiaokhong" });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.refreshPage !== this.props.refreshPage) {
      if (this.props.refreshPage) {
        this.refreshPage();
      }
    }
  }

  render() {
    const { user } = this.props;
    if (!!user) {
      return (
        <Container fluid>
          <Row>
            <Col>
              <Container fluid className="box">
                <Row>
                  <Col xs={6}>
                    <h3>{"กฎหมายที่เกี่ยวข้อง"}</h3>
                  </Col>
                  {user.roles === "admin" ? (
                    <Col xs={6} style={{ textAlign: "right" }}>
                      <Button onClick={() => this.onCreateLaw()}>
                        <FontAwesomeIcon
                          icon={faPlus}
                          style={{ fontSize: 18, marginRight: 15 }}
                        />
                        สร้าง
                      </Button>
                    </Col>
                  ) : null}
                </Row>
                {this.renderTable()}
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
    law: state.law.law,
    refreshPage: state.law.refreshPage,
    user: state.login.user,
  };
}

export default reduxForm({
  form: "Law",
  validate,
})(connect(mapStateToProps, mapDispatchToProps)(Law));
