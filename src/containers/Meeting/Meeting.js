import React from "react";

import { connect } from "react-redux";
import { mapDispatchToProps } from "../../redux/actions/index";
import { reduxForm } from "redux-form";

import { Container, Row, Col, Button } from "react-bootstrap";
import TableMeetingAdmin from "./Table/MeetingTableAdmin";
import TableMeetingUser from "./Table/MeetingTableUser";
import FilterMeetingAdmin from "./Filter/MeetingFilterAdmin";
import FilterMeetingUser from "./Filter/MeetingfilterUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tabs, Tab } from "react-bootstrap";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import LOADING from "../../redux/actions/loading_key";
import { kBlockLengthPrefixCode } from "../../../pdfmake/build/pdfmake";

class Meeting extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sort: "",
      columnSort: "",
      isKhoRoMo: false,
      sortType: "",
      stateType: "RabiapwaraKanPrachum",
    };
  }

  componentDidMount() {
    this.props.loading(LOADING.getMeeting);
    this.props.getMeeting({ typeKey: "RabiapwaraKanPrachum" });
    this.props.getMeetingType();
  }

  onCreateMeeting() {
    this.props.showCreateMeeting();
  }

  refreshPage(value) {
    this.props.loading(LOADING.getMeeting);
    this.props.getMeeting({ typeKey: value });
    this.props.getMeetingType();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { meeting } = this.props;
    let findType = meeting.find((item) => item.type);

    if (prevProps.refreshPage !== this.props.refreshPage) {
      if (this.props.refreshPage) {
        this.refreshPage(!!findType ? findType.type : this.state.stateType);
      }
    }
  }

  renderTable() {
    const { meeting, user } = this.props;
    const { isKhoRoMo } = this.state;
    if (!!user) {
      return user.roles === "admin" ? (
        <TableMeetingAdmin dataSource={meeting} isKhoRoMo={isKhoRoMo} />
      ) : (
        <TableMeetingUser dataSource={meeting} isKhoRoMo={isKhoRoMo} />
      );
    } else {
      return null;
    }
  }

  renderFilter() {
    const { user } = this.props;
    const { stateType, isKhoRoMo } = this.state;
    if (!!user) {
      if (user.roles === "admin") {
        return (
          <Tabs
            defaultActiveKey="RabiapwaraKanPrachum"
            id="tab-meeting"
            className="mb-3"
            onSelect={(k) => {
              k === "MatiKoKoWoLoSanoeKhoRoMo" || k === "NangsueKhoRoMo"
                ? this.setState({
                    isKhoRoMo: true,
                  })
                : this.setState({
                    isKhoRoMo: false,
                  });
              this.refreshPage(k), this.setState({ stateType: k });
            }}
          >
            <Tab eventKey={"RabiapwaraKanPrachum"} title="ระเบียบวาระการประชุม">
              <Col xs={12}>
                <FilterMeetingAdmin keyType={stateType} />
              </Col>
            </Tab>
            <Tab eventKey={"Mati"} title="มติ">
              <Col xs={12}>
                <FilterMeetingAdmin keyType={stateType} />
              </Col>
            </Tab>
            <Tab eventKey="RainganYo" title="รายงาน (ย่อ)">
              <Col xs={12}>
                <FilterMeetingAdmin keyType={stateType} />
              </Col>
            </Tab>
            <Tab eventKey="RainganTem" title="รายงาน (เต็ม)">
              <Col xs={12}>
                <FilterMeetingAdmin keyType={stateType} />
              </Col>
            </Tab>
            <Tab
              eventKey="MatiKoKoWoLoSanoeKhoRoMo"
              title="มติ กก.วล. เสนอ ครม."
            >
              <Col xs={12}>
                <FilterMeetingAdmin keyType={stateType} isKhoRoMo={isKhoRoMo} />
              </Col>
            </Tab>
            <Tab eventKey="WaraKanPrachum" title="วาระการประชุม">
              <Col xs={12}>
                <FilterMeetingAdmin keyType={stateType} />
              </Col>
            </Tab>
            <Tab eventKey="NangsueChaengMati" title="หนังสือแจ้งมติ">
              <Col xs={12}>
                <FilterMeetingAdmin keyType={stateType} />
              </Col>
            </Tab>
            <Tab eventKey="RainganNayok" title="รายงานนายกรัฐมนตรี">
              <Col xs={12}>
                <FilterMeetingAdmin keyType={stateType} />
              </Col>
            </Tab>
            <Tab eventKey="NangsueKhoRoMo" title="หนังสือ ครม.">
              <Col xs={12}>
                <FilterMeetingAdmin keyType={stateType} isKhoRoMo={isKhoRoMo} />
              </Col>
            </Tab>
            <Tab
              eventKey="KaekhaiLaeRaprongRaingan"
              title="แก้ไขและรับรองรายงาน"
            >
              <Col xs={12}>
                <FilterMeetingAdmin keyType={stateType} />
              </Col>
            </Tab>
            <Tab eventKey="KhomunChaphokit" title="ข้อมูลเฉพาะกิจ">
              <Col xs={12}>
                <FilterMeetingAdmin keyType={stateType} />
              </Col>
            </Tab>
            <Tab eventKey="PrachumKoKoWoLoUenUen" title="อื่นๆ">
              <Col xs={12}>
                <FilterMeetingAdmin keyType={stateType} />
              </Col>
            </Tab>
          </Tabs>
        );
      } else {
        return (
          <Tabs
            defaultActiveKey="RabiapwaraKanPrachum"
            id="tab-meeting"
            className="mb-3"
            onSelect={(k) => {
              k === "MatiKoKoWoLoSanoeKhoRoMo"
                ? this.setState({
                    isKhoRoMo: true,
                  })
                : this.setState({
                    isKhoRoMo: false,
                  });
              this.refreshPage(k), this.setState({ stateType: k });
            }}
          >
            <Tab eventKey="RabiapwaraKanPrachum" title="ระเบียบวาระการประชุม">
              <Col xs={12}>
                <FilterMeetingUser keyType={stateType} />
              </Col>
            </Tab>
            <Tab eventKey="Mati" title="มติ">
              <Col xs={12}>
                <FilterMeetingUser keyType={stateType} />
              </Col>
            </Tab>
            <Tab eventKey="RainganYo" title="รายงาน (ย่อ)">
              <Col xs={12}>
                <FilterMeetingUser keyType={stateType} />
              </Col>
            </Tab>
            <Tab eventKey="RainganTem" title="รายงาน (เต็ม)">
              <Col xs={12}>
                <FilterMeetingUser keyType={stateType} />
              </Col>
            </Tab>
            <Tab
              eventKey="MatiKoKoWoLoSanoeKhoRoMo"
              title="มติ กก.วล. เสนอ ครม."
            >
              <Col xs={12}>
                <FilterMeetingUser />
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
              <h3>{"ประชุม กก.วล."}</h3>
            </Col>
            {user.roles === "admin" ? (
              <Col xs={6} style={{ textAlign: "right" }}>
                <Button onClick={() => this.onCreateMeeting()}>
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
    location: state.router.location,
    meeting: state.meeting.meeting,
    refreshPage: state.meeting.refreshPage,
    user: state.login.user,
  };
}

export default reduxForm({
  form: "Meeting",
})(connect(mapStateToProps, mapDispatchToProps)(Meeting));
