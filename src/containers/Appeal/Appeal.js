import React from "react";

import { connect } from "react-redux";
import { mapDispatchToProps } from "../../redux/actions/index";
import { reduxForm } from "redux-form";

import { Container, Row, Col, Button, Tabs, Tab } from "react-bootstrap";
import TableAppeal from "./Table/AppealTableAdmin";
import FilterAppeal from "./Filter/AppealFilterAdmin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import LOADING from "../../redux/actions/loading_key";

class Appeal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sort: "",
      columnSort: "",
      sortType: "",
      stateType: "KhoRongrian",
      header: "ข้อร้องเรียน",
    };
  }

  componentDidMount() {
    const { stateType } = this.state;
    this.props.loading(LOADING.getAppeal);
    this.props.getAppeal({ typeKey: stateType });
    this.props.getAppealType();
  }

  onCreateAppeal() {
    this.props.showCreateAppeal();
  }

  refreshPage(value) {
    this.props.loading(LOADING.getAppeal);
    this.props.getAppeal({ typeKey: value });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { appeal } = this.props;
    let findType = appeal.find((item) => item.type);

    if (prevProps.refreshPage !== this.props.refreshPage) {
      if (this.props.refreshPage) {
        this.refreshPage(!!findType ? findType.type : this.state.stateType);
      }
    }
  }

  renderFilter() {
    const { stateType } = this.state;
    return (
      <Tabs
        defaultActiveKey="KhoRongrian"
        id="tab-appeal"
        className="mb-3"
        onSelect={(k) => {
          this.refreshPage(k), this.setState({ stateType: k });
        }}
      >
        <Tab eventKey="KhoRongrian" title="ข้อร้องเรียน">
          <Col xs={12}>
            <FilterAppeal keyType={stateType} />
          </Col>
        </Tab>
        <Tab eventKey="Khosanoenae" title="ข้อเสนอแนะ">
          <Col xs={12}>
            <FilterAppeal keyType={stateType} />
          </Col>
        </Tab>
      </Tabs>
    );
  }

  render() {
    const { header } = this.state;
    const { appeal } = this.props;
    return (
      <Container fluid className="box">
        <Row>
          <Col xs={6}>
            <h3>{"เรื่องร้องเรียน กก.วล."}</h3>
          </Col>

          <Col xs={6} style={{ textAlign: "right" }}>
            <Button onClick={() => this.onCreateAppeal()}>
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
        <TableAppeal dataSource={appeal} />
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
 
    location: state.router.location,
    appeal: state.appeal.appeal,
    refreshPage: state.appeal.refreshPage,
  };
}

export default reduxForm({
  form: "Appeal",
})(connect(mapStateToProps, mapDispatchToProps)(Appeal));
