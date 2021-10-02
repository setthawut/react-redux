import React from "react";

import { connect } from "react-redux";
import { mapDispatchToProps } from "../../redux/actions/index";
import { reduxForm } from "redux-form";

import { Container, Row, Col, Button, Tabs, Tab } from "react-bootstrap";
import DefendantTable from "./Table/DefendantTable";
import DefendantFilter from "./Filter/DefendantFilterAdmin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import LOADING from "../../redux/actions/loading_key";

class Defendant extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sort: "",
      columnSort: "",
      sortType: "",
      stateType: "Defendant",
    };
  }

  componentDidMount() {
    const { stateType } = this.state;
    // this.props.loading(LOADING.getDefendant);
    this.props.getDefendant({ typeKey: stateType });
  }

  onCreateDefendant() {
    this.props.showCreateDefendant();
  }

  refreshPage() {
    const { stateType } = this.state;
    this.props.loading(LOADING.getDefendant);
    this.props.getDefendant({ typeKey: stateType });
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
        <DefendantFilter keyType={stateType} />
      </Col>
   
    );
  }

  render() {
    const { defendant } = this.props;
    return (
      <Container fluid className="box">
        <Row>
          <Col xs={6}>
            <h3>{"คดีที่ กก.วล. เป็นผู้ถูกฟ้อง"}</h3>
          </Col>

          <Col xs={6} style={{ textAlign: "right" }}>
            <Button onClick={() => this.onCreateDefendant()}>
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
        <DefendantTable dataSource={defendant} />
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    location: state.router.location,
    defendant: state.defendant.defendant,
    refreshPage: state.defendant.refreshPage,
  };
}

export default reduxForm({
  form: "Defendant",
})(connect(mapStateToProps, mapDispatchToProps)(Defendant));
