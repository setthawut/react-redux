import React from "react";

import { connect } from "react-redux";
import { mapDispatchToProps } from "../../redux/actions/index";
import { reduxForm } from "redux-form";

import { Container, Row, Col, Button, Tabs, Tab } from "react-bootstrap";
import QualifiedPersonTable from "./Table/QualifiedPersonTable";
import QualifiedPersonFilter from "./Filter/QualifiedPersonFilterAdmin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import LOADING from "../../redux/actions/loading_key";

class QualifiedPerson extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sort: "",
      columnSort: "",
      sortType: "",
      stateType: "QualifiedPerson",
    };
  }

  componentDidMount() {
    const { stateType } = this.state;
    this.props.loading(LOADING.getQualifiedPerson);
    this.props.getQualifiedPerson({ typeKey: stateType });
  }

  onCreateQualifiedPerson() {
    this.props.showCreateQualifiedPerson();
  }

  refreshPage() {
    const { stateType } = this.state;
    this.props.loading(LOADING.getQualifiedPerson);
    this.props.getQualifiedPerson({ typeKey: stateType });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.refreshPage !== this.props.refreshPage) {
      if (this.props.refreshPage) {
        this.refreshPage();
      }
    }
  }

  renderFilter() {
    const { stateType } = this.state;
    return (
      <Col xs={12}>
        <QualifiedPersonFilter keyType={stateType} />
      </Col>
    );
  }

  render() {
    const { qualifiedPerson } = this.props;
    return (
      <Container fluid className="box">
        <Row>
          <Col xs={6}>
            <h3>{"ผู้ทรงคุณวุฒิ"}</h3>
          </Col>

          <Col xs={6} style={{ textAlign: "right" }}>
            <Button onClick={() => this.onCreateQualifiedPerson()}>
              <FontAwesomeIcon
                icon={faPlus}
                style={{ fontSize: 18, marginRight: 15 }}
              />
              สร้าง
            </Button>
          </Col>
        </Row>
        <Col xs={12}>{this.renderFilter()}</Col>
        <Row
          xs={12}
          style={{
            borderBottom: "1px solid #dddddd",
            marginTop: "15px",
          }}
        ></Row>
        <QualifiedPersonTable dataSource={qualifiedPerson} />
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    location: state.router.location,
    qualifiedPerson: state.qualifiedPerson.qualifiedPerson,
    refreshPage: state.qualifiedPerson.refreshPage,
  };
}

export default reduxForm({
  form: "QualifiedPerson",
})(connect(mapStateToProps, mapDispatchToProps)(QualifiedPerson));
